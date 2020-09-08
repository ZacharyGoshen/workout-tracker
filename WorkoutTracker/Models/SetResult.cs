using System;
namespace WorkoutTracker.Models
{
    public class SetResult
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int Weight { get; set; }
        public int Reps { get; set; }
        public int RestTime { get; set; }

        public int WorkoutSessionId { get; set; }
        public WorkoutSession WorkoutSession { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}
