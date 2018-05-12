const mongo = require('../lib/mongo');
const utils = require('../lib/utils');
const parse = require('../lib/parse');
const ObjectID = require('mongodb').ObjectID;
const cache = require('lru-cache')({
  max: 10000,
  maxAge: 1000 * 60 * 60 * 24 // 24h
});

const REDIRECTS_CACHE_KEY = 'redirects';

class RedirectsService {
  constructor() {}

  getRedirects() {
    const redirectsFromCache = cache.get(REDIRECTS_CACHE_KEY);

    if (redirectsFromCache) {
      return Promise.resolve(redirectsFromCache);
    }
    return mongo.db
      .collection('redirects')
      .find()
      .toArray()
      .then(items => items.map(item => this.changeProperties(item)))
      .then(items => {
        cache.set(REDIRECTS_CACHE_KEY, items);
        return items;
      });
  }

  getSingleRedirect(id) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject('Invalid identifier');
    }
    const redirectObjectID = new ObjectID(id);

    return mongo.db
      .collection('redirects')
      .findOne({_id: redirectObjectID})
      .then(item => this.changeProperties(item));
  }

  addRedirect(data) {
    const redirect = this.getValidDocumentForInsert(data);
    return mongo.db
      .collection('redirects')
      .insertMany([redirect])
      .then(res => {
        cache.del(REDIRECTS_CACHE_KEY);
        return this.getSingleRedirect(res.ops[0]._id.toString());
      });
  }

  updateRedirect(id, data) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject('Invalid identifier');
    }
    const redirectObjectID = new ObjectID(id);
    const redirect = this.getValidDocumentForUpdate(id, data);

    return mongo.db
      .collection('redirects')
      .updateOne(
        {
          _id: redirectObjectID
        },
        {$set: redirect}
      )
      .then(res => {
        cache.del(REDIRECTS_CACHE_KEY);
        return this.getSingleRedirect(id);
      });
  }

  deleteRedirect(id) {
    if (!ObjectID.isValid(id)) {
      return Promise.reject('Invalid identifier');
    }
    const redirectObjectID = new ObjectID(id);
    return mongo.db
      .collection('redirects')
      .deleteOne({_id: redirectObjectID})
      .then(deleteResponse => {
        cache.del(REDIRECTS_CACHE_KEY);
        return deleteResponse.deletedCount > 0;
      });
  }

  getValidDocumentForInsert(data) {
    const redirect = {
      from: parse.getString(data.from),
      to: parse.getString(data.to),
      status: 301
    };

    return redirect;
  }

  getValidDocumentForUpdate(id, data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing');
    }

    const redirect = {};

    if (data.from !== undefined) {
      redirect.from = parse.getString(data.from);
    }

    if (data.to !== undefined) {
      redirect.to = parse.getString(data.to);
    }

    return redirect;
  }

  changeProperties(item) {
    if (item) {
      item.id = item._id.toString();
      delete item._id;
    }

    return item;
  }
}

module.exports = new RedirectsService();
