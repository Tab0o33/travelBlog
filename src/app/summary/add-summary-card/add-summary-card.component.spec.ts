import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSummaryCardComponent } from './add-summary-card.component';

describe('AddSummaryCardComponent', () => {
  let component: AddSummaryCardComponent;
  let fixture: ComponentFixture<AddSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
