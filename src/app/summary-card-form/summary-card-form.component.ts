import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
    selector: 'app-summary-card-form',
    templateUrl: './summary-card-form.component.html',
    styleUrls: ['./summary-card-form.component.scss']
})
export class SummaryCardFormComponent implements OnInit {

    @Input() data: any;
    @Output() submitForm = new EventEmitter<any>();

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });
    locale = 'fr';
    locales = listLocales();

    countriesDDL = ['1 - Colombie', '2 - Equateur', '3 - Pérou']; // TODO : pays en base
    defaultCountry = this.countriesDDL[0];

    imageFile: File;

    constructor(private localeService: BsLocaleService) { }

    ngOnInit(): void {
        this.localeService.use(this.locale);
    }

    onSubmit(form: NgForm) {
        this.submitForm.emit({ values: form.value, imageFile: this.imageFile });
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
    }

}
