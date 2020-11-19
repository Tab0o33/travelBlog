import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ArticlesService } from '../articles.service';

@Component({
    selector: 'app-add-article-page',
    templateUrl: './add-article-page.component.html',
    styleUrls: ['./add-article-page.component.scss']
})
export class AddArticlePageComponent implements OnInit {

    step = 1;
    article: any;

    imageFiles = [];

    constructor(
        private articlesService: ArticlesService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit(): void {
    }

    createArticleFirstPart(event: any): void {
        this.article = event;
        this.article.values.firstDay = this.mapDateInString(this.article.values.firstDay);
        this.article.values.lastDay = this.mapDateInString(this.article.values.lastDay);
        this.step = 2;
    }

    addNewArticle(article: any): void {
        for (const subpart of article.values.subparts) {
            for (const content of subpart.contents) {
                if (content.type === 'image') {
                    this.imageFiles.push(content.file);
                    content.name = content.file.name.split('.')[0];
                    delete content.file;
                }
            }
        }
        const postNewArticle$ = this.articlesService.postNewArticle$(article.values, article.imageFile, this.imageFiles);
        postNewArticle$.subscribe(
            () => {
                this.router.navigate([`/countries/${article.country}`]);
                this.notificationService.popToastSuccess();
            },
            () => {
                this.notificationService.popToastError();
            }
        );
    }

    private mapDateInString(travelDate: Date): string {
        const dd = String(travelDate.getDate()).padStart(2, '0');
        const mm = String(travelDate.getMonth() + 1).padStart(2, '0');
        const yyyy = travelDate.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }

}
