import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardFormComponent } from './summary-card-form.component';

describe('SummaryCardFormComponent', () => {
  let component: SummaryCardFormComponent;
  let fixture: ComponentFixture<SummaryCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
