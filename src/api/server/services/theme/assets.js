const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const settings = require('../../lib/settings');

class ThemeAssetsService {
  deleteFile(fileName) {
    return new Promise((resolve, reject) => {
      const filePath = path.resolve(
        `${settings.themeAssetsUploadPath}/${fileName}`
      );
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {
          resolve();
        });
      } else {
        reject('File not found');
      }
    });
  }

  uploadFile(req, res) {
    const uploadDir = path.resolve(settings.themeAssetsUploadPath);

    const form = new formidable.IncomingForm();
    let fileName = null;
    let fileSize = 0;

    form.uploadDir = uploadDir;

    form
      .on('fileBegin', (name, file) => {
        // Emitted whenever a field / value pair has been received.
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

module.exports = new ThemeAssetsService();
