import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutPlan } from '../../models/workout-plan';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { DateService } from '../../services/date.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  @Input() workoutSession: WorkoutSession;

  @Output() workoutSessionDelete: EventEmitter<number> = new EventEmitter();

  workoutPlan: WorkoutPlan;

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.getWorkoutPlan();
  }

  getWorkoutPlan(): void {
    this.workoutPlanService
      .getWorkoutPlanById(this.workoutSession.workoutPlanId)
      .subscribe(workoutPlan => this.workoutPlan = workoutPlan);
  }

  deleteWorkoutSession(): void {
    this.workoutSessionDelete.emit(this.workoutSession.id);
  }

  dateToShortFormat(isoString: string): string {
    return this.dateService.toShortFormat(isoString);
  }

}
