import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { WorkoutSession } from '../../models/workout-session';

@Component({
  selector: 'app-workout-session-list',
  templateUrl: './workout-session-list.component.html',
  styleUrls: ['./workout-session-list.component.css']
})
export class WorkoutSessionListComponent implements OnInit {

  workoutSessions: WorkoutSession[];

  constructor(private workoutSessionService: WorkoutSessionService) { }

  ngOnInit() {
    this.getWorkoutSessions();
  }

  getWorkoutSessions(): void {
    this.workoutSessionService.getWorkoutSessions()
      .subscribe(workoutSessions => { this.workoutSessions = workoutSessions; console.log(this.workoutSessions) });
  }

}
