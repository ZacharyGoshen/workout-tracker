﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    public class SetPlans : BaseController
    {
        [HttpGet]
        [Route("setPlans")]
        public JsonResult GetAllWithWorkoutPlanId()
        {
            var workoutPlanId = HttpContext.Request.Query["workoutPlanId"].ToString();

            var context = new WorkoutTrackerContext();
            var setPlans = context.SetPlans
                .Where(sp => sp.WorkoutPlanId == Int32.Parse(workoutPlanId) && sp.UserId == this.UserId);
            return Json(setPlans);
        }

        [HttpPost]
        [Route("setPlans")]
        public JsonResult Create([FromBody] SetPlan setPlan)
        {
            var context = new WorkoutTrackerContext();
            setPlan.UserId = this.UserId;
            context.SetPlans.Add(setPlan);
            context.SaveChanges();
            return Json(setPlan);
        }

        [HttpPut]
        [Route("setPlans")]
        public JsonResult Update([FromBody] SetPlan setPlan)
        {
            var context = new WorkoutTrackerContext();
            setPlan.UserId = this.UserId;
            context.Entry(context.SetPlans.Find(setPlan.Id)).CurrentValues.SetValues(setPlan);
            context.SaveChanges();
            return Json(setPlan);
        }

        [HttpDelete]
        [Route("setPlans/{id}")]
        public JsonResult Delete(int id)
        {
            var context = new WorkoutTrackerContext();
            var setPlan = context.SetPlans.Find(id);
            context.SetPlans.Attach(setPlan);
            context.SetPlans.Remove(setPlan);
            context.SaveChanges();
            return Json(setPlan);
        }
    }
}
