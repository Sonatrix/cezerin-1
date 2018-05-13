const mongo = require('../../lib/mongo');
const parse = require('../../lib/parse');

class EmailTemplatesService {
  getEmailTemplate(name) {
    return mongo.db
      .collection('emailTemplates')
      .findOne({name})
      .then(template => this.changeProperties(template));
  }

  updateEmailTemplate(name, data) {
    const template = this.getValidDocumentForUpdate(data);
    return mongo.db
      .collection('emailTemplates')
      .updateOne(
        {name},
        {
          $set: template,
        },
        {upsert: true}
      )
      .then(() => this.getEmailTemplate(name));
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing');
    }

    const template = {};

    if (data.subject !== undefined) {
      template.subject = parse.getString(data.subject);
    }

    if (data.body !== undefined) {
      template.body = parse.getString(data.body);
    }

    return template;
  }

  changeProperties(template) {
    if (template) {
      return {
        ...template,
        _id: undefined,
        name: undefined,
      };
    }
    return {
      subject: '',
      body: '',
    };
  }
}

module.exports = new EmailTemplatesService();
