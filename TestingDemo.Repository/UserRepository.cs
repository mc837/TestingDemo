using System;
using System.Collections.Generic;
using System.Linq;
using TestingDemo.Models;
using TestingDemo.Models.Enums;
using TestingDemo.Repository.RepoCore;

namespace TestingDemo.Repository
{
    public class UserRepository: IUserRepository
    {
        private readonly IMongoProvider _repository;

        public UserRepository(IMongoProvider repository)
        {
            _repository = repository.ForCollection("User");
        }

        public UserModel GetUserById(Guid id)
        {
            return _repository.Find<UserModel>(m => m.Id.Equals(id)).SingleOrDefault();
        }

        public List<UserModel> GetAllForRole(EducationRole role)
        {
            return _repository.Find<UserModel>(u => u.Role.Equals(role));
        }

        public void UpdateUser(UserModel user)
        {
            _repository.Update(user);
        }

        public void Insert(UserModel user)
        {
            _repository.Insert(user);
        }
    }
}
