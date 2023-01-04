const mongoose = require('mongoose');
const AdSchema = new mongoose.Schema({
    facebook_page :{
        type:String
    },
    instagram_account: {
        type:String
    },
    creative_source: {
        type:String
    },
    media: {
        type:String
    },
    primary_text: {
        type:String
    },
    head_line: {
        type:String
    },
    call_to_action: {
        type:String
    },
    website_url: {
        type:String
    },
    app_events: {
        type:String
    },
    video_url: {
        type:String
    },
    adset_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Adset'
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Ad',AdSchema);