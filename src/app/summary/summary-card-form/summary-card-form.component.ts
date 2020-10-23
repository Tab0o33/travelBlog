import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { SummaryService } from '../summary.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-summary-card-form',
    templateUrl: './summary-card-form.component.html',
    styleUrls: ['./summary-card-form.component.scss']
})
export class SummaryCardFormComponent implements OnInit {

    @Input() data: any;
    @Output() submitForm = new EventEmitter<any>();
    @Output() getCountriesFailed = new EventEmitter<any>();

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });
    locale = 'fr';
    locales = listLocales();

    countriesDDL: string[];
    selectedCountry: string;

    imageFile: File;

    newCountry = '';

    constructor(
        private localeService: BsLocaleService,
        private summaryService: SummaryService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.localeService.use(this.locale);
        this.summaryService.getCountries$().subscribe(
            (countries: { label: string, position: number }[]) => {
                countries.sort((a, b) => a.position - b.position);
                this.countriesDDL = countries.map(c => c.label);
                this.selectedCountry = this.countriesDDL[0];
            },
            () => {
                this.getCountriesFailed.emit();
                this.newCountry = '';
            },
        );
    }

    onSubmit(form: NgForm) {
        this.submitForm.emit({ values: form.value, imageFile: this.imageFile });
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
    }

    addCountry(newCountry: string) {
        const position = this.countriesDDL.length + 1;
        const label = `${position} - ${newCountry}`;
        const newCountryObj = { label, position };
        this.summaryService.addCountry$(newCountryObj).subscribe(
            () => {
                this.countriesDDL.push(label);
                this.notificationService.popToastSuccess();
                this.newCountry = '';
            },
            () => {
                this.notificationService.popToastError();
                this.newCountry = '';
            },
        );
    }

}
