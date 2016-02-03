using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CuttingEdge.Conditions;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;

namespace TestingDemo.Repository.RepoCore
{
    public class MongoProvider: IMongoProvider
    {
        private readonly MongoDatabase _database;
        private string _collectionName;

        public MongoProvider(MongoDatabase database)
        {
            _database = database;
        }

        public IMongoProvider ForCollection(string collectionName)
        {
            _collectionName = collectionName;
            return this;
        }

        public void Insert<T>(T model)
        {
            Condition.Requires(_collectionName).IsNotNullOrEmpty();

            _database.GetCollection<T>(_collectionName).Insert(model);
        }

        public void Update<T>(T model)
        {
            Condition.Requires(_collectionName).IsNotNullOrEmpty();

            _database.GetCollection<T>(_collectionName).Save(model);
        }

        public void Delete<T>(Expression<Func<T, bool>> filter)
        {
            Condition.Requires(_collectionName).IsNotNullOrEmpty();

            var query = Query<T>.Where(filter);
            _database.GetCollection<T>(_collectionName).Remove(query);
        }

        public List<T> Find<T>(Expression<Func<T, bool>> filter)
        {
            Condition.Requires(_collectionName).IsNotNullOrEmpty();

            var query = Query<T>.Where(filter);
            return _database.GetCollection<T>(_collectionName).FindAs<T>(query).ToList();
        }

        public List<T> Find<T>(Expression<Func<T, bool>> filter, string collectionName)
        {
            var query = Query<T>.Where(filter);

            return _database.GetCollection<T>(collectionName).FindAs<T>(query).ToList();
        }

        public T Find<T, T2>(Expression<Func<T, bool>> filter, Expression<Func<T, T2>> orderBy)
        {
            return
                _database.GetCollection<T>(_collectionName)
                         .AsQueryable<T>()
                         .Where(filter)
                         .OrderBy(orderBy)
                         .FirstOrDefault();
        }

        public T SingleOrDefault<T>(Expression<Func<T, bool>> filter)
        {
            var query = Query<T>.Where(filter);

            return _database.GetCollection<T>(_collectionName).FindAs<T>(query).SingleOrDefault();
        }
    }
}
