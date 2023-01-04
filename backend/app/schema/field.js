const ajvInstance = require('./ajv-instance');

const schema = {
    type: 'object',
    properties: {
        name : {type :'string'},
        type: {type : 'string'}
    },
    required : ['name','type'],
    additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
