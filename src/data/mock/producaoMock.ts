// Dados fictícios para Produção Analytics
export interface ProducaoDataMock {
  id: number;
  "Data": string;
  "Valor": number;
  "Quantidade": number;
  "Produto": string;
  "Canal": string;
  "Status": string;
  "Vendedor": string;
  "Região": string;
  "Meta": number;
  "Realizado": number;
}

export interface ProducaoKPIMock {
  totalVendas: number;
  valorTotal: number;
  metaMensal: number;
  percentualMeta: number;
  ticketMedio: number;
  vendasDia: number;
  crescimentoMes: number;
  topVendedor: string;
}

export const mockProducaoData: ProducaoDataMock[] = [
  {
    id: 1,
    "Data": "2024-10-01",
    "Valor": 125000.00,
    "Quantidade": 5,
    "Produto": "Crédito Consignado",
    "Canal": "Online",
    "Status": "FINALIZADO",
    "Vendedor": "Carlos Roberto",
    "Região": "São Paulo",
    "Meta": 100000.00,
    "Realizado": 125000.00
  },
  {
    id: 2,
    "Data": "2024-09-30",
    "Valor": 95000.00,
    "Quantidade": 3,
    "Produto": "Financiamento Veicular",
    "Canal": "Loja Física",
    "Status": "FINALIZADO",
    "Vendedor": "Ana Santos",
    "Região": "Rio de Janeiro",
    "Meta": 120000.00,
    "Realizado": 95000.00
  },
  {
    id: 3,
    "Data": "2024-09-29",
    "Valor": 87500.00,
    "Quantidade": 7,
    "Produto": "Crédito Pessoal",
    "Canal": "Telefone",
    "Status": "FINALIZADO",
    "Vendedor": "João Silva",
    "Região": "Minas Gerais",
    "Meta": 80000.00,
    "Realizado": 87500.00
  },
  {
    id: 4,
    "Data": "2024-09-28",
    "Valor": 156000.00,
    "Quantidade": 2,
    "Produto": "Financiamento Imobiliário",
    "Canal": "Online",
    "Status": "FINALIZADO",
    "Vendedor": "Maria Costa",
    "Região": "São Paulo",
    "Meta": 150000.00,
    "Realizado": 156000.00
  },
  {
    id: 5,
    "Data": "2024-09-27",
    "Valor": 64000.00,
    "Quantidade": 4,
    "Produto": "Cartão de Crédito",
    "Canal": "App Mobile",
    "Status": "FINALIZADO",
    "Vendedor": "Roberto Lima",
    "Região": "Bahia",
    "Meta": 60000.00,
    "Realizado": 64000.00
  },
  {
    id: 6,
    "Data": "2024-09-26",
    "Valor": 112000.00,
    "Quantidade": 6,
    "Produto": "Crédito Consignado",
    "Canal": "Loja Física",
    "Status": "FINALIZADO",
    "Vendedor": "Patricia Mendes",
    "Região": "Paraná",
    "Meta": 110000.00,
    "Realizado": 112000.00
  },
  {
    id: 7,
    "Data": "2024-09-25",
    "Valor": 43000.00,
    "Quantidade": 8,
    "Produto": "Crédito Pessoal",
    "Canal": "Online",
    "Status": "FINALIZADO",
    "Vendedor": "Fernando Alves",
    "Região": "Rio Grande do Sul",
    "Meta": 50000.00,
    "Realizado": 43000.00
  },
  {
    id: 8,
    "Data": "2024-09-24",
    "Valor": 134000.00,
    "Quantidade": 3,
    "Produto": "Financiamento Veicular",
    "Canal": "Telefone",
    "Status": "FINALIZADO",
    "Vendedor": "Sandra Oliveira",
    "Região": "Ceará",
    "Meta": 125000.00,
    "Realizado": 134000.00
  },
  {
    id: 9,
    "Data": "2024-09-23",
    "Valor": 76000.00,
    "Quantidade": 5,
    "Produto": "Cartão de Crédito",
    "Canal": "App Mobile",
    "Status": "FINALIZADO",
    "Vendedor": "Ricardo Santos",
    "Região": "Pernambuco",
    "Meta": 70000.00,
    "Realizado": 76000.00
  },
  {
    id: 10,
    "Data": "2024-09-22",
    "Valor": 98000.00,
    "Quantidade": 4,
    "Produto": "Crédito Pessoal",
    "Canal": "Loja Física",
    "Status": "FINALIZADO",
    "Vendedor": "Luciana Ferreira",
    "Região": "Goiás",
    "Meta": 90000.00,
    "Realizado": 98000.00
  },
  {
    id: 11,
    "Data": "2024-09-21",
    "Valor": 187000.00,
    "Quantidade": 2,
    "Produto": "Financiamento Imobiliário",
    "Canal": "Online",
    "Status": "FINALIZADO",
    "Vendedor": "Gabriel Torres",
    "Região": "São Paulo",
    "Meta": 180000.00,
    "Realizado": 187000.00
  },
  {
    id: 12,
    "Data": "2024-09-20",
    "Valor": 56000.00,
    "Quantidade": 6,
    "Produto": "Crédito Consignado",
    "Canal": "Telefone",
    "Status": "FINALIZADO",
    "Vendedor": "Mariana Silva",
    "Região": "Espírito Santo",
    "Meta": 55000.00,
    "Realizado": 56000.00
  },
  {
    id: 13,
    "Data": "2024-09-19",
    "Valor": 89000.00,
    "Quantidade": 7,
    "Produto": "Crédito Pessoal",
    "Canal": "App Mobile",
    "Status": "FINALIZADO",
    "Vendedor": "Diego Pereira",
    "Região": "Santa Catarina",
    "Meta": 85000.00,
    "Realizado": 89000.00
  },
  {
    id: 14,
    "Data": "2024-09-18",
    "Valor": 145000.00,
    "Quantidade": 3,
    "Produto": "Financiamento Veicular",
    "Canal": "Loja Física",
    "Status": "FINALIZADO",
    "Vendedor": "Camila Rodrigues",
    "Região": "Rio de Janeiro",
    "Meta": 140000.00,
    "Realizado": 145000.00
  },
  {
    id: 15,
    "Data": "2024-09-17",
    "Valor": 71000.00,
    "Quantidade": 9,
    "Produto": "Cartão de Crédito",
    "Canal": "Online",
    "Status": "FINALIZADO",
    "Vendedor": "Bruno Costa",
    "Região": "Mato Grosso",
    "Meta": 65000.00,
    "Realizado": 71000.00
  }
];

export const mockProducaoKPIs: ProducaoKPIMock = {
  totalVendas: 74,
  valorTotal: 1639500.00,
  metaMensal: 1635000.00,
  percentualMeta: 100.28,
  ticketMedio: 22155.41,
  vendasDia: 5,
  crescimentoMes: 12.5,
  topVendedor: "Gabriel Torres"
};

export const mockVendedores = [
  "Carlos Roberto",
  "Ana Santos", 
  "João Silva",
  "Maria Costa",
  "Roberto Lima",
  "Patricia Mendes",
  "Fernando Alves",
  "Sandra Oliveira",
  "Ricardo Santos",
  "Luciana Ferreira",
  "Gabriel Torres",
  "Mariana Silva",
  "Diego Pereira",
  "Camila Rodrigues",
  "Bruno Costa"
];

export const mockProdutos = [
  "Crédito Consignado",
  "Financiamento Veicular",
  "Crédito Pessoal",
  "Financiamento Imobiliário",
  "Cartão de Crédito"
];

export const mockCanais = [
  "Online",
  "Loja Física", 
  "Telefone",
  "App Mobile"
];

export const mockRegioes = [
  "São Paulo",
  "Rio de Janeiro",
  "Minas Gerais",
  "Bahia",
  "Paraná",
  "Rio Grande do Sul",
  "Ceará",
  "Pernambuco",
  "Goiás",
  "Espírito Santo",
  "Santa Catarina",
  "Mato Grosso"
];

// Funções para simular as APIs
export const getProducaoDataMock = async (
  startDate?: string,
  endDate?: string,
  searchTerm?: string,
  vendedor?: string,
  produto?: string,
  canal?: string,
  regiao?: string
): Promise<ProducaoDataMock[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let filteredData = [...mockProducaoData];
  
  // Filtrar por data
  if (startDate && endDate) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.Data);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });
  }
  
  // Filtrar por termo de busca
  if (searchTerm && searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter(item =>
      item.Vendedor.toLowerCase().includes(term) ||
      item.Produto.toLowerCase().includes(term) ||
      item.Canal.toLowerCase().includes(term) ||
      item.Região.toLowerCase().includes(term)
    );
  }
  
  // Filtros específicos
  if (vendedor && vendedor !== 'todos') {
    filteredData = filteredData.filter(item => item.Vendedor === vendedor);
  }
  
  if (produto && produto !== 'todos') {
    filteredData = filteredData.filter(item => item.Produto === produto);
  }
  
  if (canal && canal !== 'todos') {
    filteredData = filteredData.filter(item => item.Canal === canal);
  }
  
  if (regiao && regiao !== 'todos') {
    filteredData = filteredData.filter(item => item.Região === regiao);
  }
  
  return filteredData;
};

export const getProducaoKPIsMock = async (
  startDate?: string,
  endDate?: string,
  vendedor?: string,
  produto?: string,
  canal?: string,
  regiao?: string
): Promise<ProducaoKPIMock> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const data = await getProducaoDataMock(startDate, endDate, undefined, vendedor, produto, canal, regiao);
  
  const totalVendas = data.reduce((sum, item) => sum + item.Quantidade, 0);
  const valorTotal = data.reduce((sum, item) => sum + item.Valor, 0);
  const metaTotal = data.reduce((sum, item) => sum + item.Meta, 0);
  
  // Contar vendas por vendedor para encontrar o top
  const vendasPorVendedor = data.reduce((acc, item) => {
    acc[item.Vendedor] = (acc[item.Vendedor] || 0) + item.Valor;
    return acc;
  }, {} as { [key: string]: number });
  
  const topVendedor = Object.entries(vendasPorVendedor)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A";
  
  return {
    totalVendas,
    valorTotal,
    metaMensal: metaTotal,
    percentualMeta: metaTotal > 0 ? (valorTotal / metaTotal) * 100 : 0,
    ticketMedio: totalVendas > 0 ? valorTotal / totalVendas : 0,
    vendasDia: data.filter(item => {
      const hoje = new Date().toISOString().split('T')[0];
      return item.Data === hoje;
    }).reduce((sum, item) => sum + item.Quantidade, 0),
    crescimentoMes: 12.5, // Valor fixo mockado
    topVendedor
  };
};

export const getVendedoresMock = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockVendedores;
};

export const getProdutosMock = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockProdutos;
};

export const getCanaisMock = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockCanais;
};

export const getRegioesMock = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockRegioes;
};
