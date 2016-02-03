using System;
using Coypu;

namespace TestingDemo.Web.Specs.Pages
{
    class AddUserPage
    {
        private readonly BrowserSession _browser;

        public AddUserPage(BrowserSession browser)
        {
            _browser = browser;
        }

        public void NavigateTo()
        {
            _browser.Visit("/#");
        }

        public bool AmOnTheAddUserPage()
        {
            return _browser.FindCss(".head-title", new Options { Timeout = TimeSpan.FromSeconds(17) }).Text.Contains("Add a new user");
        }
    }
}
