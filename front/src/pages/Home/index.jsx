import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestaurantCard from '../../components/RestaurantCard'
import './index.sass'

export default function Home() {
  return (
    <div>
      <Header />
      <div className='home'>
        <div>
          <h2>Categories</h2>
        </div>
        <div>
          <h2>Filters</h2>
        </div>
        <div className='line'></div>
        <div className='home__restaurants'>
          <RestaurantCard name="Restaurant 1" rating="3.5" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvOWM4OGQ3YWZjYjAyNmZkZmNlZTMxNDA4MTgwYjIwYmYvNjNkMTg3NDU4OTJjMTAwYmU5ZTRlZjNjNTYwYzkyMDQuanBlZw==" />
          <RestaurantCard name="Restaurant 2" rating="4.2" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYjJhZjk0MTI3Zjk2MGI3N2MxODkyNTU2NmExZDhhOTgvOWIzYWFlNGNmOTBmODk3Nzk5YTVlZDM1N2Q2MGUwOWQuanBlZw==" />
          <RestaurantCard name="Restaurant 3" rating="4.8" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvOWQyYTUxZGIzYjFkODE2ZTNhYWQ1ZGM4YTRjMzNmNGUvNzgzNTQyOGIyODZhY2I1NzY0NmEyNTZjODk3YzBlOWUuanBlZw==" />
          <RestaurantCard name="Restaurant 4" rating="3.5" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMzgzZGRmZWMxNjBlYzhmZDllMDM1ZjBjNjE3ZDMxMjIvOWIzYWFlNGNmOTBmODk3Nzk5YTVlZDM1N2Q2MGUwOWQuanBlZw==" />
          <RestaurantCard name="Restaurant 5" rating="2.5" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvNmQ2NmE5NTY1NWI2ZDExOTBlNjI2NTBhYjVkNDFmNzAvZmI4NjY2MjE0OGJlODU1ZDkzMWIzN2Q2YzFlNWZjYmUuanBlZw==" />
          <RestaurantCard name="Restaurant 6" rating="4.9" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvOWY3MTA3ODczODE4NTc1Y2RmODYzMTc5MzljYmZkYjUvODIwODgzYTQ4NTY3NjcwYWNiZDcyMGJjNzYzOTEyOTEuanBlZw==" />
          <RestaurantCard name="Restaurant 7" rating="3.8" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMjM0OTNkZjZjOWRmMzBkZDIzODhmNTZmNjIzODM2YzEvYTcwZjVjOWRmNDQwZDEwMjEzZTkzMjQ0ZTllYjdjYWQuanBlZw==" />
          <RestaurantCard name="Restaurant 8" rating="4.5" image="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvNWI0Y2Q3MjY2MjJhZTgwM2E0MDFlZWExODg0NDUyNDkvNjlhZDg1Y2Q3YjM5ODg4MDQyYjNiYmYxYzIyZDYzMGQuanBlZw==" />
        </div>
      </div>
      <Footer />
    </div>
  )
}