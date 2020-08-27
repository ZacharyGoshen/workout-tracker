using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkoutTracker.DAL;

namespace WorkoutTracker.Controllers
{
    public class WorkoutSessions : Controller
    {
        [HttpGet]
        [Route("workoutSessions")]
        public JsonResult List()
        {
            var context = new WorkoutTrackerContext();
            var workoutSessions = context.WorkoutSessions.ToList();
            return Json(workoutSessions);
        }

        [HttpGet]
        [Route("workoutSessions/id")]
        public JsonResult GetById(int id)
        {
            var context = new WorkoutTrackerContext();
            var workoutSession = context.WorkoutSessions.Where(ws => ws.Id == id).First();
            return Json(workoutSession);
        }
    }
}
