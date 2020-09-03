import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutPlan } from '../../models/workout-plan';
import { WorkoutPlanService } from '../../services/workout-plan.service';

@Component({
  selector: 'app-workout-session-list',
  templateUrl: './workout-session-list.component.html',
  styleUrls: ['./workout-session-list.component.css']
})
export class WorkoutSessionListComponent implements OnInit {

  workoutSessions: WorkoutSession[];
  workoutPlans: WorkoutPlan[];

  constructor(
    private workoutSessionService: WorkoutSessionService,
    private workoutPlanService: WorkoutPlanService
  ) { }

  ngOnInit() {
    this.getWorkoutSessions();
    this.getWorkoutPlans();
  }

  getWorkoutSessions(): void {
    this.workoutSessionService.getWorkoutSessions()
      .subscribe(workoutSessions => this.workoutSessions = workoutSessions);
  }

  addWorkoutSession(workoutSessionDate: string, workoutPlanName: string): void {
    let workoutPlan = this.workoutPlans.find(wp => wp.name == workoutPlanName);
    let workoutSession = new WorkoutSession(
      workoutSessionDate,
      workoutPlan.id
    );
    this.workoutSessionService.addWorkoutSession(workoutSession)
      .subscribe(ws => this.workoutSessions.push(ws));
  }

  deleteWorkoutSession(workoutSessionId: number): void {
    this.workoutSessions = this.workoutSessions
      .filter(ws => ws.id != workoutSessionId);
    this.workoutSessionService.deleteWorkoutSession(workoutSessionId)
      .subscribe();
  }

  getWorkoutPlans(): void {
    this.workoutPlanService.getWorkoutPlans()
      .subscribe(workoutPlans => this.workoutPlans = workoutPlans);
  }

}
