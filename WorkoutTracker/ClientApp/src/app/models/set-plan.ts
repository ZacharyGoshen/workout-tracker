export class SetPlan {

  id: number;
  order: number;
  repsTargetLow: number;
  repsTargetHigh: number
  toFailure: boolean;
  restTime: number;
  workoutPlanId: number;
  exerciseId: number;

  constructor(order: number, repsTargetLow: number, repsTargetHigh: number,
    toFailure: boolean, restTime: number, workoutPlanId: number,
    exerciseId: number) {
    this.order = order;
    this.repsTargetLow = repsTargetLow;
    this.repsTargetHigh = repsTargetHigh;
    this.toFailure = toFailure;
    this.restTime = restTime;
    this.workoutPlanId = workoutPlanId;
    this.exerciseId = exerciseId;
  }

}