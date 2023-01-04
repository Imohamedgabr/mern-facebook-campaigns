import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import Campaigns from './Campaigns'


const Campaign = () => {

  const [fields, setFields] = useState([])
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const getFields = async () => {
      const fieldsFromServer = await fetchFields()
      setFields(fieldsFromServer)
    }
    getFields()

    const getCasetCampaigns = async () => {
      const campaignsFromServer = await fetchCampaigns()
      setCampaigns(campaignsFromServer)
    }

    getCasetCampaigns()

  }, [])

  // Fetch Fields related to user
  const fetchFields = async () => {
    const res = await fetch('http://localhost:8080/api/fields')
    const data = await res.json()

    return data
  }
  
  const fieldsData = fields.reduce((obj, cur) => ({...obj, [cur.name]: {"type":cur.type , "title":cur.name}}), {})

  // list of statuc fields for campaign and adset
  const campaignFields = {
    name: {"type":"string" , "title":"name"},
    title: {"type":"string" , "title":"title"},
    type: {"type":"string" , "typez":"type"},
    objective: {"type":"string" , "title":"objective"},
    spendLimit: {"type":"string" , "title":"Spend Limit"},
    adsetDailtyBudget: {"type":"string" , "title":"Adset Dailty Budget"},
    adsetStartDate: {"type":"string", "format": "date" , "title":"Adset Start Date"},
    adsetStartTime: {"type":"string" , "title":"Adset StartTime"},
    adsetLocation: {"type":"string" , "title":"Adset Location"},
    adsetAge: {"type":"string" , "title":"Adset Age"},
    adsetGender: {"type":"string" , "title":"Adset Gender"},
    adsetLanguages: {"type":"string" , "title":"Adset Languages"},
    adsetName: {"type":"string" , "title":"Adset Name"},
    adsetPlacementForAds: {"type":"string" , "title":"Adset Placement For Ads"},
    adsetAssertCustomizationFeeds: {"type":"string" , "title":"Adset Assert Customization Feeds"},
    adsetAssertCustomizationStories: {"type":"string" , "title":"Adset AssertCustomization Stories"},
    adFacebookPage: {"type":"string" , "title":"First Ad FacebookPage"},
    adInstagramAccount: {"type":"string" , "title":"First Ad Instagram Account"},
    adCreativeSource: {"type":"string" , "title":"First Ad Creative Source"},
    adMedia: {"type":"string" , "title":"First Ad Media"},
    adPrimaryText: {"type":"string" , "title":"First Ad Primary Text"},
    adHeadLine: {"type":"string" , "title":"First Ad HeadLine"},
    adCallToAction: {"type":"string" , "title":"First Ad CallToAction"},
    adWebsiteUrl: {"type":"string" , "title":"First Ad WebsiteUrl"},
    adAppEvents: {"type":"string" , "title":"First Ad AppEvents"},
    adVideoUrl: {"type":"string" , "title":"First Ad VideoUrl"}
  }

  const allFields = { ...fieldsData, ...campaignFields }

  // define the schema of the fields
  const schema: RJSFSchema = {
    title: "Create Campaign",
    type: "object",
    required: ["name","age","phone"],
    properties: allFields
  };

  const onSubmit = async ({formData}) => {
    // send data to the server

    const campaignData = {
      "name" : formData.name,
      "type": formData.type,
      "objective": formData.objective,
      "spendLimit": formData.spendLimit,
      "adsets": [
          {
            "daily_budget": formData.adsetDailtyBudget,
            "start_date": formData.adsetStartTime,
            "start_time": formData.adsetStartDate,
            "location": formData.adsetLocation,
            "age": formData.adsetAge,
            "gender": formData.adsetGender,
            "languages": formData.adsetLanguages,
            "name": formData.adsetName,
            "placement_for_ads": formData.adsetPlacementForAds,
            "assert_customization_feeds": formData.adsetAssertCustomizationFeeds,
            "assert_customization_stories": formData.adsetAssertCustomizationStories,
            "Ads": [
                {
                    "facebook_page": formData.adFacebookPage,
                    "instagram_account": formData.adInstagramAccount,
                    "creative_source": formData.adsetLocation,
                    "media": formData.adMedia,
                    "primary_text": formData.adPrimaryText,
                    "head_line": formData.adHeadLine,
                    "call_to_action": formData.adCallToAction,
                    "website_url": formData.adWebsiteUrl,
                    "app_events": formData.adAppEvents,
                    "video_url": formData.adVideoUrl
                }
              ]
            }
          ]
      };

    const res = await fetch('http://localhost:8080/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    })
    
    const data = await res.json()
    
    console.log("Data submitted: ", data )

    alert('Campaign was added successfully')
  };

  // Fetch campaigns related to user
  const fetchCampaigns = async () => {
    const res = await fetch('http://localhost:8080/api/campaigns')
    const data = await res.json()

    return data
  }
  
  // Delete Campaign
  const deleteCampaign = async (id) => {
    const res = await fetch(`http://localhost:8080/api/campaigns/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
      : alert('Error Deleting This campaign')
  }

  return (
    <div>
      <Campaigns
          campaigns={campaigns}
          onDelete={deleteCampaign}
        />
      <hr/>
      <Form style={{width: "470px"}} onSubmit={onSubmit}
        schema={schema}
        validator={validator}
        />
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default Campaign
