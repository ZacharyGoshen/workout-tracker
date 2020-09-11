import { WorkoutPlan } from "./workout-plan";

export class WorkoutSession {

  id: number;
  name: string;
  date: string;

  constructor(name: string, date: string) {
    this.name = name;
    this.date = date;
  }

}