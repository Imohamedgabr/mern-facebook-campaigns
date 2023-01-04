import { FaTimes } from 'react-icons/fa'

const Campaign = ({ campaign, onDelete }) => {
  return (
    <div>
      <h3>
        {campaign.name}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(campaign.id)}
        />
      </h3>
    </div>
  )
}

export default Campaign
