import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPlanComponent } from './set-plan.component';

describe('SetPlanComponent', () => {
  let component: SetPlanComponent;
  let fixture: ComponentFixture<SetPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
