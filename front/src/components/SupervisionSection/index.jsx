import './index.sass'
import ButtonTechnical from '../ButtonTechnical'

export default function MonitoringSection() {
  return (
    <section className="monitoring-card">
      <h2 className="monitoring-title">Monitoring</h2>

      <div className="monitoring-grid">
        <div className="monitoring-block">
          <p className="monitoring-label">Supervision des performances</p>
          <ButtonTechnical className="monitoring-button" onClick={() => window.open('http://localhost:9040', '_blank')}>
            Accéder à Grafana
          </ButtonTechnical>
        </div>

        <div className="monitoring-block">
          <p className="monitoring-label">Logs centralisés (Graylog)</p>
          <ButtonTechnical className="monitoring-button" onClick={() => window.open('http://localhost:9050', '_blank')}>
            Accéder à Graylog
          </ButtonTechnical>
        </div>

        <div className="monitoring-block">
          <p className="monitoring-label">Récolte des métriques</p>
          <ButtonTechnical className="monitoring-button" onClick={() => window.open('http://localhost:9090/targets?search=', '_blank')}>
            Accéder à Prometheus
          </ButtonTechnical>
        </div>

        <div className="monitoring-block">
          <p className="monitoring-label">Surveillance des conteneurs</p>
          <ButtonTechnical className="monitoring-button" onClick={() => window.open('http://localhost:9020/containers/', '_blank')}>
            Accéder à cAdvisor
          </ButtonTechnical>
        </div>

        <div className="monitoring-block">
          <p className="monitoring-label">Gestion des conteneurs</p>
          <ButtonTechnical className="monitoring-button" onClick={() => window.open('http://localhost:9000/#!/home', '_blank')}>
            Accéder à Portainer
          </ButtonTechnical>
        </div>
      </div>
    </section>
  )
}