import { NgModule } from '@angular/core';

import { GalleryModule } from './gallery/gallery.module';
import { HomeModule } from './home/home.module';
import { SummaryModule } from './summary/sumary.module';

@NgModule({
    exports: [
        SummaryModule,
        GalleryModule,
        HomeModule
    ]
})
export class ComponentModule { }
