using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
using TestingDemo.Infrastructure;

namespace TestingDemo
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private IContainer _container;

        protected void Application_Start()
        {

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            _container = WebApplicationConfiguration.ConfigureContainer();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(_container));

            //GlobalConfiguration.Configuration.DependencyResolver = new WebApiDependencyResolver(_container);
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(_container);

            AreaRegistration.RegisterAllAreas();

        }
    }
}
