import { Component } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

    items = [
        { type: 'picture', name: 'bogota.jpg', alt: 'Bogotá' },
        { type: 'picture', name: 'villaDeLeyva.jpg', alt: 'Villa de Leyva' },
        { type: 'picture', name: 'guatape.jpg', alt: 'Guatapé' },
        { type: 'picture', name: 'salento.jpg', alt: 'Salento' },
        { type: 'picture', name: 'bogota.jpg', alt: 'Bogotá' },
        { type: 'picture', name: 'villaDeLeyva.jpg', alt: 'Villa de Leyva' },
        { type: 'video', name: 'captureVideo.png', alt: 'captureVideo', image: 'CaptureVideo2.jpg' },
        { type: 'picture', name: 'salento.jpg', alt: 'Salento' },
    ];

    selectedItem: any;
    isModalOpen = false;

    constructor() { }

    displayItem(item: any): void {
        this.selectedItem = item;
        this.isModalOpen = true;
    }

}
