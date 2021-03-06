import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-workout-session-list',
  templateUrl: './workout-session-list.component.html',
  styleUrls: ['./workout-session-list.component.css']
})
export class WorkoutSessionListComponent implements OnInit {

  @ViewChildren(WorkoutSessionComponent) workoutSessionComponents: QueryList<WorkoutSessionComponent>;

  newWorkoutSessionName = new FormControl(null);
  newWorkoutSessionDate = new FormControl('');

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

    if (workoutPlan == null) {
      workoutPlanName = "New Workout Session";
    }

    this.workoutSessionService.addWorkoutSession(new WorkoutSession(workoutPlanName, workoutSessionDate))
      .subscribe(ws => {
        this.workoutSessions.push(ws);
        this.setPlanService.getSetPlansWithWorkoutPlanId(workoutPlan.id)
          .subscribe(setPlans => {
            let workoutSessionComponent = this.workoutSessionComponents.last;
            setPlans.forEach(setPlan => workoutSessionComponent.addSetResultFromSetPlan(setPlan));
          })
        this.newWorkoutSessionName.setValue(null);
        this.newWorkoutSessionDate.setValue('');
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
      .subscribe(e => {
        this.exercises = e.sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
  }

}
