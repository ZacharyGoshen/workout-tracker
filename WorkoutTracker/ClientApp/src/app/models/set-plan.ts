export class SetPlan {

  id: number;
  order: number;
  reps: number;
  restTime: number;
  workoutPlanId: number;
  exerciseId: number;

  constructor(order: number, reps: number, restTime: number,
    workoutPlanId: number, exerciseId: number) {
    this.order = order;
    this.reps = reps;
    this.restTime = restTime;
    this.workoutPlanId = workoutPlanId;
    this.exerciseId = exerciseId;
  }

}