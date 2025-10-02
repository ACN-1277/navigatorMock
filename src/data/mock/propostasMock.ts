// Dados fictícios para Propostas
export interface PropostaMock {
  id: number;
  "Data Contrato": string;
  "Valor Total": number;
  "Valor Líquido": number;
  "Data Finalização": string | null;
  "Status": string;
  "Cliente": string;
  "Documento": string;
  "Produto": string;
  "Canal": string;
  "Observações": string;
}

export interface PropostaKPIMock {
  totalPropostas: number;
  valorTotalPropostas: number;
  proposasFinalizadas: number;
  taxaConversao: number;
  valorMedioPropostas: number;
  proposasUltimos30Dias: number;
}

export interface PropostaEvolucaoMock {
  data: string;
  propostas: number;
  valor: number;
}

export const mockPropostasData: PropostaMock[] = [
  {
    id: 1,
    "Data Contrato": "2025-10-01",
    "Valor Total": 50000.00,
    "Valor Líquido": 47500.00,
    "Data Finalização": "2025-10-01",
    "Status": "FINALIZADO",
    "Cliente": "João Silva Santos",
    "Documento": "123.456.789-10",
    "Produto": "Crédito Consignado",
    "Canal": "Online",
    "Observações": "Aprovado sem restrições"
  },
  {
    id: 2,
    "Data Contrato": "2025-09-30",
    "Valor Total": 75000.00,
    "Valor Líquido": 71250.00,
    "Data Finalização": null,
    "Status": "EM_ANDAMENTO",
    "Cliente": "Maria Oliveira Costa",
    "Documento": "987.654.321-00",
    "Produto": "Financiamento Veicular",
    "Canal": "Loja Física",
    "Observações": "Documentação em análise"
  },
  {
    id: 3,
    "Data Contrato": "2025-09-29",
    "Valor Total": 25000.00,
    "Valor Líquido": 23750.00,
    "Data Finalização": null,
    "Status": "CANCELADO",
    "Cliente": "Carlos Eduardo Lima",
    "Documento": "456.789.123-45",
    "Produto": "Crédito Pessoal",
    "Canal": "Telefone",
    "Observações": "Cliente desistiu da proposta"
  },
  {
    id: 4,
    "Data Contrato": "2025-09-28",
    "Valor Total": 120000.00,
    "Valor Líquido": 114000.00,
    "Data Finalização": "2025-09-30",
    "Status": "FINALIZADO",
    "Cliente": "Ana Paula Ferreira",
    "Documento": "789.123.456-78",
    "Produto": "Financiamento Imobiliário",
    "Canal": "Online",
    "Observações": "Aprovado com taxa especial"
  },
  {
    id: 5,
    "Data Contrato": "2025-09-27",
    "Valor Total": 35000.00,
    "Valor Líquido": 33250.00,
    "Data Finalização": null,
    "Status": "PENDENTE",
    "Cliente": "Roberto Santos Almeida",
    "Documento": "321.654.987-12",
    "Produto": "Cartão de Crédito",
    "Canal": "App Mobile",
    "Observações": "Aguardando aprovação do comitê"
  },
  {
    id: 6,
    "Data Contrato": "2025-09-26",
    "Valor Total": 85000.00,
    "Valor Líquido": 80750.00,
    "Data Finalização": "2025-09-28",
    "Status": "FINALIZADO",
    "Cliente": "Luciana Rodrigues",
    "Documento": "654.321.987-33",
    "Produto": "Crédito Consignado",
    "Canal": "Loja Física",
    "Observações": "Cliente premium"
  },
  {
    id: 7,
    "Data Contrato": "2025-09-25",
    "Valor Total": 15000.00,
    "Valor Líquido": 14250.00,
    "Data Finalização": null,
    "Status": "EM_ANDAMENTO",
    "Cliente": "Fernando Silva",
    "Documento": "147.258.369-96",
    "Produto": "Crédito Pessoal",
    "Canal": "Online",
    "Observações": "Documentação complementar solicitada"
  },
  {
    id: 8,
    "Data Contrato": "2025-09-24",
    "Valor Total": 95000.00,
    "Valor Líquido": 90250.00,
    "Data Finalização": "2025-09-26",
    "Status": "FINALIZADO",
    "Cliente": "Patricia Mendes",
    "Documento": "258.369.147-85",
    "Produto": "Financiamento Veicular",
    "Canal": "Telefone",
    "Observações": "Financiamento aprovado em 48h"
  },
  {
    id: 9,
    "Data Contrato": "2025-09-23",
    "Valor Total": 45000.00,
    "Valor Líquido": 42750.00,
    "Data Finalização": null,
    "Status": "CANCELADO",
    "Cliente": "Ricardo Pereira",
    "Documento": "369.258.147-74",
    "Produto": "Crédito Consignado",
    "Canal": "App Mobile",
    "Observações": "Renda insuficiente comprovada"
  },
  {
    id: 10,
    "Data Contrato": "2025-09-22",
    "Valor Total": 65000.00,
    "Valor Líquido": 61750.00,
    "Data Finalização": null,
    "Status": "PENDENTE",
    "Cliente": "Sandra Lima",
    "Documento": "741.852.963-52",
    "Produto": "Crédito Pessoal",
    "Canal": "Loja Física",
    "Observações": "Aguardando assinatura do contrato"
  },
  {
    id: 11,
    "Data Contrato": "2025-09-21",
    "Valor Total": 30000.00,
    "Valor Líquido": 28500.00,
    "Data Finalização": "2025-09-23",
    "Status": "FINALIZADO",
    "Cliente": "Gabriel Costa",
    "Documento": "852.741.963-41",
    "Produto": "Cartão de Crédito",
    "Canal": "Online",
    "Observações": "Aprovação automática"
  },
  {
    id: 12,
    "Data Contrato": "2025-09-20",
    "Valor Total": 110000.00,
    "Valor Líquido": 104500.00,
    "Data Finalização": null,
    "Status": "EM_ANDAMENTO",
    "Cliente": "Mariana Santos",
    "Documento": "963.852.741-30",
    "Produto": "Financiamento Imobiliário",
    "Canal": "Loja Física",
    "Observações": "Avaliação do imóvel em andamento"
  }
];

export const mockPropostasKPIs: PropostaKPIMock = {
  totalPropostas: 12,
  valorTotalPropostas: 715000.00,
  proposasFinalizadas: 5,
  taxaConversao: 41.67,
  valorMedioPropostas: 59583.33,
  proposasUltimos30Dias: 12
};

export const mockPropostasEvolucao: PropostaEvolucaoMock[] = [
  { data: "2025-09-20", propostas: 1, valor: 110000 },
  { data: "2025-09-21", propostas: 1, valor: 30000 },
  { data: "2025-09-22", propostas: 1, valor: 65000 },
  { data: "2025-09-23", propostas: 1, valor: 45000 },
  { data: "2025-09-24", propostas: 1, valor: 95000 },
  { data: "2025-09-25", propostas: 1, valor: 15000 },
  { data: "2025-09-26", propostas: 1, valor: 85000 },
  { data: "2025-09-27", propostas: 1, valor: 35000 },
  { data: "2025-09-28", propostas: 1, valor: 120000 },
  { data: "2025-09-29", propostas: 1, valor: 25000 },
  { data: "2025-09-30", propostas: 1, valor: 75000 },
  { data: "2025-10-01", propostas: 1, valor: 50000 }
];

export const mockPropostasStatus = [
  "FINALIZADO",
  "EM_ANDAMENTO",
  "PENDENTE",
  "CANCELADO"
];

// Funções para simular as APIs
export const getPropostasMock = async (
  startDate?: string,
  endDate?: string,
  searchTerm?: string,
  status?: string
): Promise<PropostaMock[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredData = [...mockPropostasData];
  
  // Filtrar por data
  if (startDate || endDate) {
    filteredData = filteredData.filter(proposta => {
      const dataContrato = new Date(proposta["Data Contrato"]);
      
      // Se só tem data de início, filtra a partir dessa data
      if (startDate && !endDate) {
        const start = new Date(startDate);
        return dataContrato >= start;
      }
      
      // Se só tem data de fim, filtra até essa data
      if (!startDate && endDate) {
        const end = new Date(endDate);
        return dataContrato <= end;
      }
      
      // Se tem ambas as datas, filtra no intervalo
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return dataContrato >= start && dataContrato <= end;
      }
      
      return true;
    });
  }
  
  // Filtrar por termo de busca
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter(proposta =>
      proposta.Cliente.toLowerCase().includes(term) ||
      proposta.Documento.includes(term) ||
      proposta.Produto.toLowerCase().includes(term) ||
      proposta.Canal.toLowerCase().includes(term)
    );
  }
  
  // Filtrar por status
  if (status && status !== 'todos') {
    filteredData = filteredData.filter(proposta => proposta.Status === status);
  }
  
  return filteredData;
};

export const getPropostasKPIsMock = async (
  startDate?: string,
  endDate?: string
): Promise<PropostaKPIMock> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const propostas = await getPropostasMock(startDate, endDate);
  
  return {
    totalPropostas: propostas.length,
    valorTotalPropostas: propostas.reduce((sum, p) => sum + p["Valor Total"], 0),
    proposasFinalizadas: propostas.filter(p => p.Status === 'FINALIZADO').length,
    taxaConversao: propostas.length > 0 ? 
      (propostas.filter(p => p.Status === 'FINALIZADO').length / propostas.length) * 100 : 0,
    valorMedioPropostas: propostas.length > 0 ? 
      propostas.reduce((sum, p) => sum + p["Valor Total"], 0) / propostas.length : 0,
    proposasUltimos30Dias: propostas.length
  };
};

export const getPropostasStatusMock = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPropostasStatus;
};

export const getPropostasEvolucaoMock = async (
  startDate?: string,
  endDate?: string
): Promise<PropostaEvolucaoMock[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = [...mockPropostasEvolucao];
  
  if (startDate || endDate) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.data);
      
      // Se só tem data de início, filtra a partir dessa data
      if (startDate && !endDate) {
        const start = new Date(startDate);
        return itemDate >= start;
      }
      
      // Se só tem data de fim, filtra até essa data
      if (!startDate && endDate) {
        const end = new Date(endDate);
        return itemDate <= end;
      }
      
      // Se tem ambas as datas, filtra no intervalo
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      }
      
      return true;
    });
  }
  
  return filteredData;
};
