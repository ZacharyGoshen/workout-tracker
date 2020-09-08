﻿using System;
using System.Collections.Generic;

namespace WorkoutTracker.Models
{
    public class SetPlan
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public int Reps { get; set; }
        public int RestTime { get; set; }

        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}
