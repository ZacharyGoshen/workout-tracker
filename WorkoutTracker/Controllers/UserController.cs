using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WorkoutTracker.DAL;
using WorkoutTracker.Models;

namespace WorkoutTracker.Controllers
{
    public class UserController : BaseController
    {

        [HttpPost]
        [Route("users")]
        public JsonResult Create([FromBody] User user)
        {
            var context = new WorkoutTrackerContext();
            if (context.Users.Where(u => u.Username == user.Username).ToList().Count != 0)
            {
                return Json(false);
            }
            else
            {
                user.Salt = GenerateSalt();
                user.Password = HashPassword(user.Password, user.Salt);

                context.Users.Add(user);
                context.SaveChanges();

                this.UserId = user.Id;

                return Json(user);
            }
        }

        [HttpGet]
        [Route("users/authorize")]
        public JsonResult Authorize()
        {
            if (this.UserId == 0)
            {
                return Json(false);
            }
            else
            {
                return Json(true);
            }
        }

        [HttpPost]
        [Route("users/login")]
        public JsonResult LogIn([FromBody] User user)
        {
            var context = new WorkoutTrackerContext();
            if (context.Users.Where(u => u.Username == user.Username).ToList().Count == 1)
            {
                var dBUser = context.Users.Where(u => u.Username == user.Username).First();
                string encrypted = HashPassword(user.Password, dBUser.Salt);
                if (encrypted == dBUser.Password)
                {
                    this.UserId = dBUser.Id;
                    return Json(true);
                }
            }
            return Json(false);
        }

        [HttpPost]
        [Route("users/logout")]
        public void LogOut()
        {
            this.UserId = 0;
        }

        // generate a 128-bit salt using a secure PRNG
        private byte[] GenerateSalt()
        {
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
        private string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }

    }
}
