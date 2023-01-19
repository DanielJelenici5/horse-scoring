import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMonthlyHighlightComponent } from './single-monthly-highlight.component';

describe('SingleMonthlyHighlightComponent', () => {
  let component: SingleMonthlyHighlightComponent;
  let fixture: ComponentFixture<SingleMonthlyHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMonthlyHighlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMonthlyHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
