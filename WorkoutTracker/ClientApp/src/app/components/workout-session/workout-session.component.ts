import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutSession } from '../../models/workout-session';
import { DateService } from '../../services/date.service';
import { EventEmitter } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { SetResultService } from '../../services/set-result.service';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { Exercise } from '../../models/exercise';
import { SetPlan } from '../../models/set-plan';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css', './../workout-session-list/workout-session-list.component.css', './../set-result/set-result.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  @Input() workoutSession: WorkoutSession;
  @Input() exercises: Exercise[];

  @Output() workoutSessionDelete: EventEmitter<number> = new EventEmitter();

  newSetResultExerciseName = new FormControl(null);
  newSetResultWeight = new FormControl('');
  newSetResultRepsActual = new FormControl('');
  newSetResultRepsTargetLow = new FormControl('');
  newSetResultRepsTargetHigh = new FormControl('');
  newSetResultToFailure = new FormControl(false);
  newSetResultRestTime = new FormControl('');

  setResults: SetResult[];
  isCollapsed = true;

  constructor(
    private dateService: DateService,
    private workoutSessionService: WorkoutSessionService,
    private setResultService: SetResultService
  ) { }

  ngOnInit() {
    this.getSetResults();
  }

  updateWorkoutSessionName(name: string): void {
    this.workoutSession.name = name;
    this.workoutSessionService.updateWorkoutSession(this.workoutSession).subscribe();
  }

  updateWorkoutSessionDate(date: string): void {
    this.workoutSession.date = date;
    this.workoutSessionService.updateWorkoutSession(this.workoutSession).subscribe();
  }

  deleteWorkoutSession(): void {
    this.workoutSessionDelete.emit(this.workoutSession.id);
  }

  getSetResults(): void {
    this.setResultService.getSetResultsWithWorkoutSessionId(this.workoutSession.id)
      .subscribe(sr => {
        let sortedSetResults = sr.sort((a, b) => (a.order > b.order) ? 1 : -1);
        this.setResults = sortedSetResults;
      });
  }

  addSetResult(exerciseName: string, weight: string, repsActual: string,
    repsTargetLow: string, repsTargetHigh: string, toFailure: boolean,
    restTime: string): void {
    let exercise = this.exercises.find(e => e.name == exerciseName);
    let order = this.setResults.length + 1;
    let setResult = new SetResult(order, parseInt(weight), parseInt(repsActual),
      parseInt(repsTargetLow), parseInt(repsTargetHigh), toFailure,
      parseInt(restTime), this.workoutSession.id, exercise.id);
    this.setResultService.addSetResult(setResult).subscribe(sr => {
      this.setResults.push(sr);
      this.clearNewSetResultForm();
    });
  }

  addSetResultFromSetPlan(setPlan: SetPlan): void {
    let setResult = new SetResult(setPlan.order, 0, 0, setPlan.repsTargetLow,
      setPlan.repsTargetHigh, setPlan.toFailure, setPlan.restTime,
      this.workoutSession.id, setPlan.exerciseId);
    this.setResultService.addSetResult(setResult).subscribe(sr => {
      this.setResults.push(sr);
      this.setResults = this.setResults.sort((a, b) => (a.order > b.order) ? 1 : -1);
    });
  }

  duplicateSetResult(setResult: SetResult): void {
    let duplicate = { ...setResult };
    delete duplicate.id;
    duplicate.order = this.setResults.length + 1;
    this.setResultService.addSetResult(duplicate).subscribe(sr => this.setResults.push(sr));
  }

  updateSetResultOrder(setResultId: number, order: number): void {
    let setResult = this.setResults.find(sr => sr.id == setResultId);
    let setResultsToUpdate = [];
    let orderOffset = 0;
    if (order > setResult.order) {
      setResultsToUpdate = this.setResults.filter(sr => sr.order > setResult.order && sr.order <= order);
      orderOffset = -1;
    } else {
      setResultsToUpdate = this.setResults.filter(sr => sr.order < setResult.order && sr.order >= order);
      orderOffset = 1;
    }

    setResultsToUpdate.forEach(sr => {
      sr.order = sr.order + orderOffset;
      this.setResultService.updateSetResult(sr).subscribe();
    });

    setResult.order = order;
    this.setResultService.updateSetResult(setResult).subscribe();

    this.setResults = this.setResults.sort((a, b) => (a.order > b.order) ? 1 : -1);
  }

  deleteSetResult(setResultId: number): void {
    let setResultOrder = this.setResults.find(sr => sr.id == setResultId).order;
    let setResultsToUpdate = this.setResults.filter(sr => sr.order > setResultOrder);
    setResultsToUpdate.forEach(sr => {
      sr.order = sr.order - 1;
      this.setResultService.updateSetResult(sr).subscribe();
    });

    this.setResults = this.setResults.filter(sr => sr.id != setResultId);
    this.setResultService.deleteSetResult(setResultId).subscribe();
  }

  clearNewSetResultForm(): void {
    this.newSetResultExerciseName.setValue(null);
    this.newSetResultWeight.setValue('');
    this.newSetResultRepsActual.setValue('');
    this.newSetResultRepsTargetLow.setValue('');
    this.newSetResultRepsTargetHigh.setValue('');
    this.newSetResultToFailure.setValue(false);
    this.newSetResultRestTime.setValue('');
  }

  toggleNewSetToFailure(toFailure: boolean): void {
    if (toFailure) {
      this.newSetResultRepsTargetLow.setValue('');
      this.newSetResultRepsTargetLow.disable();

      this.newSetResultRepsTargetHigh.setValue('');
      this.newSetResultRepsTargetHigh.disable();
    } else {
      this.newSetResultRepsTargetLow.enable();
      this.newSetResultRepsTargetHigh.enable();
    }
  }

  dateToShortFormat(isoString: string): string {
    return this.dateService.toShortFormat(isoString);
  }

}
