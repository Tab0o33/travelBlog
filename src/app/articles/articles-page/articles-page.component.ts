import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { ArticlesService } from '../articles.service';

@Component({
    selector: 'app-articles-page',
    templateUrl: './articles-page.component.html',
    styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

    articles$: Observable<any[]>;
    articles: any[];
    routeId: number;
    routeCountry: string;
    pagination = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articlesService: ArticlesService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.validateRouteParams();
        this.articles$ = this.getAllArticlesByCountry$(this.routeCountry);
        this.articles$.subscribe(
            (articles: any[]) => {
                this.articles = articles;
                this.pagination = this.getPagination(articles);
            }
        );
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                window.scroll(0, 0);
                this.validateRouteParams();
                this.pagination = this.getPagination(this.articles);
            }
        });
    }

    getAllArticlesByCountry$(country: string): Observable<any[]> {
        return this.articlesService.getAllArticlesByCountry$(country);
    }

    validateRouteParams() {
        this.routeCountry = this.route.snapshot.params.country;
        this.routeId = +this.route.snapshot.params.id;
        if (this.routeId === undefined || isNaN(this.routeId) || this.routeId < 1) {
            this.router.navigate([`countries/${this.routeCountry}/1`]);
        }
    }

    goToNewArticleForm(): void {
        this.router.navigate([`countries/new`]);
    }

    getPagination(articles: any[]): number[] {
        const pagination = [];
        articles.forEach(article => {
            pagination.push(pagination.length + 1);
        });
        if (pagination.length < 6) {
            return pagination;
        } else {
            switch (this.routeId) {
                case 1:
                    return [this.routeId + 1];
                case 2:
                    return [this.routeId, this.routeId + 1];
                case pagination.length - 1:
                    return [this.routeId - 1, this.routeId];
                case pagination.length:
                    return [this.routeId - 1];
                default:
                    return [this.routeId - 1, this.routeId, this.routeId + 1];

            }
        }

    }

}
