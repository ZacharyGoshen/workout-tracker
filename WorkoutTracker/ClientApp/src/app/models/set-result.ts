export class SetResult {

  id: number;
  weight: number;
  reps: number;
  restTime: number;
  workoutSessionId: number;
  exerciseId: number;

  constructor(weight: number, reps: number, restTime: number,
    workoutSessionId: number, exerciseId: number) {
    this.weight = weight;
    this.reps = reps;
    this.restTime = restTime;
    this.workoutSessionId = workoutSessionId;
    this.exerciseId = exerciseId;
  }

}