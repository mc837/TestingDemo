using System;
using TechTalk.SpecFlow;

namespace TestingDemo.Web.Specs.Steps
{
    [Binding]
    public class AddUserEndToEndSteps
    {
        [Given(@"I go to the add user page")]
        public void GivenIGoToTheAddUserPage()
        {
            ScenarioContext.Current.Pending();
        }
        
        [When(@"I wait")]
        public void WhenIWait()
        {
            ScenarioContext.Current.Pending();
        }
        
        [Then(@"I am on the right page")]
        public void ThenIAmOnTheRightPage()
        {
            ScenarioContext.Current.Pending();
        }
    }
}
