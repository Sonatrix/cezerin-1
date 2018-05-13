const mongo = require('../../lib/mongo');
const parse = require('../../lib/parse');

class CheckoutFieldsService {
  getCheckoutFields() {
    return mongo.db
      .collection('checkoutFields')
      .find()
      .toArray()
      .then(fields => fields.map(field => ({...field, _id: undefined})));
  }

  getCheckoutField(name) {
    return mongo.db
      .collection('checkoutFields')
      .findOne({name})
      .then(field => this.changeProperties(field));
  }

  updateCheckoutField(name, data) {
    const field = this.getValidDocumentForUpdate(data);
    return mongo.db
      .collection('checkoutFields')
      .updateOne(
        {name},
        {
          $set: field,
        },
        {upsert: true}
      )
      .then(() => this.getCheckoutField(name));
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing');
    }

    const field = {};

    if (data.status !== undefined) {
      field.status = parse.getString(data.status);
    }

    if (data.label !== undefined) {
      field.label = parse.getString(data.label);
    }

    if (data.placeholder !== undefined) {
      field.placeholder = parse.getString(data.placeholder);
    }

    return field;
  }

  changeProperties(field) {
    if (field) {
      return {
        ...field,
        _id: undefined,
        name: undefined,
      };
    }
    return {
      status: 'required',
      label: '',
      placeholder: '',
    };
  }
}

module.exports = new CheckoutFieldsService();
