create or replace view vw_resumo_consultas as
select c.id, c.data_hora, p.nome as paciente, pr.nome as profissional,
       e.nome as especialidade, c.modalidade, c.status, c.valor
from consultas c
join pacientes p on p.id=c.paciente_id
join profissionais pr on pr.id=c.profissional_id
join especialidades e on e.id=pr.especialidade_id;

create or replace view vw_faturamento as
select date_trunc('month', c.data_hora) as mes,
       sum(c.valor) filter (where c.status='Concluída') as faturamento
from consultas c
group by date_trunc('month', c.data_hora);
