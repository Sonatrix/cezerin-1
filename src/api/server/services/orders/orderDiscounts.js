const settings = require('../../lib/settings');
const mongo = require('../../lib/mongo');
const utils = require('../../lib/utils');
const parse = require('../../lib/parse');
const ObjectID = require('mongodb').ObjectID;
const OrdersService = require('./orders');

class OrdertDiscountsService {
  constructor() {}

  addDiscount(order_id, data) {
    if (!ObjectID.isValid(order_id)) {
      return Promise.reject('Invalid identifier');
    }
    const orderObjectID = new ObjectID(order_id);
    const discount = this.getValidDocumentForInsert(data);

    return mongo.db.collection('orders').updateOne(
      {
        _id: orderObjectID,
      },
      {
        $push: {
          discounts: discount,
        },
      }
    );
  }

  updateDiscount(order_id, discount_id, data) {
    if (!ObjectID.isValid(order_id) || !ObjectID.isValid(discount_id)) {
      return Promise.reject('Invalid identifier');
    }
    const orderObjectID = new ObjectID(order_id);
    const discountObjectID = new ObjectID(discount_id);
    const discount = this.getValidDocumentForUpdate(data);

    return mongo.db
      .collection('orders')
      .updateOne(
        {
          _id: orderObjectID,
          'discounts.id': discountObjectID,
        },
        {$set: discount}
      )
      .then(res => OrdersService.getSingleOrder(order_id));
  }

  deleteDiscount(order_id, discount_id) {
    if (!ObjectID.isValid(order_id) || !ObjectID.isValid(discount_id)) {
      return Promise.reject('Invalid identifier');
    }
    const orderObjectID = new ObjectID(order_id);
    const discountObjectID = new ObjectID(discount_id);

    return mongo.db
      .collection('orders')
      .updateOne(
        {
          _id: orderObjectID,
        },
        {
          $pull: {
            discounts: {
              id: discountObjectID,
            },
          },
        }
      )
      .then(res => OrdersService.getSingleOrder(order_id));
  }

  getValidDocumentForInsert(data) {
    return {
      id: new ObjectID(),
      name: parse.getString(data.name),
      amount: parse.getNumberIfPositive(data.amount),
    };
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing');
    }

    const discount = {};

    if (data.variant_id !== undefined) {
      discount['discounts.$.name'] = parse.getString(data.name);
    }

    if (data.quantity !== undefined) {
      discount['discounts.$.amount'] = parse.getNumberIfPositive(data.amount);
    }

    return discount;
  }
}

module.exports = new OrdertDiscountsService();
