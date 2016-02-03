using System;
using MongoDB.Bson.Serialization.Attributes;
using TestingDemo.Models.Enums;

namespace TestingDemo.Models
{
    [BsonIgnoreExtraElements]
    public class UserModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Dob { get; set; }
        public EducationRole Role { get; set; }
        public int Age { get; set; }
    }
}