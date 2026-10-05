const state={
 patients:[
  ["Ana Beatriz Lima","(31) 98821-4420","1998-04-12","Ativo","ana.lima@email.com"],
  ["Bruno Henrique Alves","(31) 99731-1055","1987-09-28","Ativo","bruno.alves@email.com"],
  ["Camila Rocha Mendes","(31) 99120-6731","2001-11-03","Ativo","camila.mendes@email.com"],
  ["Daniel Souza Costa","(31) 98542-3388","1979-06-17","Ativo","daniel.costa@email.com"],
  ["Eduarda Martins","(31) 99214-7702","1995-02-25","Ativo","eduarda.m@email.com"],
  ["Felipe Oliveira","(31) 98411-2266","1990-08-09","Ativo","felipe.o@email.com"],
  ["Gabriela Santos","(31) 99918-5432","2003-01-18","Ativo","gabriela.s@email.com"],
  ["Henrique Ferreira","(31) 98322-1190","1982-12-06","Inativo","henrique.f@email.com"],
  ["Isabela Martins","(31) 99644-2081","1999-07-21","Ativo","isabela.m@email.com"],
  ["João Pedro Reis","(31) 98103-7754","1988-03-30","Ativo","joao.reis@email.com"],
  ["Larissa Gomes","(31) 99342-8811","1997-10-14","Ativo","larissa.g@email.com"],
  ["Marcos Vinícius","(31) 98751-2204","1975-05-02","Ativo","marcos.v@email.com"]
 ],
 professionals:[
  ["Dra. Marina Andrade","Cardiologia","CRM 48291"],
  ["Dr. Rafael Nogueira","Clínica Geral","CRM 39122"],
  ["Dra. Juliana Castro","Dermatologia","CRM 51783"],
  ["Dr. Lucas Almeida","Ortopedia","CRM 42817"],
  ["Dra. Paula Mendes","Pediatria","CRM 50644"],
  ["Dr. André Ribeiro","Oftalmologia","CRM 45510"]
 ],
 specialties:[
  ["Cardiologia","Prevenção e tratamento de doenças cardiovasculares."],
  ["Clínica Geral","Avaliação inicial e acompanhamento integral."],
  ["Dermatologia","Saúde da pele, cabelos e unhas."],
  ["Ortopedia","Diagnóstico e tratamento do sistema locomotor."],
  ["Pediatria","Atendimento médico para crianças e adolescentes."],
  ["Oftalmologia","Prevenção e tratamento da saúde ocular."]
 ],
 appointments:[
  ["04/10 • 14:00","Ana Beatriz Lima","Dra. Marina Andrade","Cardiologia","Presencial","Agendada"],
  ["04/10 • 15:30","Bruno Henrique Alves","Dr. Rafael Nogueira","Clínica Geral","Presencial","Agendada"],
  ["04/10 • 16:00","Camila Rocha Mendes","Dra. Juliana Castro","Dermatologia","Online","Pendente"],
  ["05/10 • 09:00","Daniel Souza Costa","Dr. Lucas Almeida","Ortopedia","Presencial","Agendada"],
  ["05/10 • 10:30","Eduarda Martins","Dra. Paula Mendes","Pediatria","Presencial","Agendada"],
  ["05/10 • 14:00","Felipe Oliveira","Dr. André Ribeiro","Oftalmologia","Online","Concluída"],
  ["06/10 • 08:30","Gabriela Santos","Dr. Rafael Nogueira","Clínica Geral","Presencial","Agendada"],
  ["06/10 • 11:00","Isabela Martins","Dra. Marina Andrade","Cardiologia","Online","Cancelada"]
 ],
 payments:[
  ["Ana Beatriz Lima","Consulta cardiológica","05/10/2026",280,"Pago"],
  ["Bruno Henrique Alves","Consulta clínica geral","05/10/2026",180,"Pago"],
  ["Camila Rocha Mendes","Consulta dermatológica","06/10/2026",220,"Pendente"],
  ["Daniel Souza Costa","Consulta ortopédica","06/10/2026",250,"Pago"],
  ["Eduarda Martins","Consulta pediátrica","07/10/2026",200,"Pendente"],
  ["Felipe Oliveira","Consulta oftalmológica","07/10/2026",230,"Pago"],
  ["Gabriela Santos","Consulta clínica geral","08/10/2026",180,"Pago"]
 ]};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function initials(n){return n.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function badge(s){let c=s==="Concluída"||s==="Pago"||s==="Ativo"?"green":s==="Cancelada"||s==="Inativo"?"red":s==="Pendente"?"orange":"";return `<span class="badge ${c}">${s}</span>`}
function renderStats(){
 const revenue=state.payments.filter(x=>x[4]==="Pago").reduce((a,x)=>a+x[3],0);
 $("#stats").innerHTML=[
  ["Pacientes ativos",state.patients.filter(x=>x[3]==="Ativo").length,"cadastros ativos"],
  ["Consultas no mês",state.appointments.length,"na agenda de demonstração"],
  ["Receita recebida",money(revenue),"pagamentos confirmados"],
  ["Taxa de conclusão","86%","indicador operacional"]
 ].map(x=>`<div class="card"><div class="card-label">${x[0]}</div><div class="card-value">${x[1]}</div><div class="card-note">${x[2]}</div></div>`).join("");
}
function renderUpcoming(){
 $("#upcoming").innerHTML=state.appointments.slice(0,5).map(a=>`<div class="appointment-row"><div class="time">${a[0].split(" • ")[1]}</div><div class="person">${a[1]}<small>${a[2]} • ${a[3]}</small></div>${badge(a[5])}</div>`).join("");
}
function renderBars(){
 const counts={};state.appointments.forEach(a=>counts[a[3]]=(counts[a[3]]||0)+1);
 const max=Math.max(...Object.values(counts));
 $("#specialty-chart").innerHTML=Object.entries(counts).map(([k,v])=>`<div class="bar-row"><span>${k}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><b>${v}</b></div>`).join("");
}
function renderPatients(){
 const q=($("#patient-search")?.value||"").toLowerCase(), f=$("#patient-filter")?.value||"";
 $("#patients-table").innerHTML=state.patients.filter(p=>(!q||p.join(" ").toLowerCase().includes(q))&&(!f||p[3]===f)).map(p=>`<tr><td><div class="person-cell"><span class="avatar">${initials(p[0])}</span>${p[0]}</div></td><td>${p[1]}<br><small>${p[4]}</small></td><td>${new Date(p[2]+"T00:00:00").toLocaleDateString("pt-BR")}</td><td>${badge(p[3])}</td><td><button class="ghost" onclick="showPatient('${p[0]}')">Detalhes</button></td></tr>`).join("");
}
function renderAppointments(){
 const q=($("#appointment-search")?.value||"").toLowerCase(), f=$("#appointment-filter")?.value||"";
 $("#appointments-table").innerHTML=state.appointments.filter(a=>(!q||a.join(" ").toLowerCase().includes(q))&&(!f||a[5]===f)).map(a=>`<tr><td><b>${a[0]}</b></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${a[4]}</td><td>${badge(a[5])}</td></tr>`).join("");
}
function renderProfessionals(){
 $("#professionals-cards").innerHTML=state.professionals.map(p=>`<div class="card"><div class="person-cell"><span class="avatar">${initials(p[0])}</span><div>${p[0]}<small style="display:block;color:var(--muted);font-weight:400">${p[1]}</small></div></div><p style="font-size:11px;color:var(--muted);margin-bottom:0">${p[2]}</p></div>`).join("");
}
function renderSpecialties(){
 $("#specialties-grid").innerHTML=state.specialties.map((s,i)=>`<div class="specialty"><div class="specialty-icon">${i+1}</div><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("");
}
function renderPayments(){
 const total=state.payments.reduce((a,x)=>a+x[3],0), paid=state.payments.filter(x=>x[4]==="Pago").reduce((a,x)=>a+x[3],0), pending=total-paid;
 $("#finance-stats").innerHTML=[["Faturamento previsto",money(total)],["Recebido",money(paid)],["Pendente",money(pending)],["Ticket médio",money(total/state.payments.length)]].map(x=>`<div class="card"><div class="card-label">${x[0]}</div><div class="card-value">${x[1]}</div><div class="card-note">dados de demonstração</div></div>`).join("");
 $("#payments-table").innerHTML=state.payments.map(p=>`<tr><td>${p[0]}</td><td>${p[1]}</td><td>${p[2]}</td><td><b>${money(p[3])}</b></td><td>${badge(p[4])}</td></tr>`).join("");
}
function renderAll(){renderStats();renderUpcoming();renderBars();renderPatients();renderAppointments();renderProfessionals();renderSpecialties();renderPayments()}
function openModal(type){
 let content=type==="patient"?`<h2>Novo paciente</h2><p style="color:var(--muted);font-size:13px">Cadastre um novo paciente na clínica.</p><form id="patient-form"><div class="form-grid"><div class="form-field full"><label>NOME COMPLETO</label><input name="name" required></div><div class="form-field"><label>TELEFONE</label><input name="phone" required></div><div class="form-field"><label>DATA DE NASCIMENTO</label><input name="birth" type="date" required></div><div class="form-field full"><label>E-MAIL</label><input name="email" type="email" required></div></div><div class="form-actions"><button type="button" class="ghost" id="cancel-form">Cancelar</button><button class="primary">Salvar paciente</button></div></form>`
 :`<h2>Nova consulta</h2><p style="color:var(--muted);font-size:13px">Agende um novo atendimento.</p><form id="appointment-form"><div class="form-grid"><div class="form-field full"><label>PACIENTE</label><select name="patient">${state.patients.filter(p=>p[3]==="Ativo").map(p=>`<option>${p[0]}</option>`).join("")}</select></div><div class="form-field"><label>PROFISSIONAL</label><select name="professional">${state.professionals.map(p=>`<option>${p[0]}</option>`).join("")}</select></div><div class="form-field"><label>ESPECIALIDADE</label><select name="specialty">${state.specialties.map(s=>`<option>${s[0]}</option>`).join("")}</select></div><div class="form-field"><label>DATA E HORA</label><input name="date" type="datetime-local" required></div><div class="form-field"><label>MODALIDADE</label><select name="mode"><option>Presencial</option><option>Online</option></select></div></div><div class="form-actions"><button type="button" class="ghost" id="cancel-form">Cancelar</button><button class="primary">Agendar</button></div></form>`;
 $("#modal-content").innerHTML=content;$("#modal").classList.remove("hidden");$("#cancel-form").onclick=closeModal;
 if(type==="patient") $("#patient-form").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);state.patients.push([f.get("name"),f.get("phone"),f.get("birth"),"Ativo",f.get("email")]);renderAll();closeModal();toast("Paciente cadastrado com sucesso.")};
 else $("#appointment-form").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),d=new Date(f.get("date"));let ds=d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})+" • "+d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});state.appointments.unshift([ds,f.get("patient"),f.get("professional"),f.get("specialty"),f.get("mode"),"Agendada"]);renderAll();closeModal();toast("Consulta agendada com sucesso.")};
}
function closeModal(){$("#modal").classList.add("hidden")}
function showPatient(name){let p=state.patients.find(x=>x[0]===name);$("#modal-content").innerHTML=`<h2>${p[0]}</h2><p style="color:var(--muted)">${p[4]}</p><div class="card" style="margin-top:15px"><b>Telefone</b><p>${p[1]}</p><b>Data de nascimento</b><p>${new Date(p[2]+"T00:00:00").toLocaleDateString("pt-BR")}</p><b>Status</b><p>${badge(p[3])}</p></div>`;$("#modal").classList.remove("hidden")}
function toast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2600)}
$$(".nav-item").forEach(b=>b.onclick=()=>switchSection(b.dataset.section));
$$("[data-section]").forEach(b=>{if(!b.classList.contains("nav-item"))b.onclick=()=>switchSection(b.dataset.section)});
function switchSection(id){$$(".section").forEach(s=>s.classList.toggle("active",s.id===id));$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.section===id));$("#page-title").textContent={dashboard:"Visão geral",pacientes:"Pacientes",consultas:"Consultas",profissionais:"Profissionais",especialidades:"Especialidades",pagamentos:"Pagamentos"}[id]||"Visão geral";window.scrollTo({top:0,behavior:"smooth"})}
$("#add-patient").onclick=()=>openModal("patient");$("#add-appointment").onclick=()=>openModal("appointment");$("#close-modal").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};
$("#patient-search").oninput=renderPatients;$("#patient-filter").onchange=renderPatients;$("#appointment-search").oninput=renderAppointments;$("#appointment-filter").onchange=renderAppointments;
renderAll();
