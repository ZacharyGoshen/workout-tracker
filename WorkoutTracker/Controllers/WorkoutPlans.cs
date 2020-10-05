using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    public class WorkoutPlans : BaseController
    {
        [HttpGet]
        [Route("workoutPlans")]
        public JsonResult List()
        {
            var context = new WorkoutTrackerContext();
            var workoutPlans = context.WorkoutPlans.Where(wp => wp.UserId == this.UserId).ToList();
            return Json(workoutPlans);
        }

        [HttpGet]
        [Route("workoutPlans/{id}")]
        public JsonResult GetById(int id)
        {
            var context = new WorkoutTrackerContext();
            var workoutPlan = context.WorkoutPlans.Where(wp => wp.Id == id && wp.UserId == this.UserId).First();
            return Json(workoutPlan);
        }

        [HttpPut]
        [Route("workoutPlans")]
        public JsonResult Update([FromBody] WorkoutPlan workoutPlan)
        {
            var context = new WorkoutTrackerContext();
            workoutPlan.UserId = this.UserId;
            context.Entry(context.WorkoutPlans.Find(workoutPlan.Id)).CurrentValues.SetValues(workoutPlan);
            context.SaveChanges();
            return Json(workoutPlan);
        }

        [HttpPost]
        [Route("workoutPlans")]
        public JsonResult Create([FromBody] WorkoutPlan workoutPlan)
        {
            var context = new WorkoutTrackerContext();
            workoutPlan.UserId = this.UserId;
            context.WorkoutPlans.Add(workoutPlan);
            context.SaveChanges();
            return Json(workoutPlan);
        }

        [HttpDelete]
        [Route("workoutPlans/{id}")]
        public JsonResult Delete(int id)
        {
            var context = new WorkoutTrackerContext();
            var workoutPlan = context.WorkoutPlans.Find(id);
            context.WorkoutPlans.Attach(workoutPlan);
            context.WorkoutPlans.Remove(workoutPlan);
            context.SaveChanges();
            return Json(workoutPlan);
        }
    }
}
