import { WorkoutSession } from "./workout-session";

export class WorkoutPlan {

  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

}
