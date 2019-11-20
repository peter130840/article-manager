const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, coerceTypes: true })

const innerSchema = { type: 'string', format: 'email' }
const schema = {
    properties: {
        page: { type: 'number' },
        rowPerpage: { type: 'number' },
        email: { format: 'email' },
        subject: { type: 'string', maxLength: 50 },
        content: { type: 'string' },
    },
}
const validate = ajv.compile(schema)

class paramCheck {
    constructor() {
        this.pageCheck = this.pageCheck.bind(this)
        this.ajvCheck = this.ajvCheck.bind(this)
    }

    ajvCheck(data) {
        if (!validate(data)) {
            console.log(validate.errors)
            //throw ajv.errorsText(validate.errors);
            throw {
                statusCode: 415,
                message: ajv.errorsText(validate.errors),
            }
        }
    }

    pageCheck(page, rowPerPage) {
        try {
            if (_.some([page, rowPerPage], item => _.isNaN(Number(item)) && !_.isEmpty(item))) {
                throw { statusCode: 400, message: 'page or rowPerPage argument is not number.' }
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new paramCheck()
