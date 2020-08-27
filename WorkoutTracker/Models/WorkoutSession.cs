using System;
namespace WorkoutTracker.Models
{
    public class WorkoutSession
    {
        public int Id { get; set; }
        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; }
    }
}
