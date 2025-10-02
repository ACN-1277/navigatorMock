// Mock data for ProducaoAnalyticsSimple component
export const mockProducaoAnalyticsData = {
  statusBreakdown: [
    { 
      status: 'Análise', 
      quantidade: 1250, 
      valorFinanciado: 125000000,
      valorReferencia: 130000000,
      valorLiberado: 120000000,
      valorParcela: 5000000,
      percentual: 18.2 
    },
    { 
      status: 'Aprovado', 
      quantidade: 980, 
      valorFinanciado: 98000000,
      valorReferencia: 102000000,
      valorLiberado: 95000000,
      valorParcela: 4200000,
      percentual: 14.3 
    },
    { 
      status: 'Pendente', 
      quantidade: 1620, 
      valorFinanciado: 162000000,
      valorReferencia: 168000000,
      valorLiberado: 0,
      valorParcela: 0,
      percentual: 23.6 
    },
    { 
      status: 'Rejeitado', 
      quantidade: 450, 
      valorFinanciado: 45000000,
      valorReferencia: 48000000,
      valorLiberado: 0,
      valorParcela: 0,
      percentual: 6.6 
    },
    { 
      status: 'Cancelado', 
      quantidade: 320, 
      valorFinanciado: 32000000,
      valorReferencia: 35000000,
      valorLiberado: 0,
      valorParcela: 0,
      percentual: 4.7 
    },
    { 
      status: 'Em Processamento', 
      quantidade: 890, 
      valorFinanciado: 89000000,
      valorReferencia: 92000000,
      valorLiberado: 45000000,
      valorParcela: 2800000,
      percentual: 13.0 
    },
    { 
      status: 'Finalizado', 
      quantidade: 1340, 
      valorFinanciado: 134000000,
      valorReferencia: 140000000,
      valorLiberado: 134000000,
      valorParcela: 6200000,
      percentual: 19.6 
    }
  ],
  bancos: [
    'Banco do Brasil',
    'Caixa Econômica Federal',
    'BTG Pactual',
    'Itaú Unibanco',
    'Bradesco',
    'Santander'
  ],
  equipes: [
    'Equipe Alpha',
    'Equipe Beta',
    'Equipe Gamma',
    'Equipe Delta',
    'Equipe Omega'
  ],
  contractDetails: {
    'Análise': [
      {
        id: 1,
        contrato: 'CT-2024-001',
        clienteNome: 'João Silva Santos',
        bancoNome: 'Banco do Brasil',
        equipeNome: 'Equipe Alpha',
        produtoNome: 'Consórcio Imóvel',
        statusNome: 'ANÁLISE',
        cpfCnpj: '123.456.789-01',
        dataCadastro: '2024-09-15',
        valores: 125000,
        valorReferencia: 130000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Documentação em análise'
      },
      {
        id: 2,
        contrato: 'CT-2024-002',
        clienteNome: 'Maria Oliveira',
        bancoNome: 'Caixa Econômica Federal',
        equipeNome: 'Equipe Beta',
        produtoNome: 'Consórcio Auto',
        statusNome: 'ANÁLISE',
        cpfCnpj: '234.567.890-12',
        dataCadastro: '2024-09-16',
        valores: 98000,
        valorReferencia: 102000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Aguardando validação'
      },
      {
        id: 3,
        contrato: 'CT-2024-003',
        clienteNome: 'Pedro Costa Lima',
        bancoNome: 'BTG Pactual',
        equipeNome: 'Equipe Gamma',
        produtoNome: 'Consórcio Imóvel',
        statusNome: 'ANÁLISE',
        cpfCnpj: '345.678.901-23',
        dataCadastro: '2024-09-17',
        valores: 156000,
        valorReferencia: 160000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Revisão de crédito'
      },
      {
        id: 4,
        contrato: 'CT-2024-004',
        clienteNome: 'Ana Santos Pereira',
        bancoNome: 'Itaú Unibanco',
        equipeNome: 'Equipe Delta',
        produtoNome: 'Consórcio Moto',
        statusNome: 'ANÁLISE',
        cpfCnpj: '456.789.012-34',
        dataCadastro: '2024-09-18',
        valores: 87000,
        valorReferencia: 90000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Verificação de renda'
      },
      {
        id: 5,
        contrato: 'CT-2024-005',
        clienteNome: 'Carlos Ferreira',
        bancoNome: 'Bradesco',
        equipeNome: 'Equipe Omega',
        produtoNome: 'Consórcio Imóvel',
        statusNome: 'ANÁLISE',
        cpfCnpj: '567.890.123-45',
        dataCadastro: '2024-09-19',
        valores: 203000,
        valorReferencia: 210000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Análise completa pendente'
      }
    ],
    'Aprovado': [
      {
        id: 50,
        contrato: 'CT-2024-050',
        clienteNome: 'Roberto Silva',
        bancoNome: 'Santander',
        equipeNome: 'Equipe Alpha',
        produtoNome: 'Consórcio Auto',
        statusNome: 'APROVADO',
        cpfCnpj: '678.901.234-56',
        dataCadastro: '2024-09-10',
        valores: 145000,
        valorReferencia: 150000,
        valorLiberado: 145000,
        valorParcela: 7200,
        observacoes: 'Aprovado sem restrições'
      },
      {
        id: 51,
        contrato: 'CT-2024-051',
        clienteNome: 'Lucia Martinez',
        bancoNome: 'Banco do Brasil',
        equipeNome: 'Equipe Beta',
        produtoNome: 'Consórcio Imóvel',
        statusNome: 'APROVADO',
        cpfCnpj: '789.012.345-67',
        dataCadastro: '2024-09-11',
        valores: 112000,
        valorReferencia: 115000,
        valorLiberado: 112000,
        valorParcela: 5600,
        observacoes: 'Documentação completa'
      },
      {
        id: 52,
        contrato: 'CT-2024-052',
        clienteNome: 'Fernando Souza',
        bancoNome: 'Caixa Econômica Federal',
        equipeNome: 'Equipe Gamma',
        produtoNome: 'Consórcio Auto',
        statusNome: 'APROVADO',
        cpfCnpj: '890.123.456-78',
        dataCadastro: '2024-09-12',
        valores: 167000,
        valorReferencia: 170000,
        valorLiberado: 167000,
        valorParcela: 8350,
        observacoes: 'Aprovação automática'
      }
    ],
    'Pendente': [
      {
        id: 100,
        contrato: 'CT-2024-100',
        clienteNome: 'Beatriz Almeida',
        bancoNome: 'BTG Pactual',
        equipeNome: 'Equipe Delta',
        produtoNome: 'Empréstimo Pessoal',
        statusNome: 'PENDENTE',
        cpfCnpj: '901.234.567-89',
        dataCadastro: '2024-09-13',
        valores: 45000,
        valorReferencia: 47000,
        valorLiberado: 0,
        valorParcela: 2350,
        observacoes: 'Aguardando documentos'
      },
      {
        id: 101,
        contrato: 'CT-2024-101',
        clienteNome: 'Ricardo Martins',
        bancoNome: 'Santander',
        equipeNome: 'Equipe Omega',
        produtoNome: 'Financiamento Veículo',
        statusNome: 'PENDENTE',
        cpfCnpj: '012.345.678-90',
        dataCadastro: '2024-09-14',
        valores: 89000,
        valorReferencia: 92000,
        valorLiberado: 0,
        valorParcela: 4600,
        observacoes: 'Aguardando aprovação banco'
      },
      {
        id: 102,
        contrato: 'CT-2024-102',
        clienteNome: 'Isabela Costa',
        bancoNome: 'Bradesco',
        equipeNome: 'Equipe Alpha',
        produtoNome: 'Consórcio Imóvel',
        statusNome: 'PENDENTE',
        cpfCnpj: '123.456.789-01',
        dataCadastro: '2024-09-15',
        valores: 234000,
        valorReferencia: 240000,
        valorLiberado: 0,
        valorParcela: 12000,
        observacoes: 'Em análise de crédito'
      }
    ],
    'Rejeitado': [
      {
        id: 200,
        contrato: 'CT-2024-200',
        clienteNome: 'Antonio Carlos',
        bancoNome: 'Santander',
        equipeNome: 'Equipe Beta',
        produtoNome: 'Empréstimo Consignado',
        statusNome: 'REJEITADO',
        cpfCnpj: '234.567.890-12',
        dataCadastro: '2024-09-08',
        valores: 0,
        valorReferencia: 55000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Renda insuficiente'
      },
      {
        id: 201,
        contrato: 'CT-2024-201',
        clienteNome: 'Paula Vieira',
        bancoNome: 'Itaú Unibanco',
        equipeNome: 'Equipe Gamma',
        produtoNome: 'Financiamento Imóvel',
        statusNome: 'REJEITADO',
        cpfCnpj: '345.678.901-23',
        dataCadastro: '2024-09-09',
        valores: 0,
        valorReferencia: 320000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Documentos pendentes'
      }
    ],
    'Cancelado': [
      {
        id: 300,
        contrato: 'CT-2024-300',
        clienteNome: 'Ricardo Santos',
        bancoNome: 'Caixa Econômica Federal',
        equipeNome: 'Equipe Delta',
        produtoNome: 'Crédito Pessoal',
        statusNome: 'CANCELADO',
        cpfCnpj: '456.789.012-34',
        dataCadastro: '2024-08-28',
        valores: 0,
        valorReferencia: 78000,
        valorLiberado: 0,
        valorParcela: 0,
        observacoes: 'Cancelado pelo cliente'
      }
    ],
    'Em Processamento': [
      {
        id: 400,
        contrato: 'CT-2024-400',
        clienteNome: 'Helena Costa',
        bancoNome: 'BTG Pactual',
        equipeNome: 'Equipe Omega',
        produtoNome: 'Financiamento Veículo',
        statusNome: 'EM PROCESSAMENTO',
        cpfCnpj: '567.890.123-45',
        dataCadastro: '2024-09-13',
        valores: 189000,
        valorReferencia: 195000,
        valorLiberado: 0,
        valorParcela: 9750,
        observacoes: 'Processando liberação'
      },
      {
        id: 401,
        contrato: 'CT-2024-401',
        clienteNome: 'Gustavo Lima',
        bancoNome: 'Bradesco',
        equipeNome: 'Equipe Alpha',
        produtoNome: 'Crédito Pessoal',
        statusNome: 'EM PROCESSAMENTO',
        cpfCnpj: '678.901.234-56',
        dataCadastro: '2024-09-14',
        valores: 67000,
        valorReferencia: 70000,
        valorLiberado: 0,
        valorParcela: 3500,
        observacoes: 'Aguardando aprovação final'
      }
    ],
    'Finalizado': [
      {
        id: 500,
        contrato: 'CT-2024-500',
        clienteNome: 'Mariana Ferreira',
        bancoNome: 'Bradesco',
        equipeNome: 'Equipe Beta',
        produtoNome: 'Consórcio Auto',
        statusNome: 'FINALIZADO',
        cpfCnpj: '789.012.345-67',
        dataCadastro: '2024-08-25',
        valores: 167000,
        valorReferencia: 170000,
        valorLiberado: 167000,
        valorParcela: 8350,
        observacoes: 'Processo concluído'
      },
      {
        id: 501,
        contrato: 'CT-2024-501',
        clienteNome: 'Thiago Alves',
        bancoNome: 'Santander',
        equipeNome: 'Equipe Gamma',
        produtoNome: 'Financiamento Imóvel',
        statusNome: 'FINALIZADO',
        cpfCnpj: '890.123.456-78',
        dataCadastro: '2024-08-26',
        valores: 198000,
        valorReferencia: 200000,
        valorLiberado: 198000,
        valorParcela: 9900,
        observacoes: 'Finalizado com sucesso'
      },
      {
        id: 502,
        contrato: 'CT-2024-502',
        clienteNome: 'Juliana Rocha',
        bancoNome: 'Banco do Brasil',
        equipeNome: 'Equipe Delta',
        produtoNome: 'Crédito Pessoal',
        statusNome: 'FINALIZADO',
        cpfCnpj: '901.234.567-89',
        dataCadastro: '2024-08-27',
        valores: 176000,
        valorReferencia: 180000,
        valorLiberado: 176000,
        valorParcela: 8800,
        observacoes: 'Concluído'
      }
    ]
  }
};

// Função utilitária para simular delay de API
export const mockApiDelay = (ms: number = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Função para filtrar dados mock com base nos filtros aplicados
export const filterMockData = (data: any, filters: {
  banco?: string;
  equipe?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const { banco, equipe, startDate, endDate } = filters;
  
  // Para esta implementação mock, retornamos os dados base
  // Em uma implementação real, aplicaríamos os filtros
  let filteredData = { ...data };
  
  // Se houver filtros específicos, podemos simular a filtragem
  if (banco || equipe) {
    // Simular redução de dados quando filtros são aplicados
    filteredData.statusBreakdown = data.statusBreakdown.map((item: any) => ({
      ...item,
      quantidade: Math.floor(item.quantidade * 0.7), // Simula filtro reduzindo dados
      valorFinanciado: Math.floor(item.valorFinanciado * 0.7),
      valorReferencia: Math.floor(item.valorReferencia * 0.7),
      valorLiberado: Math.floor(item.valorLiberado * 0.7),
      valorParcela: Math.floor(item.valorParcela * 0.7)
    }));
  }
  
  return filteredData;
};
