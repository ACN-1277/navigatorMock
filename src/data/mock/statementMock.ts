// Dados fictícios para Statement/Extrato
export interface StatementItemMock {
  id: number;
  "Data": string;
  "Saldo Anterior": number;
  "Saldo Posterior": number;
  "Descrição": string;
  "Valor": number;
  "Tipo": string;
  "Cliente": string;
  "CPF_CNPJ": string;
  "Nome": string;
  "Produto": string;
  "Canal": string;
}

export interface StatementSummaryMock {
  totalTransacoes: number;
  saldoFinal: number;
  totalCreditos: number;
  totalDebitos: number;
  valorMedioTransacao: number;
  transacoesPorTipo: { [key: string]: number };
}

export const mockStatementData: StatementItemMock[] = [
  {
    id: 1,
    "Data": "2025-10-01",
    "Saldo Anterior": 15000.00,
    "Saldo Posterior": 65000.00,
    "Descrição": "Crédito Consignado - João Silva",
    "Valor": 50000.00,
    "Tipo": "CREDITO",
    "Cliente": "João Silva Santos",
    "CPF_CNPJ": "123.456.789-10",
    "Nome": "João Silva Santos",
    "Produto": "Crédito Consignado",
    "Canal": "Online"
  },
  {
    id: 2,
    "Data": "2025-09-30",
    "Saldo Anterior": 65000.00,
    "Saldo Posterior": 62500.00,
    "Descrição": "Taxa de Administração",
    "Valor": -2500.00,
    "Tipo": "DEBITO",
    "Cliente": "Sistema",
    "CPF_CNPJ": "00.000.000/0001-00",
    "Nome": "Taxa Administrativa",
    "Produto": "Taxa",
    "Canal": "Sistema"
  },
  {
    id: 3,
    "Data": "2025-09-29",
    "Saldo Anterior": 62500.00,
    "Saldo Posterior": 137500.00,
    "Descrição": "Financiamento Veicular - Maria Costa",
    "Valor": 75000.00,
    "Tipo": "CREDITO",
    "Cliente": "Maria Oliveira Costa",
    "CPF_CNPJ": "987.654.321-00",
    "Nome": "Maria Oliveira Costa",
    "Produto": "Financiamento Veicular",
    "Canal": "Loja Física"
  },
  {
    id: 4,
    "Data": "2025-09-28",
    "Saldo Anterior": 137500.00,
    "Saldo Posterior": 17500.00,
    "Descrição": "Financiamento Imobiliário - Ana Ferreira",
    "Valor": -120000.00,
    "Tipo": "DEBITO",
    "Cliente": "Ana Paula Ferreira",
    "CPF_CNPJ": "789.123.456-78",
    "Nome": "Ana Paula Ferreira",
    "Produto": "Financiamento Imobiliário",
    "Canal": "Online"
  },
  {
    id: 5,
    "Data": "2025-09-27",
    "Saldo Anterior": 17500.00,
    "Saldo Posterior": 52500.00,
    "Descrição": "Cartão de Crédito - Roberto Almeida",
    "Valor": 35000.00,
    "Tipo": "CREDITO",
    "Cliente": "Roberto Santos Almeida",
    "CPF_CNPJ": "321.654.987-12",
    "Nome": "Roberto Santos Almeida",
    "Produto": "Cartão de Crédito",
    "Canal": "App Mobile"
  },
  {
    id: 6,
    "Data": "2025-09-26",
    "Saldo Anterior": 52500.00,
    "Saldo Posterior": 137500.00,
    "Descrição": "Crédito Consignado - Luciana Rodrigues",
    "Valor": 85000.00,
    "Tipo": "CREDITO",
    "Cliente": "Luciana Rodrigues",
    "CPF_CNPJ": "654.321.987-33",
    "Nome": "Luciana Rodrigues",
    "Produto": "Crédito Consignado",
    "Canal": "Loja Física"
  },
  {
    id: 7,
    "Data": "2025-09-25",
    "Saldo Anterior": 137500.00,
    "Saldo Posterior": 122500.00,
    "Descrição": "Crédito Pessoal - Fernando Silva",
    "Valor": -15000.00,
    "Tipo": "DEBITO",
    "Cliente": "Fernando Silva",
    "CPF_CNPJ": "147.258.369-96",
    "Nome": "Fernando Silva",
    "Produto": "Crédito Pessoal",
    "Canal": "Online"
  },
  {
    id: 8,
    "Data": "2025-09-24",
    "Saldo Anterior": 122500.00,
    "Saldo Posterior": 217500.00,
    "Descrição": "Financiamento Veicular - Patricia Mendes",
    "Valor": 95000.00,
    "Tipo": "CREDITO",
    "Cliente": "Patricia Mendes",
    "CPF_CNPJ": "258.369.147-85",
    "Nome": "Patricia Mendes",
    "Produto": "Financiamento Veicular",
    "Canal": "Telefone"
  },
  {
    id: 9,
    "Data": "2025-09-23",
    "Saldo Anterior": 217500.00,
    "Saldo Posterior": 172500.00,
    "Descrição": "Crédito Consignado - Ricardo Pereira",
    "Valor": -45000.00,
    "Tipo": "DEBITO",
    "Cliente": "Ricardo Pereira",
    "CPF_CNPJ": "369.258.147-74",
    "Nome": "Ricardo Pereira",
    "Produto": "Crédito Consignado",
    "Canal": "App Mobile"
  },
  {
    id: 10,
    "Data": "2025-09-22",
    "Saldo Anterior": 172500.00,
    "Saldo Posterior": 237500.00,
    "Descrição": "Crédito Pessoal - Sandra Lima",
    "Valor": 65000.00,
    "Tipo": "CREDITO",
    "Cliente": "Sandra Lima",
    "CPF_CNPJ": "741.852.963-52",
    "Nome": "Sandra Lima",
    "Produto": "Crédito Pessoal",
    "Canal": "Loja Física"
  },
  {
    id: 11,
    "Data": "2025-09-21",
    "Saldo Anterior": 237500.00,
    "Saldo Posterior": 267500.00,
    "Descrição": "Cartão de Crédito - Gabriel Costa",
    "Valor": 30000.00,
    "Tipo": "CREDITO",
    "Cliente": "Gabriel Costa",
    "CPF_CNPJ": "852.741.963-41",
    "Nome": "Gabriel Costa",
    "Produto": "Cartão de Crédito",
    "Canal": "Online"
  },
  {
    id: 12,
    "Data": "2025-09-20",
    "Saldo Anterior": 267500.00,
    "Saldo Posterior": 157500.00,
    "Descrição": "Financiamento Imobiliário - Mariana Santos",
    "Valor": -110000.00,
    "Tipo": "DEBITO",
    "Cliente": "Mariana Santos",
    "CPF_CNPJ": "963.852.741-30",
    "Nome": "Mariana Santos",
    "Produto": "Financiamento Imobiliário",
    "Canal": "Loja Física"
  },
  {
    id: 13,
    "Data": "2025-09-19",
    "Saldo Anterior": 157500.00,
    "Saldo Posterior": 159750.00,
    "Descrição": "Rendimento da Conta",
    "Valor": 2250.00,
    "Tipo": "CREDITO",
    "Cliente": "Sistema",
    "CPF_CNPJ": "00.000.000/0001-00",
    "Nome": "Rendimento Automático",
    "Produto": "Rendimento",
    "Canal": "Sistema"
  },
  {
    id: 14,
    "Data": "2025-09-18",
    "Saldo Anterior": 159750.00,
    "Saldo Posterior": 159500.00,
    "Descrição": "Taxa de Manutenção",
    "Valor": -250.00,
    "Tipo": "DEBITO",
    "Cliente": "Sistema",
    "CPF_CNPJ": "00.000.000/0001-00",
    "Nome": "Taxa de Manutenção",
    "Produto": "Taxa",
    "Canal": "Sistema"
  },
  {
    id: 15,
    "Data": "2025-09-17",
    "Saldo Anterior": 159500.00,
    "Saldo Posterior": 177000.00,
    "Descrição": "Transferência Recebida",
    "Valor": 17500.00,
    "Tipo": "CREDITO",
    "Cliente": "Transferência Externa",
    "CPF_CNPJ": "111.222.333-44",
    "Nome": "Transferência TED",
    "Produto": "Transferência",
    "Canal": "Online"
  }
];

export const mockStatementSummary: StatementSummaryMock = {
  totalTransacoes: 15,
  saldoFinal: 177000.00,
  totalCreditos: 457250.00,
  totalDebitos: -280250.00,
  valorMedioTransacao: 11816.67,
  transacoesPorTipo: {
    "CREDITO": 9,
    "DEBITO": 6
  }
};

// Função para simular a API
export const getStatementDataMock = async (
  startDate?: string,
  endDate?: string,
  searchTerm?: string
): Promise<{ data: StatementItemMock[], summary: StatementSummaryMock }> => {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 700));
  
  let filteredData = [...mockStatementData];
  
  // Filtrar por data se fornecido
  if (startDate || endDate) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.Data);
      
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
  
  // Filtrar por termo de busca (nome ou CPF/CNPJ)
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.Nome.toLowerCase().includes(term) ||
      item.CPF_CNPJ.includes(term) ||
      item.Descrição.toLowerCase().includes(term) ||
      item.Produto.toLowerCase().includes(term)
    );
  }
  
  // Calcular resumo baseado nos dados filtrados
  const totalCreditos = filteredData
    .filter(item => item.Tipo === 'CREDITO')
    .reduce((sum, item) => sum + item.Valor, 0);
    
  const totalDebitos = filteredData
    .filter(item => item.Tipo === 'DEBITO')
    .reduce((sum, item) => sum + item.Valor, 0);
  
  const transacoesPorTipo = filteredData.reduce((acc, item) => {
    acc[item.Tipo] = (acc[item.Tipo] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const summary: StatementSummaryMock = {
    totalTransacoes: filteredData.length,
    saldoFinal: filteredData.length > 0 ? filteredData[filteredData.length - 1]["Saldo Posterior"] : 0,
    totalCreditos,
    totalDebitos,
    valorMedioTransacao: filteredData.length > 0 ? 
      filteredData.reduce((sum, item) => sum + Math.abs(item.Valor), 0) / filteredData.length : 0,
    transacoesPorTipo
  };
  
  return { data: filteredData, summary };
};
