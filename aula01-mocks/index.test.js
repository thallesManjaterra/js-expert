const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "id": 123,
                "name": "Thalles Manjaterra",
                "profession": "Javascript Instructor",
                "birthDay": 1992
            },
            {
                "id": 124,
                "name": "Joazinho",
                "profession": "Javascript Specialist",
                "birthDay": 1995
            },
            {
                "id": 125,
                "name": "Joselito",
                "profession": "Java developer",
                "birthDay": 1990
            }
        ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()