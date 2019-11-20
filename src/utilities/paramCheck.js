const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, coerceTypes: true })

const innerSchema = { type: 'string', format: 'email' }
const schema = {
    properties: {
        from: { type: 'string', moment: { format: ['HH:mm'] } },
        until: { type: 'string', moment: { format: ['HH:mm'] } },
        start: { type: 'string', format: 'date' },
        end: { type: 'string', format: 'date' },
        page: { type: 'number' },
        rowPerpage: { type: 'number' },
        roomScale: { type: 'number' },
        email: { format: 'email' },
        subject: { type: 'string', maxLength: 50 },
        content: { type: 'string' },
        startTime: { type: 'string', moment: { format: 'YYYY/MM/DD HH:ss' } },
        endTime: { type: 'string', moment: { format: 'YYYY/MM/DD HH:ss' } },
        roomAddress: { type: 'array', items: innerSchema },
        attendees: { type: 'array', items: innerSchema },
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
