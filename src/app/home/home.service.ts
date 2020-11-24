import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Properties } from '../services/properties.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private http: HttpClient,
        private properties: Properties
    ) { }

    getIntroMessage$(): Observable<string> {
        return this.http.get<string>(`http://${this.properties.hostAPI}/api/home/introduction`);
    }

    getHomeComments$(): Observable<any[]> {
        return this.http.get<any[]>(`http://${this.properties.hostAPI}/api/home/comment`);
    }

    postHomeComment$(newComment: any): Observable<any> {
        return this.http.post(`http://${this.properties.hostAPI}/api/home/comment`, newComment);
    }

    addSubComments$(parentCommentId: any, subComment: any): Observable<any> {
        return this.http.patch(`http://${this.properties.hostAPI}/api/home/comment/${parentCommentId}/subComments`, subComment);
    }
}
