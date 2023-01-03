import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePastGameComponent } from './single-past-game.component';

describe('SinglePastGameComponent', () => {
  let component: SinglePastGameComponent;
  let fixture: ComponentFixture<SinglePastGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePastGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePastGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
