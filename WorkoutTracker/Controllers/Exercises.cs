using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;

namespace WorkoutTracker.Controllers
{
    public class Exercises : Controller
    {
        [HttpGet]
        [Route("exercises/{id}")]
        public JsonResult GetById(int id)
        {
            var context = new WorkoutTrackerContext();
            var exercise = context.Exercises.Where(e => e.Id == id).First();
            return Json(exercise);
        }
    }
}
