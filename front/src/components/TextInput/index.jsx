import './index.sass'

export default function TextInput({ type, id, required, placeholder }) {
  return (
    <input type={type} id={id} required={required} placeholder={placeholder} />
  )
}