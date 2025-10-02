import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Target, DollarSign, LayoutDashboard } from "lucide-react"
import { useAutoRefresh } from "@/hooks/useAutoRefresh"
import { useSync } from "@/providers/sync-provider"
import { useEffect, useRef } from "react"

// Mock data
const volumeData = [
  { month: 'Jan', novo: 1200, compra: 800, total: 2000 },
  { month: 'Fev', novo: 1500, compra: 950, total: 2450 },
  { month: 'Mar', novo: 1800, compra: 1200, total: 3000 },
  { month: 'Abr', novo: 1600, compra: 1100, total: 2700 },
  { month: 'Mai', novo: 2000, compra: 1300, total: 3300 },
  { month: 'Jun', novo: 2200, compra: 1500, total: 3700 },
]

const conversionData = [
  { month: 'Jan', conversion: 65 },
  { month: 'Fev', conversion: 68 },
  { month: 'Mar', conversion: 72 },
  { month: 'Abr', conversion: 70 },
  { month: 'Mai', conversion: 75 },
  { month: 'Jun', conversion: 78 },
]

const funnelData = [
  { name: 'Total', novo: 15000, compra: 8500 },
  { name: 'Fila', novo: 8500, compra: 4200 },
  { name: 'Pago', novo: 6200, compra: 3800 },
]

const documentTypes = [
  { name: 'Consórcio Novo', value: 45, color: 'hsl(41, 60%, 16%)' },
  { name: 'Compra de Cotas', value: 35, color: 'hsl(142, 76%, 36%)' },
  { name: 'Outros', value: 20, color: 'hsl(38, 92%, 50%)' },
]

const prazoDistribution = [
  { prazo: '0-30d', count: 1200, percentage: 35 },
  { prazo: '31-60d', count: 800, percentage: 23 },
  { prazo: '61-90d', count: 600, percentage: 17 },
  { prazo: '90d+', count: 850, percentage: 25 },
]

const mockKpis = {
  totalRegistros: 23500,
  totalSaldo: 125000000,
  totalComissaoPrevista: 8500000,
  totalComissaoRecebida: 6200000,
  conversionRate: 78.5,
  averageTicket: 5300,
  backlog: 1250,
  aging: { p50: 35, p90: 85, max: 180 }
}

const colors = {
  primary: 'hsl(41, 60%, 16%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  danger: 'hsl(346, 87%, 43%)',
}

export default function Dashboard() {
  const { updateSync, setRefreshing } = useSync()
  
  // Ref para armazenar dados anteriores para comparação
  const previousDataRef = useRef<any>(null)

  // Auto refresh simulates data updates
  useAutoRefresh({
    onRefresh: async () => {
      setRefreshing(true)
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const timestamp = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          updateSync(timestamp)
          setRefreshing(false)
          resolve({ hasNewData: true })
        }, 1000)
      })
    },
    interval: 30000, // Refresh every 30 seconds
    enabled: true
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? formatNumber(entry.value) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Dashboard Executivo
          </h1>
          <p className="text-muted-foreground mt-1">
            Visão geral dos principais indicadores de performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success border-success/20 bg-success/10">
            <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
            Dados Atualizados
          </Badge>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatNumber(mockKpis.totalRegistros)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(mockKpis.totalSaldo)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissão Prevista</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(mockKpis.totalComissaoPrevista)}
            </div>
            <div className="flex items-center text-xs text-warning mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Em processo
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissão Recebida</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(mockKpis.totalComissaoRecebida)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              {((mockKpis.totalComissaoRecebida / mockKpis.totalComissaoPrevista) * 100).toFixed(1)}% realizado
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Volume Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="novo" fill={colors.primary} name="Novo" />
                <Bar dataKey="compra" fill={colors.success} name="Compra" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Taxa de Conversão */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[60, 80]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="conversion" 
                  stroke={colors.success} 
                  strokeWidth={3}
                  dot={{ fill: colors.success, strokeWidth: 2, r: 6 }}
                  name="Conversão (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row com múltiplos cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funil de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Funil de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={funnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="novo" fill={colors.primary} name="Novo" />
                <Bar dataKey="compra" fill={colors.success} name="Compra" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Documento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Tipo de Documento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={documentTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {documentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aging Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Análise de Prazo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prazoDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      item.prazo === '0-30d' ? 'bg-success' :
                      item.prazo === '31-60d' ? 'bg-warning' :
                      item.prazo === '61-90d' ? 'bg-orange-500' : 'bg-danger'
                    }`} />
                    <span className="text-sm font-medium">{item.prazo}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{formatNumber(item.count)}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-foreground">{mockKpis.conversionRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(mockKpis.averageTicket)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Backlog</p>
                <p className="text-2xl font-bold text-foreground">{formatNumber(mockKpis.backlog)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aging P90</p>
                <p className="text-2xl font-bold text-foreground">{mockKpis.aging.p90} dias</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
