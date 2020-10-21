import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { EventEmitter } from '@angular/core';
import { SetPlanService } from '../../services/set-plan.service';
import { FormControl } from '@angular/forms';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-set-plan',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css', './../workout-plan-list/workout-plan-list.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;
  @Input() exercises: Exercise[];
  @Input() workoutPlanLength: number;

  @Output() setPlanDelete: EventEmitter<number> = new EventEmitter();
  @Output() setPlanUpdateOrder: EventEmitter<{ setPlanId: number, order: number }> = new EventEmitter();
  @Output() setPlanDuplicate: EventEmitter<SetPlan> = new EventEmitter();

  @ViewChild('setPlanOrder') setNumberInput;
  @ViewChild('setPlanRepsTargetLow') repsTargetLowInput;
  @ViewChild('setPlanRepsTargetHigh') repsTargetHighInput;
  @ViewChild('setPlanRestTime') restTimeInput;
  @ViewChild(PopperComponent) popperComponent: PopperComponent;

  setNumber = new FormControl();
  repsTargetLow = new FormControl();
  repsTargetHigh = new FormControl();
  restTime = new FormControl();

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

  updateSetPlanOrder(orderString: string): void {
    let order = parseInt(orderString);
    if (!orderString || order < 1 || order > this.workoutPlanLength) {
      this.popperComponent.create(this.setNumberInput.nativeElement, `Enter a value between 1-${this.workoutPlanLength}.`);
      this.setNumber.setValue(this.setPlan.order);
      return;
    }
    this.setPlanUpdateOrder.emit({ setPlanId: this.setPlan.id, order: order });
  }

  updateSetPlanExerciseId(exerciseName: string): void {
    this.setPlan.exerciseId = this.exercises.find(e => e.name == exerciseName).id;
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRepsTargetLow(repsTargetLowString: string): void {
    let repsTargetLow = parseInt(repsTargetLowString);
    if (isNaN(repsTargetLow) || repsTargetLow < 0 || repsTargetLow > 99) {
      this.popperComponent.create(this.repsTargetLowInput.nativeElement, 'Enter a value between 0-99.');
      this.repsTargetLow.setValue(this.setPlan.repsTargetLow);
      return;
    }
    if (repsTargetLow > this.setPlan.repsTargetHigh) {
      this.setPlan.repsTargetHigh = repsTargetLow;
    }
    this.setPlan.repsTargetLow = repsTargetLow;
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRepsTargetHigh(repsTargetHighString: string): void {
    let repsTargetHigh = parseInt(repsTargetHighString);
    if (isNaN(repsTargetHigh) || repsTargetHigh < 0 || repsTargetHigh > 99) {
      this.popperComponent.create(this.repsTargetHighInput.nativeElement, 'Enter a value between 0-99.');
      this.repsTargetHigh.setValue(this.setPlan.repsTargetHigh);
      return;
    }
    if (repsTargetHigh < this.setPlan.repsTargetLow) {
      this.setPlan.repsTargetLow = repsTargetHigh;
    }
    this.setPlan.repsTargetHigh = repsTargetHigh;
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanToFailure(toFailure: boolean): void {
    this.setPlan.toFailure = toFailure;
    this.toggleToFailure(toFailure);
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
  }

  updateSetPlanRestTime(restTimeString: string): void {
    let restTime = parseInt(restTimeString);
    if (isNaN(restTime) || restTime < 0 || restTime > 999) {
      this.popperComponent.create(this.restTimeInput.nativeElement, 'Enter a value between 0-999.');
      this.restTime.setValue(this.setPlan.restTime);
      return;
    }
    this.setPlan.restTime = restTime;
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
