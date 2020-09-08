using System;
using System.Collections.Generic;

namespace WorkoutTracker.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<SetPlan> SetPlans { get; set; }
        public ICollection<SetResult> SetResults { get; set; }
    }
}
