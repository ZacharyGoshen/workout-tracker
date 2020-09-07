import { Component, OnInit, Input, Output } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  @Output() exerciseDelete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteExercise() {
    this.exerciseDelete.emit(this.exercise.id);
  }

}
