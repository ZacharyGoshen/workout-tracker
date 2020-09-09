import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutPlan } from '../../models/workout-plan';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { SetResultService } from '../../services/set-result.service';
import { SetPlanService } from '../../services/set-plan.service';
import { SetResult } from '../../models/set-result';
import { forkJoin } from 'rxjs';
import { WorkoutSessionComponent } from '../workout-session/workout-session.component';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-workout-session-list',
  templateUrl: './workout-session-list.component.html',
  styleUrls: ['./workout-session-list.component.css']
})
export class WorkoutSessionListComponent implements OnInit {

  workoutSessions: WorkoutSession[];
  workoutPlans: WorkoutPlan[];
  exercises: Exercise[];

  constructor(
    private workoutSessionService: WorkoutSessionService,
    private workoutPlanService: WorkoutPlanService,
    private exerciseService: ExerciseService,
    private setPlanService: SetPlanService,
    private setResultService: SetResultService
  ) { }

  ngOnInit() {
    this.getWorkoutSessions();
    this.getWorkoutPlans();
    this.getExercises();
  }

  getWorkoutSessions(): void {
    this.workoutSessionService.getWorkoutSessions()
      .subscribe(workoutSessions => this.workoutSessions = workoutSessions);
  }

  addWorkoutSession(workoutSessionDate: string, workoutPlanName: string): void {
    let workoutPlan = this.workoutPlans.find(wp => wp.name == workoutPlanName);

    let workoutSession = this.workoutSessionService.addWorkoutSession(new WorkoutSession(workoutSessionDate));
    let setPlans = this.setPlanService.getSetPlansWithWorkoutPlanId(workoutPlan.id);

    forkJoin([workoutSession, setPlans]).subscribe(results => {
      results[1].forEach(setPlan => {
        let setResult = new SetResult(setPlan.order, 0, setPlan.reps, setPlan.restTime, results[0].id, setPlan.exerciseId);
        this.setResultService.addSetResult(setResult).subscribe();
      });
    });
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

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(e => this.exercises = e);
  }

}
