const { readFile } = require('fs/promises')
const { error } = require('./constants')
const { log } = require('console')
const User = require('./User')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if (!validation.valid) throw new Error(validation.error)
        const users = File.parseCSVToJSON(content)
        return users
    }
    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf8')
    }
    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...linesWithoutHeader] = csvString.split('\n')
        const isHeaderValid = header === options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        const isContentLengthAccepted = linesWithoutHeader.length > 0 && linesWithoutHeader.length <= options.maxLines
        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }
    static parseCSVToJSON(csvString) {
        const [header, ...valuesLines] = csvString.split('\n')
        const props = header.split(',')
        const users = valuesLines.map(valueLine => {
            const values = valueLine.split(',')
            let user = {}
            for(const idx in values) {
                user[props[idx]] = values[idx]
            }
            return new User(user)
        })
        return users
    }}

module.exports = File 