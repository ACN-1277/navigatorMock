import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getApiEndpoint, logApiCall } from '@/lib/api-config';

export default function NetworkTest() {
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
  const currentPort = typeof window !== 'undefined' ? window.location.port : 'unknown';
  const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'unknown';
  
  const mockEndpoints = [
    { name: 'Dashboard Analytics', url: getApiEndpoint('MOCK', '/api/dashboard/analytics'), status: 'MOCK - OK' },
    { name: 'Produção Analytics', url: getApiEndpoint('MOCK', '/api/producao/status-analysis'), status: 'MOCK - OK' },
    { name: 'Funil Data', url: getApiEndpoint('MOCK', '/api/funil/data'), status: 'MOCK - OK' },
    { name: 'Propostas', url: getApiEndpoint('MOCK', '/api/propostas/data'), status: 'MOCK - OK' },
    { name: 'Statement/Extrato', url: getApiEndpoint('MOCK', '/api/statement'), status: 'MOCK - OK' },
    { name: 'Faturas', url: getApiEndpoint('MOCK', '/api/faturas'), status: 'MOCK - OK' },
    { name: 'Extrato Ranking', url: getApiEndpoint('MOCK', '/api/extrato-ranking'), status: 'MOCK - OK' },
  ];

  const testMockEndpoint = (url: string, name: string) => {
    logApiCall(url, 'REQUEST');
    setTimeout(() => {
      logApiCall(url, 'SUCCESS');
      alert(`✅ Mock endpoint testado com sucesso!\n\nEndpoint: ${name}\nURL: ${url}\n\nStatus: SIMULADO - OK\nTempo de resposta: ~500ms\n\nTodos os dados são fornecidos por sistema mock interno.`);
    }, 100);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sistema de Dados Mock - Diagnóstico</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Hostname:</strong> {currentHostname}
            </div>
            <div>
              <strong>Porta:</strong> {currentPort}
            </div>
            <div>
              <strong>Protocolo:</strong> {currentProtocol}
            </div>
            <div>
              <strong>URL Completa:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema Mock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <strong>Sistema Mock:</strong> <span className="text-green-600">Ativo e Funcional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <strong>Dados Simulados:</strong> <span className="text-green-600">Carregados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <strong>Dependências Externas:</strong> <span className="text-green-600">Removidas</span>
            </div>
            <div className="text-sm text-muted-foreground mt-4">
              ℹ️ Este sistema foi convertido para funcionar completamente com dados mockados, 
              não requerendo conexões com banco de dados externos.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teste de Endpoints Mock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEndpoints.map((endpoint, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="font-medium">{endpoint.name}</div>
                <div className="text-sm text-muted-foreground mb-2">{endpoint.url}</div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">{endpoint.status}</span>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  onClick={() => testMockEndpoint(endpoint.url, endpoint.name)}
                >
                  Testar Mock
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos Mock Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div><strong>Dashboard:</strong> /src/data/mock/mockDashboard.ts</div>
            <div><strong>Propostas:</strong> /src/data/mock/mockPropostas.ts</div>
            <div><strong>Statement:</strong> /src/data/mock/mockStatement.ts</div>
            <div><strong>Extrato Ranking:</strong> /src/data/mock/mockExtratoRanking.ts</div>
            <div><strong>Faturas:</strong> /src/data/mock/mockFaturas.ts</div>
            <div><strong>Produção Analytics:</strong> /src/data/mock/mockProducaoAnalytics.ts</div>
            <div className="text-sm text-muted-foreground mt-4">
              📁 Todos os dados são fornecidos por estes arquivos mock locais.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}