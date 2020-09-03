import { WorkoutSession } from "./workout-session";

export class WorkoutPlan {

  id: number;
  name: string;
  workoutSessions: WorkoutSession[];

  constructor(name: string) {
    this.name = name;
  }

}
