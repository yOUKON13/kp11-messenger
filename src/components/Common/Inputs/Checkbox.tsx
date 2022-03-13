type PropType = {
  label?: string
}

const Checkbox: React.FC<PropType> = function ({ label }) {
  return (
    <div className="checkbox-container flex-container">
      <input type="checkbox" id={label} className="input" />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default Checkbox
