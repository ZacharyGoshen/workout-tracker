import { Component, OnInit, Input } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;

  exercise: Exercise;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExercise();
  }

  getExercise(): void {
    this.exerciseService.getExerciseById(this.setPlan.exerciseId)
      .subscribe(e => this.exercise = e);
  }

}
