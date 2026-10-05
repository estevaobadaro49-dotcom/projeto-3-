# Modelo de Dados

Especialidades (1) -> (N) Profissionais  
Pacientes (1) -> (N) Consultas  
Profissionais (1) -> (N) Consultas  
Consultas (1) -> (1) Pagamentos

## Justificativas
- Especialidades ficam separadas para evitar repetir descrições em cada profissional.
- Consultas usam chaves estrangeiras para garantir que paciente e profissional existam.
- Pagamentos dependem de uma consulta, evitando pagamentos sem atendimento relacionado.
- `UNIQUE` impede duplicidade de e-mail e registro profissional.
- `NOT NULL` é aplicado em atributos essenciais.
- `BOOLEAN`, `DATE` e `TIMESTAMP` aparecem em campos apropriados.
