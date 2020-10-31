// Modules Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules externes

// Components
import { GalleryComponent } from './gallery-component/gallery.component';
import { PictureCardComponent } from './picture-card/picture-card.component';

// Services

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        GalleryComponent,
        PictureCardComponent
    ],
    exports: [
        GalleryComponent
    ],
    providers: []
})
export class GalleryModule { }
