import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import './index.sass'

export default function Restaurant() {
  const { idRestaurant } = useParams()

  return (
    <div>
      <Header />
      <div className='home'>
        <div className='restaurant-banner'>
          <img src='https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvOWM4OGQ3YWZjYjAyNmZkZmNlZTMxNDA4MTgwYjIwYmYvNjNkMTg3NDU4OTJjMTAwYmU5ZTRlZjNjNTYwYzkyMDQuanBlZw==' alt='Restaurant' />
        </div>
        <div className='restaurant-info'>
          <div>
            <h1>Restaurant {idRestaurant}</h1>
            <p>fsdfsdfsd</p>
            <p>fsdfsdfsd</p>
            <p>fsdfsdfsd</p>
            <p>fsdfsdfsd</p>
          </div>
          <SearchBar />
        </div>
        <div className='line'></div>
        <div className='restaurant-products'>
          <h2>Categories</h2>
          <div className='restaurant-products__list'>
            <ProductCard product={{ name: 'Product 1', description: 'Description 1', price: '10,00', image: 'https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvODJkNjEyYzY1ZDNmNTVhNTdlNTZhZTlhZDRjMDE1ZTEvMGZiMzc2ZDFkYTU2YzA1NjQ0NDUwMDYyZDI1YzVjODQuanBlZw==' }} />
            <ProductCard product={{ name: 'Product 2', description: 'Description 2', price: '20,00', image: 'https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvODJkNjEyYzY1ZDNmNTVhNTdlNTZhZTlhZDRjMDE1ZTEvMGZiMzc2ZDFkYTU2YzA1NjQ0NDUwMDYyZDI1YzVjODQuanBlZw==' }} />
            <ProductCard product={{ name: 'Product 3', description: 'Description 3', price: '30,00', image: 'https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvODJkNjEyYzY1ZDNmNTVhNTdlNTZhZTlhZDRjMDE1ZTEvMGZiMzc2ZDFkYTU2YzA1NjQ0NDUwMDYyZDI1YzVjODQuanBlZw==' }} />
            <ProductCard product={{ name: 'Product 4', description: 'Description 4', price: '40,00', image: 'https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvODJkNjEyYzY1ZDNmNTVhNTdlNTZhZTlhZDRjMDE1ZTEvMGZiMzc2ZDFkYTU2YzA1NjQ0NDUwMDYyZDI1YzVjODQuanBlZw==' }} />
            <ProductCard product={{ name: 'Product 5', description: 'Description 5', price: '50,00', image: 'https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvODJkNjEyYzY1ZDNmNTVhNTdlNTZhZTlhZDRjMDE1ZTEvMGZiMzc2ZDFkYTU2YzA1NjQ0NDUwMDYyZDI1YzVjODQuanBlZw==' }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}