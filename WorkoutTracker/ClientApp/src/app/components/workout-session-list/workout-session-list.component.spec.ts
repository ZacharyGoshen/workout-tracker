import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSessionListComponent } from './workout-session-list.component';

describe('WorkoutSessionListComponent', () => {
  let component: WorkoutSessionListComponent;
  let fixture: ComponentFixture<WorkoutSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutSessionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
