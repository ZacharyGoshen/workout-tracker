using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    public class WorkoutSessions : BaseController
    {
        [HttpGet]
        [Route("workoutSessions")]
        public JsonResult List()
        {
            var context = new WorkoutTrackerContext();
            var workoutSessions = context.WorkoutSessions.Where(ws => ws.UserId == this.UserId).ToList();
            return Json(workoutSessions);
        }

        [HttpGet]
        [Route("workoutSessions/{id}")]
        public JsonResult GetById(int id)
        {
            var context = new WorkoutTrackerContext();
            var workoutSession = context.WorkoutSessions.Where(ws => ws.Id == id && ws.UserId == this.UserId).First();
            return Json(workoutSession);
        }

        [HttpPut]
        [Route("workoutSessions")]
        public JsonResult Update([FromBody] WorkoutSession workoutSession)
        {
            var context = new WorkoutTrackerContext();
            workoutSession.UserId = this.UserId;
            context.Entry(context.WorkoutSessions.Find(workoutSession.Id)).CurrentValues.SetValues(workoutSession);
            context.SaveChanges();
            return Json(workoutSession);
        }

        [HttpPost]
        [Route("workoutSessions")]
        public JsonResult Create([FromBody] WorkoutSession workoutSession)
        {
            var context = new WorkoutTrackerContext();
            workoutSession.UserId = this.UserId;
            context.WorkoutSessions.Add(workoutSession);
            context.SaveChanges();
            return Json(workoutSession);
        }

        [HttpDelete]
        [Route("workoutSessions/{id}")]
        public JsonResult Delete(int id)
        {
            var context = new WorkoutTrackerContext();
            var workoutSession = context.WorkoutSessions.Find(id);
            context.WorkoutSessions.Attach(workoutSession);
            context.WorkoutSessions.Remove(workoutSession);
            context.SaveChanges();
            return Json(workoutSession);
        }
    }
}
