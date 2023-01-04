const ajvInstance = require('./ajv-instance');

const schema = {
    type: 'object',
    properties: {
        name : {type :'string'},
        email: {type : 'string', format:'email'}
    },
    required : ['name','email'],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
