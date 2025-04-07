import './index.sass'

export default function ButtonTechnical({ children, onClick, type = 'button', style = {} }) {
  return (
    <button className="button-technical" type={type} onClick={onClick} style={style}>
      {children}
    </button>
  )
}
