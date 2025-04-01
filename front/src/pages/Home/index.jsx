import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './index.sass'

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
      <Footer />
    </div>
  )
}