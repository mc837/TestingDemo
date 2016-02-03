using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestingDemo.Startup))]
namespace TestingDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
