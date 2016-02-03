using System;
using System.Collections.Generic;
using TestingDemo.Models;
using TestingDemo.Models.Enums;

namespace TestingDemo.Repository
{
    public interface IUserRepository
    {
        UserModel GetUserById(Guid id);
        List<UserModel> GetAllForRole(EducationRole role);
        void UpdateUser(UserModel risk);
        void Insert(UserModel risk);
    }
}
