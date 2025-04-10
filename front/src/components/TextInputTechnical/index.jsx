import './index.sass'

export default function TextInputTechnical({ id, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>Nom du composant</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-input"
      />
    </div>
  )
}
