// Arquivo central para exportar todos os dados mockados
export * from './funilMock';
export * from './faturasMock';
export * from './propostasMock';
export * from './statementMock';
export * from './producaoMock';
export * from './rankingMock';

// Flag para ativar/desativar o modo mock em toda a aplicação
export const MOCK_MODE = true;

// Função auxiliar para decidir se usar dados reais ou mockados
export const useMockData = () => {
  return MOCK_MODE || process.env.NODE_ENV === 'development';
};
