const mongo = require('../../lib/mongo');
const parse = require('../../lib/parse');
const ObjectID = require('mongodb').ObjectID;

class ProductOptionValuesService {
  constructor() {}

  getOptionValues(productId, optionId) {
    const productObjectID = new ObjectID(productId);

    return mongo.db
      .collection('products')
      .findOne({_id: productObjectID}, {fields: {options: 1}})
      .then(product => (product && product.options ? product.options : null))
      .then(
        options =>
          options && options.length > 0
            ? options.find(option => option.id.toString() === optionId)
            : null
      )
      .then(
        option => (option && option.values.length > 0 ? option.values : [])
      );
  }

  getSingleOptionValue(productId, optionId, valueId) {
    return this.getOptionValues(productId, optionId).then(optionValues =>
      optionValues.find(optionValue => optionValue.id.toString() === valueId)
    );
  }

  addOptionValue(productId, optionId, data) {
    if (!ObjectID.isValid(productId) || !ObjectID.isValid(optionId)) {
      return Promise.reject('Invalid identifier');
    }
    const productObjectID = new ObjectID(productId);
    const optionObjectID = new ObjectID(optionId);

    const optionValueData = this.getValidDocumentForInsert(data);

    return mongo.db
      .collection('products')
      .updateOne(
        {
          _id: productObjectID,
          'options.id': optionObjectID,
        },
        {$push: {'options.$.values': optionValueData}}
      )
      .then(res => this.getOptionValues(productId, optionId));
  }

  updateOptionValue(productId, optionId, valueId, data) {
    if (
      !ObjectID.isValid(productId) ||
      !ObjectID.isValid(optionId) ||
      !ObjectID.isValid(valueId)
    ) {
      return Promise.reject('Invalid identifier');
    }

    if (data.name !== undefined) {
      return this.getModifiedOptionValues(
        productId,
        optionId,
        valueId,
        data.name
      )
        .then(values =>
          this.overwriteAllValuesForOption(productId, optionId, values)
        )
        .then(updateResult => this.getOptionValues(productId, optionId));
    }
    return Promise.reject('Please, specify value name');
  }

  deleteOptionValue(productId, optionId, valueId) {
    if (
      !ObjectID.isValid(productId) ||
      !ObjectID.isValid(optionId) ||
      !ObjectID.isValid(valueId)
    ) {
      return Promise.reject('Invalid identifier');
    }

    return this.getOptionValuesWithDeletedOne(productId, optionId, valueId)
      .then(values =>
        this.overwriteAllValuesForOption(productId, optionId, values)
      )
      .then(updateResult => this.getOptionValues(productId, optionId));
  }

  getModifiedOptionValues(productId, optionId, valueId, name) {
    return this.getOptionValues(productId, optionId).then(values => {
      if (values && values.length > 0) {
        values = values.map(value => {
          if (value.id.toString() === valueId) {
            value.name = name;
            return value;
          }
          return value;
        });
      }

      return values;
    });
  }

  getOptionValuesWithDeletedOne(productId, optionId, deleteValueId) {
    return this.getOptionValues(productId, optionId).then(values => {
      if (values && values.length > 0) {
        values = values.filter(value => value.id.toString() !== deleteValueId);
      }

      return values;
    });
  }

  overwriteAllValuesForOption(productId, optionId, values) {
    const productObjectID = new ObjectID(productId);
    const optionObjectID = new ObjectID(optionId);

    if (!values) {
      return;
    }

    return mongo.db
      .collection('products')
      .updateOne(
        {_id: productObjectID, 'options.id': optionObjectID},
        {$set: {'options.$.values': values}}
      );
  }

  getValidDocumentForInsert(data) {
    const optionValue = {
      id: new ObjectID(),
      name: parse.getString(data.name),
    };

    return optionValue;
  }
}

module.exports = new ProductOptionValuesService();
