import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSessionComponent } from './workout-session.component';

describe('WorkoutSessionComponent', () => {
  let component: WorkoutSessionComponent;
  let fixture: ComponentFixture<WorkoutSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
