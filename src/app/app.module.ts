import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AddSummaryCardComponent } from './add-summary-card/add-summary-card.component';
import { AuthComponent } from './auth/auth.component';
import { EditSummaryCardComponent } from './edit-summary-card/edit-summary-card.component';
import { SummaryCardFormComponent } from './summary-card-form/summary-card-form.component';

// Services
import { SummaryService } from './services/summary.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContainerComponent,
    SummaryComponent,
    HomeComponent,
    GalleryComponent,
    AddSummaryCardComponent,
    AuthComponent,
    EditSummaryCardComponent,
    SummaryCardFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    SummaryService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
