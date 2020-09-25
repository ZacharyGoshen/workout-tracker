import { Component, OnInit, Input, Output } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { EventEmitter } from '@angular/core';
import { SetPlanService } from '../../services/set-plan.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css', './../workout-plan-list/workout-plan-list.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;
  @Input() exercises: Exercise[];

  @Output() setPlanDelete: EventEmitter<number> = new EventEmitter();
  @Output() setPlanUpdateOrder: EventEmitter<{ setPlanId: number, order: number }> = new EventEmitter();
  @Output() setPlanDuplicate: EventEmitter<SetPlan> = new EventEmitter();

  repsTargetLow = new FormControl();
  repsTargetHigh = new FormControl();

  currentExercise: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private setPlanService: SetPlanService
  ) { }

  ngOnInit() {
    this.currentExercise = this.exercises.find(e => this.setPlan.exerciseId == e.id);
    this.toggleToFailure(this.setPlan.toFailure);
  }

  duplicateSetPlan(): void {
    this.setPlanDuplicate.emit(this.setPlan);
  }

  updateSetPlanExerciseId(exerciseName: string): void {
    this.setPlan.exerciseId = this.exercises.find(e => e.name == exerciseName).id;
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanOrder(order: string): void {
    this.setPlanUpdateOrder.emit({ setPlanId: this.setPlan.id, order: parseInt(order) });
  }

  updateSetPlanRepsTargetLow(repsTargetLow: string): void {
    this.setPlan.repsTargetLow = parseInt(repsTargetLow);
    if (this.setPlan.repsTargetHigh < this.setPlan.repsTargetLow) {
      this.setPlan.repsTargetHigh = this.setPlan.repsTargetLow;
    }
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRepsTargetHigh(repsTargetHigh: string): void {
    this.setPlan.repsTargetHigh= parseInt(repsTargetHigh);
    if (this.setPlan.repsTargetLow > this.setPlan.repsTargetHigh) {
      this.setPlan.repsTargetLow = this.setPlan.repsTargetHigh;
    }
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanToFailure(toFailure: boolean): void {
    this.setPlan.toFailure = toFailure;
    this.toggleToFailure(toFailure);
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRestTime(restTime: string): void {
    this.setPlan.restTime = parseInt(restTime);
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  deleteSetPlan() {
    this.setPlanDelete.emit(this.setPlan.id);
  }

  toggleToFailure(toFailure: boolean) {
    if (toFailure) {
      this.repsTargetLow.disable();
      this.repsTargetHigh.disable();
    } else {
      this.repsTargetLow.enable();
      this.repsTargetHigh.enable();
    }
  }

}
