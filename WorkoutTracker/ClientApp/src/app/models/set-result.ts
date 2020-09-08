export class SetResult {

  id: number;
  order: number;
  weight: number;
  reps: number;
  restTime: number;
  workoutSessionId: number;
  exerciseId: number;

  constructor(order: number, weight: number, reps: number, restTime: number,
    workoutSessionId: number, exerciseId: number) {
    this.order = order;
    this.weight = weight;
    this.reps = reps;
    this.restTime = restTime;
    this.workoutSessionId = workoutSessionId;
    this.exerciseId = exerciseId;
  }

}