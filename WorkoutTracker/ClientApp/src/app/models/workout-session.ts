import { WorkoutPlan } from "./workout-plan";

export class WorkoutSession {

  id: number;
  date: string;
  workoutPlanId: number;

  constructor(date: string, workoutPlanId: number) {
    this.date = date;
    this.workoutPlanId = workoutPlanId;
  }

}