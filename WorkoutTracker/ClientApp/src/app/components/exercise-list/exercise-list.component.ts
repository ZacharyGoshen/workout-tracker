import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(e => this.exercises = e);
  }

  addExercise(exerciseName: string): void {
    let exercise = new Exercise(exerciseName);
    this.exerciseService.addExercise(exercise)
      .subscribe(e => this.exercises.push(e));
  }

  deleteExercise(exerciseId: number): void {
    this.exercises = this.exercises.filter(e => e.id != exerciseId);
    this.exerciseService.deleteExercise(exerciseId).subscribe();
  }

}
