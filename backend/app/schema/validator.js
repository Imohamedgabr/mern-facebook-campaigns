const Ajv = require('ajv')
const R = require('ramda')

/**
 * Validates request with Json Schema
 *
 * @returns {object}
 */
const validateRequest = R.curry((schema, data) => {
  const ajv = new Ajv({allErrors: true, useDefaults: true, coerceTypes: true, $data: true})
  const validate = ajv.compile(schema)
  const valid = validate(data)
  return {
    valid,
    errors: validate.errors
  }
})

/**
 * @returns {object}
 */
const createAdset = (data) => {
  return validateRequest({
    type: 'object',
    title: 'Create Adset',
    properties: {
      daily_budget: {
        type: 'string'
      },
      start_date: {
          type: 'string'
      },
      start_time: {
          type: 'string'
      },
      location: {
          type: 'string'
      },
      age: {
          type: 'string'
      },
      gender: {
          type: 'string'
      },
      languages: {
          type: 'string'
      },
      name: {
          type: 'string'
      },
      assert_customization_feeds: {
          type: 'string'
      },
      assert_customization_stories: {
          type: 'string'
      },
      Ads: {
          type: 'array'
      }
    },
    required: [ 'daily_budget' ],
    additionalProperties: true
  }, data)
}


/**
 * @returns {object}
 */
const createAd = (data) => {
  return validateRequest({
    type: 'object',
    title: 'Create Ad',
    properties: {
      facebook_page: {
        type: 'string'
      },
      instagram_account: {
          type: 'string'
      },
      creative_source: {
          type: 'string'
      },
      media: {
          type: 'string'
      },
      primary_text: {
          type: 'string'
      },
      head_line: {
          type: 'string'
      },
      call_to_action: {
          type: 'string'
      },
      website_url: {
          type: 'string'
      },
      app_events: {
          type: 'string'
      },
      video_url: {
          type: 'string'
      }
    },
    required: [ 'facebook_page' ],
    additionalProperties: true
  }, data)
}


  module.exports = {
    createAdset,
    createAd
  }
