// Configuração simplificada - apenas dados mockados
// Arquivo mantido para compatibilidade com componentes existentes

// Mock function for API endpoint generation (returns mock URL for compatibility)
export const getApiEndpoint = (database: string, endpoint: string): string => {
  logApiCall(`MOCK-${database}${endpoint}`, 'REQUEST');
  return `mock://${database.toLowerCase()}${endpoint}`;
};

// Utilitário para logging (mantido para debug)
export const logApiCall = (url: string, type: 'REQUEST' | 'SUCCESS' | 'ERROR' = 'REQUEST') => {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  console.log(`[MOCK-${type}] ${timestamp} - ${url}`);
};