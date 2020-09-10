import { Component, OnInit, Input, Output } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { EventEmitter } from '@angular/core';
import { SetPlanService } from '../../services/set-plan.service';

@Component({
  selector: '[app-set-plan]',
  templateUrl: './set-plan.component.html',
  styleUrls: ['./set-plan.component.css']
})
export class SetPlanComponent implements OnInit {

  @Input() setPlan: SetPlan;
  @Input() exercises: Exercise[];

  @Output() setPlanDelete: EventEmitter<number> = new EventEmitter();
  @Output() setPlanUpdateOrder: EventEmitter<{ setPlanId: number, order: number }> = new EventEmitter(); 

  currentExercise: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private setPlanService: SetPlanService
  ) { }

  ngOnInit() {
    this.currentExercise = this.exercises.find(e => this.setPlan.exerciseId == e.id);
  }

  updateSetPlanExerciseId(exerciseName: string): void {
    this.setPlan.exerciseId = this.exercises.find(e => e.name == exerciseName).id;
    this.setPlanService.updateSetPlan(this.setPlan).subscribe();
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

}
