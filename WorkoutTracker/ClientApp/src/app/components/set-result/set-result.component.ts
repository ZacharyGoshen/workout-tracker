import { Component, OnInit, Input } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-set-result',
  templateUrl: './set-result.component.html',
  styleUrls: ['./set-result.component.css']
})
export class SetResultComponent implements OnInit {

  @Input() setResult: SetResult;

  exercise: Exercise;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercise();
  }

  getExercise(): void {
    this.exerciseService.getExerciseById(this.setResult.exerciseId)
      .subscribe(e => this.exercise = e);
  }

}
