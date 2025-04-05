import './index.sass'

export default function Button({ type, content, onClick }) {
  return (
    <button type={type} className="button" onClick={onClick}>
      {content}
    </button>
  )
}
