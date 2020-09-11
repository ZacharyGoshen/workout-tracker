import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSetResultComponent } from './exercise-set-result.component';

describe('ExerciseSetResultComponent', () => {
  let component: ExerciseSetResultComponent;
  let fixture: ComponentFixture<ExerciseSetResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseSetResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
