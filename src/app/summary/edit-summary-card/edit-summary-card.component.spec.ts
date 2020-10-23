import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSummaryCardComponent } from './edit-summary-card.component';

describe('EditSummaryCardComponent', () => {
  let component: EditSummaryCardComponent;
  let fixture: ComponentFixture<EditSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
