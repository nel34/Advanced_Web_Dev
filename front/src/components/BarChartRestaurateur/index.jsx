import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './index.sass'
import axios from 'axios'

export default function BarChartRestaurateur() {
  const { user } = useAuth()
  const [restaurantId, setRestaurantId] = useState('')
  const [data, setData] = useState([])

  const fetchRestaurantId = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/restaurants/user/${user.id}`)
      setRestaurantId(res.data._id)
    } catch (err) {
      console.error('Erreur récupération restaurant :', err)
    }
  }

  const fetchData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orders/sales-per-week/${id}`)
      setData(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des ventes hebdo :', err)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchRestaurantId()
    }
  }, [user])

  useEffect(() => {
    if (restaurantId) {
      fetchData(restaurantId)
      const intervalId = setInterval(() => {
        fetchData(restaurantId)
      }, 5000)
      return () => clearInterval(intervalId)
    }
  }, [restaurantId])

  return (
    <div className="bar-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${value}€`} />
          <Tooltip formatter={(val) => [`${val.toFixed(2)}€`, 'Ventes']} />
          <Bar dataKey="ventes" fill="black" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
