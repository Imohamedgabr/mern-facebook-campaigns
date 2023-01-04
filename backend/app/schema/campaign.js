const ajvInstance = require('./ajv-instance');

const schema = {
    type: 'object',
    properties: {
        name : {type :'string'},
        type: {type : 'string'},
        objective: {type : 'string'},
        spendLimit: {type : 'string'},
        adsets: {type : 'array'}
    },
    required : ['name','type'],
    additionalProperties: true
};

module.exports = ajvInstance.compile(schema);
