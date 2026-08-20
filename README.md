# index.htmlclinicaatendimento
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clínica - Gestão</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f5f7fb;
      color: #1f2937;
    }

    header {
      background: #ffffff;
      padding: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    header h1 {
      font-size: 22px;
    }

    header p {
      color: #6b7280;
      margin-top: 5px;
      font-size: 14px;
    }

    .container {
      padding: 20px;
      max-width: 1100px;
      margin: auto;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }

    .card span {
      color: #6b7280;
      font-size: 13px;
    }

    .card strong {
      display: block;
      font-size: 28px;
      margin-top: 8px;
    }

    .section {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 1px solid #e5e7eb;
    }

    .section h2 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    .appointment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
    }

    .appointment:last-child {
      border-bottom: none;
    }

    .patient {
      font-weight: bold;
    }

    .service {
      color: #6b7280;
      font-size: 13px;
      margin-top: 4px;
    }

    .status {
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 12px;
      background: #e8f7ee;
      color: #16803c;
    }

    .pending {
      background: #fff4d6;
      color: #996c00;
    }

    .automation {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid #eee;
    }

    .automation:last-child {
      border-bottom: none;
    }

    .active {
      color: #16803c;
      font-weight: bold;
    }

    @media (max-width: 700px) {
      .cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 400px) {
      .cards {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>

  <header>
    <h1>Clínica — Gestão de Pacientes</h1>
    <p>Painel de controle e automações</p>
  </header>

  <main class="container">

    <div class="cards">

      <div class="card">
        <span>Pacientes</span>
        <strong>128</strong>
      </div>

      <div class="card">
        <span>Agendamentos hoje</span>
        <strong>08</strong>
      </div>

      <div class="card">
        <span>Follow-ups</span>
        <strong>03</strong>
      </div>

      <div class="card">
        <span>Aguardando confirmação</span>
        <strong>02</strong>
      </div>

    </div>

    <section class="section">

      <h2>📅 Agendamentos de hoje</h2>

      <div class="appointment">
        <div>
          <div class="patient">João Silva</div>
          <div class="service">Fisioterapia — 09:00</div>
        </div>

        <div class="status">
          Confirmado
        </div>
      </div>

      <div class="appointment">
        <div>
          <div class="patient">Maria Souza</div>
          <div class="service">Avaliação — 10:30</div>
        </div>

        <div class="status pending">
          Aguardando
        </div>
      </div>

      <div class="appointment">
        <div>
          <div class="patient">Pedro Santos</div>
          <div class="service">Fisioterapia — 14:00</div>
        </div>

        <div class="status">
          Confirmado
        </div>
      </div>

    </section>

    <section class="section">

      <h2>⚠️ Pendências</h2>

      <div class="appointment">
        <div>
          <div class="patient">Fernanda Oliveira</div>
          <div class="service">
            Não retorna há 14 dias
          </div>
        </div>

        <div class="status pending">
          Follow-up
        </div>
      </div>

      <div class="appointment">
        <div>
          <div class="patient">Lucas Almeida</div>
          <div class="service">
            Avaliação realizada — sem fechamento
          </div>
        </div>

        <div class="status pending">
          Recuperar
        </div>
      </div>

    </section>

    <section class="section">

      <h2>🤖 Automações</h2>

      <div class="automation">
        <span>Confirmação de agendamento</span>
        <span class="active">ATIVA</span>
      </div>

      <div class="automation">
        <span>Lembrete 24h antes</span>
        <span class="active">ATIVA</span>
      </div>

      <div class="automation">
        <span>Pós-atendimento</span>
        <span class="active">ATIVA</span>
      </div>

      <div class="automation">
        <span>Follow-up automático</span>
        <span class="active">ATIVA</span>
      </div>

      <div class="automation">
        <span>Recuperação de faltosos</span>
        <span class="active">ATIVA</span>
      </div>

    </section>

  </main>

</body>
</html>