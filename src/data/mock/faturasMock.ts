// Dados fictícios para Faturas
export interface FaturaDataMock {
  id: number;
  "Valor Fatura": number;
  "Fechamento": string;
  "Vencimento": string;
  "Status": string;
  "Cliente": string;
  "Documento": string;
  "Produtos": string;
}

export interface FaturasSummaryMock {
  totalFaturas: number;
  valorTotal: number;
  faturasVencidas: number;
  faturasAVencer: number;
  valorMedioFatura: number;
}

export const mockFaturasData: FaturaDataMock[] = [
  {
    id: 1,
    "Valor Fatura": 2500.75,
    "Fechamento": "2025-09-30",
    "Vencimento": "2025-10-15",
    "Status": "PENDENTE",
    "Cliente": "João Silva Santos",
    "Documento": "123.456.789-10",
    "Produtos": "Crédito Pessoal"
  },
  {
    id: 2,
    "Valor Fatura": 4800.00,
    "Fechamento": "2025-09-25",
    "Vencimento": "2025-10-10",
    "Status": "PAGO",
    "Cliente": "Maria Oliveira Costa",
    "Documento": "987.654.321-00",
    "Produtos": "Financiamento Veicular"
  },
  {
    id: 3,
    "Valor Fatura": 1200.50,
    "Fechamento": "2025-09-20",
    "Vencimento": "2025-10-05",
    "Status": "VENCIDO",
    "Cliente": "Carlos Eduardo Lima",
    "Documento": "456.789.123-45",
    "Produtos": "Cartão de Crédito"
  },
  {
    id: 4,
    "Valor Fatura": 7500.00,
    "Fechamento": "2025-09-15",
    "Vencimento": "2025-09-30",
    "Status": "PAGO",
    "Cliente": "Ana Paula Ferreira",
    "Documento": "789.123.456-78",
    "Produtos": "Consignado"
  },
  {
    id: 5,
    "Valor Fatura": 3200.25,
    "Fechamento": "2025-09-10",
    "Vencimento": "2025-09-25",
    "Status": "VENCIDO",
    "Cliente": "Roberto Santos Almeida",
    "Documento": "321.654.987-12",
    "Produtos": "Crédito Pessoal"
  },
  {
    id: 6,
    "Valor Fatura": 5600.80,
    "Fechamento": "2025-09-05",
    "Vencimento": "2025-09-20",
    "Status": "PAGO",
    "Cliente": "Luciana Rodrigues",
    "Documento": "654.321.987-33",
    "Produtos": "Financiamento Imobiliário"
  },
  {
    id: 7,
    "Valor Fatura": 1800.00,
    "Fechamento": "2025-08-30",
    "Vencimento": "2025-09-15",
    "Status": "PENDENTE",
    "Cliente": "Fernando Silva",
    "Documento": "147.258.369-96",
    "Produtos": "Cartão de Crédito"
  },
  {
    id: 8,
    "Valor Fatura": 9200.45,
    "Fechamento": "2025-08-25",
    "Vencimento": "2025-09-10",
    "Status": "PAGO",
    "Cliente": "Patricia Mendes",
    "Documento": "258.369.147-85",
    "Produtos": "Consignado"
  },
  {
    id: 9,
    "Valor Fatura": 2750.30,
    "Fechamento": "2025-08-20",
    "Vencimento": "2025-09-05",
    "Status": "VENCIDO",
    "Cliente": "Ricardo Pereira",
    "Documento": "369.258.147-74",
    "Produtos": "Crédito Pessoal"
  },
  {
    id: 10,
    "Valor Fatura": 4300.00,
    "Fechamento": "2025-08-15",
    "Vencimento": "2025-08-30",
    "Status": "PAGO",
    "Cliente": "Sandra Lima",
    "Documento": "741.852.963-52",
    "Produtos": "Financiamento Veicular"
  }
];

export const mockFaturasSummary: FaturasSummaryMock = {
  totalFaturas: 10,
  valorTotal: 42848.05,
  faturasVencidas: 3,
  faturasAVencer: 2,
  valorMedioFatura: 4284.81
};

// Função para simular a API
export const getFaturasDataMock = async (
  startDate?: string,
  endDate?: string,
  searchTerm?: string
): Promise<{ data: FaturaDataMock[], summary: FaturasSummaryMock }> => {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredData = [...mockFaturasData];
  
  // Filtrar por data se fornecido
  if (startDate && endDate) {
    filteredData = filteredData.filter(fatura => {
      const fechamento = new Date(fatura.Fechamento);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return fechamento >= start && fechamento <= end;
    });
  }
  
  // Filtrar por termo de busca
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter(fatura => 
      fatura.Cliente.toLowerCase().includes(term) ||
      fatura.Documento.includes(term) ||
      fatura.Produtos.toLowerCase().includes(term) ||
      fatura.Status.toLowerCase().includes(term)
    );
  }
  
  // Calcular resumo baseado nos dados filtrados
  const summary: FaturasSummaryMock = {
    totalFaturas: filteredData.length,
    valorTotal: filteredData.reduce((sum, fatura) => sum + fatura["Valor Fatura"], 0),
    faturasVencidas: filteredData.filter(f => f.Status === 'VENCIDO').length,
    faturasAVencer: filteredData.filter(f => f.Status === 'PENDENTE').length,
    valorMedioFatura: filteredData.length > 0 ? 
      filteredData.reduce((sum, fatura) => sum + fatura["Valor Fatura"], 0) / filteredData.length : 0
  };
  
  return { data: filteredData, summary };
};
