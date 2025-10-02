import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, Filter, Search, FileSpreadsheet, RotateCcw, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useSync } from '@/providers/sync-provider';
import { getStatementDataMock, StatementItemMock, StatementSummaryMock } from '@/data/mock';

// Interfaces para os dados adaptados
interface StatementData {
  id: number;
  data: string;
  saldo_anterior: number;
  saldo_posterior: number;
  descricao: string;
  valor: number;
  tipo: string;
  cliente: string;
  cpf_cnpj: string;
  nome: string;
  produto: string;
  canal: string;
}

interface SummaryData {
  total_transacoes: number;
  saldo_final: number;
  total_creditos: number;
  total_debitos: number;
  valor_medio_transacao: number;
  transacoes_por_tipo: { [key: string]: number };
}

// Função para adaptar dados mockados para o formato esperado
const adaptStatementData = (mockData: StatementItemMock[]): StatementData[] => {
  return mockData.map(item => ({
    id: item.id,
    data: item.Data,
    saldo_anterior: item["Saldo Anterior"],
    saldo_posterior: item["Saldo Posterior"],
    descricao: item.Descrição,
    valor: item.Valor,
    tipo: item.Tipo,
    cliente: item.Cliente,
    cpf_cnpj: item.CPF_CNPJ,
    nome: item.Nome,
    produto: item.Produto,
    canal: item.Canal
  }));
};

// Função para adaptar summary mockado
const adaptSummaryData = (mockSummary: StatementSummaryMock): SummaryData => {
  return {
    total_transacoes: mockSummary.totalTransacoes,
    saldo_final: mockSummary.saldoFinal,
    total_creditos: mockSummary.totalCreditos,
    total_debitos: mockSummary.totalDebitos,
    valor_medio_transacao: mockSummary.valorMedioTransacao,
    transacoes_por_tipo: mockSummary.transacoesPorTipo
  };
};

export default function Statement() {
  // Estados para os filtros temporários (não aplicados ainda)
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  
  // Estados para os filtros aplicados (usados nas queries)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortBy, setSortBy] = useState<string>('data');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedChartDate, setSelectedChartDate] = useState<string>('');
  
  const { updateSync, setRefreshing } = useSync();

  // Buscar dados do extrato
  const { data: statementResponse, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['statement', startDate, endDate, searchTerm],
    queryFn: async () => {
      console.log('[STATEMENT] Fazendo requisição para mock com:', {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        searchTerm: searchTerm || undefined
      });
      const mockResponse = await getStatementDataMock(
        startDate || undefined,
        endDate || undefined, 
        searchTerm || undefined
      );
      console.log('[STATEMENT] Dados retornados:', mockResponse.data.length, 'registros');
      return {
        data: adaptStatementData(mockResponse.data),
        summary: adaptSummaryData(mockResponse.summary)
      };
    },
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // Aplicar filtros
  const applyFilters = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setSearchTerm(tempSearchTerm);
  };

  // Verificar se há filtros aplicados
  const hasActiveFilters = startDate || endDate || searchTerm || selectedChartDate;

  // Verificar se há filtros pendentes para aplicar
  const hasPendingFilters = tempStartDate !== startDate || 
                           tempEndDate !== endDate || 
                           tempSearchTerm !== searchTerm;

  // Aplicar filtros ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  // Limpar filtros
  const clearFilters = () => {
    // Limpar filtros temporários
    setTempStartDate('');
    setTempEndDate('');
    setTempSearchTerm('');
    
    // Limpar filtros aplicados
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setSelectedChartDate('');
    
    setSortBy('data');
    setSortOrder('desc');
  };

  // Sincronizar filtros temporários com filtros aplicados ao inicializar
  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setTempSearchTerm(searchTerm);
  }, []); // Só na inicialização

  // Efeito para sincronização
  useEffect(() => {
    if (statementResponse) {
      const timestamp = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      updateSync(timestamp);
    }
  }, [statementResponse, updateSync]);

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

  // Extrair dados e summary
  const statementData = statementResponse?.data || [];
  const statementSummary = statementResponse?.summary;

  // Filtrar dados por data selecionada no gráfico
  const filteredByChart = useMemo(() => {
    if (!selectedChartDate) return statementData;
    return statementData.filter(item => item.data === selectedChartDate);
  }, [statementData, selectedChartDate]);

  // Função para ordenar dados
  const sortData = (data: StatementData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any = a[sortBy as keyof StatementData];
      let bValue: any = b[sortBy as keyof StatementData];

      if (sortBy === 'data') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Dados ordenados para exibição
  const sortedData = useMemo(() => {
    return sortData(filteredByChart);
  }, [filteredByChart, sortBy, sortOrder]);

  // Função para lidar com ordenação
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Função para renderizar ícone de ordenação
  const renderSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
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

  // Preparar dados para o gráfico por data
  const chartData = useMemo(() => {
    if (!statementData.length) return [];
    
    const dataGrouped = statementData.reduce((acc, item) => {
      const date = item.data;
      if (!acc[date]) {
        acc[date] = {
          data: formatDateForDisplay(date),
          creditos: 0,
          debitos: 0,
          transacoes: 0
        };
      }
      
      if (item.tipo === 'CREDITO') {
        acc[date].creditos += item.valor;
      } else {
        acc[date].debitos += Math.abs(item.valor);
      }
      acc[date].transacoes += 1;
      
      return acc;
    }, {} as any);
    
    return Object.values(dataGrouped)
      .sort((a: any, b: any) => new Date(b.data.split('/').reverse().join('-')).getTime() - new Date(a.data.split('/').reverse().join('-')).getTime())
      .slice(0, 17)
      .reverse();
  }, [statementData]);

  // Função de exportação
  const handleExport = () => {
    if (!sortedData || sortedData.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    const exportData = sortedData.map(item => ({
      Data: formatDateForDisplay(item.data),
      Cliente: item.cliente,
      'CPF/CNPJ': item.cpf_cnpj,
      Descrição: item.descricao,
      Valor: item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      Tipo: item.tipo,
      'Saldo Anterior': item.saldo_anterior.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Saldo Posterior': item.saldo_posterior.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      Produto: item.produto,
      Canal: item.canal
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Extrato');
    
    const fileName = `extrato_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Componente KPI Cards
  const KPICards: React.FC<{ summary: SummaryData }> = ({ summary }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transações</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.total_transacoes}</div>
          <p className="text-xs text-muted-foreground">
            Valor médio: {summary.valor_medio_transacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Final</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary.saldo_final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p className="text-xs text-muted-foreground">
            Posição atual
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Créditos</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {summary.total_creditos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p className="text-xs text-muted-foreground">
            Entradas
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Débitos</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {summary.total_debitos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p className="text-xs text-muted-foreground">
            Saídas
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Extrato</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie o extrato de transações
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
      {statementSummary && <KPICards summary={statementSummary} />}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Data Início</Label>
              <Input
                id="start-date"
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">Data Fim</Label>
              <Input
                id="end-date"
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Cliente, CPF, descrição..."
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
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
            <Button onClick={handleExport} variant="outline" disabled={!sortedData || sortedData.length === 0}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Movimentação Diária */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Movimentação Diária (Últimos 17 dias)
            {selectedChartDate && (
              <Badge variant="outline" className="ml-2">
                Filtrado por: {formatDateForDisplay(selectedChartDate)}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Carregando gráfico...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    typeof value === 'number' ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : value,
                    name
                  ]}
                />
                <Legend />
                <Bar dataKey="creditos" fill="#10b981" name="Créditos" />
                <Bar dataKey="debitos" fill="#ef4444" name="Débitos" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Tabela de Transações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Transações ({sortedData?.length || 0})
            {selectedChartDate && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedChartDate('')}
                className="ml-2"
              >
                Limpar Filtro de Data
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Carregando transações...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-destructive">Erro ao carregar transações</p>
            </div>
          ) : sortedData && sortedData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('data')}
                    >
                      <div className="flex items-center gap-2">
                        Data
                        {renderSortIcon('data')}
                      </div>
                    </TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF/CNPJ</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('valor')}
                    >
                      <div className="flex items-center gap-2">
                        Valor
                        {renderSortIcon('valor')}
                      </div>
                    </TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('saldo_anterior')}
                    >
                      <div className="flex items-center gap-2">
                        Saldo Anterior
                        {renderSortIcon('saldo_anterior')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('saldo_posterior')}
                    >
                      <div className="flex items-center gap-2">
                        Saldo Posterior
                        {renderSortIcon('saldo_posterior')}
                      </div>
                    </TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Canal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((item: StatementData) => (
                    <TableRow key={item.id}>
                      <TableCell>{formatDateForDisplay(item.data)}</TableCell>
                      <TableCell className="font-medium">{item.cliente}</TableCell>
                      <TableCell>{item.cpf_cnpj}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell className={item.valor >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.tipo === 'CREDITO' ? 'default' : 'destructive'}
                        >
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.saldo_anterior.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{item.saldo_posterior.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{item.produto}</TableCell>
                      <TableCell>{item.canal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Nenhuma transação encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
