const db = require("../models");
const Campaign = db.campaigns;
const R = require('ramda')
const validator = require('../schema/validator');

const appConfig = require("../config/app.config");
const accessToken = appConfig.facebookAccessToken;
const accountId = appConfig.facebookAccountId;
const adsSdk = require('facebook-nodejs-business-sdk');
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const facebookCampaign = adsSdk.Campaign;
const account = new AdAccount('act_'+ accountId);

/**
 * Create and Save a new Campaign
 * @param (req, res)
 */
exports.create = (req, res) => {

  // validate Adsets
  const params = R.filter(data => !R.isNil(data), req.body)
  const invalidParamsError = {code: 400, response: {message: 'Invalid parameters'}}
  
  const errors = []
  params.adsets.forEach((item, key) => {
    const error = { key, ...invalidParamsError.response, errors: [] }
    if (R.equals(item, R.empty(item))) {
      errors.push(error)
      return
    }

    // validate Ads
    item.Ads.forEach((ad, key) => {
      const error = { key, ...invalidParamsError.response, errors: [] }
      if (R.equals(ad, R.empty(ad))) {
        errors.push(error)
        return
      }
      const validation = validator.createAd(ad)
      if (!validation.valid) {
        error.errors = validation.errors
        errors.push(error)
      }
    })
    
    const validation = validator.createAdset(item)
    if (!validation.valid) {
      error.errors = validation.errors
      errors.push(error)
    }

  })

  if (R.length(errors) > 0) {
    return res.status(invalidParamsError.code).json(errors)
  }

  // Create a Campaign
  const campaign = new Campaign({
    name: req.body.name,
    type: req.body.type,
    objective: req.body.objective,
    spendLimit: req.body.spendLimit,
    adsets: JSON.stringify(req.body.adsets)
  });

  // use facebook sdk to create campaign
  const facebookCampaignToCreate = createFacebookCampaign(campaign);

  // Save campaign in the database
  campaign
    .save(campaign)
    .then(data => {
        const response = {
            "name" : data.name,
            "type" : data.type,
            "objective" : data.objective,
            "spendLimit" : data.spendLimit,
            "adsets" : JSON.parse(data.adsets)
        }
        res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the campaign."
      });
    });
};

/**
 * Retrieve all campaigns from the database.
 * @param (req, res)
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Campaign.find(condition)
    .then(data => {
      const Campaigns = [];
      data.forEach((campaign) => {
        let CampaignData = {
          "name" : campaign.name,
          "type" : campaign.type,
          "objective" : campaign.objective,
          "spendLimit" : campaign.spendLimit,
          "adsets" : JSON.parse(campaign.adsets)
        }
        Campaigns.push(CampaignData)
      })
      res.send(Campaigns);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving campaigns."
      });
    });
};

/**
 * Find a single Campaign with an id
 * @param (req, res)
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Campaign.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Campaign with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Campaign with id=" + id });
    });
};


/**
 * Delete a Campaign with the specified id in the request
 * @param (req, res)
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Campaign.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Campaign with id=${id}. Maybe Campaign was not found!`
        });
      } else {
        res.send({
          message: "Campaign was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not Campaign Field with id=" + id
      });
    });
};

/**
 * creates a facebook campaign
 * @param {campaign} campaign 
 */
const createFacebookCampaign = (campaign) => {

  account
  .createCampaign(
    [facebookCampaign.Fields.Id],
    {
      [facebookCampaign.Fields.name]: campaign.name,
      [facebookCampaign.Fields.status]: facebookCampaign.Status.paused,
      [facebookCampaign.Fields.objective]: campaign.objective
    }
  )
  .then((result) => {
    console.log(error)
  })
  .catch((error) => {
    console.log(error)
  });
}
