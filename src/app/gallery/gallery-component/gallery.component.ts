import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GalleryService } from '../gallery.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    countries = [];

    selectedItem: any;
    displayImgModal = false;
    displayVideoModal = false;

    modalRef: BsModalRef;
    imageFile: File;

    selectedCountry = '';

    constructor(
        public authService: AuthService,
        public galleryService: GalleryService,
        private modalService: BsModalService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.getGallery();
    }

    getGallery() {
        this.galleryService.getGallery$().subscribe(
            (countries) => {
                this.countries = countries;
            },
            (err) => {
                // TODO handleError
            }
        );
    }

    displayItem(item: any): void {
        this.selectedItem = item;
        if (item.type === 'video') {
            this.displayImgModal = false;
            this.displayVideoModal = true;
        } else {
            this.displayVideoModal = false;
            this.displayImgModal = true;
        }
    }

    emptyCommentValues() {
        this.selectedCountry = '';
        this.imageFile = undefined;
        this.modalRef.hide();
    }

    validateNewComment() {
        this.galleryService.addItem$(this.selectedCountry, this.imageFile).subscribe(
            () => {
                this.getGallery();
                this.notificationService.popToastSuccess();
            },
            (err) => {
                this.notificationService.popToastError();
            }
        );
        this.emptyCommentValues();
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
    }

}
