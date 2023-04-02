import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPastGamesComponent } from './month-past-games.component';

describe('MonthPastGamesComponent', () => {
  let component: MonthPastGamesComponent;
  let fixture: ComponentFixture<MonthPastGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPastGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthPastGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
