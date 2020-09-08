import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutSession } from '../../models/workout-session';
import { DateService } from '../../services/date.service';
import { EventEmitter } from '@angular/core';
import { SetResult } from '../../models/set-result';
import { SetResultService } from '../../services/set-result.service';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  @Input() workoutSession: WorkoutSession;

  @Output() workoutSessionDelete: EventEmitter<number> = new EventEmitter();

  setResults: SetResult[];

  constructor(
    private dateService: DateService,
    private setResultService: SetResultService
  ) { }

  ngOnInit() {
    this.getSetResults();
  }

  deleteWorkoutSession(): void {
    this.workoutSessionDelete.emit(this.workoutSession.id);
  }

  getSetResults(): void {
    this.setResultService.getSetResultsWithWorkoutSessionId(this.workoutSession.id)
      .subscribe(sr => this.setResults = sr);
  }

  dateToShortFormat(isoString: string): string {
    return this.dateService.toShortFormat(isoString);
  }

}
