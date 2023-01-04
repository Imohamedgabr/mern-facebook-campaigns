import Campaign from './Campaign'

const Campaigns = ({ campaigns, onDelete }) => {
  return (
    <>
      {campaigns.map((campaign, index) => (
        <Campaign key={index} campaign={campaign} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Campaigns
