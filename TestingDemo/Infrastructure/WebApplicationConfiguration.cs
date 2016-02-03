using Autofac;
using Autofac.Integration.Mvc;
using System.Reflection;
using MongoDB.Driver;
using TestingDemo.Repository;
using TestingDemo.Repository.RepoCore;

namespace TestingDemo.Infrastructure
{
    public class WebApplicationConfiguration
    {
        public static IContainer ConfigureContainer()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var containerBuilder = new ContainerBuilder();

            var mongoDatabase = new MongoClient("mongodb://localhost").GetServer().GetDatabase("testingDemo");
            containerBuilder.RegisterType<MongoProvider>().As<IMongoProvider>().WithParameter("database", mongoDatabase);

            containerBuilder.RegisterType<UserRepository>().As<IUserRepository>();

            containerBuilder.RegisterControllers(assembly);

            return containerBuilder.Build();
        }
    }
}