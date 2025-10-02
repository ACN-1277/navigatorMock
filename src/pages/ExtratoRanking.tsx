import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, DollarSign, Target, Crown, Filter, Search, ChevronUp, ChevronDown, RotateCcw, FileSpreadsheet, BarChart3 } from 'lucide-react';
import { useSync } from '@/providers/sync-provider';
import { getRankingDataMock, RankingClienteMock, RankingSummaryMock } from '@/data/mock';
import * as XLSX from 'xlsx';

// Interfaces para dados adaptados
interface RankingData {
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

interface SummaryData {
  totalClientes: number;
  saldoTotalGeral: number;
  mediaSaldos: number;
  totalTransacoes: number;
  clientesAtivos: number;
  crescimentoMensal: number;
}

// Função para adaptar dados mockados
const adaptRankingData = (mockData: RankingClienteMock[]): RankingData[] => {
  return mockData.map(item => ({
    id: item.id,
    nome: item.nome,
    cpf_cnpj: item.cpf_cnpj,
    saldo: item.saldo,
    total_transacoes: item.total_transacoes,
    total_creditos: item.total_creditos,
    total_debitos: item.total_debitos,
    ultima_transacao: item.ultima_transacao,
    produto_principal: item.produto_principal,
    canal_preferido: item.canal_preferido,
    status: item.status,
    posicao: item.posicao
  }));
};

const adaptSummaryData = (mockSummary: RankingSummaryMock): SummaryData => {
  return {
    totalClientes: mockSummary.totalClientes,
    saldoTotalGeral: mockSummary.saldoTotalGeral,
    mediaSaldos: mockSummary.mediaSaldos,
    totalTransacoes: mockSummary.totalTransacoes,
    clientesAtivos: mockSummary.clientesAtivos,
    crescimentoMensal: mockSummary.crescimentoMensal
  };
};

export default function ExtratoRanking() {
  const { updateSync, setRefreshing } = useSync();
  
  // Estados para filtros temporários (não aplicados ainda)
  const [tempFiltroNome, setTempFiltroNome] = useState('');
  const [tempFiltroDataInicio, setTempFiltroDataInicio] = useState('');
  const [tempFiltroDataFim, setTempFiltroDataFim] = useState('');
  
  // Estados para filtros aplicados (usados nas queries)
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Buscar dados do ranking
  const { data: rankingResponse, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['extratoRanking', filtroNome, filtroDataInicio, filtroDataFim],
    queryFn: async () => {
      console.log('[RANKING] Fazendo requisição para mock com:', {
        nome: filtroNome || undefined,
        dataInicio: filtroDataInicio || undefined,
        dataFim: filtroDataFim || undefined
      });
      const mockResponse = await getRankingDataMock(
        filtroNome || undefined,
        filtroDataInicio || undefined,
        filtroDataFim || undefined
      );
      console.log('[RANKING] Dados retornados:', mockResponse.clientes.length, 'clientes');
      return {
        clientes: adaptRankingData(mockResponse.clientes),
        summary: adaptSummaryData(mockResponse.summary)
      };
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    staleTime: 0,
    enabled: true,
  });

  // Aplicar filtros
  const applyFilters = () => {
    setFiltroNome(tempFiltroNome);
    setFiltroDataInicio(tempFiltroDataInicio);
    setFiltroDataFim(tempFiltroDataFim);
  };

  // Verificar se há filtros aplicados
  const hasActiveFilters = filtroNome || filtroDataInicio || filtroDataFim;

  // Verificar se há filtros pendentes para aplicar
  const hasPendingFilters = tempFiltroNome !== filtroNome || 
                           tempFiltroDataInicio !== filtroDataInicio || 
                           tempFiltroDataFim !== filtroDataFim;

  // Aplicar filtros ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  // Limpar filtros
  const clearFilters = () => {
    // Limpar filtros temporários
    setTempFiltroNome('');
    setTempFiltroDataInicio('');
    setTempFiltroDataFim('');
    
    // Limpar filtros aplicados
    setFiltroNome('');
    setFiltroDataInicio('');
    setFiltroDataFim('');
    
    setSortOrder('desc');
  };

  // Sincronizar filtros temporários com filtros aplicados ao inicializar
  useEffect(() => {
    setTempFiltroNome(filtroNome);
    setTempFiltroDataInicio(filtroDataInicio);
    setTempFiltroDataFim(filtroDataFim);
  }, []); // Só na inicialização

  // Atualizar sync quando dados chegarem
  useEffect(() => {
    if (rankingResponse) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      updateSync(timestamp);
    }
  }, [rankingResponse, updateSync]);

  // Atualizar estado de refreshing
  useEffect(() => {
    setRefreshing(isFetching);
  }, [isFetching, setRefreshing]);

  // Extrair dados
  const clientes = rankingResponse?.clientes || [];
  const summary = rankingResponse?.summary;

  // Função para agrupar saldos em faixas
  const getFaixasSaldos = (clientesData: RankingData[]) => {
    const faixas = [
      { label: '< R$ 1k', min: 0, max: 1000, color: '#eab308' },
      { label: 'R$ 1k - 5k', min: 1000, max: 5000, color: '#ef4444' },
      { label: 'R$ 5k - 20k', min: 5000, max: 20000, color: '#22c55e' },
      { label: 'R$ 20k - 50k', min: 20000, max: 50000, color: '#3b82f6' },
      { label: '> R$ 50k', min: 50000, max: Infinity, color: '#8b5cf6' },
    ];
    const result = faixas.map(faixa => ({ ...faixa, total: 0 }));
    clientesData?.forEach(cliente => {
      const saldo = cliente.saldo || 0;
      const faixa = result.find(f => saldo >= f.min && saldo < f.max);
      if (faixa) faixa.total += 1;
    });
    return result.filter(f => f.total > 0);
  };

  // Calcular faixas de saldo após data estar disponível
  const faixasSaldos = getFaixasSaldos(clientes);

  // Dados ordenados baseados no sortOrder
  const sortedClientes = useMemo(() => {
    if (!clientes) return [];
    return [...clientes].sort((a, b) => {
      const saldoA = a.saldo || 0;
      const saldoB = b.saldo || 0;
      return sortOrder === 'desc' ? saldoB - saldoA : saldoA - saldoB;
    });
  }, [clientes, sortOrder]);

  // Função para alternar ordenação
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Refetch all data
  const handleRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
      const now = new Date();
      updateSync(now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    });
  };

  // Função de exportação
  const handleExport = () => {
    if (!sortedClientes || sortedClientes.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    const exportData = sortedClientes.map(cliente => ({
      Posição: cliente.posicao,
      Nome: cliente.nome,
      'CPF/CNPJ': cliente.cpf_cnpj,
      Saldo: cliente.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Total Transações': cliente.total_transacoes,
      'Total Créditos': cliente.total_creditos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Total Débitos': cliente.total_debitos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Última Transação': new Date(cliente.ultima_transacao).toLocaleDateString('pt-BR'),
      'Produto Principal': cliente.produto_principal,
      'Canal Preferido': cliente.canal_preferido,
      Status: cliente.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ranking Clientes');
    
    const fileName = `ranking_clientes_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Formatação de data para exibição
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ranking de Extrato</h1>
          <p className="text-muted-foreground">
            Ranking dos clientes por saldo e movimentação
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isFetching && (
            <div className="text-sm text-muted-foreground">
              Atualizando...
            </div>
          )}
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalClientes}</div>
              <p className="text-xs text-muted-foreground">
                {summary.clientesAtivos} ativos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summary.saldoTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total geral
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média Saldos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summary.mediaSaldos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <p className="text-xs text-muted-foreground">
                Por cliente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{summary.crescimentoMensal.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Mensal
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
            {hasActiveFilters && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Ativos
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-inicio">Data Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={tempFiltroDataInicio}
                onChange={(e) => setTempFiltroDataInicio(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-fim">Data Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={tempFiltroDataFim}
                onChange={(e) => setTempFiltroDataFim(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Cliente</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nome"
                  placeholder="Digite o nome do cliente..."
                  value={tempFiltroNome}
                  onChange={(e) => setTempFiltroNome(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            <Button 
              onClick={applyFilters} 
              variant="default"
              className={hasPendingFilters ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              {hasPendingFilters ? "Aplicar Filtros" : "Filtrar"}
              {hasPendingFilters && <span className="ml-1 text-xs">●</span>}
            </Button>
            <Button 
              onClick={clearFilters} 
              variant="outline"
              disabled={!hasActiveFilters && !hasPendingFilters}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            {hasActiveFilters && (
              <span className="text-sm text-muted-foreground bg-blue-50 px-2 py-1 rounded">
                Filtros ativos
              </span>
            )}
            <div className="flex-1"></div>
            <Button onClick={handleExport} variant="outline" disabled={!sortedClientes || sortedClientes.length === 0}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Distribuição por Faixas de Saldo */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Distribuição por Faixas de Saldo
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Carregando gráfico...</p>
              </div>
            ) : faixasSaldos.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faixasSaldos} margin={{ top: 30, right: 30, left: 30, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="label" 
                    fontSize={13}
                    fontWeight={500}
                    tick={{ fill: '#475569' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    fontSize={13}
                    fontWeight={500}
                    tick={{ fill: '#475569' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Clientes']}
                    labelFormatter={(label) => `Faixa: ${label}`}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="#3b82f6" 
                    radius={[6, 6, 0, 0]}
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Nenhum dado para exibir</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição por Faixas */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Distribuição por Faixas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : faixasSaldos.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="75%">
                    <PieChart>
                      <Pie
                        data={faixasSaldos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ total, percent }) => `${total} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="total"
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                      >
                        {faixasSaldos.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} clientes`, 'Total']}
                        labelFormatter={(label) => {
                          const faixa = faixasSaldos.find(f => f.total.toString() === label);
                          return faixa ? `Faixa: ${faixa.label}` : '';
                        }}
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legenda personalizada melhorada */}
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {faixasSaldos.map((faixa, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-transparent rounded-lg hover:from-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: faixa.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">{faixa.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{faixa.total}</span>
                        <span className="text-xs text-gray-500">clientes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Nenhum dado para exibir</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Ranking de Clientes ({sortedClientes?.length || 0})
            </div>
            <Button onClick={toggleSortOrder} variant="outline" size="sm">
              {sortOrder === 'desc' ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronUp className="h-4 w-4 mr-2" />}
              {sortOrder === 'desc' ? 'Maior para Menor' : 'Menor para Maior'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Carregando ranking...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-destructive">Erro ao carregar ranking</p>
            </div>
          ) : sortedClientes && sortedClientes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Pos.</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF/CNPJ</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Transações</TableHead>
                    <TableHead>Última Mov.</TableHead>
                    <TableHead>Produto Principal</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedClientes.map((cliente, index) => (
                    <TableRow key={cliente.id} className={index < 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {index + 1 <= 3 && (
                            <Crown className={`h-4 w-4 ${
                              index + 1 === 1 ? 'text-yellow-500' :
                              index + 1 === 2 ? 'text-gray-400' :
                              'text-amber-600'
                            }`} />
                          )}
                          <span className={index < 3 ? 'font-bold text-lg' : ''}>{index + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-medium ${index < 3 ? 'font-bold' : ''}`}>
                        {cliente.nome}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{cliente.cpf_cnpj}</TableCell>
                      <TableCell className={`font-medium ${
                        index + 1 === 1 ? 'text-yellow-600 text-lg font-bold' :
                        index + 1 === 2 ? 'text-gray-600 text-lg font-bold' :
                        index + 1 === 3 ? 'text-amber-600 text-lg font-bold' :
                        'text-green-600'
                      }`}>
                        {cliente.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {cliente.total_transacoes}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDateForDisplay(cliente.ultima_transacao)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {cliente.produto_principal}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {cliente.canal_preferido}
                      </TableCell>
                      <TableCell>
                        <Badge variant={cliente.status === 'Ativo' ? 'default' : 'secondary'}>
                          {cliente.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Nenhum cliente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
