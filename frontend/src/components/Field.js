import { FaTimes } from 'react-icons/fa'

const Field = ({ field, onDelete }) => {
  return (
    <div>
      <h3>
        {field.name}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(field.id)}
        />
      </h3>
      <p>{field.type}</p>
    </div>
  )
}

export default Field
