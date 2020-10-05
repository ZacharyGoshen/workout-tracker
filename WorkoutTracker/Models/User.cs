using System;
using System.Collections.Generic;

namespace WorkoutTracker.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }
        public byte[] Salt { get; set; }
        public string Password { get; set; }

        public ICollection<WorkoutPlan> WorkoutPlans { get; set; }
        public ICollection<WorkoutSession> WorkoutSessions { get; set; }
        public ICollection<SetPlan> SetPlans { get; set; }
        public ICollection<SetResult> SetResults { get; set; }
        public ICollection<Exercise> Exercises { get; set; }
    }
}
