import { useEffect, useState } from 'react'
import axios from 'axios'
import ComponentListSection from '../../components/ComponentListSection'
import AddComponentCard from '../../components/AddComponentCard'
import NotificationPopup from '../../components/NotificationPopup'
import TechnicalNotification from '../../components/TechnicalNotification'
import './index.sass'

export default function TechnicalPage() {
  const [components, setComponents] = useState([])
  const [newComponentName, setNewComponentName] = useState('')
  const [files, setFiles] = useState({ indexJsx: null, indexSass: null })
  const [notification, setNotification] = useState(null)
  const [showComponents, setShowComponents] = useState(false)
  const fetchComponents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/technical/components')
      setComponents(res.data)
    } catch (err) {
      console.error('Erreur récupération composants :', err)
    }
  }

  const handleDelete = async (name) => {
    try {
      await axios.delete(`http://localhost:8080/api/technical/components/${name}`)
      setNotification({ type: 'success', message: `${name} supprimé.` })
      fetchComponents()
    } catch (err) {
      console.error('Erreur suppression composant :', err)
      setNotification({ type: 'error', message: `Erreur suppression ${name}.` })
    }
  }

  const handleAdd = async () => {
    if (!newComponentName || !files.indexJsx || !files.indexSass) {
      return setNotification({ type: 'error', message: 'Nom ou fichiers manquants.' });
    }
  
    const formData = new FormData();
    formData.append('componentName', newComponentName); 
    formData.append('file1', files.indexJsx);          
    formData.append('file2', files.indexSass);          
  
    try {
      await axios.post('http://localhost:8080/api/technical/components', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      setNotification({ type: 'success', message: `${newComponentName} ajouté.` });
      setNewComponentName('');
      setFiles({ indexJsx: null, indexSass: null });
      fetchComponents(); 
    } catch (err) {
      console.error('Erreur ajout composant :', err);
      setNotification({ type: 'error', message: `Erreur ajout ${newComponentName}.` });
    }
  };  
  
  const toggleComponentList = () => {
    const nextState = !showComponents;
    setShowComponents(nextState);
  
    // Si on ouvre la liste → on recharge les composants
    if (nextState) {
      fetchComponents();
    }
  };

  return (
    <div className="technical-page">
      <h1 className="dashboard-title">Dashboard Technicien</h1>
      {notification && (
        <TechnicalNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}  
  
      <AddComponentCard
      newComponentName={newComponentName}
      setNewComponentName={setNewComponentName}
      files={files}
      setFiles={setFiles}
      handleAdd={handleAdd}
      />

      <ComponentListSection
        show={showComponents}
        toggle={toggleComponentList}
        components={components}
        handleDelete={handleDelete}
      />

    </div>
  )    
}