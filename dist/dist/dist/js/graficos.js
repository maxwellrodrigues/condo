import{supabase}from"./config.js";document.addEventListener("DOMContentLoaded",(()=>{const o=document.getElementById("graficoNiveis");if(!o)return void console.error("Elemento <canvas> com ID 'graficoNiveis' não encontrado.");const e=o.getContext("2d");let a=[],t={Bloco1:[],Bloco2:[],Bloco3:[]},l=new Chart(e,{type:"line",data:{labels:a,datasets:[{label:"Bloco 1",data:t.Bloco1,borderColor:"#3498db",backgroundColor:"rgba(52, 152, 219, 0.2)",borderWidth:2,fill:!0},{label:"Bloco 2",data:t.Bloco2,borderColor:"#2ecc71",backgroundColor:"rgba(46, 204, 113, 0.2)",borderWidth:2,fill:!0},{label:"Bloco 3",data:t.Bloco3,borderColor:"#e74c3c",backgroundColor:"rgba(231, 76, 60, 0.2)",borderWidth:2,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,max:100,ticks:{color:"#7c7878",font:{size:10,weight:"bold"},callback:function(o){return o+"%"}},grid:{color:"#B0B0B0"}},x:{ticks:{color:"#7c7878",font:{size:10,weight:"bold"}},grid:{color:"#B0B0B0"}}},plugins:{title:{display:!0,text:"Nível de Água (Últimas 24 horas)",font:{size:18},color:"#c0c8fd"},legend:{display:!0,position:"top",labels:{font:{size:11},color:"#c0c8fd",padding:10}}}}});async function r(){console.log("Buscando dados do Supabase...");const{data:o,error:e}=await supabase.from("sensores").select("timestamp").order("timestamp",{ascending:!1}).limit(1);if(e||!o||0===o.length)return void console.error("Erro ao buscar a última data do Supabase:",e);const r=new Date(o[0].timestamp),s=new Date(r.getTime()-864e5);let c=[],i=0,n=!0;for(;n;){const{data:o,error:e}=await supabase.from("sensores").select("*").gte("timestamp",s.toISOString()).order("timestamp",{ascending:!0}).range(i,i+1e3-1);if(e)return void console.error("Erro ao buscar dados do Supabase:",e);0===o.length?n=!1:(c=c.concat(o),i+=1e3)}console.log("Total de registros carregados:",c.length),a=[],t={Bloco1:[],Bloco2:[],Bloco3:[]},c.forEach((o=>{const e=new Date(o.timestamp).toLocaleString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"});a.includes(e)||a.push(e),"Bloco1"===o.bloco?t.Bloco1.push(o.nivel_agua):"Bloco2"===o.bloco?t.Bloco2.push(o.nivel_agua):"Bloco3"===o.bloco&&t.Bloco3.push(o.nivel_agua)})),l.data.labels=a,l.data.datasets[0].data=t.Bloco1,l.data.datasets[1].data=t.Bloco2,l.data.datasets[2].data=t.Bloco3,l.update()}r(),setInterval(r,5e3)}));