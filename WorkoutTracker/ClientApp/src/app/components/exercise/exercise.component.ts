import { Component, OnInit, Input, Output, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { EventEmitter } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { SetResult } from '../../models/set-result';
import { SetResultService } from '../../services/set-result.service';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { ExerciseSetResultComponent } from '../exercise-set-result/exercise-set-result.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PopperComponent } from '../popper/popper.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  animations: [
    trigger('exerciseDisplay', [
      state('closed', style({
        display: 'none',
      })),
      state('open', style({
        display: 'block'
      })),
      transition('closed => open', [
        animate('0ms')
      ]),
      transition('open => closed', [
        animate('200ms')
      ])
    ]),
    trigger('exerciseHeight', [
      state('closed', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('open', style({
        overflow: 'hidden'
      })),
      transition('closed => open', [
        animate('200ms')
      ]),
      transition('open => closed', [
        animate('200ms')
      ])
    ])
  ]
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  @Output() exerciseDelete: EventEmitter<number> = new EventEmitter();

  @ViewChild('exerciseNameInput', { static: false }) exerciseNameInput: ElementRef;
  @ViewChild(PopperComponent, { static: false }) popperComponent: PopperComponent;
  @ViewChildren(ExerciseSetResultComponent) exerciseSetResultComponents: QueryList<ExerciseSetResultComponent>;

  exerciseName = new FormControl();
  exerciseDescription = new FormControl();

  setResults: SetResult[];
  isCollapsed = true;
  setResultsVisible = 0;
  workoutSessionNameFilter: string = "";
  dateStartFilter: string = "";
  dateEndFilter: string = "";
  weightLowFilter: number = null;
  weightHighFilter: number = null;
  repsCompletedLowFilter: number = null;
  repsCompletedHighFilter: number = null;
  targetRepsLowFilter: number = null;
  targetRepsHighFilter: number = null;
  restTimeLowFilter: number = null;
  restTimeHighFilter: number = null;

  constructor(
    private exerciseService: ExerciseService,
    private setResultService: SetResultService,
    private workoutSessionService: WorkoutSessionService
  ) { }

  ngOnInit() {
    this.getSetResults();
  }

  updateExerciseName(name: string): void {
    if (name.length == 0) {
      this.popperComponent.create(this.exerciseNameInput.nativeElement, 'Enter a valid name.');
      this.exerciseName.setValue(this.exercise.name);
      return;
    }

    this.exercise.name = name;
    this.exerciseService.updateExercise(this.exercise).subscribe();
  }

  updateExerciseDescription(description: string): void {
    console.log(description);
    this.exercise.description = description;
    this.exerciseService.updateExercise(this.exercise).subscribe();
  }

  deleteExercise(): void {
    this.exerciseDelete.emit(this.exercise.id);
  }

  getSetResults(): void {
    this.workoutSessionService.getWorkoutSessions().subscribe(workoutSessions => {
      this.setResultService.getSetResultsWithExerciseId(this.exercise.id).subscribe(setResults => {
        this.setResultsVisible = setResults.length;
        this.setResults = setResults.sort((a, b) => {
          let dateA = workoutSessions.find(ws => ws.id == a.workoutSessionId).date;
          let dateB = workoutSessions.find(ws => ws.id == b.workoutSessionId).date;
          if (dateA == dateB) {
            return (a.order > b.order) ? 1 : -1;
          } else {
            return (dateA > dateB) ? 1 : -1;
          }
        });
      });
    });
  }

  filterSetResults(): void {
    this.setResultsVisible = this.setResults.length;
    this.exerciseSetResultComponents.forEach(esrc => {
      esrc.hidden = false;

      let workoutSessionName = esrc.workoutSession.name.toLowerCase();
      if (workoutSessionName.indexOf(this.workoutSessionNameFilter) == -1) {
        esrc.hidden = true;
      }

      let workoutSessionDate = esrc.workoutSession.date;
      if (this.dateStartFilter && workoutSessionDate < this.dateStartFilter) {
        esrc.hidden = true;
      }
      if (this.dateEndFilter && workoutSessionDate > this.dateEndFilter) {
        esrc.hidden = true;
      }

      if (this.weightLowFilter && esrc.setResult.weight < this.weightLowFilter) {
        esrc.hidden = true;
      }
      if (this.weightHighFilter && esrc.setResult.weight > this.weightHighFilter) {
        esrc.hidden = true;
      }

      if (this.repsCompletedLowFilter && esrc.setResult.repsActual < this.repsCompletedLowFilter) {
        esrc.hidden = true;
      }
      if (this.repsCompletedHighFilter && esrc.setResult.repsActual > this.repsCompletedHighFilter) {
        esrc.hidden = true;
      }

      if (this.targetRepsLowFilter && esrc.setResult.repsTargetLow < this.targetRepsLowFilter) {
        esrc.hidden = true;
      }
      if (this.targetRepsHighFilter && esrc.setResult.repsTargetHigh > this.targetRepsHighFilter) {
        esrc.hidden = true;
      }

      if (this.restTimeLowFilter && esrc.setResult.restTime < this.restTimeLowFilter) {
        esrc.hidden = true;
      }
      if (this.restTimeHighFilter && esrc.setResult.restTime > this.restTimeHighFilter) {
        esrc.hidden = true;
      }

      if (esrc.hidden) {
        this.setResultsVisible -= 1;
      }

    });
  }

  filterSetResultsByWorkoutSessionName(name: string): void {
    this.workoutSessionNameFilter = name.toLowerCase();
    this.filterSetResults();
  }

  filterSetResultsByDateStart(dateStart: string): void {
    this.dateStartFilter = dateStart;
    this.filterSetResults();
  }

  filterSetResultsByDateEnd(dateEnd: string): void {
    this.dateEndFilter = dateEnd;
    this.filterSetResults();
  }

  filterSetResultsByWeightLow(weightLow: number): void {
    this.weightLowFilter = weightLow;
    this.filterSetResults();
  }

  filterSetResultsByWeightHigh(weightHigh: number): void {
    this.weightHighFilter = weightHigh;
    this.filterSetResults();
  }

  filterSetResultsByRepsCompletedLow(repsCompletedLow: number): void {
    this.repsCompletedLowFilter = repsCompletedLow;
    this.filterSetResults();
  }

  filterSetResultsByRepsCompletedHigh(repsCompletedHigh: number): void {
    this.repsCompletedHighFilter = repsCompletedHigh;
    this.filterSetResults();
  }

  filterSetResultsByTargetRepsLow(targetRepsLow: number): void {
    this.targetRepsLowFilter = targetRepsLow;
    this.filterSetResults();
  }

  filterSetResultsByTargetRepsHigh(targetRepsHigh: number): void {
    this.targetRepsHighFilter = targetRepsHigh;
    this.filterSetResults();
  }

  filterSetResultsByRestTimeLow(restTimeLow: number): void {
    this.restTimeLowFilter = restTimeLow;
    this.filterSetResults();
  }

  filterSetResultsByRestTimeHigh(restTimeHigh: number): void {
    this.restTimeHighFilter = restTimeHigh;
    this.filterSetResults();
  }

}
