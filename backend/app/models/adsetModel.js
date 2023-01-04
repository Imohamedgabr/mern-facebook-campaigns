const mongoose = require('mongoose');
const AdsetSchema = new mongoose.Schema({
    daily_budget :{
        type:String
    },
    start_date: {
        type:String
    },
    start_time: {
        type:String
    },
    location: {
        type:String
    },
    age: {
        type:String
    },
    gender: {
        type:String
    },
    languages: {
        type:String
    },
    name: {
        type:String
    },
    placement_for_ads: {
        type:String
    },
    assert_customization_feeds: {
        type:String
    },
    assert_customization_stories: {
        type:String
    },
    campaign_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Campaign'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Adset',AdsetSchema);