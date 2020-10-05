import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { FormControl } from '@angular/forms';
import { ExerciseComponent } from '../exercise/exercise.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  @ViewChildren(ExerciseComponent) exerciseComponents: QueryList<ExerciseComponent>;

  newExerciseName = new FormControl('');

  exercises: Exercise[];
  exercisesSortedAlphabetically = true;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(e => {
        this.exercises = e.sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
  }

  addExercise(exerciseName: string): void {
    let exercise = new Exercise(exerciseName);
    this.exerciseService.addExercise(exercise)
      .subscribe(e => {
        this.exercises.push(e);
        this.newExerciseName.setValue('');
      });
  }

  deleteExercise(exerciseId: number): void {
    this.exercises = this.exercises.filter(e => e.id != exerciseId);
    this.exerciseService.deleteExercise(exerciseId).subscribe();
  }

  sortExercisesByName(): void {
    this.exercisesSortedAlphabetically = !this.exercisesSortedAlphabetically;
    if (this.exercisesSortedAlphabetically) {
      this.exercises = this.exercises.sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else {
      this.exercises = this.exercises.sort((a, b) => (a.name < b.name) ? 1 : -1);
    }
  }

  filterSetResultsByWorkoutSessionName(name: string): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByWorkoutSessionName(name));
  }

  filterSetResultsByDateStart(dateStart: string): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByDateStart(dateStart));
  }

  filterSetResultsByDateEnd(dateEnd: string): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByDateEnd(dateEnd));
  }

  filterSetResultsByWeightLow(weightLow: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByWeightLow(weightLow));
  }

  filterSetResultsByWeightHigh(weightHigh: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByWeightHigh(weightHigh));
  }

  filterSetResultsByRepsCompletedLow(repsCompletedLow: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByRepsCompletedLow(repsCompletedLow));
  }

  filterSetResultsByRepsCompletedHigh(repsCompletedHigh: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByRepsCompletedHigh(repsCompletedHigh));
  }

  filterSetResultsByTargetRepsLow(targetRepsLow: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByTargetRepsLow(targetRepsLow));
  }

  filterSetResultsByTargetRepsHigh(targetRepsHigh: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByTargetRepsHigh(targetRepsHigh));
  }

  filterSetResultsByRestTimeLow(restTimeLow: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByRestTimeLow(restTimeLow));
  }

  filterSetResultsByRestTimeHigh(restTimeHigh: number): void {
    this.exerciseComponents.forEach(ec => ec.filterSetResultsByRestTimeHigh(restTimeHigh));
  }
}
