using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            // Retrieve all movies from db logic
            return _context.Movies.ToList();
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            // Retrieve movie by id from db logic
            //Need validation here?
            var movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            return movie;
            }

        // POST api/movie
        [HttpPost]
        public void Post([FromBody]Movie value)
        {
            _context.Movies.Add(value);
            _context.SaveChanges();
        }

        // PUT api/movie/5
        [HttpPut]
        public void Put([FromBody]Movie movie)
        {
            //Won't pass in a movie object, but a json object? Will probably need to do the parse thing or whatever it's called

            //JsonConvert.DeserializeObject(movie);
            //Might want to change Movie passed in to string

            var movieToChange = _context.Movies.Where(x => x.MovieId == movie.MovieId).FirstOrDefault();
            movieToChange.Director = movie.Director;
            movieToChange.Genre = movie.Genre;
            movieToChange.Title = movie.Title;
            if (movie.ImageUrl != null)
            {
                movieToChange.ImageUrl = movie.ImageUrl;
            }

            _context.Update(movieToChange);
            _context.SaveChanges();
            // Update movie in db logic
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            _context.Movies.Remove(_context.Movies.Where(m => m.MovieId == id).FirstOrDefault());
        }
    }
}