using TestingDemo.Models.Enums;

namespace TestingDemo.Models
{
    public class UserViewModel
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public int DobDay { get; set; }
        public int DobMonth { get; set; }
        public int DobYear { get; set; }
        public string DateOfBirth { get; set; }
        public int Age { get; set; }
        public string RoleType { get; set; }
    }

}