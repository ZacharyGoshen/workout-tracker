import { Component, OnInit, Input, Output } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { SetResultService } from '../../services/set-result.service';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SetPlan } from '../../models/set-plan';

@Component({
  selector: '[app-set-result]',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.css']
})
export class SetResultComponent implements OnInit {

  @Input() setResult: SetResult;
  @Input() exercises: Exercise[];

  @Output() setResultUpdateOrder: EventEmitter<{ setResultId: number, order: number }> = new EventEmitter();
  @Output() setResultDelete: EventEmitter<number> = new EventEmitter();
  @Output() setResultDuplicate: EventEmitter<SetPlan> = new EventEmitter();

  repsTargetLow = new FormControl();
  repsTargetHigh = new FormControl();

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

  updateSetResultOrder(order: string): void {
    this.setResultUpdateOrder.emit({ setResultId: this.setResult.id, order: parseInt(order) });
  }

  updateSetResultWeight(weight: string): void {
    this.setResult.weight = parseInt(weight);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsActual(repsActual: string): void {
    this.setResult.repsActual = parseInt(repsActual);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsTargetLow(repsTargetLow: string): void {
    this.setResult.repsTargetLow = parseInt(repsTargetLow);
    if (this.setResult.repsTargetHigh < this.setResult.repsTargetLow) {
      this.setResult.repsTargetHigh = this.setResult.repsTargetLow;
    }
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRepsTargetHigh(repsTargetHigh: string): void {
    this.setResult.repsTargetHigh = parseInt(repsTargetHigh);
    if (this.setResult.repsTargetLow > this.setResult.repsTargetHigh) {
      this.setResult.repsTargetLow = this.setResult.repsTargetHigh;
    }
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultToFailure(toFailure: boolean): void {
    this.setResult.toFailure = toFailure;
    this.toggleToFailure(toFailure);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRestTime(restTime: string): void {
    this.setResult.restTime = parseInt(restTime);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  deleteSetResult(): void {
    this.setResultDelete.emit(this.setResult.id);
  }

  toggleToFailure(toFailure: boolean) {
    if (toFailure) {
      this.repsTargetLow.disable();
      this.repsTargetHigh.disable();
    } else {
      this.repsTargetLow.enable();
      this.repsTargetHigh.enable();
    }
  }

}
