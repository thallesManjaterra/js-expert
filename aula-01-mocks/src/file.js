const { join } = require("path");
const { readFile } = require("fs/promises");
const { error } = require("./constants");
const User = require("./user");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const fileContent = await File.getFileContent(filePath);
    const validation = File.isValid(fileContent);
    if (!validation.valid) throw new Error(validation.error);
    const users = File.parseCsvToJson(fileContent);
    return users;
  }
  static async getFileContent(filePath) {
    const file = await readFile(filePath);
    const fileString = file.toString();
    return fileString;
  }

  static isValid(fileContent, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = fileContent.split("\n");
    const isHeaderValid = header === options.fields.join();
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 && fileWithoutHeader.length <= 3;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }
    return { valid: true };
  }
  static parseCsvToJson(csvString) {
    const [propsString, ...valuesString] = csvString.split("\n");
    const props = propsString.split(",");
    const values = valuesString.map((valueString) => {
      return valueString.split(",");
    });
    const users = values.map((value) => {
      const user = {};
      for (const index in value) {
        user[props[index]] = value[index];
      }
      return new User(user);
    });

    return users;
  }
}

module.exports = File;
