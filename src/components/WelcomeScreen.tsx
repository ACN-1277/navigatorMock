import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Code2, 
  Database, 
  Palette, 
  Zap, 
  Github, 
  ExternalLink,
  User,
  Briefcase,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const technologies = [
    { name: 'Data Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Dashboard Design', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'KPI Modeling', icon: <Database className="w-4 h-4" /> },
    { name: 'Data Visualization', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Financial Analytics', icon: <Database className="w-4 h-4" /> },
    { name: 'React/TypeScript', icon: <Code2 className="w-4 h-4" /> },
    { name: 'Mock Data Engineering', icon: <Database className="w-4 h-4" /> }
  ];

  const features = [
    'Dashboard Executivo Completo',
    'Análise de Dados Financeiros',
    'Modelagem de KPIs Dinâmicos',
    'Relatórios Analíticos (Excel/PDF)',
    'Visualização de Dados Interativa',
    'Sistema de Filtros Avançados',
    'Métricas de Performance',
    'Engenharia de Dados Mock'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Alexsandro
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Analista de Dados • Engenheiro de Dados
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>Data Analytics Portfolio</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>Projeto de Análise de Dados</span>
            </div>
          </div>
        </div>

        {/* Cards Principais */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Sobre o Projeto */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="w-6 h-6" />
                Data Corban Navigator
              </CardTitle>
              <CardDescription className="text-base">
                Sistema Completo de Dashboard Executivo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Sistema avançado de análise de dados e dashboard executivo para gestão 
                inteligente de propostas e conversões financeiras. Projeto desenvolvido 
                para demonstrar habilidades em análise de dados, engenharia de dados e 
                visualização de informações executivas.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Principais Funcionalidades:</h4>
                <div className="grid grid-cols-1 gap-1">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tecnologias */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Code2 className="w-6 h-6" />
                Stack Tecnológico
              </CardTitle>
              <CardDescription className="text-base">
                Tecnologias modernas e profissionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Projeto desenvolvido com foco em análise de dados, modelagem de KPIs, 
                visualização de métricas executivas e engenharia de dados para 
                dashboards corporativos.
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tech.icon}
                    {tech.name}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  � Sistema funcional com dados engineerados para análise executiva
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funcionalidades Completas */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-center text-green-700">
              � Análises e Dashboards Implementados
            </CardTitle>
            <CardDescription className="text-center text-base">
              Sistema completo de análise de dados e KPIs executivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/dashboard')} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Dashboard Executivo
          </Button>
          
          <Button 
            onClick={() => navigate('/producao/analytics')} 
            variant="outline" 
            size="lg"
            className="border-purple-200 hover:bg-purple-50 px-8"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Análise de Produção
          </Button>
          
          <Button 
            onClick={() => window.open('https://github.com/ACN-1277/navigatorMock', '_blank')} 
            variant="outline" 
            size="lg"
            className="border-gray-300 hover:bg-gray-50 px-8"
          >
            <Github className="w-5 h-5 mr-2" />
            Ver Código
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Desenvolvido por <strong>Alexsandro</strong> • 
            <span className="mx-2">•</span>
            Analista de Dados | Engenheiro de Dados
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data Analysis • Dashboard Design • KPI Modeling • Financial Analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
