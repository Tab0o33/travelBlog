import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlePageComponent } from './add-article-page.component';

describe('AddArticlePageComponent', () => {
  let component: AddArticlePageComponent;
  let fixture: ComponentFixture<AddArticlePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticlePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
