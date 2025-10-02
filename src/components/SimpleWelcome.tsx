import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleWelcome = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1e293b' }}>
          🎯 Alexsandro
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#64748b' }}>
          Analista de Dados • Engenheiro de Dados
        </h2>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#2563eb', marginBottom: '1rem' }}>
            📊 Data Corban Navigator
          </h3>
          <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '2rem' }}>
            Sistema completo de análise de dados e dashboard executivo desenvolvido 
            para demonstrar habilidades em análise de dados, engenharia de dados e 
            visualização de informações executivas.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="./dashboard" 
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              📈 Dashboard Executivo
            </a>
            <a 
              href="./producao/analytics" 
              style={{ 
                backgroundColor: '#7c3aed', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              📊 Análise de Produção
            </a>
            <a 
              href="https://github.com/ACN-1277/navigatorMock" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#374151', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              💻 Ver Código
            </a>
          </div>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#059669', marginBottom: '0.5rem' }}>✅ Funcionalidades</h4>
            <ul style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'left', margin: 0, paddingLeft: '1rem' }}>
              <li>Dashboard Executivo</li>
              <li>KPIs Dinâmicos</li>
              <li>Análise Financeira</li>
              <li>Relatórios Excel/PDF</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>🛠️ Tecnologias</h4>
            <ul style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'left', margin: 0, paddingLeft: '1rem' }}>
              <li>Data Analysis</li>
              <li>Dashboard Design</li>
              <li>React/TypeScript</li>
              <li>Data Visualization</li>
            </ul>
          </div>
        </div>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          Desenvolvido por <strong>Alexsandro</strong> • Portfolio de Análise de Dados
        </p>
      </div>
    </div>
  );
};

export default SimpleWelcome;
