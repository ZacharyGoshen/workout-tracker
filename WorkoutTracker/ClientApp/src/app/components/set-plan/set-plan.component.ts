import { Component, OnInit, Input, Output } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;

  @Output() setPlanDelete: EventEmitter<number> = new EventEmitter();

  exercise: Exercise;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercise();
  }

  deleteSetPlan() {
    this.setPlanDelete.emit(this.setPlan.id);
  }

  getExercise(): void {
    this.exerciseService.getExerciseById(this.setPlan.exerciseId)
      .subscribe(e => this.exercise = e);
  }

}
