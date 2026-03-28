import MainLayout from '../../components/layout/MainLayout'

function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <section className="dashboard-grid">
        <div className="card">
          <h3>Atendimentos do dia</h3>
          <strong>8</strong>
          <p>Você possui 8 agendamentos confirmados hoje.</p>
        </div>

        <div className="card">
          <h3>Clientes cadastrados</h3>
          <strong>124</strong>
          <p>Base total de clientes registrados no sistema.</p>
        </div>

        <div className="card">
          <h3>Serviços ativos</h3>
          <strong>16</strong>
          <p>Quantidade de serviços disponíveis para agendamento.</p>
        </div>

        <div className="card">
          <h3>Faturamento do mês</h3>
          <strong>R$ 4.850,00</strong>
          <p>Resumo financeiro atual do BellaAgenda.</p>
        </div>
      </section>

      <section className="dashboard-panels">
        <div className="panel">
          <h3>Próximos atendimentos</h3>

          <div className="appointment-item">
            <div>
              <strong>09:00 - Maria Clara</strong>
              <p>Design de sobrancelhas</p>
            </div>
            <span className="status confirmed">Confirmado</span>
          </div>

          <div className="appointment-item">
            <div>
              <strong>10:30 - Juliana Souza</strong>
              <p>Escova modelada</p>
            </div>
            <span className="status pending">Pendente</span>
          </div>

          <div className="appointment-item">
            <div>
              <strong>14:00 - Fernanda Lima</strong>
              <p>Manicure completa</p>
            </div>
            <span className="status confirmed">Confirmado</span>
          </div>
        </div>

        <div className="panel">
          <h3>Resumo rápido</h3>
          <p>
            O BellaAgenda foi pensado para profissionais da beleza que precisam
            organizar agenda, clientes, serviços e faturamento em um só lugar.
          </p>

          <p>
            Nesta etapa, estamos construindo a base visual do sistema com uma
            identidade terrosa elegante, acolhedora e profissional.
          </p>
        </div>
      </section>
    </MainLayout>
  )
}

export default Dashboard