import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.sass'
import DeveloperApiKeyCard from '../../components/DeveloperApiKeyCard'
import DeveloperComponentsList from '../../components/DeveloperComponentsList'
import DeveloperDocsCard from '../../components/DeveloperDocsCard'

export default function ThirdDeveloper() {
  const [apiKey, setApiKey] = useState(null)
  const [loadingKey, setLoadingKey] = useState(false)
  const [components, setComponents] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(false)
  const [showComponents, setShowComponents] = useState(false)
  const [apiKeyError, setApiKeyError] = useState(null)
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const token = userData.accessToken

  const fetchApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.get('http://localhost:8080/api/auth/developer/key', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false
      })
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur récupération clé :', err)
    } finally {
      setLoadingKey(false)
    }
  }

  const regenerateApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.put('http://localhost:8080/api/auth/developer/regenerate', null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur régénération :', err)
    } finally {
      setLoadingKey(false)
    }
  }

  const validateApiKey = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/developer/validatekey', {
        apiKey
      })

      return res.data.valid
    } catch (err) {
      console.error('Erreur validation clé API :', err)
      return false
    }
  }

  const fetchComponents = async () => {
    setLoadingComponents(true)

    const isValid = await validateApiKey()
    if (!isValid) {
      setApiKeyError('Clé API invalide ou expirée.')
      setLoadingComponents(false)
      return
    }

    try {
      const res = await axios.get('http://localhost:8080/api/developer/components', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComponents(res.data)
    } catch (err) {
      console.error('Erreur récupération composants :', err)
    } finally {
      setLoadingComponents(false)
    }
  }

  const downloadComponent = async (name) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/developer/components/${name}/download`, {
        responseType: 'blob', // Important pour récupérer un fichier
        headers: { Authorization: `Bearer ${token}` }
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${name}.zip`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Erreur téléchargement composant :', err)
    }
  }

  useEffect(() => {
    fetchApiKey()
  }, [])

  const toggleComponentList = async () => {
    if (!showComponents && components.length === 0) {
      await fetchComponents()
    }
    setShowComponents(!showComponents)
  }

  return (
    <div className="third-developer">
      <h1 className="page-title" onClick={() => window.location.href = '/developer'}>
        Dashboard Développeur
      </h1>

      <DeveloperApiKeyCard
        apiKey={apiKey}
        loadingKey={loadingKey}
        onRegenerate={regenerateApiKey}
      />
      <DeveloperDocsCard />
      <DeveloperComponentsList
        show={showComponents}
        toggle={toggleComponentList}
        components={components}
        loading={loadingComponents}
        error={apiKeyError}
        onDownload={downloadComponent}
        fetchComponents={fetchComponents}
      />
    </div>
  )
}