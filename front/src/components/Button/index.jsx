import './index.sass'

export default function Button({ type, content }) {
  return (
    <button type={type} className="button">
      {content}
    </button>
  )
}
