import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { WorkoutSession } from '../../models/workout-session';
import { DateService } from '../../services/date.service';
import { EventEmitter } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { SetResultService } from '../../services/set-result.service';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { Exercise } from '../../models/exercise';
import { SetPlan } from '../../models/set-plan';
import { FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css', './../workout-session-list/workout-session-list.component.css', './../set-result/set-result.component.css'],
  animations: [
    trigger('workoutSessionDisplay', [
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
    trigger('workoutSessionHeight', [
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
export class WorkoutSessionComponent implements OnInit {

  @Input() workoutSession: WorkoutSession;
  @Input() exercises: Exercise[];

  @Output() workoutSessionDelete: EventEmitter<number> = new EventEmitter();

  @ViewChild('nameInput') nameInput;
  @ViewChild('dateInput') dateInput;
  @ViewChild('exerciseInput') exerciseInput;
  @ViewChild('repsTargetLowInput') repsTargetLowInput;
  @ViewChild('repsTargetHighInput') repsTargetHighInput;
  @ViewChild('restTimeInput') restTimeInput;
  @ViewChild('weightInput') weightInput;
  @ViewChild('repsActualInput') repsActualInput;
  @ViewChild(PopperComponent) popperComponent: PopperComponent;

  workoutSessionForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl('')
  });

  setResultForm = new FormGroup({
    exercise: new FormControl(null),
    repsTargetLow: new FormControl('0'),
    repsTargetHigh: new FormControl('0'),
    toFailure: new FormControl(false),
    weight: new FormControl('0'),
    restTime: new FormControl('0'),
    repsActual: new FormControl('0')
  });

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
    if (name == "") {
      this.popperComponent.create(this.nameInput.nativeElement, 'Enter a valid name.');
      this.workoutSessionForm.controls['name'].setValue(this.workoutSession.name);
      return;
    }

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

  addSetResult(exerciseString: string, weightString: string, repsActualString: string,
    repsTargetLowString: string, repsTargetHighString: string, toFailure: boolean,
    restTimeString: string): void {

    let order = this.setResults.length + 1;

    let exercise = this.exercises.find(e => e.name == exerciseString);
    if (exercise == null) {
      this.popperComponent.create(this.exerciseInput.nativeElement, 'Select an exercise.');
      return;
    }

    let weight = parseInt(weightString);
    if (isNaN(weight) || weight < 0 || weight > 999) {
      this.popperComponent.create(this.weightInput.nativeElement, 'Enter a value between 0-999.');
      return;
    }

    let repsActual = parseInt(repsActualString);
    if (isNaN(repsActual) || repsActual < 0 || repsActual > 99) {
      this.popperComponent.create(this.repsActualInput.nativeElement, 'Enter a value between 0-99.');
      return;
    }

    let repsTargetLow = parseInt(repsTargetLowString);
    if (isNaN(repsTargetLow) || repsTargetLow < 0 || repsTargetLow > 99) {
      this.popperComponent.create(this.repsTargetLowInput.nativeElement, 'Enter a value between 0-99.');
      return;
    }

    let repsTargetHigh = parseInt(repsTargetHighString);
    if (isNaN(repsTargetHigh) || repsTargetHigh < 0 || repsTargetHigh > 99) {
      this.popperComponent.create(this.repsTargetHighInput.nativeElement, 'Enter a value between 0-99.');
      return;
    }

    if (repsTargetLow > repsTargetHigh) {
      this.popperComponent.create(this.repsTargetLowInput.nativeElement, 'Enter a valid range.');
      return;
    }

    let restTime = parseInt(restTimeString);
    if (isNaN(restTime) || restTime < 0 || restTime > 999) {
      this.popperComponent.create(this.restTimeInput.nativeElement, 'Enter a value between 0-999.');
      return;
    }

    let setResult = new SetResult(order, weight, repsActual, repsTargetLow,
      repsTargetHigh, toFailure, restTime, this.workoutSession.id, exercise.id);

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
    this.setResultForm.controls['exercise'].setValue(null);
    this.setResultForm.controls['repsTargetLow'].setValue('0');
    this.setResultForm.controls['repsTargetHigh'].setValue('0');
    this.setResultForm.controls['toFailure'].setValue(false);
    this.setResultForm.controls['weight'].setValue('0');
    this.setResultForm.controls['restTime'].setValue('0');
    this.setResultForm.controls['repsActual'].setValue('0');
  }

  toggleNewSetToFailure(toFailure: boolean): void {
    if (toFailure) {
      this.setResultForm.controls['repsTargetLow'].setValue('0');
      this.setResultForm.controls['repsTargetLow'].disable();
      this.setResultForm.controls['repsTargetHigh'].setValue('0');
      this.setResultForm.controls['repsTargetHigh'].disable();
    } else {
      this.setResultForm.controls['repsTargetLow'].enable();
      this.setResultForm.controls['repsTargetHigh'].enable();
    }
  }

  dateToShortFormat(isoString: string): string {
    return this.dateService.toShortFormat(isoString);
  }

}
