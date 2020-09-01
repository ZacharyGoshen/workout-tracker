using System;
using System.ComponentModel.DataAnnotations;

namespace WorkoutTracker.Models
{
    public class WorkoutSession
    {
        public int Id { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; }
    }
}
