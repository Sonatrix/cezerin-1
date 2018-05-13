const mongo = require('../../lib/mongo');

class PaymentGatewaysService {
  getGateway(gatewayName) {
    return mongo.db
      .collection('paymentGateways')
      .findOne({name: gatewayName})
      .then(data => this.changeProperties(data));
  }

  updateGateway(gatewayName, data) {
    if (Object.keys(data).length === 0) {
      return this.getGateway(gatewayName);
    }
    return mongo.db
      .collection('paymentGateways')
      .updateOne({name: gatewayName}, {$set: data}, {upsert: true})
      .then(() => this.getGateway(gatewayName));
  }

  changeProperties(data) {
    return {
      ...data,
      _id: undefined,
      name: undefined,
    };
  }
}

module.exports = new PaymentGatewaysService();
