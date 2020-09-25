import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutPlan } from '../../models/workout-plan';
import { EventEmitter } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { SetPlanService } from '../../services/set-plan.service';
import { Exercise } from '../../models/exercise';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css', './../set-plan/set-plan.component.css', './../workout-plan-list/workout-plan-list.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  @Input() workoutPlan: WorkoutPlan;
  @Input() exercises: Exercise[]

  @Output() workoutPlanDelete: EventEmitter<number> = new EventEmitter();

  newSetPlanExerciseName = new FormControl(null);
  newSetPlanRepsTargetLow = new FormControl('');
  newSetPlanRepsTargetHigh = new FormControl('');
  newSetPlanToFailure = new FormControl(false);
  newSetPlanRestTime = new FormControl('');

  setPlans: SetPlan[];
  isCollapsed = true;
  toFailureChecked = false;

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private setPlanService: SetPlanService
  ) { }

  ngOnInit() {
    this.getSetPlans();
    this.newSetPlanExerciseName.setValue('null');
  }

  updateWorkoutPlanName(name: string): void {
    this.workoutPlan.name = name;
    this.workoutPlanService.updateWorkoutPlan(this.workoutPlan).subscribe();
  }

  deleteWorkoutPlan(): void {
    this.workoutPlanDelete.emit(this.workoutPlan.id);
  }

  getSetPlans(): void {
    this.setPlanService.getSetPlansWithWorkoutPlanId(this.workoutPlan.id)
      .subscribe(sp => {
        let sortedSetPlans = sp.sort((a, b) => (a.order > b.order) ? 1 : -1);
        this.setPlans = sortedSetPlans;
      });
  }

  addSetPlan(exerciseName: string, repsTargetLow: string, repsTargetHigh: string, toFailure: boolean, restTime: string): void {
    let exercise = this.exercises.find(e => e.name == exerciseName);
    if (!exercise) {
      return;
    }

    let order = this.setPlans.length + 1;

    if (!repsTargetLow && !repsTargetHigh) {
      repsTargetLow = '0';
      repsTargetHigh = '0';
    } else if (repsTargetLow && !repsTargetHigh) {
      repsTargetHigh = repsTargetLow;
    } else if (repsTargetHigh && !repsTargetLow) {
      repsTargetLow = repsTargetHigh;
    }

    if (!restTime) restTime = '0';

    let setPlan = new SetPlan(order, parseInt(repsTargetLow),
      parseInt(repsTargetHigh), toFailure, parseInt(restTime),
      this.workoutPlan.id, exercise.id);

    this.setPlanService.addSetPlan(setPlan).subscribe(sp => {
      this.setPlans.push(sp);
      this.clearNewSetPlanForm();
    });

  }

  duplicateSetPlan(setPlan: SetPlan) {
    let duplicate = { ...setPlan };
    delete duplicate.id;
    duplicate.order = this.setPlans.length + 1;
    this.setPlanService.addSetPlan(duplicate).subscribe(sp => this.setPlans.push(sp));
  }

  updateSetPlanOrder(setPlanId: number, order: number): void {
    let setPlan = this.setPlans.find(sp => sp.id == setPlanId);
    let setPlansToUpdate = [];
    let orderOffset = 0;
    if (order > setPlan.order) {
      setPlansToUpdate = this.setPlans.filter(sp => sp.order > setPlan.order && sp.order <= order);
      orderOffset = -1;
    } else {
      setPlansToUpdate = this.setPlans.filter(sp => sp.order < setPlan.order && sp.order >= order);
      orderOffset = 1;
    }

    setPlansToUpdate.forEach(sp => {
      sp.order = sp.order + orderOffset;
      this.setPlanService.updateSetPlan(sp).subscribe();
    });

    setPlan.order = order;
    this.setPlanService.updateSetPlan(setPlan).subscribe();

    this.setPlans = this.setPlans.sort((a, b) => (a.order > b.order) ? 1 : -1);
  }

  deleteSetPlan(setPlanId: number): void {
    let setPlanOrder = this.setPlans.find(sp => sp.id == setPlanId).order;
    let setPlansToUpdate = this.setPlans.filter(sp => sp.order > setPlanOrder);
    setPlansToUpdate.forEach(sp => {
      sp.order = sp.order - 1;
      this.setPlanService.updateSetPlan(sp).subscribe();
    });

    this.setPlans = this.setPlans.filter(sp => sp.id != setPlanId);
    this.setPlanService.deleteSetPlan(setPlanId).subscribe();
  }

  clearNewSetPlanForm(): void {
    this.newSetPlanExerciseName.setValue(null);
    this.newSetPlanRepsTargetLow.setValue('');
    this.newSetPlanRepsTargetHigh.setValue('');
    this.newSetPlanToFailure.setValue(false);
    this.newSetPlanRestTime.setValue('');
  }

  toggleNewSetToFailure(toFailure: boolean): void {
    if (toFailure) {
      this.newSetPlanRepsTargetLow.setValue('');
      this.newSetPlanRepsTargetLow.disable();

      this.newSetPlanRepsTargetHigh.setValue('');
      this.newSetPlanRepsTargetHigh.disable();
    } else {
      this.newSetPlanRepsTargetLow.enable();
      this.newSetPlanRepsTargetHigh.enable();
    }
  }
}
