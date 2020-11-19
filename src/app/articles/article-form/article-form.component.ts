import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { CountryService } from 'src/app/services/country.service';

@Component({
    selector: 'app-article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

    @Input() data: any;
    @Output() submitForm = new EventEmitter<any>();

    bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });
    locale = 'fr';
    locales = listLocales();

    imageFile: File;

    countriesDDL: string[];
    selectedCountry: string;

    articleForm: FormGroup;

    constructor(
        private localeService: BsLocaleService,
        private countryService: CountryService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.localeService.use(this.locale);
        this.countryService.getCountries$().subscribe(
            (countries: { label: string, position: number }[]) => {
                countries.sort((a, b) => a.position - b.position);
                this.countriesDDL = countries.map(c => c.label);
                this.selectedCountry = this.countriesDDL[0];
            },
            () => {
            },
        );
    }

    initForm() {
        this.articleForm = this.formBuilder.group({
            name: [''],
            firstDay: [''],
            lastDay: [''],
            country: [''],
            mapImageAlt: ['', Validators.required],
            subparts: this.formBuilder.array([])
        });
    }

    onSubmit() {
        const formValue = this.articleForm.value;
        const subparts = [];
        formValue.subparts.forEach(subpart => {
            subparts.push({
                position: subparts.length + 1,
                title: subpart
            });
        });

        const article = {
            name: formValue.name,
            firstDay: formValue.firstDay,
            lastDay: formValue.lastDay,
            country: formValue.country,
            mapImageAlt: formValue.mapImageAlt,
            subparts
        };
        this.submitForm.emit({ values: article, imageFile: this.imageFile });
    }

    getSubparts(): FormArray {
        return this.articleForm.get('subparts') as FormArray;
    }

    addSubparts() {
        const newSubpartControl = this.formBuilder.control(null, Validators.required);
        this.getSubparts().push(newSubpartControl);
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
    }

}
