import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutPlan } from '../../models/workout-plan';
import { EventEmitter } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { SetPlanService } from '../../services/set-plan.service';
import { Exercise } from '../../models/exercise';

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

  constructor(private setPlanService: SetPlanService) { }

  ngOnInit() {
    this.getSetPlans();
  }

  deleteWorkoutPlan(): void {
    this.workoutPlanDelete.emit(this.workoutPlan.id);
  }

  getSetPlans(): void {
    this.setPlanService.getSetPlansWithWorkoutPlanId(this.workoutPlan.id)
      .subscribe(sp => this.setPlans = sp);
  }

  addSetPlan(exerciseName: string, reps: string, restTime: string): void {
    let exercise = this.exercises.find(e => e.name == exerciseName);
    let order = this.setPlans.length + 1;
    let setPlan = new SetPlan(order, parseInt(reps), parseInt(restTime), this.workoutPlan.id,
      exercise.id);
    console.log(setPlan);
    this.setPlanService.addSetPlan(setPlan).subscribe(sp => this.setPlans.push(sp));
  }

  deleteSetPlan(setPlanId: number): void {
    this.setPlans = this.setPlans.filter(sp => sp.id != setPlanId);
    this.setPlanService.deleteSetPlan(setPlanId).subscribe();
  }
}
