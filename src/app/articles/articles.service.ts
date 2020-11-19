import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { AuthService } from '../home/auth.service';
import { Properties } from '../services/properties.service';

@Injectable()
export class ArticlesService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private properties: Properties
    ) { }

    getAllArticlesByCountry$(country: string): Observable<any[]> {
        return this.http.get<any[]>(`http://${this.properties.hostAPI}/api/article/country/${country}`);
    }

    getAllArticlesByCountryMock$(country: string): Observable<any[]> {
        const articles = [
            {
                country: 'colombie',
                position: 1,
                name: 'Bogota',
                firstDay: '21/10/2020',
                lastDay: '26/10/2020',
                imageUrl: 'colombie-map.png',
                imageAlt: 'colombie',
                subparts: [
                    {
                        position: 1,
                        title: 'le centre-ville',
                        contents: [
                            {
                                position: 1,
                                type: 'text',
                                value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                            },
                            {
                                position: 2,
                                type: 'image',
                                url: 'bogota.jpg',
                                alt: 'bogota',
                                caption: 'Centre-ville de Bogota'
                            },
                            {
                                position: 3,
                                type: 'text',
                                value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum since thinter toimply dummy text of the printing andimply dummy text of the printing and typesetting industry. Lor typesetting industry. Lorok a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                            },
                            {
                                position: 4,
                                type: 'video',
                                url: 'bresil.mp4',
                                alt: 'bogota',
                                caption: 'ballade en quad'
                            },
                            {
                                position: 3,
                                type: 'text',
                                value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum since thinter toimply dummy text of the printing andimply dummy text of the printing and typesetting industry. Lor typesetting industry. Lorok a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                            }
                        ]
                    }
                ]
            },
            {
                country: 'colombie',
                position: 1,
                name: 'villa de leyva',
                firstDay: '21/10/2020',
                lastDay: '26/10/2020',
                imageUrl: 'colombie-map.png',
                imageAlt: 'colombie',
                subparts: [
                    {
                        position: 1,
                        title: '2 jours à la plage',
                        contents: [
                            {
                                position: 1,
                                type: 'image',
                                url: 'villaDeLeyva.jpg',
                                alt: 'villaDeLeyva',
                                caption: 'arrivé à Villa De Leyva'
                            },
                            {
                                position: 2,
                                type: 'text',
                                value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                            },
                            {
                                position: 3,
                                type: 'video',
                                url: 'bresil.mp4',
                                alt: 'bogota',
                                caption: 'ballade en quad'
                            },
                            {
                                position: 4,
                                type: 'text',
                                value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum since thinter toimply dummy text of the printing andimply dummy text of the printing and typesetting industry. Lor typesetting industry. Lorok a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                            }
                        ]
                    }
                ]
            }];
        return of(country === 'colombie' ? articles : []);
    }

    postNewArticle$(articleInfo: any, image: File, contentImages: File[]): Observable<any> {
        const token = this.authService.token;
        const articleData = new FormData();
        articleData.append('article', JSON.stringify(articleInfo));
        articleData.append('image', image, articleInfo.name);
        for (const file of contentImages) {
            articleData.append('image', file, file.name.split('.')[0]);
        }
        return this.http.post(`http://${this.properties.hostAPI}/api/article`,
            articleData,
            { headers: { Authorization: token } }
        );
    }
}
