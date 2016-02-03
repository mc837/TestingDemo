using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace TestingDemo.Repository.RepoCore
{
    public interface IMongoProvider
    {
        IMongoProvider ForCollection(string collectionName);
        void Insert<T>(T model);
        void Update<T>(T model);
        void Delete<T>(Expression<Func<T, bool>> filter);
        List<T> Find<T>(Expression<Func<T, bool>> filter);
        List<T> Find<T>(Expression<Func<T, bool>> filter, string collectionName);
        T Find<T, T2>(Expression<Func<T, bool>> filter, Expression<Func<T, T2>> orderBy);
        T SingleOrDefault<T>(Expression<Func<T, bool>> filter);
    }
}
