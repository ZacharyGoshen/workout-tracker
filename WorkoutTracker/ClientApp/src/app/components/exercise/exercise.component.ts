import { Component, OnInit, Input, Output, ViewChildren, QueryList } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { EventEmitter } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { SetResult } from '../../models/set-result';
import { SetResultService } from '../../services/set-result.service';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { ExerciseSetResultComponent } from '../exercise-set-result/exercise-set-result.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  @Output() exerciseDelete: EventEmitter<number> = new EventEmitter();

  @ViewChildren(ExerciseSetResultComponent) exerciseSetResultComponents: QueryList<ExerciseSetResultComponent>;

  setResults: SetResult[];
  isCollapsed = true;
  workoutSessionNameFilter = "";
  dateStartFilter = "";
  dateEndFilter = "";

  constructor(
    private exerciseService: ExerciseService,
    private setResultService: SetResultService,
    private workoutSessionService: WorkoutSessionService
  ) { }

  ngOnInit() {
    this.getSetResults();
  }

  updateExerciseName(name: string): void {
    this.exercise.name = name;
    this.exerciseService.updateExercise(this.exercise).subscribe();
  }

  deleteExercise(): void {
    this.exerciseDelete.emit(this.exercise.id);
  }

  getSetResults(): void {
    this.workoutSessionService.getWorkoutSessions().subscribe(workoutSessions => {
      this.setResultService.getSetResultsWithExerciseId(this.exercise.id).subscribe(setResults => {
        this.setResults = setResults.sort((a, b) => {
          let dateA = workoutSessions.find(ws => ws.id == a.workoutSessionId).date;
          let dateB = workoutSessions.find(ws => ws.id == b.workoutSessionId).date;
          if (dateA == dateB) {
            return (a.order > b.order) ? 1 : -1;
          } else {
            return (dateA > dateB) ? 1 : -1;
          }
        });
      });
    });
  }

  filterSetResults(): void {
    this.exerciseSetResultComponents.forEach(esrc => {
      esrc.hidden = false;

      let workoutSessionName = esrc.workoutSession.name.toLowerCase();
      if (workoutSessionName.indexOf(this.workoutSessionNameFilter) == -1) {
        esrc.hidden = true;
      }

      let workoutSessionDate = esrc.workoutSession.date;
      if (this.dateStartFilter && workoutSessionDate < this.dateStartFilter) {
        esrc.hidden = true;
      }
      if (this.dateEndFilter && workoutSessionDate > this.dateEndFilter) {
        esrc.hidden = true;
      }

    });
  }

  filterSetResultsByWorkoutSessionName(name: string): void {
    this.workoutSessionNameFilter = name.toLowerCase();
    this.filterSetResults();
  }

  filterSetResultsByDateStart(dateStart: string): void {
    this.dateStartFilter = dateStart;
    this.filterSetResults();
  }

  filterSetResultsByDateEnd(dateEnd: string): void {
    this.dateEndFilter = dateEnd;
    this.filterSetResults();
  }

}
