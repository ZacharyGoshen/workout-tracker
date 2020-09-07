using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

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

        [HttpGet]
        [Route("exercises")]
        public JsonResult GetAll()
        {
            var context = new WorkoutTrackerContext();
            var exercises = context.Exercises.ToList();
            return Json(exercises);
        }

        [HttpPost]
        [Route("exercises")]
        public JsonResult Create([FromBody] Exercise exercise)
        {
            var context = new WorkoutTrackerContext();
            context.Exercises.Add(exercise);
            context.SaveChanges();
            return Json(exercise);
        }

        [HttpDelete]
        [Route("exercises/{id}")]
        public JsonResult Delete(int id)
        {
            var context = new WorkoutTrackerContext();
            var exercise = context.Exercises.Find(id);
            context.Exercises.Attach(exercise);
            context.Exercises.Remove(exercise);
            context.SaveChanges();
            return Json(exercise);
        }
    }
}
