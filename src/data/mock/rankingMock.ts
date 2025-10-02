// Dados fictícios para Ranking Extrato
export interface RankingClienteMock {
  id: number;
  nome: string;
  cpf_cnpj: string;
  saldo: number;
  total_transacoes: number;
  total_creditos: number;
  total_debitos: number;
  ultima_transacao: string;
  produto_principal: string;
  canal_preferido: string;
  status: string;
  posicao: number;
}

export interface RankingSummaryMock {
  totalClientes: number;
  saldoTotalGeral: number;
  mediaSaldos: number;
  totalTransacoes: number;
  clientesAtivos: number;
  crescimentoMensal: number;
}

export const mockRankingData: RankingClienteMock[] = [
  {
    id: 1,
    nome: "Maria José da Silva",
    cpf_cnpj: "123.456.789-10",
    saldo: 185000.00,
    total_transacoes: 47,
    total_creditos: 200000.00,
    total_debitos: 15000.00,
    ultima_transacao: "2025-10-01",
    produto_principal: "Conta Premium",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 1
  },
  {
    id: 2,
    nome: "João Carlos Santos",
    cpf_cnpj: "987.654.321-00",
    saldo: 152000.00,
    total_transacoes: 38,
    total_creditos: 165000.00,
    total_debitos: 13000.00,
    ultima_transacao: "2025-09-30",
    produto_principal: "Crédito Consignado",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 2
  },
  {
    id: 3,
    nome: "Ana Paula Oliveira",
    cpf_cnpj: "456.789.123-45",
    saldo: 98500.00,
    total_transacoes: 29,
    total_creditos: 115000.00,
    total_debitos: 16500.00,
    ultima_transacao: "2025-10-02",
    produto_principal: "Conta Corrente",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 3
  },
  {
    id: 4,
    nome: "Roberto Lima Ferreira",
    cpf_cnpj: "789.123.456-78",
    saldo: 87200.00,
    total_transacoes: 52,
    total_creditos: 95000.00,
    total_debitos: 7800.00,
    ultima_transacao: "2025-09-29",
    produto_principal: "Poupança Plus",
    canal_preferido: "Agência",
    status: "Ativo",
    posicao: 4
  },
  {
    id: 5,
    nome: "Carla Mendes Costa",
    cpf_cnpj: "321.654.987-21",
    saldo: 76800.00,
    total_transacoes: 34,
    total_creditos: 88000.00,
    total_debitos: 11200.00,
    ultima_transacao: "2025-10-01",
    produto_principal: "Conta Premium",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 5
  },
  {
    id: 6,
    nome: "Fernando Alves Pereira",
    cpf_cnpj: "654.321.789-54",
    saldo: 65400.00,
    total_transacoes: 28,
    total_creditos: 72000.00,
    total_debitos: 6600.00,
    ultima_transacao: "2025-09-28",
    produto_principal: "Investimentos",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 6
  },
  {
    id: 7,
    nome: "Patricia Silva Rodrigues",
    cpf_cnpj: "147.258.369-14",
    saldo: 54300.00,
    total_transacoes: 41,
    total_creditos: 62000.00,
    total_debitos: 7700.00,
    ultima_transacao: "2025-10-02",
    produto_principal: "Conta Corrente",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 7
  },
  {
    id: 8,
    nome: "Eduardo Santos Barbosa",
    cpf_cnpj: "258.369.147-25",
    saldo: 48900.00,
    total_transacoes: 31,
    total_creditos: 55000.00,
    total_debitos: 6100.00,
    ultima_transacao: "2025-09-30",
    produto_principal: "Crédito Consignado",
    canal_preferido: "Agência",
    status: "Ativo",
    posicao: 8
  },
  {
    id: 9,
    nome: "Luciana Costa Martins",
    cpf_cnpj: "369.147.258-36",
    saldo: 42600.00,
    total_transacoes: 25,
    total_creditos: 48000.00,
    total_debitos: 5400.00,
    ultima_transacao: "2025-10-01",
    produto_principal: "Poupança Plus",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 9
  },
  {
    id: 10,
    nome: "Ricardo Oliveira Souza",
    cpf_cnpj: "741.852.963-74",
    saldo: 38200.00,
    total_transacoes: 36,
    total_creditos: 42000.00,
    total_debitos: 3800.00,
    ultima_transacao: "2025-09-29",
    produto_principal: "Conta Corrente",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 10
  },
  {
    id: 11,
    nome: "Daniela Ferreira Lima",
    cpf_cnpj: "852.963.741-85",
    saldo: 32800.00,
    total_transacoes: 22,
    total_creditos: 36000.00,
    total_debitos: 3200.00,
    ultima_transacao: "2025-10-02",
    produto_principal: "Investimentos",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 11
  },
  {
    id: 12,
    nome: "Marcos Antonio Silva",
    cpf_cnpj: "963.741.852-96",
    saldo: 28500.00,
    total_transacoes: 33,
    total_creditos: 32000.00,
    total_debitos: 3500.00,
    ultima_transacao: "2025-09-28",
    produto_principal: "Conta Premium",
    canal_preferido: "Agência",
    status: "Ativo",
    posicao: 12
  },
  {
    id: 13,
    nome: "Juliana Pereira Costa",
    cpf_cnpj: "159.357.486-15",
    saldo: 24700.00,
    total_transacoes: 19,
    total_creditos: 27000.00,
    total_debitos: 2300.00,
    ultima_transacao: "2025-09-30",
    produto_principal: "Poupança Plus",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 13
  },
  {
    id: 14,
    nome: "Alexandre Santos Cruz",
    cpf_cnpj: "357.486.159-35",
    saldo: 21300.00,
    total_transacoes: 27,
    total_creditos: 24000.00,
    total_debitos: 2700.00,
    ultima_transacao: "2025-10-01",
    produto_principal: "Crédito Consignado",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 14
  },
  {
    id: 15,
    nome: "Renata Lima Oliveira",
    cpf_cnpj: "486.159.357-48",
    saldo: 18900.00,
    total_transacoes: 24,
    total_creditos: 21000.00,
    total_debitos: 2100.00,
    ultima_transacao: "2025-09-29",
    produto_principal: "Conta Corrente",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 15
  },
  {
    id: 16,
    nome: "Bruno Rodrigues Alves",
    cpf_cnpj: "789.456.123-78",
    saldo: 16200.00,
    total_transacoes: 21,
    total_creditos: 18000.00,
    total_debitos: 1800.00,
    ultima_transacao: "2025-10-02",
    produto_principal: "Investimentos",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 16
  },
  {
    id: 17,
    nome: "Camila Costa Ferreira",
    cpf_cnpj: "654.789.123-65",
    saldo: 13800.00,
    total_transacoes: 18,
    total_creditos: 15000.00,
    total_debitos: 1200.00,
    ultima_transacao: "2025-09-28",
    produto_principal: "Poupança Plus",
    canal_preferido: "Agência",
    status: "Ativo",
    posicao: 17
  },
  {
    id: 18,
    nome: "Diego Silva Santos",
    cpf_cnpj: "321.789.456-32",
    saldo: 11500.00,
    total_transacoes: 26,
    total_creditos: 13000.00,
    total_debitos: 1500.00,
    ultima_transacao: "2025-09-30",
    produto_principal: "Conta Corrente",
    canal_preferido: "Internet Banking",
    status: "Ativo",
    posicao: 18
  },
  {
    id: 19,
    nome: "Isabela Martins Lima",
    cpf_cnpj: "987.123.456-98",
    saldo: 9200.00,
    total_transacoes: 15,
    total_creditos: 10000.00,
    total_debitos: 800.00,
    ultima_transacao: "2025-10-01",
    produto_principal: "Conta Premium",
    canal_preferido: "App Mobile",
    status: "Ativo",
    posicao: 19
  },
  {
    id: 20,
    nome: "Gabriel Oliveira Costa",
    cpf_cnpj: "456.123.789-45",
    saldo: 7800.00,
    total_transacoes: 13,
    total_creditos: 8500.00,
    total_debitos: 700.00,
    ultima_transacao: "2025-09-29",
    produto_principal: "Crédito Consignado",
    canal_preferido: "Agência",
    status: "Ativo",
    posicao: 20
  }
];

// Função para filtrar e buscar dados do ranking
export const getRankingDataMock = async (
  nome?: string,
  dataInicio?: string,
  dataFim?: string
): Promise<{ clientes: RankingClienteMock[]; summary: RankingSummaryMock }> => {
  
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
  
  console.log('[RANKING MOCK] Filtros aplicados:', { nome, dataInicio, dataFim });
  
  let filteredData = [...mockRankingData];
  
  // Filtrar por nome se fornecido
  if (nome && nome.trim()) {
    const searchTerm = nome.toLowerCase().trim();
    filteredData = filteredData.filter(cliente => 
      cliente.nome.toLowerCase().includes(searchTerm) ||
      cliente.cpf_cnpj.includes(searchTerm)
    );
  }
  
  // Filtrar por data se fornecido (simular filtro por última transação)
  if (dataInicio) {
    filteredData = filteredData.filter(cliente => 
      new Date(cliente.ultima_transacao) >= new Date(dataInicio)
    );
  }
  
  if (dataFim) {
    filteredData = filteredData.filter(cliente => 
      new Date(cliente.ultima_transacao) <= new Date(dataFim)
    );
  }
  
  // Recalcular posições após filtros
  const sortedData = filteredData
    .sort((a, b) => b.saldo - a.saldo)
    .map((cliente, index) => ({
      ...cliente,
      posicao: index + 1
    }));
  
  // Calcular summary dos dados filtrados
  const summary: RankingSummaryMock = {
    totalClientes: sortedData.length,
    saldoTotalGeral: sortedData.reduce((sum, cliente) => sum + cliente.saldo, 0),
    mediaSaldos: sortedData.length > 0 ? 
      sortedData.reduce((sum, cliente) => sum + cliente.saldo, 0) / sortedData.length : 0,
    totalTransacoes: sortedData.reduce((sum, cliente) => sum + cliente.total_transacoes, 0),
    clientesAtivos: sortedData.filter(cliente => cliente.status === 'Ativo').length,
    crescimentoMensal: 12.5 // Valor fixo para demo
  };
  
  console.log('[RANKING MOCK] Retornando:', sortedData.length, 'clientes');
  
  return {
    clientes: sortedData,
    summary
  };
};
