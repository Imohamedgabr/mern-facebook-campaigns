import { useState } from 'react'

const AddField = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add field name')
      return
    }

    onAdd({ name, type })

    setName('')
    setType('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Field Name</label>
        <input
          type='text'
          placeholder='Add Field Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Type</label>
        <input
          type='text'
          placeholder='Add Type'
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Field' className='btn btn-block' />
    </form>
  )
}

export default AddField
