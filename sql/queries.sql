-- 01. Quantos pacientes ativos existem?
select count(*) as total_pacientes from pacientes where ativo=true;

-- 02. Consultas por status.
select status, count(*) as total from consultas group by status order by total desc;

-- 03. Consultas por especialidade (JOIN + GROUP BY).
select e.nome, count(*) as total
from consultas c join profissionais p on p.id=c.profissional_id
join especialidades e on e.id=p.especialidade_id
group by e.nome order by total desc;

-- 04. Ticket médio por especialidade.
select e.nome, round(avg(c.valor),2) as ticket_medio
from consultas c join profissionais p on p.id=c.profissional_id
join especialidades e on e.id=p.especialidade_id
group by e.nome order by ticket_medio desc;

-- 05. Quantidade de consultas por modalidade.
select modalidade, count(*) as total from consultas group by modalidade;

-- 06. Profissionais com mais de 5 consultas (HAVING).
select p.nome, count(c.id) as total
from profissionais p left join consultas c on c.profissional_id=p.id
group by p.id,p.nome having count(c.id)>5 order by total desc;

-- 07. Consultas pendentes.
select * from vw_resumo_consultas where status='Pendente' order by data_hora;

-- 08. Pagamentos pendentes.
select p.nome, pg.valor, pg.vencimento
from pagamentos pg join consultas c on c.id=pg.consulta_id
join pacientes p on p.id=c.paciente_id
where pg.status='Pendente';

-- 09. Receita recebida.
select coalesce(sum(valor),0) as receita_recebida from pagamentos where status='Pago';

-- 10. Pacientes sem e-mail cadastrado.
select id,nome from pacientes where email is null;
