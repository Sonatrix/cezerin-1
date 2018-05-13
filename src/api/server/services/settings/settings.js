const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const url = require('url');
const formidable = require('formidable');
const defaultsettings = require('../../lib/settings');
const utils = require('../../lib/utils');
const mongo = require('../../lib/mongo');
const parse = require('../../lib/parse');

class SettingsService {
  constructor() {
    this.defaultSettings = {
      domain: 'http://localhost',
      logo_file: null,
      language: 'en',
      currency_code: 'USD',
      currency_symbol: '$',
      /* eslint-disable-next-line */
      currency_format: '${amount}',
      thousand_separator: ',',
      decimal_separator: '.',
      decimal_number: 2,
      timezone: 'Asia/Singapore',
      date_format: 'MMMM D, YYYY',
      time_format: 'h:mm a',
      default_shipping_country: 'SG',
      default_shipping_state: '',
      default_shipping_city: '',
      default_product_sorting: 'stock_status,price,position',
      product_fields:
        'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position',
      products_limit: 30,
      weight_unit: 'kg',
      length_unit: 'cm',
      hide_billing_address: false,
      order_confirmation_copy_to: '',
    };
  }

  getSettings() {
    return mongo.db
      .collection('settings')
      .findOne()
      .then(res => this.changeProperties(res));
  }

  updateSettings(data) {
    const newSettings = this.getValidDocumentForUpdate(data);
    return this.insertDefaultSettingsIfEmpty().then(() =>
      mongo.db
        .collection('settings')
        .updateOne(
          {},
          {
            $set: newSettings,
          },
          {upsert: true}
        )
        .then(() => this.getSettings())
    );
  }

  insertDefaultSettingsIfEmpty() {
    return mongo.db
      .collection('settings')
      .count()
      .then(count => {
        if (count === 0) {
          return mongo.db
            .collection('settings')
            .insertOne(this.defaultSettings);
        }
        return null;
      });
  }

  getValidDocumentForUpdate(data) {
    if (Object.keys(data).length === 0) {
      return new Error('Required fields are missing');
    }

    const settings = {};

    if (data.language !== undefined) {
      settings.language = parse.getString(data.language);
    }

    if (data.currency_code !== undefined) {
      settings.currency_code = parse.getString(data.currency_code);
    }

    if (data.domain !== undefined) {
      settings.domain = parse.getString(data.domain);
    }

    if (data.currency_symbol !== undefined) {
      settings.currency_symbol = parse.getString(data.currency_symbol);
    }

    if (data.currency_format !== undefined) {
      settings.currency_format = parse.getString(data.currency_format);
    }

    if (data.thousand_separator !== undefined) {
      settings.thousand_separator = parse.getString(data.thousand_separator);
    }

    if (data.decimal_separator !== undefined) {
      settings.decimal_separator = parse.getString(data.decimal_separator);
    }

    if (data.decimal_number !== undefined) {
      settings.decimal_number =
        parse.getNumberIfPositive(data.decimal_number) || 0;
    }

    if (data.timezone !== undefined) {
      settings.timezone = parse.getString(data.timezone);
    }

    if (data.date_format !== undefined) {
      settings.date_format = parse.getString(data.date_format);
    }

    if (data.time_format !== undefined) {
      settings.time_format = parse.getString(data.time_format);
    }

    if (data.default_shipping_country !== undefined) {
      settings.default_shipping_country = parse.getString(
        data.default_shipping_country
      );
    }

    if (data.default_shipping_state !== undefined) {
      settings.default_shipping_state = parse.getString(
        data.default_shipping_state
      );
    }

    if (data.default_shipping_city !== undefined) {
      settings.default_shipping_city = parse.getString(
        data.default_shipping_city
      );
    }

    if (data.default_product_sorting !== undefined) {
      settings.default_product_sorting = parse.getString(
        data.default_product_sorting
      );
    }

    if (data.product_fields !== undefined) {
      settings.product_fields = parse.getString(data.product_fields);
    }

    if (data.products_limit !== undefined) {
      settings.products_limit = parse.getNumberIfPositive(data.products_limit);
    }

    if (data.weight_unit !== undefined) {
      settings.weight_unit = parse.getString(data.weight_unit);
    }

    if (data.length_unit !== undefined) {
      settings.length_unit = parse.getString(data.length_unit);
    }

    if (data.logo_file !== undefined) {
      settings.logo_file = parse.getString(data.logo_file);
    }

    if (data.hide_billing_address !== undefined) {
      settings.hide_billing_address = parse.getBooleanIfValid(
        data.hide_billing_address,
        false
      );
    }

    if (data.order_confirmation_copy_to !== undefined) {
      settings.order_confirmation_copy_to = parse.getString(
        data.order_confirmation_copy_to
      );
    }

    return settings;
  }

  changeProperties(data) {
    if (data) {
      const newData = Object.assign({}, data);
      delete newData._id;
      if (newData.logo_file && newData.logo_file.length > 0) {
        newData.logo = url.resolve(
          newData.domain,
          `${defaultsettings.filesUploadUrl}/${newData.logo_file}`
        );
      } else {
        newData.logo = null;
      }
      return newData;
    }
    return this.defaultSettings;
  }

  deleteLogo() {
    return this.getSettings().then(data => {
      if (data.logo_file && data.logo_file.length > 0) {
        const filePath = path.resolve(
          `${defaultsettings.filesUploadPath}/${data.logo_file}`
        );
        fs.unlink(filePath, () => {
          this.updateSettings({logo_file: null});
        });
      }
    });
  }

  uploadLogo(req, res) {
    const uploadDir = path.resolve(defaultsettings.filesUploadPath);
    fse.ensureDirSync(uploadDir);

    const form = new formidable.IncomingForm();
    let fileName = null;
    let fileSize = 0;

    form.uploadDir = uploadDir;

    form
      .on('fileBegin', (name, file) => {
        // Emitted whenever a field / value pair has been received.
        /* eslint-disable-next-line */
        file.name = utils.getCorrectFileName(file.name);
        /* eslint-disable-next-line */
        file.path = `${uploadDir}/${file.name}`;
      })
      .on('file', (field, file) => {
        // every time a file has been uploaded successfully,
        fileName = file.name;
        fileSize = file.size;
      })
      .on('error', err => {
        res.status(500).send(this.getErrorMessage(err));
      })
      .on('end', () => {
        // Emitted when the entire request has been received, and all contained files have finished flushing to disk.
        if (fileName) {
          this.updateSettings({logo_file: fileName});
          res.send({file: fileName, size: fileSize});
        } else {
          res
            .status(400)
            .send(this.getErrorMessage('Required fields are missing'));
        }
      });

    form.parse(req);
  }

  getErrorMessage(err) {
    return {error: true, message: err.toString()};
  }
}

module.exports = new SettingsService();
