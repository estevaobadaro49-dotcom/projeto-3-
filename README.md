# Clínica Vida+ — Trabalho Integrador de Banco de Dados

Projeto acadêmico de uma clínica fictícia, criado para demonstrar a integração entre **HTML, CSS, JavaScript, PostgreSQL e Supabase**.

## Funcionalidades
- Dashboard com indicadores
- Cadastro de pacientes
- Pesquisa e filtro de pacientes
- Agendamento de consultas
- Filtro de consultas por status
- Cadastro visual de profissionais e especialidades
- Painel financeiro
- Dados fictícios para demonstração

## Modelo de dados
As entidades principais são:
1. `especialidades`
2. `profissionais`
3. `pacientes`
4. `consultas`
5. `pagamentos`
6. `usuarios`

Os relacionamentos principais são `especialidades -> profissionais`, `pacientes -> consultas`, `profissionais -> consultas` e `consultas -> pagamentos`.

## Como executar
Abra `index.html` no navegador para testar a interface. A versão incluída usa dados locais de demonstração para funcionar imediatamente.

Para conectar ao Supabase, crie as tabelas usando `sql/schema.sql`, insira seus dados e substitua a camada de dados do `js/main.js` por chamadas ao SDK do Supabase.

## SQL
- `sql/schema.sql`: tabelas, chaves, restrições e índices
- `sql/views.sql`: views
- `sql/queries.sql`: perguntas de negócio

> Todos os dados demonstrativos são fictícios. Não use dados pessoais reais.
