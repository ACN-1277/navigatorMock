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
import { FileText, Users, DollarSign, TrendingUp, TrendingDown, Calendar, Filter, BarChart3, RotateCcw, FileSpreadsheet, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useSync } from '@/providers/sync-provider';
import { getPropostasMock, getPropostasKPIsMock, getPropostasStatusMock, getPropostasEvolucaoMock, PropostaMock, PropostaKPIMock, PropostaEvolucaoMock } from '@/data/mock';

// Interfaces
interface PropostaData {
  cliente: string;
  telefone: string;
  email: string;
  proposta_id: number;
  data_contrato: string;
  data_criacao: string;
  valor_total: number;
  valor_liquido: number;
  qtd_parcelas: number;
  canal_venda: number;
  status_processo: string;
  data_finalizacao: string;
  id_processo_sworks: string;
}

interface EvolucaoData {
  data: string;
  quantidade: number;
  valor_total: number;
  valor_liquido: number;
  finalizadas: number;
}

interface KPIData {
  total_propostas: number;
  clientes_unicos: number;
  valor_total: number;
  valor_liquido: number;
  valor_medio: number;
  finalizadas: number;
  em_andamento: number;
  pendentes: number;
  canceladas: number;
}

// Função para adaptar dados mockados para o formato esperado
const adaptPropostasData = (mockData: PropostaMock[]): PropostaData[] => {
  return mockData.map(item => ({
    cliente: item.Cliente,
    telefone: '(11) 99999-9999',
    email: 'cliente@email.com',
    proposta_id: item.id,
    data_contrato: item["Data Contrato"],
    data_criacao: item["Data Contrato"],
    valor_total: item["Valor Total"],
    valor_liquido: item["Valor Líquido"],
    qtd_parcelas: 12,
    canal_venda: 1,
    status_processo: item.Status,
    data_finalizacao: item["Data Finalização"] || '',
    id_processo_sworks: item.id.toString()
  }));
};

// Função para adaptar KPIs mockados
const adaptKPIsData = (mockKPIs: PropostaKPIMock): KPIData => {
  return {
    total_propostas: mockKPIs.totalPropostas,
    clientes_unicos: mockKPIs.totalPropostas,
    valor_total: mockKPIs.valorTotalPropostas,
    valor_liquido: mockKPIs.valorTotalPropostas * 0.95,
    valor_medio: mockKPIs.valorMedioPropostas,
    finalizadas: mockKPIs.proposasFinalizadas,
    em_andamento: Math.floor(mockKPIs.totalPropostas * 0.3),
    pendentes: Math.floor(mockKPIs.totalPropostas * 0.2),
    canceladas: mockKPIs.totalPropostas - mockKPIs.proposasFinalizadas - Math.floor(mockKPIs.totalPropostas * 0.3) - Math.floor(mockKPIs.totalPropostas * 0.2)
  };
};

// Função para adaptar evolução mockada
const adaptEvolucaoData = (mockEvolucao: PropostaEvolucaoMock[], propostasData: PropostaData[], statusFiltro?: string): EvolucaoData[] => {
  return mockEvolucao.map(item => {
    // Contar propostas finalizadas por data baseado nos dados reais filtrados
    const finalizadasNaData = propostasData.filter(proposta => {
      const dataFinalizacao = proposta.data_finalizacao;
      return dataFinalizacao && 
             dataFinalizacao.split('T')[0] === item.data && 
             proposta.status_processo === 'FINALIZADO';
    }).length;
    
    // Contar total de propostas criadas na data (baseado nos dados filtrados)
    // Se está filtrando por status específico, conta apenas as desse status
    const propostasNaData = propostasData.filter(proposta => {
      const dataContrato = proposta.data_contrato.split('T')[0];
      return dataContrato === item.data;
    }).length;
    
    // Se está filtrando apenas finalizadas, a quantidade deve ser igual às finalizadas
    const quantidadeAjustada = (statusFiltro === 'FINALIZADO') ? finalizadasNaData : propostasNaData;
    
    return {
      data: item.data.replace(/-/g, ''),
      quantidade: quantidadeAjustada,
      valor_total: item.valor,
      valor_liquido: item.valor * 0.95,
      finalizadas: finalizadasNaData
    };
  });
};

const Propostas: React.FC = () => {
  // Estados para os filtros temporários (não aplicados ainda)
  const [tempDataInicio, setTempDataInicio] = useState('');
  const [tempDataFim, setTempDataFim] = useState('');
  const [tempStatus, setTempStatus] = useState('todos');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  
  // Estados para os filtros aplicados (usados nas queries)  
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [status, setStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortBy, setSortBy] = useState<string>('data_contrato');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { updateSync, setRefreshing } = useSync();

  // Buscar dados das propostas
  const { data: propostas, isLoading: loadingPropostas, error: errorPropostas, refetch: refetchPropostas, isFetching: isFetchingPropostas } = useQuery({
    queryKey: ['propostas', status, dataInicio, dataFim],
    queryFn: async () => {
      console.log('[Propostas] Filtros aplicados:', { 
        dataInicio, 
        dataFim, 
        status, 
        searchTerm 
      });
      const mockData = await getPropostasMock(dataInicio, dataFim, searchTerm, status);
      console.log('[Propostas] Dados retornados:', mockData.length, 'registros');
      return adaptPropostasData(mockData);
    },
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // Buscar KPIs calculados a partir dos dados filtrados
  const kpis = useMemo(() => {
    if (!propostas) return null;
    
    const totalPropostas = propostas.length;
    const valorTotal = propostas.reduce((sum, p) => sum + p.valor_total, 0);
    const valorLiquido = propostas.reduce((sum, p) => sum + p.valor_liquido, 0);
    const finalizadas = propostas.filter(p => p.status_processo === 'FINALIZADO').length;
    const emAndamento = propostas.filter(p => p.status_processo === 'EM_ANDAMENTO').length;
    const pendentes = propostas.filter(p => p.status_processo === 'PENDENTE').length;
    const canceladas = propostas.filter(p => p.status_processo === 'CANCELADO').length;
    
    return {
      total_propostas: totalPropostas,
      clientes_unicos: totalPropostas,
      valor_total: valorTotal,
      valor_liquido: valorLiquido,
      valor_medio: totalPropostas > 0 ? valorTotal / totalPropostas : 0,
      finalizadas,
      em_andamento: emAndamento,
      pendentes,
      canceladas
    };
  }, [propostas]);

  const loadingKPIs = loadingPropostas;
  const isFetchingKpis = isFetchingPropostas;

  // Buscar status disponíveis
  const { data: statusList, refetch: refetchStatus } = useQuery({
    queryKey: ['propostas-status'],
    queryFn: getPropostasStatusMock,
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // Buscar evolução diária
  const { data: evolucao, isLoading: loadingEvolucao, refetch: refetchEvolucao, isFetching: isFetchingEvolucao } = useQuery({
    queryKey: ['propostas-evolucao', status, dataInicio, dataFim, propostas?.length],
    queryFn: async () => {
      const mockEvolucao = await getPropostasEvolucaoMock(dataInicio, dataFim);
      return { evolucao: adaptEvolucaoData(mockEvolucao, propostas || [], status) };
    },
    enabled: !!propostas,
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // Função para ordenar propostas
  const sortPropostas = (data: PropostaData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any = a[sortBy as keyof PropostaData];
      let bValue: any = b[sortBy as keyof PropostaData];

      if (sortBy.includes('data')) {
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
  const sortedPropostas = useMemo(() => {
    if (!propostas) return [];
    return sortPropostas(propostas);
  }, [propostas, sortBy, sortOrder]);

  // Dados filtrados por busca
  const filteredPropostas = useMemo(() => {
    if (!searchTerm) return sortedPropostas;
    return sortedPropostas.filter(proposta =>
      proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposta.proposta_id.toString().includes(searchTerm) ||
      proposta.status_processo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedPropostas, searchTerm]);

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

  // Aplicar filtros
  const applyFilters = () => {
    setDataInicio(tempDataInicio);
    setDataFim(tempDataFim);
    setStatus(tempStatus);
    setSearchTerm(tempSearchTerm);
  };

  // Verificar se há filtros aplicados
  const hasActiveFilters = dataInicio || dataFim || status !== 'todos' || searchTerm;

  // Verificar se há filtros pendentes para aplicar
  const hasPendingFilters = tempDataInicio !== dataInicio || 
                           tempDataFim !== dataFim || 
                           tempStatus !== status || 
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
    setTempDataInicio('');
    setTempDataFim('');
    setTempStatus('todos');
    setTempSearchTerm('');
    
    // Limpar filtros aplicados
    setDataInicio('');
    setDataFim('');
    setStatus('todos');
    setSearchTerm('');
    
    setSortBy('data_contrato');
    setSortOrder('desc');
  };

  // Refetch all data
  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([
      refetchPropostas(),
      refetchStatus(),
      refetchEvolucao()
    ]).finally(() => {
      setRefreshing(false);
      const now = new Date();
      updateSync(now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    });
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

  // Formatação de data para gráfico
  const formatDateForChart = (dateString: string) => {
    if (!dateString || dateString.length !== 8) return '';
    try {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    } catch (error) {
      console.warn('Erro ao formatar data para gráfico:', dateString, error);
      return '';
    }
  };

  // Preparar dados para o gráfico
  const chartData = useMemo(() => {
    if (!evolucao?.evolucao) return [];
    
    const processedData = (evolucao.evolucao as EvolucaoData[])
      .filter((item: EvolucaoData) => {
        if (!item.data || item.data.length !== 8) return false;
        
        if (dataInicio) {
          const dataInicioFormatada = dataInicio.replace(/-/g, '');
          if (item.data < dataInicioFormatada) return false;
        }
        
        if (dataFim) {
          const dataFimFormatada = dataFim.replace(/-/g, '');
          if (item.data > dataFimFormatada) return false;
        }
        
        return true;
      })
      .sort((a: EvolucaoData, b: EvolucaoData) => b.data.localeCompare(a.data))
      .slice(0, 17)
      .reverse()
      .map((item: EvolucaoData) => ({
        data: formatDateForChart(item.data),
        'Qtd Propostas': item.quantidade,
        'Finalizadas': item.finalizadas,
        valor_total: item.valor_total,
        valor_liquido: item.valor_liquido
      }));

    console.log('[Propostas] Dados processados para gráfico:', processedData);
    return processedData;
  }, [evolucao, dataInicio, dataFim]);

  // Função de exportação
  const handleExport = () => {
    if (!filteredPropostas || filteredPropostas.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    const exportData = filteredPropostas.map(proposta => ({
      Cliente: proposta.cliente,
      'Proposta ID': proposta.proposta_id,
      'Data Contrato': formatDateForDisplay(proposta.data_contrato),
      'Valor Total': proposta.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Valor Líquido': proposta.valor_liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      'Status': proposta.status_processo,
      'Data Finalização': proposta.data_finalizacao ? formatDateForDisplay(proposta.data_finalizacao) : 'N/A'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Propostas');
    
    const fileName = `propostas_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Componente KPI Cards
  const KPICards: React.FC<{ kpis: KPIData }> = ({ kpis }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Propostas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis.total_propostas}</div>
          <p className="text-xs text-muted-foreground">
            {kpis.clientes_unicos} clientes únicos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpis.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p className="text-xs text-muted-foreground">
            Líquido: {kpis.valor_liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Finalizadas</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{kpis.finalizadas}</div>
          <p className="text-xs text-muted-foreground">
            {((kpis.finalizadas / kpis.total_propostas) * 100).toFixed(1)}% do total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpis.valor_medio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <p className="text-xs text-muted-foreground">
            Por proposta
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Sincronizar filtros temporários com filtros aplicados ao inicializar
  useEffect(() => {
    setTempDataInicio(dataInicio);
    setTempDataFim(dataFim);
    setTempStatus(status);
    setTempSearchTerm(searchTerm);
  }, []); // Só na inicialização

  // Efeito para sincronização
  useEffect(() => {
    if (propostas) {
      const timestamp = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      updateSync(timestamp);
    }
  }, [propostas, updateSync]);

  const isLoading = loadingPropostas || loadingKPIs;
  const isFetching = isFetchingPropostas || isFetchingEvolucao;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propostas</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe todas as propostas de crédito
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
      {kpis && <KPICards kpis={kpis} />}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-inicio">Data Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={tempDataInicio}
                onChange={(e) => setTempDataInicio(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-fim">Data Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={tempDataFim}
                onChange={(e) => setTempDataFim(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={tempStatus} onValueChange={setTempStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  {statusList?.map((s: string) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Cliente, ID, status..."
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
            <Button onClick={handleExport} variant="outline" disabled={!filteredPropostas || filteredPropostas.length === 0}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Evolução */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Evolução Diária
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEvolucao ? (
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
                    typeof value === 'number' ? value.toLocaleString('pt-BR') : value,
                    name
                  ]}
                />
                <Legend />
                <Bar dataKey="Qtd Propostas" fill="#f59e0b" />
                <Bar dataKey="Finalizadas" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Tabela de Propostas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Propostas ({filteredPropostas?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Carregando propostas...</p>
            </div>
          ) : errorPropostas ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-destructive">Erro ao carregar propostas</p>
            </div>
          ) : filteredPropostas && filteredPropostas.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Proposta ID</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('data_contrato')}
                    >
                      <div className="flex items-center gap-2">
                        Data Contrato
                        {renderSortIcon('data_contrato')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('valor_total')}
                    >
                      <div className="flex items-center gap-2">
                        Valor Total
                        {renderSortIcon('valor_total')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('valor_liquido')}
                    >
                      <div className="flex items-center gap-2">
                        Valor Líquido
                        {renderSortIcon('valor_liquido')}
                      </div>
                    </TableHead>
                    <TableHead>Parcelas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('data_finalizacao')}
                    >
                      <div className="flex items-center gap-2">
                        Data Finalização
                        {renderSortIcon('data_finalizacao')}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPropostas.map((proposta: PropostaData) => (
                    <TableRow key={proposta.proposta_id}>
                      <TableCell className="font-medium">{proposta.cliente}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{proposta.telefone}</div>
                          <div className="text-muted-foreground">{proposta.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{proposta.proposta_id}</TableCell>
                      <TableCell>{formatDateForDisplay(proposta.data_contrato)}</TableCell>
                      <TableCell>{proposta.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{proposta.valor_liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{proposta.qtd_parcelas}x</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            proposta.status_processo === 'FINALIZADO' ? 'default' :
                            proposta.status_processo === 'EM_ANDAMENTO' ? 'secondary' :
                            proposta.status_processo === 'PENDENTE' ? 'outline' : 'destructive'
                          }
                        >
                          {proposta.status_processo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {proposta.data_finalizacao ? formatDateForDisplay(proposta.data_finalizacao) : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Nenhuma proposta encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Propostas;
