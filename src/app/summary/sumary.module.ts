// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules externes
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);

// Components
import { EditSummaryCardComponent } from './edit-summary-card/edit-summary-card.component';
import { SummaryCardFormComponent } from './summary-card-form/summary-card-form.component';
import { SummaryComponent } from './summary-component/summary.component';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';

// Services
import { SummaryService } from './summary.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        SummaryComponent,
        SummaryCardFormComponent,
        AddSummaryCardComponent,
        EditSummaryCardComponent

    ],
    exports: [
        SummaryComponent,
        EditSummaryCardComponent,
        AddSummaryCardComponent
    ],
    providers: [
        SummaryService
    ]
})
export class SummaryModule { }
