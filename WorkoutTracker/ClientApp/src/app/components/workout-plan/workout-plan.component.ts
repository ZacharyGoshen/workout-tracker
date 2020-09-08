import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutPlan } from '../../models/workout-plan';
import { EventEmitter } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { SetPlanService } from '../../services/set-plan.service';
import { Exercise } from '../../models/exercise';
import { WorkoutPlanService } from '../../services/workout-plan.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  @Input() workoutPlan: WorkoutPlan;
  @Input() exercises: Exercise[]

  @Output() workoutPlanDelete: EventEmitter<number> = new EventEmitter();

  setPlans: SetPlan[];

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private setPlanService: SetPlanService
  ) { }

  ngOnInit() {
    this.getSetPlans();
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

  addSetPlan(exerciseName: string, reps: string, restTime: string): void {
    let exercise = this.exercises.find(e => e.name == exerciseName);
    let order = this.setPlans.length + 1;
    let setPlan = new SetPlan(order, parseInt(reps), parseInt(restTime), this.workoutPlan.id,
      exercise.id);
    this.setPlanService.addSetPlan(setPlan).subscribe(sp => this.setPlans.push(sp));
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
}
