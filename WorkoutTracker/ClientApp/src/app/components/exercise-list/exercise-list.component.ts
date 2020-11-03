import { Component, OnInit, ViewChildren, QueryList, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { FormControl } from '@angular/forms';
import { ExerciseComponent } from '../exercise/exercise.component';
import { createPopper, Instance } from '@popperjs/core';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  @ViewChild('sortExercisesButton', { static: false }) sortExercisesButton: ElementRef;
  @ViewChild('sortExercisesMenu', { static: false }) sortExercisesMenu: ElementRef;
  @ViewChild('filterSetsButton', { static: false }) filterSetsButton: ElementRef;
  @ViewChild('filterSetsMenu', { static: false }) filterSetsMenu: ElementRef;
  @ViewChild('exerciseName', { static: false }) exerciseNameInput: ElementRef;
  @ViewChild(PopperComponent, { static: false }) popperComponent: PopperComponent;
  @ViewChildren(ExerciseComponent) exerciseComponents: QueryList<ExerciseComponent>;

  newExerciseName = new FormControl('');

  exercises: Exercise[];
  exercisesSortedAlphabetically = true;
  sortExercisesMenuInstance: Instance = null;
  filterSetsMenuInstance: Instance = null;

  constructor(private exerciseService: ExerciseService, private renderer: Renderer2) {
    this.renderer.listen('window', 'mousedown', (e: Event) => {
      if (
        this.sortExercisesMenuInstance != null &&
        !this.sortExercisesButton.nativeElement.contains(e.target) &&
        !this.sortExercisesMenu.nativeElement.contains(e.target)
      ) {
        this.toggleSortExercisesMenu();
      }

      if (
        this.filterSetsMenuInstance != null &&
        !this.filterSetsButton.nativeElement.contains(e.target) &&
        !this.filterSetsMenu.nativeElement.contains(e.target)
      ) {
        this.toggleFilterSetsMenu();
      }
    });
  }

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
    if (exerciseName.length == 0) {
      this.popperComponent.create(this.exerciseNameInput.nativeElement, 'Enter a valid name.');
      return;
    }

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

  toggleSortExercisesMenu(): void {
    if (this.sortExercisesMenuInstance == null) {
      this.sortExercisesMenu.nativeElement.setAttribute('display-block', '');
      this.sortExercisesMenuInstance = createPopper(this.sortExercisesButton.nativeElement, this.sortExercisesMenu.nativeElement, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
      this.sortExercisesMenu.nativeElement.setAttribute('visible', '');
    } else {
      this.sortExercisesMenu.nativeElement.removeAttribute('visible');
      setTimeout(() => {
        this.sortExercisesMenuInstance.destroy();
        this.sortExercisesMenuInstance = null;
        this.sortExercisesMenu.nativeElement.removeAttribute('display-block');
      }, 300);
    }
  }

  toggleFilterSetsMenu(): void {
    if (this.filterSetsMenuInstance == null) {
      this.filterSetsMenu.nativeElement.setAttribute('display-block', '');
      this.filterSetsMenuInstance = createPopper(this.filterSetsButton.nativeElement, this.filterSetsMenu.nativeElement, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
      this.filterSetsMenu.nativeElement.setAttribute('visible', '');
    } else {
      this.filterSetsMenu.nativeElement.removeAttribute('visible');
      setTimeout(() => {
        this.filterSetsMenuInstance.destroy();
        this.filterSetsMenuInstance = null;
        this.filterSetsMenu.nativeElement.removeAttribute('display-block');
      }, 300);
    }
  }
}
