import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFinalScoreComponent } from './save-final-score.component';

describe('SaveFinalScoreComponent', () => {
  let component: SaveFinalScoreComponent;
  let fixture: ComponentFixture<SaveFinalScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveFinalScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveFinalScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
