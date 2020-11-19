// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules externes
import { ToasterModule } from 'angular2-toaster';
import { AlertModule } from 'ngx-bootstrap/alert';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';

// Services
import { AuthGuard } from './services/auth-guard.service';
import { NotificationService } from './services/notification.service';
import { CountryService } from './services/country.service';
import { Properties } from './services/properties.service';

// Modules internes
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule } from './component.module';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ContainerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ComponentModule,
        AlertModule.forRoot(),
        ToasterModule.forRoot()
    ],
    providers: [
        AuthGuard,
        NotificationService,
        CountryService,
        Properties
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
