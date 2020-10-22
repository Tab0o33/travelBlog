import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public config: ToasterConfig =
        new ToasterConfig({ positionClass: 'toast-top-center' });

    constructor(private toasterService: ToasterService) { }

    popToastSuccess() {
        this.toasterService.pop('success', 'Success', 'Modification réussie');
    }

    popToastError() {
        this.toasterService.pop('error', 'Error', 'Une erreur est survenue');
    }
}
