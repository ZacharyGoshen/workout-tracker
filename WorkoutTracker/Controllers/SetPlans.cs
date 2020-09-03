using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;

namespace WorkoutTracker.Controllers
{
    public class SetPlans : Controller
    {
        [HttpGet]
        [Route("setPlans")]
        public JsonResult GetAllWithWorkoutPlanId()
        {
            var workoutPlanId = HttpContext.Request.Query["workoutPlanId"].ToString();

            var context = new WorkoutTrackerContext();
            var setPlans = context.SetPlans
                .Where(sp => sp.WorkoutPlanId == Int32.Parse(workoutPlanId));
            return Json(setPlans);
        }
    }
}
