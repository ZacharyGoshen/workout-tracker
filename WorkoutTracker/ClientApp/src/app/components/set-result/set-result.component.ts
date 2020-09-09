import { Component, OnInit, Input, Output } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { SetResultService } from '../../services/set-result.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-set-result',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.css']
})
export class SetResultComponent implements OnInit {

  @Input() setResult: SetResult;
  @Input() exercises: Exercise[];

  @Output() setResultUpdateOrder: EventEmitter<{ setResultId: number, order: number }> = new EventEmitter();
  @Output() setResultDelete: EventEmitter<number> = new EventEmitter();

  currentExercise: Exercise;

  constructor(private setResultService: SetResultService) { }

  ngOnInit() {
    this.currentExercise = this.exercises.find(e => e.id == this.setResult.exerciseId);
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

  updateSetResultReps(reps: string): void {
    this.setResult.reps = parseInt(reps);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  updateSetResultRestTime(restTime: string): void {
    this.setResult.restTime = parseInt(restTime);
    this.setResultService.updateSetResult(this.setResult).subscribe();
  }

  deleteSetResult(): void {
    this.setResultDelete.emit(this.setResult.id);
  }

}
