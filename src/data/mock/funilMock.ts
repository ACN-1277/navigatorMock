// Dados fictícios para o Funil
export const mockFunilData = [
  {
    "Nome": "João Silva Santos",
    "Documento": "123.456.789-10",
    "Telefone": "(11) 98765-4321",
    "Data Criacao": "2024-10-01T10:30:00Z",
    "Status": "FINALIZADO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 1,
    "Download-FGTS": 1,
    "App-Autorizado": 1,
    "Simulacao": 1,
    "Registro Completo": 1,
    "produto_nome": "Juros Baixos"
  },
  {
    "Nome": "Maria Oliveira Costa",
    "Documento": "987.654.321-00",
    "Telefone": "(11) 99876-5432",
    "Data Criacao": "2024-10-01T14:15:00Z",
    "Status": "EM_ANDAMENTO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 0,
    "Download-FGTS": 1,
    "App-Autorizado": 1,
    "Simulacao": 0,
    "Registro Completo": 0,
    "produto_nome": "Outro Produto"
  },
  {
    "Nome": "Carlos Eduardo Lima",
    "Documento": "456.789.123-45",
    "Telefone": "(11) 91234-5678",
    "Data Criacao": "2024-09-30T16:45:00Z",
    "Status": "CANCELADO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 1,
    "Download-FGTS": 0,
    "App-Autorizado": 0,
    "Simulacao": 0,
    "Registro Completo": 0,
    "produto_nome": "Juros Baixos"
  },
  {
    "Nome": "Ana Paula Ferreira",
    "Documento": "789.123.456-78",
    "Telefone": "(11) 95678-1234",
    "Data Criacao": "2024-09-29T09:20:00Z",
    "Status": "FINALIZADO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 1,
    "Download-FGTS": 1,
    "App-Autorizado": 1,
    "Simulacao": 1,
    "Registro Completo": 1,
    "produto_nome": "Outro Produto"
  },
  {
    "Nome": "Roberto Santos Almeida",
    "Documento": "321.654.987-12",
    "Telefone": "(11) 92345-6789",
    "Data Criacao": "2024-09-28T11:10:00Z",
    "Status": "EM_ANDAMENTO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 0,
    "Download-FGTS": 1,
    "App-Autorizado": 0,
    "Simulacao": 0,
    "Registro Completo": 0,
    "produto_nome": "Juros Baixos"
  },
  {
    "Nome": "Luciana Rodrigues",
    "Documento": "654.321.987-33",
    "Telefone": "(11) 93456-7890",
    "Data Criacao": "2024-09-27T13:30:00Z",
    "Status": "PENDENTE",
    "Pre-Registro": 1,
    "Site": 0,
    "Whatsapp": 0,
    "Download-FGTS": 0,
    "App-Autorizado": 0,
    "Simulacao": 0,
    "Registro Completo": 0,
    "produto_nome": "Outro Produto"
  },
  {
    "Nome": "Fernando Silva",
    "Documento": "147.258.369-96",
    "Telefone": "(11) 94567-8901",
    "Data Criacao": "2024-09-26T15:45:00Z",
    "Status": "FINALIZADO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 1,
    "Download-FGTS": 1,
    "App-Autorizado": 1,
    "Simulacao": 1,
    "Registro Completo": 1,
    "produto_nome": "Juros Baixos"
  },
  {
    "Nome": "Patricia Mendes",
    "Documento": "258.369.147-85",
    "Telefone": "(11) 96789-0123",
    "Data Criacao": "2024-09-25T08:15:00Z",
    "Status": "EM_ANDAMENTO",
    "Pre-Registro": 1,
    "Site": 1,
    "Whatsapp": 1,
    "Download-FGTS": 1,
    "App-Autorizado": 0,
    "Simulacao": 0,
    "Registro Completo": 0,
    "produto_nome": "Outro Produto"
  }
];

export const mockFunilKPIs = {
  total_leads: 8,
  total_finalizados: 3,
  taxa_conversao: 37.5,
  valor_medio: 15000.00,
  pre_registro: 8,
  site: 7,
  whatsapp: 5,
  download_fgts: 6,
  app_autorizado: 5,
  simulacao: 3,
  registro_completo: 3
};

export const mockFunilStatus = [
  "FINALIZADO",
  "EM_ANDAMENTO", 
  "CANCELADO",
  "PENDENTE"
];

// Funções para simular as APIs
export const getFunilDataMock = async (produto?: string, status?: string) => {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = [...mockFunilData];
  
  if (produto && produto !== 'todos') {
    if (produto === 'juros_baixos') {
      filteredData = filteredData.filter(item => item.produto_nome === 'Juros Baixos');
    }
  }
  
  if (status && status !== 'todos') {
    filteredData = filteredData.filter(item => item.Status === status);
  }
  
  return filteredData;
};

export const getFunilDataByStepMock = async (stepId: number, produto?: string, status?: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = await getFunilDataMock(produto, status);
  
  // Filtrar por etapa
  const stepFields = {
    1: 'Pre-Registro',
    2: 'Site', 
    9: 'Whatsapp',
    3: 'Download-FGTS',
    4: 'App-Autorizado',
    5: 'Simulacao',
    6: 'Registro Completo'
  };
  
  const stepField = stepFields[stepId as keyof typeof stepFields];
  if (stepField) {
    filteredData = filteredData.filter(item => item[stepField as keyof typeof item] === 1);
  }
  
  return filteredData;
};

export const getFunilKPIsMock = async (produto?: string, status?: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const data = await getFunilDataMock(produto, status);
  
  return {
    total_leads: data.length,
    total_finalizados: data.filter(item => item.Status === 'FINALIZADO').length,
    taxa_conversao: data.length > 0 ? (data.filter(item => item.Status === 'FINALIZADO').length / data.length) * 100 : 0,
    valor_medio: 15000.00,
    pre_registro: data.filter(item => item['Pre-Registro'] === 1).length,
    site: data.filter(item => item.Site === 1).length,
    whatsapp: data.filter(item => item.Whatsapp === 1).length,
    download_fgts: data.filter(item => item['Download-FGTS'] === 1).length,
    app_autorizado: data.filter(item => item['App-Autorizado'] === 1).length,
    simulacao: data.filter(item => item.Simulacao === 1).length,
    registro_completo: data.filter(item => item['Registro Completo'] === 1).length
  };
};

export const getFunilStatusMock = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockFunilStatus;
};
