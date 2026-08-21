// ===============================
// DADOS DO SISTEMA
// ===============================

// ===== INICIALIZAR =====
window.addEventListener('load', () => {
    renderDashboard();
});

let clientes = [
    {
        nome: "Ana Souza",
        telefone: "(47) 99999-1111",
        email: "ana@email.com",
        servico: "Fisioterapia",
        status: "Cliente Ativo"
    },
    {
        nome: "Carlos Oliveira",
        telefone: "(47) 98888-2222",
        email: "carlos@email.com",
        servico: "Massagem",
        status: "Cliente Ativo"
    },
    {
        nome: "Mariana Santos",
        telefone: "(47) 97777-3333",
        email: "mariana@email.com",
        servico: "Avaliação",
        status: "Novo Lead"
    }
];

let leads = [
    {
        nome: "João Pereira",
        telefone: "(47) 96666-4444",
        servico: "Fisioterapia",
        origem: "Instagram",
        status: "Novo"
    },
    {
        nome: "Lucas Mendes",
        telefone: "(47) 95555-5555",
        servico: "Massagem",
        origem: "Indicação",
        status: "Em negociação"
    },
    {
        nome: "Fernanda Lima",
        telefone: "(47) 94444-6666",
        servico: "Avaliação",
        origem: "WhatsApp",
        status: "Qualificado"
    }
];

let agendamentos = [
    {
        paciente: "Ana Souza",
        horario: "09:00",
        servico: "Fisioterapia",
        profissional: "Dr. Rafael"
    },
    {
        paciente: "Carlos Oliveira",
        horario: "10:30",
        servico: "Massagem",
        profissional: "Talita"
    },
    {
        paciente: "Mariana Santos",
        horario: "14:00",
        servico: "Avaliação",
        profissional: "Dr. Rafael"
    }
];

let servicos = [
    {
        nome: "Fisioterapia",
        descricao: "Tratamentos personalizados para recuperação física.",
        preco: "R$ 120"
    },
    {
        nome: "Massagem",
        descricao: "Massagem terapêutica e relaxante.",
        preco: "R$ 90"
    },
    {
        nome: "Avaliação",
        descricao: "Avaliação inicial completa.",
        preco: "R$ 80"
    }
];

// ===============================
// NAVEGAÇÃO
// ===============================

const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("page-title");

menuItems.forEach(item => {
    item.addEventListener("click", function(event) {
        event.preventDefault();

        const page = this.dataset.page;

        menuItems.forEach(menu => menu.classList.remove("active"));
        this.classList.add("active");

        pages.forEach(p => p.classList.remove("active"));

        const selectedPage = document.getElementById(page);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        pageTitle.textContent = this.textContent.trim();

        document.querySelector(".sidebar").classList.remove("open");
    });
});

// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.getElementById("menu-toggle");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        document.querySelector(".sidebar").classList.toggle("open");
    });
}

// ===============================
// RENDERIZAR CLIENTES
// ===============================

function renderClientes(lista = clientes) {
    const container = document.getElementById("clientes-list");

    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum cliente encontrado.</p>";
        return;
    }

    container.innerHTML = lista.map(cliente => `
        <div class="client-card">
            <h3>👤 ${cliente.nome}</h3>
            <p>📞 ${cliente.telefone}</p>
            <p>✉️ ${cliente.email}</p>
            <p>💼 ${cliente.servico}</p>
            <span class="status">${cliente.status}</span>
        </div>
    `).join("");
}

// ===============================
// RENDERIZAR LEADS
// ===============================

function renderLeads() {
    const container = document.getElementById("leads-list");

    if (!container) return;

    const origem = document.getElementById("filter-origem").value;
    const status = document.getElementById("filter-status-lead").value;

    let lista = leads.filter(lead => {
        return (!origem || lead.origem === origem) &&
               (!status || lead.status === status);
    });

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum lead encontrado.</p>";
        return;
    }

    container.innerHTML = lista.map(lead => `
        <div class="lead-card">
            <h3>🎯 ${lead.nome}</h3>
            <p>📞 ${lead.telefone}</p>
            <p>💼 Serviço: ${lead.servico}</p>
            <p>📍 Origem: ${lead.origem}</p>
            <br>
            <span class="status">${lead.status}</span>
        </div>
    `).join("");
}

// ===============================
// RENDERIZAR AGENDAMENTOS
// ===============================

function renderAgendamentos() {
    const dashboard = document.getElementById("agendamentos-list");
    const full = document.getElementById("agendamentos-full-list");

    const html = agendamentos.map(agendamento => `
        <div class="appointment-card">
            <div>
                <strong>👤 ${agendamento.paciente}</strong>
                <p>${agendamento.servico} — ${agendamento.profissional}</p>
            </div>
            <strong>🕐 ${agendamento.horario}</strong>
        </div>
    `).join("");

    if (dashboard) {
        dashboard.innerHTML = html;
    }

    if (full) {
        full.innerHTML = html;
    }
}

// ===============================
// RENDERIZAR SERVIÇOS
// ===============================

function renderServicos() {
    const container = document.getElementById("servicos-list");

    if (!container) return;

    container.innerHTML = servicos.map(servico => `
        <div class="service-card">
            <h3>💼 ${servico.nome}</h3>
            <p>${servico.descricao}</p>
            <br>
            <strong>${servico.preco}</strong>
        </div>
    `).join("");
}

// ===============================
// AUTOMAÇÕES
// ===============================

function renderAutomacoes() {
    const dados = [
        {
            titulo: "Confirmação automática",
            descricao: "Envia confirmação após o agendamento.",
            ativa: true
        },
        {
            titulo: "Lembrete 24 horas",
            descricao: "Envia lembrete antes do atendimento.",
            ativa: true
        },
        {
            titulo: "Follow-up",
            descricao: "Identifica clientes que precisam de acompanhamento.",
            ativa: true
        }
    ];

    const html = dados.map(item => `
        <div class="automation-card ${item.ativa ? "automation-active" : ""}">
            <h3>🤖 ${item.titulo}</h3>
            <p>${item.descricao}</p>
            <br>
            <span class="status">
                ${item.ativa ? "Ativa" : "Desativada"}
            </span>
        </div>
    `).join("");

    const dashboard = document.getElementById("automacoes-list");
    const full = document.getElementById("automacoes-full-list");

    if (dashboard) dashboard.innerHTML = html;
    if (full) full.innerHTML = html;
}

// ===============================
// MODAIS
// ===============================

function abrirModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("active");
    }
}

function fecharModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("active");
    }
}

// CLIENTE
document.getElementById("btn-novo-cliente")
    ?.addEventListener("click", () => abrirModal("modal-cliente"));

document.getElementById("btn-cancelar-cliente")
    ?.addEventListener("click", () => fecharModal("modal-cliente"));

document.querySelector("#modal-cliente .close")
    ?.addEventListener("click", () => fecharModal("modal-cliente"));

document.getElementById("btn-salvar-cliente")
    ?.addEventListener("click", () => {

        const nome = document.getElementById("cliente-nome").value.trim();
        const telefone = document.getElementById("cliente-telefone").value.trim();
        const email = document.getElementById("cliente-email").value.trim();
        const servico = document.getElementById("cliente-servico").value;
        const status = document.getElementById("cliente-status").value;

        if (!nome || !telefone) {
            alert("Preencha pelo menos nome e telefone.");
            return;
        }

        clientes.push({
            nome,
            telefone,
            email,
            servico,
            status
        });

        renderClientes();

        fecharModal("modal-cliente");

        document.getElementById("cliente-nome").value = "";
        document.getElementById("cliente-telefone").value = "";
        document.getElementById("cliente-email").value = "";

        atualizarDashboard();
    });

// LEAD
document.getElementById("btn-novo-lead")
    ?.addEventListener("click", () => abrirModal("modal-lead"));

document.getElementById("btn-cancelar-lead")
    ?.addEventListener("click", () => fecharModal("modal-lead"));

document.querySelector("#modal-lead .close")
    ?.addEventListener("click", () => fecharModal("modal-lead"));

document.getElementById("btn-salvar-lead")
    ?.addEventListener("click", () => {

        const nome = document.getElementById("lead-nome").value.trim();
        const telefone = document.getElementById("lead-telefone").value.trim();
        const servico = document.getElementById("lead-servico").value;
        const origem = document.getElementById("lead-origem").value;
        const status = document.getElementById("lead-status").value;

        if (!nome || !telefone) {
            alert("Preencha nome e telefone.");
            return;
        }

        leads.push({
            nome,
            telefone,
            servico,
            origem,
            status
        });

        renderLeads();

        fecharModal("modal-lead");

        document.getElementById("lead-nome").value = "";
        document.getElementById("lead-telefone").value = "";

        atualizarDashboard();
    });

// ===============================
// PESQUISA DE CLIENTES
// ===============================

document.getElementById("search-clientes")
    ?.addEventListener("input", function() {

        const termo = this.value.toLowerCase();

        const filtrados = clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(termo) ||
            cliente.telefone.toLowerCase().includes(termo)
        );

        renderClientes(filtrados);
    });

// ===============================
// FILTROS DE LEADS
// ===============================

document.getElementById("filter-origem")
    ?.addEventListener("change", renderLeads);

document.getElementById("filter-status-lead")
    ?.addEventListener("change", renderLeads);

// ===============================
// ASSISTENTE IA SIMULADO
// ===============================

const iaInput = document.getElementById("ia-input");
const btnEnviarIA = document.getElementById("btn-enviar-ia");
const iaChat = document.getElementById("ia-chat");

function enviarMensagemIA() {

    if (!iaInput || !iaChat) return;

    const mensagem = iaInput.value.trim();

    if (!mensagem) return;

    iaChat.innerHTML += `
        <div class="chat-message user">
            <p>${mensagem}</p>
        </div>
    `;

    iaInput.value = "";

    setTimeout(() => {

        let resposta =
            "Entendi! Posso ajudar a organizar os clientes, leads, agendamentos e follow-ups da clínica.";

        const texto = mensagem.toLowerCase();

        if (texto.includes("lead")) {
            resposta = "Identifiquei que você está falando sobre leads. Recomendo priorizar os leads com status 'Em negociação'.";
        }

        if (texto.includes("agendamento")) {
            resposta = "Existem " + agendamentos.length + " agendamentos cadastrados no sistema.";
        }

        if (texto.includes("cliente")) {
            resposta = "Atualmente existem " + clientes.length + " clientes cadastrados.";
        }

        iaChat.innerHTML += `
            <div class="chat-message bot">
                <p>${resposta}</p>
            </div>
        `;

        iaChat.scrollTop = iaChat.scrollHeight;

    }, 500);
}

btnEnviarIA?.addEventListener("click", enviarMensagemIA);

iaInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        enviarMensagemIA();
    }
});

// BOTÕES DA IA
document.querySelectorAll(".ia-functions button").forEach(button => {

    button.addEventListener("click", () => {

        const funcao = button.dataset.function;

        let resposta = "";

        if (funcao === "classify") {
            resposta = "📊 Análise: os leads em negociação devem receber prioridade de atendimento.";
        }

        if (funcao === "suggest") {
            resposta = "💬 Sugestão: 'Olá! 😊 Podemos agendar sua avaliação. Qual dia e horário são melhores para você?'";
        }

        if (funcao === "summary") {
            resposta = "📋 Resumo: clientes cadastrados = " + clientes.length + ". Leads = " + leads.length + ".";
        }

        if (funcao === "followup") {
            resposta = "🔔 Existem clientes que podem receber follow-up para aumentar a conversão.";
        }

        if (iaChat) {
            iaChat.innerHTML += `
                <div class="chat-message bot">
                    <p>${resposta}</p>
                </div>
            `;

            iaChat.scrollTop = iaChat.scrollHeight;
        }
    });
});

// ===============================
// DASHBOARD
// ===============================

function atualizarDashboard() {

    const totalPacientes = document.getElementById("total-pacientes");
    const followups = document.getElementById("followups");
    const leadsNegociacao = document.getElementById("leads-negociacao");
    const agendamentosHoje = document.getElementById("agendamentos-hoje");

    if (totalPacientes) {
        totalPacientes.textContent = clientes.length;
    }

    if (agendamentosHoje) {
        agendamentosHoje.textContent =
            String(agendamentos.length).padStart(2, "0");
    }

    if (followups) {
        followups.textContent = "03";
    }

    if (leadsNegociacao) {
        leadsNegociacao.textContent =
            leads.filter(l => l.status === "Em negociação").length;
    }
}

// ===============================
// LIMPAR DADOS
// ===============================

document.getElementById("btn-limpar-dados")
    ?.addEventListener("click", () => {

        const confirmar = confirm(
            "Tem certeza que deseja limpar os dados?"
        );

        if (!confirmar) return;

        clientes = [];
        leads = [];

        renderClientes();
        renderLeads();
        atualizarDashboard();

        alert("Dados limpos com sucesso!");
    });

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    renderClientes();
    renderLeads();
    renderAgendamentos();
    renderServicos();
    renderAutomacoes();
    atualizarDashboard();

    console.log("ClinicaAI carregado com sucesso!");
});
alert("SCRIPT FUNCIONOU!");    // Atualizar menu ativo
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Atualizar título
    const titleMap = {
        dashboard: '📊 Dashboard',
        clientes: '👥 Clientes',
        leads: '🎯 Leads',
        agendamentos: '📅 Agendamentos',
        servicos: '💼 Serviços',
        automacoes: '🤖 Automações',
        ia: '🧠 Assistente IA',
        relatorios: '📈 Relatórios',
        configuracoes: '⚙️ Configurações',
    };
    document.getElementById('page-title').textContent = titleMap[pageName] || 'Dashboard';

    // Executar funções específicas de cada página
    if (pageName === 'dashboard') {
        renderDashboard();
    } else if (pageName === 'clientes') {
        renderClientes();
    } else if (pageName === 'leads') {
        renderLeads();
    } else if (pageName === 'agendamentos') {
        renderAgendamentos();
    } else if (pageName === 'servicos') {
        renderServicos();
    } else if (pageName === 'automacoes') {
        renderAutomacoes();
    } else if (pageName === 'relatorios') {
        renderRelatorios();
    }
}

// ===== DASHBOARD =====
function renderDashboard() {
    // Atualizar cards
    document.getElementById('total-pacientes').textContent = clientes.length;
    document.getElementById('agendamentos-hoje').textContent = agendamentos.filter(a => a.data === '2024-08-20').length;
    document.getElementById('followups').textContent = clientes.filter(c => c.status === 'Inativo').length;
    document.getElementById('leads-negociacao').textContent = leads.filter(l => l.status === 'Em negociação').length;

    // Agendamentos de hoje
    const agendamentosHoje = agendamentos.filter(a => a.data === '2024-08-20');
    let htmlAgendamentos = '';
    agendamentosHoje.forEach(agendamento => {
        const statusClass = agendamento.status === 'Confirmado' ? '' : 'pending';
        htmlAgendamentos += `
            <div class="appointment">
                <div>
                    <div class="patient">${agendamento.cliente}</div>
                    <div class="service">${agendamento.servico} — ${agendamento.hora}</div>
                </div>
                <div class="status ${statusClass}">${agendamento.status}</div>
            </div>
        `;
    });
    document.getElementById('agendamentos-list').innerHTML = htmlAgendamentos || '<p style="color: #999;">Nenhum agendamento para hoje</p>';

    // Pendências
    const pendentes = clientes.filter(c => c.status === 'Inativo' || !c.proximoAgendamento);
    let htmlPendencias = '';
    pendentes.slice(0, 2).forEach(cliente => {
        htmlPendencias += `
            <div class="appointment">
                <div>
                    <div class="patient">${cliente.nome}</div>
                    <div class="service">Último contato: ${cliente.ultimoContato}</div>
                </div>
                <div class="status pending">Follow-up</div>
            </div>
        `;
    });
    document.getElementById('pendencias-list').innerHTML = htmlPendencias || '<p style="color: #999;">Sem pendências</p>';

    // Automações
    let htmlAutomacoes = '';
    automacoes.slice(0, 5).forEach(auto => {
        htmlAutomacoes += `
            <div class="automation">
                <span>${auto.nome}</span>
                <span class="active">${auto.status}</span>
            </div>
        `;
    });
    document.getElementById('automacoes-list').innerHTML = htmlAutomacoes;
}

// ===== CLIENTES =====
function renderClientes() {
    const searchTerm = document.getElementById('search-clientes')?.value.toLowerCase() || '';
    
    let clientesFiltrados = clientes.filter(c => 
        c.nome.toLowerCase().includes(searchTerm) ||
        c.telefone.includes(searchTerm) ||
        c.email.toLowerCase().includes(searchTerm)
    );

    let html = '';
    clientesFiltrados.forEach(cliente => {
        html += `
            <div class="client-card">
                <div class="client-card-header">
                    <div class="client-card-name">${cliente.nome}</div>
                    <div class="client-card-status">${cliente.status}</div>
                </div>
                <div class="client-card-info">
                    <div>📱 ${cliente.telefone}</div>
                    <div>📧 ${cliente.email}</div>
                    <div>💼 ${cliente.servico}</div>
                    <div>📅 Próximo: ${cliente.proximoAgendamento || 'Não agendado'}</div>
                </div>
                <div class="client-card-actions">
                    <button class="btn btn-small btn-secondary" onclick="editarCliente(${cliente.id})">Editar</button>
                    <button class="btn btn-small btn-secondary" onclick="excluirCliente(${cliente.id})">Excluir</button>
                </div>
            </div>
        `;
    });

    document.getElementById('clientes-list').innerHTML = html || '<p style="color: #999; text-align: center; padding: 40px;">Nenhum cliente encontrado</p>';
}

function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        document.getElementById('cliente-nome').value = cliente.nome;
        document.getElementById('cliente-telefone').value = cliente.telefone;
        document.getElementById('cliente-email').value = cliente.email;
        document.getElementById('cliente-servico').value = cliente.servico;
        document.getElementById('cliente-status').value = cliente.status;
        
        document.getElementById('modal-cliente').classList.add('active');
        document.getElementById('modal-cliente').dataset.editId = id;
    }
}

function excluirCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        clientes = clientes.filter(c => c.id !== id);
        salvarDados();
        renderClientes();
    }
}

document.getElementById('btn-novo-cliente')?.addEventListener('click', () => {
    document.getElementById('cliente-nome').value = '';
    document.getElementById('cliente-telefone').value = '';
    document.getElementById('cliente-email').value = '';
    document.getElementById('cliente-servico').value = 'Fisioterapia';
    document.getElementById('cliente-status').value = 'Novo Lead';
    delete document.getElementById('modal-cliente').dataset.editId;
    document.getElementById('modal-cliente').classList.add('active');
});

document.getElementById('btn-salvar-cliente')?.addEventListener('click', () => {
    const nome = document.getElementById('cliente-nome').value;
    const telefone = document.getElementById('cliente-telefone').value;
    const email = document.getElementById('cliente-email').value;
    const servico = document.getElementById('cliente-servico').value;
    const status = document.getElementById('cliente-status').value;

    if (!nome || !telefone) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    const modal = document.getElementById('modal-cliente');
    const editId = modal.dataset.editId;

    if (editId) {
        const cliente = clientes.find(c => c.id == editId);
        if (cliente) {
            cliente.nome = nome;
            cliente.telefone = telefone;
            cliente.email = email;
            cliente.servico = servico;
            cliente.status = status;
        }
    } else {
        clientes.push({
            id: Math.max(...clientes.map(c => c.id), 0) + 1,
            nome,
            telefone,
            email,
            servico,
            status,
            ultimoContato: new Date().toISOString().split('T')[0],
            proximoAgendamento: null
        });
    }

    salvarDados();
    modal.classList.remove('active');
    renderClientes();
});

document.getElementById('search-clientes')?.addEventListener('input', renderClientes);

// ===== LEADS =====
function renderLeads() {
    const origem = document.getElementById('filter-origem')?.value || '';
    const status = document.getElementById('filter-status-lead')?.value || '';

    let leadsFiltrados = leads.filter(l => 
        (!origem || l.origem === origem) &&
        (!status || l.status === status)
    );

    let html = '';
    leadsFiltrados.forEach(lead => {
        html += `
            <div class="lead-item">
                <div class="lead-info">
                    <div class="lead-name">${lead.nome}</div>
                    <div class="lead-meta">
                        📱 ${lead.telefone} | 💼 ${lead.servico} | 📍 ${lead.origem} | Status: ${lead.status}
                    </div>
                </div>
                <div class="lead-actions">
                    <button class="btn btn-small btn-secondary" onclick="avancarLead(${lead.id})">Avançar</button>
                    <button class="btn btn-small btn-secondary" onclick="excluirLead(${lead.id})">Excluir</button>
                </div>
            </div>
        `;
    });

    document.getElementById('leads-list').innerHTML = html || '<p style="color: #999; text-align: center; padding: 40px;">Nenhum lead encontrado</p>';
}

function avancarLead(id) {
    const lead = leads.find(l => l.id === id);
    if (lead) {
        const statusSequencia = ['Novo', 'Em negociação', 'Qualificado', 'Convertido'];
        const indiceAtual = statusSequencia.indexOf(lead.status);
        
        if (indiceAtual < statusSequencia.length - 1) {
            lead.status = statusSequencia[indiceAtual + 1];
            
            if (lead.status === 'Convertido') {
                clientes.push({
                    id: Math.max(...clientes.map(c => c.id), 0) + 1,
                    nome: lead.nome,
                    telefone: lead.telefone,
                    email: '',
                    servico: lead.servico,
                    status: 'Cliente Ativo',
                    ultimoContato: new Date().toISOString().split('T')[0],
                    proximoAgendamento: null
                });
                leads = leads.filter(l => l.id !== id);
                alert('Lead convertido em cliente!');
            }
            
            salvarDados();
            renderLeads();
        }
    }
}

function excluirLead(id) {
    if (confirm('Tem certeza que deseja excluir este lead?')) {
        leads = leads.filter(l => l.id !== id);
        salvarDados();
        renderLeads();
    }
}

document.getElementById('filter-origem')?.addEventListener('change', renderLeads);
document.getElementById('filter-status-lead')?.addEventListener('change', renderLeads);

document.getElementById('btn-novo-lead')?.addEventListener('click', () => {
    document.getElementById('lead-nome').value = '';
    document.getElementById('lead-telefone').value = '';
    document.getElementById('lead-servico').value = 'Fisioterapia';
    document.getElementById('lead-origem').value = 'Instagram';
    document.getElementById('lead-status').value = 'Novo';
    document.getElementById('modal-lead').classList.add('active');
});

document.getElementById('btn-salvar-lead')?.addEventListener('click', () => {
    const nome = document.getElementById('lead-nome').value;
    const telefone = document.getElementById('lead-telefone').value;
    const servico = document.getElementById('lead-servico').value;
    const origem = document.getElementById('lead-origem').value;
    const status = document.getElementById('lead-status').value;

    if (!nome || !telefone) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    leads.push({
        id: Math.max(...leads.map(l => l.id), 0) + 1,
        nome,
        telefone,
        servico,
        origem,
        dataContato: new Date().toISOString().split('T')[0],
        status,
        responsavel: 'Recepção'
    });

    salvarDados();
    document.getElementById('modal-lead').classList.remove('active');
    renderLeads();
});

// ===== AGENDAMENTOS =====
function renderAgendamentos() {
    let html = '';
    agendamentos.forEach(agendamento => {
        const statusClass = agendamento.status === 'Confirmado' ? '' : (agendamento.status === 'Realizado' ? '' : 'pending');
        html += `
            <div class="lead-item">
                <div class="lead-info">
                    <div class="lead-name">${agendamento.data} ${agendamento.hora}</div>
                    <div class="lead-meta">
                        👤 ${agendamento.cliente} | 💼 ${agendamento.servico} | 👨‍⚕️ ${agendamento.profissional}
                    </div>
                </div>
                <div class="status ${statusClass}">${agendamento.status}</div>
            </div>
        `;
    });

    document.getElementById('agendamentos-full-list').innerHTML = html;
}

document.getElementById('btn-novo-agendamento')?.addEventListener('click', () => {
    alert('Para criar novo agendamento, vá até a seção de Clientes e selecione um cliente.');
});

// ===== SERVIÇOS =====
function renderServicos() {
    let html = '';
    servicos.forEach(servico => {
        html += `
            <div class="service-card">
                <h3>${servico.nome}</h3>
                <div class="service-info">
                    <div>⏱️ ${servico.duracao}</div>
                    <div>💰 ${servico.valor}</div>
                    <div>📊 ${servico.quantidade} atendimentos</div>
                    <div>✅ ${servico.status}</div>
                </div>
            </div>
        `;
    });

    document.getElementById('servicos-list').innerHTML = html;
}

// ===== AUTOMAÇÕES =====
function renderAutomacoes() {
    let html = '';
    automacoes.forEach((auto, index) => {
        html += `
            <div class="section">
                <h3>${auto.nome}</h3>
                <p style="color: #666; font-size: 13px; margin-bottom: 15px;">${auto.descricao}</p>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-small ${auto.status === 'ATIVA' ? 'btn-secondary' : 'btn-primary'}" onclick="toggleAutomacao(${index})">
                        ${auto.status === 'ATIVA' ? '✓ Desativar' : '✓ Ativar'}
                    </button>
                </div>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 12px; color: #666;">
                    <strong>Simulação:</strong> Esta automação está ${auto.status === 'ATIVA' ? 'ativa' : 'inativa'} no sistema.
                </div>
            </div>
        `;
    });

    document.getElementById('automacoes-full-list').innerHTML = html;
}

function toggleAutomacao(index) {
    automacoes[index].status = automacoes[index].status === 'ATIVA' ? 'INATIVA' : 'ATIVA';
    salvarDados();
    renderAutomacoes();
}

// ===== IA =====
const respostasIA = {
    'oi': 'Olá! Bem-vindo ao assistente IA da clínica. Como posso ajudá-lo?',
    'horário': 'Nosso horário de atendimento é de segunda a sexta, das 8h às 18h, e sábados das 9h às 13h.',
    'massagem': 'Oferecemos sessões de massagem com duração de 50 minutos por R$ 120,00. Deseja agendar uma sessão?',
    'fisioterapia': 'Nosso serviço de fisioterapia inclui avaliação, tratamento e acompanhamento. Sessões de 60 minutos.',
    'valor': 'Nossos serviços variam: Avaliação R$ 80, Sessão R$ 120-150, Pacotes especiais com desconto.',
    'agendar': 'Ótimo! Qual serviço você gostaria de agendar? Temos: Fisioterapia, Massagem, Avaliação.',
    'contato': 'Você pode nos contactar pelo WhatsApp (11) 99999-9999 ou pelo email contato@clinica.com',
    'default': 'Entendi sua dúvida. Você pode especificar melhor ou prefere falar com um atendente?'
};

function respostasIAInteligentes(entrada) {
    const entradaLower = entrada.toLowerCase();
    
    if (entradaLower.includes('cliente sem resposta')) {
        return 'Baseado na análise dos dados, identifiquei 3 clientes que não responderam há mais de 7 dias: ' + 
               clientes.filter(c => c.status === 'Inativo').slice(0, 3).map(c => c.nome).join(', ');
    }
    
    if (entradaLower.includes('classificar') || entradaLower.includes('lead')) {
        return 'Análise de Leads: ' + leads.length + ' leads cadastrados. ' + 
               leads.filter(l => l.status === 'Em negociação').length + ' em negociação, ' +
               leads.filter(l => l.status === 'Qualificado').length + ' qualificados.';
    }
    
    if (entradaLower.includes('resumo')) {
        return 'Resumo da clínica: ' + clientes.length + ' clientes, ' + 
               agendamentos.filter(a => a.data === '2024-08-20').length + ' agendamentos hoje, ' +
               servicos.length + ' serviços ativos.';
    }
    
    if (entradaLower.includes('próximos passos')) {
        return 'Próximos passos recomendados: 1) Fazer follow-up com ' + 
               leads.filter(l => l.status === 'Em negociação').length + ' leads em negociação; ' +
               '2) Confirmar ' + agendamentos.filter(a => a.status === 'Aguardando confirmação').length + ' agendamentos; ' +
               '3) Contatar ' + clientes.filter(c => c.status === 'Inativo').length + ' clientes inativos.';
    }
    
    for (let palavra in respostasIA) {
        if (entradaLower.includes(palavra)) {
            return respostasIA[palavra];
        }
    }
    
    return respostasIA['default'];
}

document.getElementById('btn-enviar-ia')?.addEventListener('click', () => {
    const input = document.getElementById('ia-input');
    const mensagem = input.value.trim();

    if (!mensagem) return;

    const chat = document.getElementById('ia-chat');
    
    // Adicionar mensagem do usuário
    const msgUser = document.createElement('div');
    msgUser.className = 'chat-message user';
    msgUser.innerHTML = `<p>${mensagem}</p>`;
    chat.appendChild(msgUser);

    input.value = '';

    // Simular resposta da IA
    setTimeout(() => {
        const resposta = respostasIAInteligentes(mensagem);
        const msgBot = document.createElement('div');
        msgBot.className = 'chat-message bot';
        msgBot.innerHTML = `<p>${resposta}</p>`;
        chat.appendChild(msgBot);
        chat.scrollTop = chat.scrollHeight;
    }, 500);

    chat.scrollTop = chat.scrollHeight;
});

document.getElementById('ia-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btn-enviar-ia').click();
    }
});

document.querySelectorAll('[data-function]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const funcao = e.target.getAttribute('data-function');
        let mensagem = '';

        if (funcao === 'classify') {
            mensagem = 'Classificar leads';
        } else if (funcao === 'suggest') {
            mensagem = 'Sugerir uma resposta para um cliente novo';
        } else if (funcao === 'summary') {
            mensagem = 'Resumo dos dados dos clientes';
        } else if (funcao === 'followup') {
            mensagem = 'Clientes que precisam de follow-up';
        }

        document.getElementById('ia-input').value = mensagem;
        document.getElementById('btn-enviar-ia').click();
    });
});

// ===== RELATÓRIOS =====
function renderRelatorios() {
    // Serviços mais procurados
    const servicosContagem = {};
    clientes.forEach(c => {
        servicosContagem[c.servico] = (servicosContagem[c.servico] || 0) + 1;
    });

    let htmlServicos = '';
    Object.entries(servicosContagem).sort((a, b) => b[1] - a[1]).forEach(([servico, qtd]) => {
        const percentual = ((qtd / clientes.length) * 100).toFixed(0);
        htmlServicos += `
            <div class="stat-bar">
                <div class="stat-name">${servico}</div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${percentual}%;">${percentual}%</div>
                </div>
                <div class="stat-value">${qtd}</div>
            </div>
        `;
    });
    document.getElementById('top-services').innerHTML = htmlServicos;

    // Origem dos leads
    const origemContagem = {};
    leads.forEach(l => {
        origemContagem[l.origem] = (origemContagem[l.origem] || 0) + 1;
    });

    let htmlOrigem = '';
    Object.entries(origemContagem).sort((a, b) => b[1] - a[1]).forEach(([origem, qtd]) => {
        const percentual = ((qtd / leads.length) * 100).toFixed(0);
        htmlOrigem += `
            <div class="stat-bar">
                <div class="stat-name">${origem}</div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${percentual}%;">${percentual}%</div>
                </div>
                <div class="stat-value">${qtd}</div>
            </div>
        `;
    });
    document.getElementById('leads-origin').innerHTML = htmlOrigem;
}

// ===== MODAIS =====
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

document.getElementById('btn-cancelar-cliente')?.addEventListener('click', () => {
    document.getElementById('modal-cliente').classList.remove('active');
});

document.getElementById('btn-cancelar-lead')?.addEventListener('click', () => {
    document.getElementById('modal-lead').classList.remove('active');
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===== CONFIGURAÇÕES =====
document.getElementById('btn-limpar-dados')?.addEventListener('click', () => {
    if (confirm('⚠️ Tem certeza? Todos os dados serão apagados permanentemente!')) {
        localStorage.removeItem('clientes');
        localStorage.removeItem('leads');
        localStorage.removeItem('agendamentos');
        localStorage.removeItem('servicos');
        localStorage.removeItem('automacoes');
        
        clientes = [];
        leads = [];
        agendamentos = [];
        servicos = [];
        automacoes = [];
        
        alert('Dados apagados! Recarregando página...');
        location.reload();
    }
});

// ===== SALVAR DADOS =====
function salvarDados() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('leads', JSON.stringify(leads));
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    localStorage.setItem('servicos', JSON.stringify(servicos));
    localStorage.setItem('automacoes', JSON.stringify(automacoes));
}

