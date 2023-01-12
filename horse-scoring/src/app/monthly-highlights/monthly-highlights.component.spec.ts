import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHighlightsComponent } from './monthly-highlights.component';

describe('MonthlyHighlightsComponent', () => {
  let component: MonthlyHighlightsComponent;
  let fixture: ComponentFixture<MonthlyHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyHighlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
