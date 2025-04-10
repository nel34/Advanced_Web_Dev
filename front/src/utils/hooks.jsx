import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { isLoading, data, error }
}

export function useFetchWithAuth(method, url) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let userData = localStorage.getItem('user')
        userData = JSON.parse(userData)
        let accessToken = userData['accessToken']

        let response = await fetch(url, {
          method: method,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (response.status === 403) {
          const refreshToken = userData['refreshToken']
          const refreshResponse = await fetch('http://localhost:8080/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          })
          if (refreshResponse.ok) {
            const tokens = await refreshResponse.json()
            userData.accessToken = tokens.accessToken
            localStorage.setItem('user', JSON.stringify(userData))

            response = await fetch(url, {
              method: method,
              credentials: 'include',
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`
              }
            })
          } else {
            setError(new Error('Token refresh failed'))
            throw new Error('Token refresh failed')
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        try {
          const data = await response.json()
          setData(data)
        }
        catch {
          setData({})
        }
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [method, url])

  return { isLoading, data, error }
}