//|******************************************************************************************************|
//| Arquivo responsável pelo gráfico da linha do tempo do nível da água (Tabela dados do Supabase).      |
//| Executa também a formatação de cores, eixos X e Y do gráfico e atualiza dados de tempos em tempos.   |
//|******************************************************************************************************|

// Importação de Dependências
import { supabase } from "./config.js";

// Configuração do Gráfico
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("graficoNiveis");
  if (!ctx) {
    console.error("Elemento <canvas> com ID 'graficoNiveis' não encontrado.");
    return;
  }

  const ctx2d = ctx.getContext("2d");

  // Inicialização das Variáveis
  let timestamps = [];
  let historicoNiveis = { Bloco1: [], Bloco2: [], Bloco3: [] };

  // Configuração do Gráfico com Chart.js
  let chart = new Chart(ctx2d, {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [
        {
          label: "Bloco 1",
          data: historicoNiveis.Bloco1,
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.2)",
          borderWidth: 2,
          fill: true
        },
        {
          label: "Bloco 2",
          data: historicoNiveis.Bloco2,
          borderColor: "#2ecc71",
          backgroundColor: "rgba(46, 204, 113, 0.2)",
          borderWidth: 2,
          fill: true
        },
        {
          label: "Bloco 3",
          data: historicoNiveis.Bloco3,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.2)",
          borderWidth: 2,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "#7c7878",
            font: { size: 10, weight: "bold" },
            callback: function(value) {
              return value + "%";
            }
          },
          grid: { color: "#B0B0B0" }
        },
        x: {
          ticks: {
            color: "#7c7878",
            font: { size: 10, weight: "bold" }
          },
          grid: { color: "#B0B0B0" }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Nível de Água (Últimas 24 horas)",
          font: { size: 18 },
          color: '#c0c8fd'
        },
        legend: {
          display: true,
          position: "top",
          labels: { font: { size: 11 }, color: "#c0c8fd", padding: 10 }
        }
      }
    }
  });

  // Função para buscar TODOS os dados do Supabase, evitando o limite de 1000 registros
  async function fetchAllDataFromSupabase() {
    console.log("Buscando dados do Supabase...");

    const { data: ultimaData, error: erroUltimaData } = await supabase
      .from("sensores")
      .select("timestamp")
      .order("timestamp", { ascending: false })
      .limit(1);

    if (erroUltimaData || !ultimaData || ultimaData.length === 0) {
      console.error("Erro ao buscar a última data do Supabase:", erroUltimaData);
      return;
    }

    const ultimoTimestamp = new Date(ultimaData[0].timestamp);
    const vinteQuatroHorasAtras = new Date(ultimoTimestamp.getTime() - 24 * 60 * 60 * 1000);

    let allData = [];
    let start = 0;
    let limit = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from("sensores")
        .select("*")
        .gte("timestamp", vinteQuatroHorasAtras.toISOString())
        .order("timestamp", { ascending: true })
        .range(start, start + limit - 1);

      if (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
        return;
      }

      if (data.length === 0) {
        hasMore = false;
      } else {
        allData = allData.concat(data);
        start += limit;
      }
    }

    console.log("Total de registros carregados:", allData.length);
    processarDados(allData);
  }

  // Processa os dados e atualiza o gráfico
  function processarDados(data) {
    timestamps = [];
    historicoNiveis = { Bloco1: [], Bloco2: [], Bloco3: [] };

    data.forEach((item) => {
      const timestamp = new Date(item.timestamp).toLocaleString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      if (!timestamps.includes(timestamp)) {
        timestamps.push(timestamp);
      }

      if (item.bloco === "Bloco1") {
        historicoNiveis.Bloco1.push(item.nivel_agua);
      } else if (item.bloco === "Bloco2") {
        historicoNiveis.Bloco2.push(item.nivel_agua);
      } else if (item.bloco === "Bloco3") {
        historicoNiveis.Bloco3.push(item.nivel_agua);
      }
    });

    chart.data.labels = timestamps;
    chart.data.datasets[0].data = historicoNiveis.Bloco1;
    chart.data.datasets[1].data = historicoNiveis.Bloco2;
    chart.data.datasets[2].data = historicoNiveis.Bloco3;
    chart.update();
  }

  // Busca os dados ao carregar a página e a cada 5 segundos
  fetchAllDataFromSupabase();
  setInterval(fetchAllDataFromSupabase, 5000);
});
