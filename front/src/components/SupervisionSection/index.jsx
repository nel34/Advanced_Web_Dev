import './index.sass'
import ButtonTechnical from '../ButtonTechnical'

export default function MonitoringSection() {
  return (
    <section className="monitoring-card">
      <h2 className="monitoring-title">Monitoring</h2>

      <div className="monitoring-block">
        <h3>Supervision (Grafana)</h3>
        <ButtonTechnical onClick={() => window.open('http://localhost:9040', '_blank')}>
          Accéder à Grafana
        </ButtonTechnical>
      </div>

      <div className="monitoring-block">
        <h3>Logs (Graylog)</h3>
        <ButtonTechnical onClick={() => window.open('http://localhost:9050', '_blank')}>
          Accéder à Graylog
        </ButtonTechnical>
      </div>
    </section>
  )
}
