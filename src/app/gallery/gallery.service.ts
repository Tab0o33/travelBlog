import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Properties } from '../services/properties.service';

@Injectable({
    providedIn: 'root'
})
export class GalleryService {

    constructor(
        private http: HttpClient,
        private properties: Properties,
        private authService: AuthService
    ) { }

    getGallery$(): Observable<any[]> {
        return this.http.get<any[]>(`http://${this.properties.hostAPI}/api/galleryCountry`);
    }

    addItem$(country: string, imageFile: File): Observable<any> {
        const images = [];
        images.push(imageFile);
        const token = this.authService.token;
        const galleryCountryData = new FormData();
        for (const file of images) {
            galleryCountryData.append('image', file, file.name.split('.')[0]);
        }
        return this.http.patch(`http://${this.properties.hostAPI}/api/galleryCountry/${country}/items`,
            galleryCountryData,
            { headers: { Authorization: token } }
        );
    }

}
