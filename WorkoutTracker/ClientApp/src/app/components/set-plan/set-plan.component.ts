import { Component, OnInit, Input, Output } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { EventEmitter } from '@angular/core';
import { SetPlanService } from '../../services/set-plan.service';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;

  @Output() setPlanDelete: EventEmitter<number> = new EventEmitter();
  @Output() setPlanUpdateOrder: EventEmitter<{ setPlanId: number, order: number }> = new EventEmitter(); 

  exercise: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private setPlanService: SetPlanService
  ) { }

  ngOnInit() {
    this.getExercise();
  }

  updateSetPlanOrder(order: string): void {
    this.setPlanUpdateOrder.emit({ setPlanId: this.setPlan.id, order: parseInt(order) });
  }

  updateSetPlanReps(reps: string): void {
    this.setPlan.reps = parseInt(reps);
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRestTime(restTime: string): void {
    this.setPlan.restTime = parseInt(restTime);
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  deleteSetPlan() {
    this.setPlanDelete.emit(this.setPlan.id);
  }

  getExercise(): void {
    this.exerciseService.getExerciseById(this.setPlan.exerciseId)
      .subscribe(e => this.exercise = e);
  }

}
