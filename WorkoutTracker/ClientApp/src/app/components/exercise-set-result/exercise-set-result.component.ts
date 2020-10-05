import { Component, OnInit, Input } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-exercise-set-result',
  templateUrl: './exercise-set-result.component.html',
  styleUrls: ['./exercise-set-result.component.css', './../exercise-list/exercise-list.component.css']
})
export class ExerciseSetResultComponent implements OnInit {

  @Input() setResult: SetResult;

  workoutSession: WorkoutSession;
  hidden = false;

  constructor(
    private workoutSessionService: WorkoutSessionService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.getWorkoutSession();
  }

  getWorkoutSession() {
    this.workoutSessionService.getWorkoutSession(this.setResult.workoutSessionId)
      .subscribe(ws => this.workoutSession = ws);
  }

}
