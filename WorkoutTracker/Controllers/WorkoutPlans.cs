﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;

namespace WorkoutTracker.Controllers
{
    public class WorkoutPlans : Controller
    {
        [HttpGet]
        [Route("workoutPlans")]
        public JsonResult List()
        {
            var context = new WorkoutTrackerContext();
            var workoutPlans = context.WorkoutPlans.ToList();
            return Json(workoutPlans);
        }
    }
}