using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkoutTracker.Models
{
    public class WorkoutSession
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Date { get; set; }

        public ICollection<SetResult> SetResults { get; set; }
    }
}
