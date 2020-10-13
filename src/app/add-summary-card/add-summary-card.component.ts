import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SummaryService } from '../services/summary.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-add-summary-card',
  templateUrl: './add-summary-card.component.html',
  styleUrls: ['./add-summary-card.component.scss']
})
export class AddSummaryCardComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });
  locale = 'fr';
  locales = listLocales();

  countriesDDL = ['1 - Colombie', '2 - Equateur', '3 - Pérou'];
  defaultCountry = this.countriesDDL[0];

  imageFile: File;

  constructor(
    private summaryService: SummaryService,
    private localeService: BsLocaleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localeService.use(this.locale);
  }

  onSubmit(form: NgForm) {
    form.value.firstDay = this.mapDateInString(form.value.firstDay);
    form.value.lastDay = this.mapDateInString(form.value.lastDay);
    const postNewSummaryCard$ = this.summaryService.postNewSummaryCard(form.value, this.imageFile);
    postNewSummaryCard$.subscribe(
      () => {
        this.router.navigate(['/summary']);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  private mapDateInString(travelDate: Date) {
    const dd = String(travelDate.getDate()).padStart(2, '0');
    const mm = String(travelDate.getMonth() + 1).padStart(2, '0');
    const yyyy = travelDate.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  detectFiles(event) {
    this.imageFile = event.target.files[0];
  }
}
