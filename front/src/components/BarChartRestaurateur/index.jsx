import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './index.sass'
import axios from 'axios'

export default function BarChartRestaurateur() {
  const [data, setData] = useState([])
  const RESTAURANT_ID = "670000000000000000000001"

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3040/api/deliveries/sales-per-week/${RESTAURANT_ID}`)
      setData(res.data)
    } catch (err) {
      console.error("Erreur lors du chargement des ventes hebdo :", err)
    }
  }

  useEffect(() => {
    fetchData() // initial load

    const intervalId = setInterval(() => {
      fetchData()
    }, 5000)

    return () => clearInterval(intervalId) // cleanup on unmount
  }, [])

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
