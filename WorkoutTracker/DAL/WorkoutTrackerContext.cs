using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WorkoutTracker.Models;

namespace WorkoutTracker.DAL
{
    public partial class WorkoutTrackerContext : DbContext
    {
        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }

        public WorkoutTrackerContext()
        {
        }

        public WorkoutTrackerContext(DbContextOptions<WorkoutTrackerContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("data source=workout-tracker-database.cuchqo5r0bsj.us-east-1.rds.amazonaws.com;initial catalog=workout_tracker_database;user id=admin;password=password", x => x.ServerVersion("8.0.17-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
