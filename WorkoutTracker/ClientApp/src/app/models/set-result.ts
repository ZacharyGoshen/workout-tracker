export class SetResult {

  id: number;
  notes: string;
  order: number;
  weight: number;
  repsActual: number;
  repsTargetLow: number;
  repsTargetHigh: number;
  toFailure: boolean;
  restTime: number;
  workoutSessionId: number;
  exerciseId: number;

  constructor(order: number, weight: number, repsActual: number,
    repsTargetLow: number, repsTargetHigh: number, toFailure: boolean,
    restTime: number, workoutSessionId: number, exerciseId: number) {
    this.order = order;
    this.weight = weight;
    this.repsActual = repsActual;
    this.repsTargetLow = repsTargetLow;
    this.repsTargetHigh = repsTargetHigh;
    this.toFailure = toFailure;
    this.restTime = restTime;
    this.workoutSessionId = workoutSessionId;
    this.exerciseId = exerciseId;
  }

}