import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Fields from './components/Fields'
import AddField from './components/AddField'
import Campaign from './components/AddCampaign'

const App = () => {
  const [showAddField, setShowAddField] = useState(false)
  const [fields, setFields] = useState([])

  useEffect(() => {
    const getFields = async () => {
      const fieldsFromServer = await fetchFields()
      setFields(fieldsFromServer)
    }

    getFields()
  }, [])

  // Fetch Fields
  const fetchFields = async () => {
    const res = await fetch('http://localhost:8080/api/fields')
    const data = await res.json()

    return data
  }

  // Add Field
  const addField = async (field) => {
    const res = await fetch('http://localhost:8080/api/fields', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(field),
    })

    const data = await res.json()

    setFields([...fields, data])
  }

  // Delete Field
  const deleteField = async (id) => {
    const res = await fetch(`http://localhost:8080/api/fields/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setFields(fields.filter((field) => field.id !== id))
      : alert('Error Deleting This Field')
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddField(!showAddField)}
          showAdd={showAddField}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddField && <AddField onAdd={addField} />}
                {fields.length > 0 ? (
                  <Fields
                    fields={fields}
                    onDelete={deleteField}
                  />
                ) : (
                  'No fields To Show'
                )}
              </>
            }
          />
          <Route path='/campaign' element={<Campaign />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
