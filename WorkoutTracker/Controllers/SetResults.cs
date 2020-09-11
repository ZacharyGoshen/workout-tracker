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
        public JsonResult Get()
        {
            var workoutSessionId = HttpContext.Request.Query["workoutSessionId"].ToString();
            var exerciseId = HttpContext.Request.Query["exerciseId"].ToString();

            var context = new WorkoutTrackerContext();
            if (workoutSessionId != "")
            {
                var setResults = context.SetResults
                    .Where(sr => sr.WorkoutSessionId == Int32.Parse(workoutSessionId));
                return Json(setResults);
            }
            else if (exerciseId != "")
            {
                var setResults = context.SetResults
                    .Where(sr => sr.ExerciseId == Int32.Parse(exerciseId));
                return Json(setResults);
            }
            else
            {
                var setResults = context.SetResults.ToList();
                return Json(setResults);
            }
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

        [HttpPut]
        [Route("setResults")]
        public JsonResult Update([FromBody] SetResult setResult)
        {
            var context = new WorkoutTrackerContext();
            context.Entry(context.SetResults.Find(setResult.Id)).CurrentValues.SetValues(setResult);
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
