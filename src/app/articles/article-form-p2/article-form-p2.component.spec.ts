import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormP2Component } from './article-form-p2.component';

describe('ArticleFormP2Component', () => {
  let component: ArticleFormP2Component;
  let fixture: ComponentFixture<ArticleFormP2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFormP2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
