using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WorkoutTracker.Models;

namespace WorkoutTracker.DAL
{
    public partial class WorkoutTrackerContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }
        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
        public DbSet<SetPlan> SetPlans { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<SetResult> SetResults { get; set; }

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
                optionsBuilder.UseMySql("data source=workout-tracker-database-restored.cuchqo5r0bsj.us-east-1.rds.amazonaws.com;initial catalog=database_2;user id=admin;password=password", x => x.ServerVersion("8.0.17-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.WorkoutPlans)
                .WithOne(wp => wp.User);

            modelBuilder.Entity<User>()
                .HasMany(u => u.WorkoutSessions)
                .WithOne(ws => ws.User);

            modelBuilder.Entity<User>()
                .HasMany(u => u.SetPlans)
                .WithOne(sp => sp.User);

            modelBuilder.Entity<User>()
                .HasMany(u => u.SetResults)
                .WithOne(sr => sr.User);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Exercises)
                .WithOne(e => e.User);

            modelBuilder.Entity<WorkoutPlan>()
                .HasMany(wp => wp.SetPlans)
                .WithOne(sp => sp.WorkoutPlan);

            modelBuilder.Entity<WorkoutSession>()
                .HasMany(ws => ws.SetResults)
                .WithOne(sr => sr.WorkoutSession);

            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.SetPlans)
                .WithOne(sp => sp.Exercise);

            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.SetResults)
                .WithOne(sr => sr.Exercise);
        }

    }
}
