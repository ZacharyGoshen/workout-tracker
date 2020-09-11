using System;
namespace WorkoutTracker.Models
{
    public class SetResult
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Notes { get; set; }
        public int Weight { get; set; }
        public int RepsActual { get; set; }
        public int RepsTargetLow { get; set; }
        public int RepsTargetHigh { get; set; }
        public bool ToFailure { get; set; }
        public int RestTime { get; set; }

        public int WorkoutSessionId { get; set; }
        public WorkoutSession WorkoutSession { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}
