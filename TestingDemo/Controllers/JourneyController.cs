using System;
using System.Collections.Generic;
using System.Web.Mvc;
using TestingDemo.Models;
using TestingDemo.Models.Enums;
using TestingDemo.Repository;

namespace TestingDemo.Controllers
{
    public class JourneyController : Controller
    {
        private readonly IUserRepository _repo;

        public JourneyController(IUserRepository repo)
        {
            _repo = repo;
        }

        public JourneyController()
        {

        }

        // GET: Journey
        public ViewResult Index()
        {

            // index = add user or view classes

            //            var userModel = new UserModel
            //            {
            //                Id = Guid.NewGuid(),
            //                Name = "Matt"
            //            };
            //
            //            _repo.Insert(userModel);
            //
            //            var user = _repo.GetUserById(userModel.Id);
            //
            //            user.Name = "Bob";
            //
            //            _repo.UpdateUser(user);
            //
            //            return user.Name;

            return View();
        }

        public ActionResult AddUser()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddNewUser(UserViewModel userViewModel)
        {
            var mapper = new Mapper();
            var model = mapper.Map(userViewModel);

            //would like use a command here to insert into db
            _repo.Insert(model);

            return View(userViewModel);
        }

        public ActionResult ViewUsers(EducationRole role)
        {
            var model = new UsersViewModel();
            model.Users = _repo.GetAllForRole(role);
            return View(model);
        }
    }

    public class Mapper
    {
        public UserModel Map(UserViewModel model)
        {
            EducationRole role;
            Enum.TryParse(model.RoleType, out role);

            return new UserModel
            {
                Id = new Guid(),
                FirstName = model.FirstName,
                Surname = model.Surname,
                Age = model.Age,
                Dob = model.DateOfBirth,
                Role = role
            };
        }
    }
}