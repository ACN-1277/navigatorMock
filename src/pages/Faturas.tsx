import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { CreditCard, AlertTriangle, CheckCircle, Clock, DollarSign, Users, Calendar, Search, Filter, Download, TrendingUp, TrendingDown, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, FileSpreadsheet } from 'lucide-react';
import { useSync } from '@/providers/sync-provider';
import { getFaturasDataMock, FaturaDataMock, FaturasSummaryMock } from '@/data/mock';
import * as XLSX from 'xlsx';

// Interfaces para dados adaptados
interface FaturaData {
  id: number;
  valor_fatura: number;
  fechamento: string;
  vencimento: string;
  status: string;
  personal_name: string;
  personal_document: string;
  produtos: string;
  email: string;
  statement_id: string;
}

interface FaturasSummary {
  totalFaturas: number;
  valorTotal: number;
  valorMedio: number;
  clientesUnicos: number;
  emAberto: number;
  vencidas: number;
  pagas: number;
  valorEmAberto: number;
  valorVencido: number;
  valorPago: number;
  faturasVencidas: number;
  faturasAVencer: number;
  valorMedioFatura: number;
}

// Função para adaptar dados mockados
const adaptFaturasData = (mockData: FaturaDataMock[]): FaturaData[] => {
  return mockData.map((item, index) => ({
    id: item.id,
    valor_fatura: item["Valor Fatura"],
    fechamento: item.Fechamento,
    vencimento: item.Vencimento,
    status: item.Status,
    personal_name: item.Cliente,
    personal_document: item.Documento,
    produtos: item.Produtos,
    email: `${item.Cliente.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    statement_id: `FAT-${String(item.id).padStart(6, '0')}`
  }));
};

const adaptFaturasSummary = (mockSummary: FaturasSummaryMock, data: FaturaData[]): FaturasSummary => {
  const statusCounts = data.reduce((acc, fatura) => {
    acc[fatura.status] = (acc[fatura.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusValues = data.reduce((acc, fatura) => {
    if (!acc[fatura.status]) acc[fatura.status] = 0;
    acc[fatura.status] += fatura.valor_fatura;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalFaturas: mockSummary.totalFaturas,
    valorTotal: mockSummary.valorTotal,
    valorMedio: mockSummary.valorMedioFatura,
    clientesUnicos: data.length, // Simplificado
    emAberto: statusCounts['PENDENTE'] || 0,
    vencidas: statusCounts['VENCIDO'] || 0,
    pagas: statusCounts['PAGO'] || 0,
    valorEmAberto: statusValues['PENDENTE'] || 0,
    valorVencido: statusValues['VENCIDO'] || 0,
    valorPago: statusValues['PAGO'] || 0,
    faturasVencidas: mockSummary.faturasVencidas,
    faturasAVencer: mockSummary.faturasAVencer,
    valorMedioFatura: mockSummary.valorMedioFatura
  };
};

const Faturas = () => {
  const { updateSync, setRefreshing } = useSync();
  
  // Estados para filtros temporários (não aplicados ainda)
  const [tempPersonalDocument, setTempPersonalDocument] = useState('');
  const [tempStatus, setTempStatus] = useState('todos');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  
  // Estados para filtros aplicados (usados nas queries)
  const [personalDocument, setPersonalDocument] = useState('');
  const [status, setStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para ordenação da tabela
  const [sortBy, setSortBy] = useState('fechamento');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Buscar dados das faturas
  const { data: faturasResponse, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['faturas', personalDocument, status, searchTerm],
    queryFn: async () => {
      console.log('[FATURAS] Fazendo requisição para mock com:', {
        personalDocument: personalDocument || undefined,
        status: status === 'todos' ? undefined : status,
        searchTerm: searchTerm || undefined
      });
      const mockResponse = await getFaturasDataMock(
        undefined, // startDate
        undefined, // endDate  
        searchTerm || undefined
      );
      console.log('[FATURAS] Dados retornados:', mockResponse.data.length, 'faturas');
      
      const adaptedData = adaptFaturasData(mockResponse.data);
      
      // Filtrar por status se não for 'todos'
      let filteredData = adaptedData;
      if (status !== 'todos') {
        filteredData = adaptedData.filter(fatura => fatura.status === status);
      }
      
      // Filtrar por documento se fornecido
      if (personalDocument && personalDocument.trim()) {
        filteredData = filteredData.filter(fatura => 
          fatura.personal_document.includes(personalDocument.trim())
        );
      }
      
      return {
        data: filteredData,
        summary: adaptFaturasSummary(mockResponse.summary, filteredData)
      };
    },
    staleTime: 0,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  // Aplicar filtros
  const applyFilters = () => {
    setPersonalDocument(tempPersonalDocument);
    setStatus(tempStatus);
    setSearchTerm(tempSearchTerm);
  };

  // Verificar se há filtros aplicados
  const hasActiveFilters = personalDocument || status !== 'todos' || searchTerm;

  // Verificar se há filtros pendentes para aplicar
  const hasPendingFilters = tempPersonalDocument !== personalDocument || 
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
    setTempPersonalDocument('');
    setTempStatus('todos');
    setTempSearchTerm('');
    
    // Limpar filtros aplicados
    setPersonalDocument('');
    setStatus('todos');
    setSearchTerm('');
    
    setSortBy('fechamento');
    setSortOrder('desc');
  };

  // Sincronizar filtros temporários com filtros aplicados ao inicializar
  useEffect(() => {
    setTempPersonalDocument(personalDocument);
    setTempStatus(status);
    setTempSearchTerm(searchTerm);
  }, []); // Só na inicialização

  // Efeito para sincronização
  useEffect(() => {
    if (faturasResponse) {
      const timestamp = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      updateSync(timestamp);
    }
  }, [faturasResponse, updateSync]);

  // Atualizar estado de refreshing
  useEffect(() => {
    setRefreshing(isFetching);
  }, [isFetching, setRefreshing]);

  // Extrair dados
  const faturasData = faturasResponse?.data || [];
  const faturasSummary = faturasResponse?.summary || {
    totalFaturas: 0,
    valorTotal: 0,
    valorMedio: 0,
    clientesUnicos: 0,
    emAberto: 0,
    vencidas: 0,
    pagas: 0,
    valorEmAberto: 0,
    valorVencido: 0,
    valorPago: 0,
  };

  // Função para ordenar faturas
  const sortFaturas = (data: FaturaData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any = a[sortBy as keyof FaturaData];
      let bValue: any = b[sortBy as keyof FaturaData];

      if (sortBy === 'fechamento' || sortBy === 'vencimento') {
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

  // Filtrar e ordenar dados localmente
  const filteredData = useMemo(() => {
    return sortFaturas(faturasData);
  }, [faturasData, sortBy, sortOrder]);

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

  // Preparar dados para gráfico de status
  const statusChartData = useMemo(() => {
    const statusConfig = {
      'PENDENTE': { label: 'Em Aberto', color: '#eab308', count: faturasSummary.emAberto, valor: faturasSummary.valorEmAberto },
      'VENCIDO': { label: 'Vencidas', color: '#ef4444', count: faturasSummary.vencidas, valor: faturasSummary.valorVencido },
      'PAGO': { label: 'Pagas', color: '#22c55e', count: faturasSummary.pagas, valor: faturasSummary.valorPago },
    };

    return Object.entries(statusConfig).map(([key, config]) => ({
      status: config.label,
      count: config.count,
      valor: config.valor,
      color: config.color
    })).filter(item => item.count > 0);
  }, [faturasSummary]);

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
    if (!filteredData || filteredData.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    const exportData = filteredData.map(fatura => ({
      'ID Fatura': fatura.statement_id,
      Cliente: fatura.personal_name,
      'CPF/CNPJ': fatura.personal_document,
      'Valor Fatura': fatura.valor_fatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      Fechamento: new Date(fatura.fechamento).toLocaleDateString('pt-BR'),
      Vencimento: new Date(fatura.vencimento).toLocaleDateString('pt-BR'),
      Status: fatura.status,
      Produtos: fatura.produtos,
      Email: fatura.email
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Faturas');
    
    const fileName = `faturas_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Função para obter cor do badge de status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'PAGO':
        return 'default';
      case 'PENDENTE':
        return 'secondary';
      case 'VENCIDO':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Função para obter ícone do status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAGO':
        return <CheckCircle className="h-4 w-4" />;
      case 'PENDENTE':
        return <Clock className="h-4 w-4" />;
      case 'VENCIDO':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe as faturas dos clientes
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faturas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faturasSummary.totalFaturas}</div>
            <p className="text-xs text-muted-foreground">
              Valor total: {faturasSummary.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Aberto</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{faturasSummary.emAberto}</div>
            <p className="text-xs text-muted-foreground">
              {faturasSummary.valorEmAberto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{faturasSummary.vencidas}</div>
            <p className="text-xs text-muted-foreground">
              {faturasSummary.valorVencido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{faturasSummary.pagas}</div>
            <p className="text-xs text-muted-foreground">
              {faturasSummary.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </CardContent>
        </Card>
      </div>

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
              <Label htmlFor="documento">CPF/CNPJ</Label>
              <Input
                id="documento"
                placeholder="000.000.000-00"
                value={tempPersonalDocument}
                onChange={(e) => setTempPersonalDocument(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={tempStatus} onValueChange={setTempStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="PENDENTE">Em Aberto</SelectItem>
                  <SelectItem value="VENCIDO">Vencidas</SelectItem>
                  <SelectItem value="PAGO">Pagas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="busca">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busca"
                  placeholder="Cliente, produto, ID..."
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
            <Button onClick={handleExport} variant="outline" disabled={!filteredData || filteredData.length === 0}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Status das Faturas */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Status das Faturas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Carregando gráfico...</p>
              </div>
            ) : statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="status" 
                    fontSize={12}
                    tick={{ fill: '#475569' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: '#475569' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'count' ? 'Quantidade' : 'Valor']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Nenhum dado para exibir</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição por Status */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Distribuição por Status
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : statusChartData.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="70%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ count }) => count}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [value, 'Faturas']}
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legenda */}
                <div className="mt-4 space-y-2">
                  {statusChartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.status}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">{item.count}</span> faturas
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

      {/* Tabela de Faturas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Faturas ({filteredData?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Carregando faturas...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-destructive">Erro ao carregar faturas</p>
            </div>
          ) : filteredData && filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF/CNPJ</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('valor_fatura')}
                    >
                      <div className="flex items-center gap-2">
                        Valor
                        {renderSortIcon('valor_fatura')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('fechamento')}
                    >
                      <div className="flex items-center gap-2">
                        Fechamento
                        {renderSortIcon('fechamento')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('vencimento')}
                    >
                      <div className="flex items-center gap-2">
                        Vencimento
                        {renderSortIcon('vencimento')}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Produtos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((fatura) => (
                    <TableRow key={fatura.id}>
                      <TableCell className="font-medium">{fatura.statement_id}</TableCell>
                      <TableCell className="font-medium">{fatura.personal_name}</TableCell>
                      <TableCell>{fatura.personal_document}</TableCell>
                      <TableCell className="font-medium">
                        {fatura.valor_fatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell>{formatDateForDisplay(fatura.fechamento)}</TableCell>
                      <TableCell>{formatDateForDisplay(fatura.vencimento)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(fatura.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(fatura.status)}
                          {fatura.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {fatura.produtos}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Faturas;
