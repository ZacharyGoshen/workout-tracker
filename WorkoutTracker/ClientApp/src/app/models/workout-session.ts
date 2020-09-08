import { WorkoutPlan } from "./workout-plan";

export class WorkoutSession {

  id: number;
  date: string;

  constructor(date: string) {
    this.date = date;
  }

}