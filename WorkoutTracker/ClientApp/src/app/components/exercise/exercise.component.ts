import { Component, OnInit, Input, Output } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { EventEmitter } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  @Output() exerciseDelete: EventEmitter<number> = new EventEmitter();

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  updateExerciseName(name: string) {
    this.exercise.name = name;
    this.exerciseService.updateExercise(this.exercise).subscribe();
  }

  deleteExercise() {
    this.exerciseDelete.emit(this.exercise.id);
  }

}
