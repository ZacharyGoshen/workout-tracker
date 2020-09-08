using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    public class SetResults : Controller
    {
        [HttpGet]
        [Route("setResults")]
        public JsonResult GetAllWithWorkoutSessionId()
        {
            var workoutSessionId = HttpContext.Request.Query["workoutSessionId"].ToString();

            var context = new WorkoutTrackerContext();
            var setResults = context.SetResults
                .Where(sr => sr.WorkoutSessionId == Int32.Parse(workoutSessionId));
            return Json(setResults);
        }

        [HttpPost]
        [Route("setResults")]
        public JsonResult Create([FromBody] SetResult setResult)
        {
            var context = new WorkoutTrackerContext();
            context.SetResults.Add(setResult);
            context.SaveChanges();
            return Json(setResult);
        }

        [HttpDelete]
        [Route("setResults/{id}")]
        public JsonResult Delete(int id)
        {
            var context = new WorkoutTrackerContext();
            var setResult = context.SetResults.Find(id);
            context.SetResults.Attach(setResult);
            context.SetResults.Remove(setResult);
            context.SaveChanges();
            return Json(setResult);
        }
    }
}
