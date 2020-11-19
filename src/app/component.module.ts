import { NgModule } from '@angular/core';
import { ArticlesModule } from './articles/articles.module';

import { GalleryModule } from './gallery/gallery.module';
import { HomeModule } from './home/home.module';
import { SummaryModule } from './summary/sumary.module';

@NgModule({
    exports: [
        SummaryModule,
        GalleryModule,
        HomeModule,
        ArticlesModule
    ]
})
export class ComponentModule { }
