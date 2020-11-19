import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-article-form-p2',
    templateUrl: './article-form-p2.component.html',
    styleUrls: ['./article-form-p2.component.scss']
})
export class ArticleFormP2Component implements OnInit {

    @Input() subparts: any[];
    @Output() submitForm = new EventEmitter<any>();

    currentSubpart: any;
    subpartsForm: FormGroup;

    imageFiles = [];

    currentContentType = [];

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.currentSubpart = this.subparts[0];
        this.initForm();
    }

    initForm() {
        this.subpartsForm = this.formBuilder.group({
            contents: this.formBuilder.array([])
        });
    }

    onSubmit() {
        const formValue = this.subpartsForm.value;
        this.subparts[this.currentSubpart.position - 1].contents = [];
        const contents = this.subparts[this.currentSubpart.position - 1].contents;
        console.log(formValue.contents);
        formValue.contents.forEach(contentValue => {
            if (this.currentContentType[0] === 'image') {
                this.subparts[this.currentSubpart.position - 1].contents.push({
                    position: contents.length + 1,
                    type: 'image',
                    url: contentValue,
                    file: this.imageFiles.find(f => f.subpart.title === this.currentSubpart.title && f.id === contents.length).file
                });
            } else if (this.currentContentType[0] === 'text') {
                this.subparts[this.currentSubpart.position - 1].contents.push({
                    position: contents.length + 1,
                    type: 'text',
                    value: contentValue
                });
            }
            this.currentContentType.shift();
        });
        console.log(this.subparts);
        if (this.isLastSubpart()) {
            this.submitForm.emit();
        } else {
            this.currentSubpart = this.subparts[this.currentSubpart.position];
            this.initForm();
        }
    }

    getContents(): FormArray {
        return this.subpartsForm.get('contents') as FormArray;
    }

    addContent(type: string) {
        this.currentContentType.push(type);
        const newContentControl = this.formBuilder.control(null, Validators.required);
        this.getContents().push(newContentControl);
    }

    isLastSubpart() {
        return this.currentSubpart.position === this.subparts.length;
    }

    detectFiles(event, i) {
        this.imageFiles = this.imageFiles.filter(f => f.subpart.title !== this.currentSubpart.title || f.id !== i);
        this.imageFiles.push({
            file: event.target.files[0],
            subpart: this.currentSubpart,
            id: i
        });
    }

}
