import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { SetResultService } from '../../services/set-result.service';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SetPlan } from '../../models/set-plan';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-set-result',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.css', './../workout-session-list/workout-session-list.component.css']
})
export class SetResultComponent implements OnInit {

  @Input() setResult: SetResult;
  @Input() exercises: Exercise[];
  @Input() workoutSessionLength: number;

  @Output() setResultUpdateOrder: EventEmitter<{ setResultId: number, order: number }> = new EventEmitter();
  @Output() setResultDelete: EventEmitter<number> = new EventEmitter();
  @Output() setResultDuplicate: EventEmitter<SetResult> = new EventEmitter();

  @ViewChild('setNumberInput', { static: false }) setNumberInput;
  @ViewChild('repsTargetLowInput', { static: false }) repsTargetLowInput;
  @ViewChild('repsTargetHighInput', { static: false }) repsTargetHighInput;
  @ViewChild('restTimeInput', { static: false }) restTimeInput;
  @ViewChild('weightInput', { static: false }) weightInput;
  @ViewChild('repsActualInput', { static: false }) repsActualInput;
  @ViewChild(PopperComponent, { static: false }) popperComponent: PopperComponent;

  setResultForm = new FormGroup({
    setNumber: new FormControl(),
    repsTargetLow: new FormControl(),
    repsTargetHigh: new FormControl(),
    weight: new FormControl(),
    restTime: new FormControl(),
    repsActual: new FormControl()
  });

  currentExercise: Exercise;

  constructor(private setResultService: SetResultService) { }

  ngOnInit() {
    this.currentExercise = this.exercises.find(e => e.id == this.setResult.exerciseId);
    this.toggleToFailure(this.setResult.toFailure);
  }

  duplicateSetResult(): void {
    this.setResultDuplicate.emit(this.setResult);
  }

  updateSetResultExerciseId(exerciseName: string): void {
    this.setResult.exerciseId = this.exercises.find(e => e.name == exerciseName).id;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultOrder(orderString: string): void {
    let order = parseInt(orderString);
    if (!orderString || order < 1 || order > this.workoutSessionLength) {
      this.popperComponent.create(this.setNumberInput.nativeElement, `Enter a value between 1-${this.workoutSessionLength}.`);
      this.setResultForm.controls['setNumber'].setValue(this.setResult.order);
      return;
    }
    this.setResultUpdateOrder.emit({ setResultId: this.setResult.id, order: order });
  }

  updateSetResultWeight(weightString: string): void {
    let weight = parseInt(weightString);
    if (isNaN(weight) || weight < 0 || weight > 999) {
      this.popperComponent.create(this.weightInput.nativeElement, 'Enter a value between 0-999.');
      this.setResultForm.controls['weight'].setValue(this.setResult.weight);
      return;
    }
    this.setResult.weight = weight;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsActual(repsActualString: string): void {
    let repsActual = parseInt(repsActualString);
    if (isNaN(repsActual) || repsActual < 0 || repsActual > 99) {
      this.popperComponent.create(this.repsActualInput.nativeElement, 'Enter a value between 0-99.');
      this.setResultForm.controls['repsActual'].setValue(this.setResult.repsActual);
      return;
    }
    this.setResult.repsActual = repsActual;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsTargetLow(repsTargetLowString: string): void {
    let repsTargetLow = parseInt(repsTargetLowString);
    if (isNaN(repsTargetLow) || repsTargetLow < 0 || repsTargetLow > 99) {
      this.popperComponent.create(this.repsTargetLowInput.nativeElement, 'Enter a value between 0-99.');
      this.setResultForm.controls['repsTargetLow'].setValue(this.setResult.repsTargetLow);
      return;
    }
    if (repsTargetLow > this.setResult.repsTargetHigh) {
      this.setResult.repsTargetHigh = repsTargetLow;
    }
    this.setResult.repsTargetLow = repsTargetLow;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsTargetHigh(repsTargetHighString: string): void {
    let repsTargetHigh = parseInt(repsTargetHighString);
    if (isNaN(repsTargetHigh) || repsTargetHigh < 0 || repsTargetHigh > 99) {
      this.popperComponent.create(this.repsTargetHighInput.nativeElement, 'Enter a value between 0-99.');
      this.setResultForm.controls['repsTargetHigh'].setValue(this.setResult.repsTargetHigh);
      return;
    }
    if (repsTargetHigh < this.setResult.repsTargetLow) {
      this.setResult.repsTargetLow = repsTargetHigh;
    }
    this.setResult.repsTargetHigh = repsTargetHigh;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultToFailure(toFailure: boolean): void {
    this.setResult.toFailure = toFailure;
    this.toggleToFailure(toFailure);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRestTime(restTimeString: string): void {
    let restTime = parseInt(restTimeString);
    if (isNaN(restTime) || restTime < 0 || restTime > 999) {
      this.popperComponent.create(this.restTimeInput.nativeElement, 'Enter a value between 0-999.');
      this.setResultForm.controls['restTime'].setValue(this.setResult.restTime);
      return;
    }
    this.setResult.restTime = restTime;
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  deleteSetResult(): void {
    this.setResultDelete.emit(this.setResult.id);
  }

  toggleToFailure(toFailure: boolean) {
    if (toFailure) {
      this.setResultForm.controls['repsTargetLow'].disable();
      this.setResultForm.controls['repsTargetHigh'].disable();
    } else {
      this.setResultForm.controls['repsTargetLow'].enable();
      this.setResultForm.controls['repsTargetHigh'].enable();
    }
  }

}
