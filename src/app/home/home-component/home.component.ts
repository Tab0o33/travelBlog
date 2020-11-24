import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HomeService } from '../home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    comments = [];

    newComment = { pseudo: '', message: '', parentComment: null };

    introMessage$: Observable<string>;

    modalRef: BsModalRef;

    constructor(
        private authService: AuthService,
        private homeService: HomeService,
        private notificationService: NotificationService,
        private modalService: BsModalService
    ) { }

    ngOnInit(): void {
        this.introMessage$ = this.homeService.getIntroMessage$();
        this.homeService.getHomeComments$().subscribe(
            (comments) => {
                this.comments = comments;
            },
            (err) => {
                // TODO : handle error
                console.log(err);
            }
        );
    }

    validateNewComment() {
        const newComment = {
            pseudo: this.newComment.pseudo,
            message: this.newComment.message,
            postDate: new Date(),
            isAdminPost: this.authService.isLoggedIn()
        };
        if (this.newComment.parentComment) {
            this.postSubComment(newComment);
        } else {
            this.postHomeComment(newComment);
        }
        setTimeout(() => {
            this.emptyCommentValues();
        }, 50);
    }

    postSubComment(newComment: any) {
        const parentComment = this.comments.filter(c => c === this.newComment.parentComment)[0];
        const currentCommentSubComments = parentComment.subComments;
        const newSubComment = {
            ...newComment,
            position: currentCommentSubComments.length + 1
        };
        this.homeService.addSubComments$(parentComment.id, newSubComment).subscribe(
            () => {
                this.notificationService.popToastSuccess();
                currentCommentSubComments.push(newSubComment);
            },
            (err) => {
                this.notificationService.popToastError();
            }
        );
    }


    postHomeComment(newComment: any) {
        this.homeService.postHomeComment$(newComment).subscribe(
            () => {
                this.notificationService.popToastSuccess();
                this.comments.push(newComment);
            },
            (err) => {
                this.notificationService.popToastError();
            }
        );
    }

    emptyCommentValues() {
        this.newComment.pseudo = '';
        this.newComment.message = '';
        this.newComment.parentComment = null;
        this.modalRef.hide();
    }

    sortBy(objArray: any[], property: string) {
        return objArray.sort((a, b) => b[property] > a[property] ? 1 : b[property] === a[property] ? 0 : -1);
    }

    openModal(template: TemplateRef<any>, comment = null) {
        this.newComment.parentComment = comment ? comment : null;
        this.modalRef = this.modalService.show(template);
    }

}
