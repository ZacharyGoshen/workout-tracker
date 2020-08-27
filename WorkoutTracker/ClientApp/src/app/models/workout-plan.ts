import { WorkoutSession } from "./workout-session";

export class WorkoutPlan {
  id: number;
  name: string;
  workoutSessions: WorkoutSession[];
}
