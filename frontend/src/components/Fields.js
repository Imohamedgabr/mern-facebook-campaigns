import Field from './Field'

const Fields = ({ fields, onDelete, onToggle }) => {
  return (
    <>
      {fields.map((field, index) => (
        <Field key={index} field={field} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Fields
