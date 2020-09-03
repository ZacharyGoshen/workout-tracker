using System;
using System.Collections.Generic;

namespace WorkoutTracker.Models
{
    public class WorkoutPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<WorkoutSession> WorkoutSessions { get; set; }
        public ICollection<SetPlan> SetPlans { get; set; }
    }
}
