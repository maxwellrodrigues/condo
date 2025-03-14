//|******************************************************************************************************|
//| Arquivo responsável pela gráfico da linha do tempo do nível da água (Tabela SENSORES do supabase).   |
//| Executa também a formatação de cores,eixos X e Y do gráfico e atualiza dados de tempos em tempos.    |
//|******************************************************************************************************|

// Importação de Dependências
import { supabase } from "./config.js"; // Corrigido para importar do config.js

// Configuração do Gráfico
document.addEventListener("DOMContentLoaded", () => {
  // Verifique se o elemento <canvas> existe
  const ctx = document.getElementById("graficoNiveis");
  if (!ctx) {
    console.error("Elemento <canvas> com ID 'graficoNiveis' não encontrado.");
    return;
  }

  const ctx2d = ctx.getContext("2d");

  // Inicialização das Variáveis
  let timestamps = []; // Armazena os rótulos do eixo X (timestamps)
  let historicoNiveis = { // Níveis de água dos três blocos
     Bloco3: []
  };

  // Configuração do Gráfico com Chart.js
  let chart = new Chart(ctx2d, {
    type: "line", // Define o tipo de gráfico
    data: {
      labels: timestamps,
      datasets: [
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
            color: "#7c7878", // Cor dos rótulos do eixo Y (vermelho)
            font: {
              size: 10, // Tamanho da fonte do eixo Y
              weight: "bold" // Deixa os números do eixo Y em negrito
            },
            callback: function(value) {
              return value + "%"; // Adiciona um "%" nos valores do eixo Y
            }
          },
          grid: {
            color: "#B0B0B0" // Cor da grade do eixo Y (cinza claro)
          }
        },
        x: {
          ticks: {
            color: "#7c7878", // Cor dos rótulos do eixo X (azul)
            font: {
              size: 10, // Tamanho da fonte do eixo X
              weight: "bold" // Deixa os rótulos do eixo X em negrito
            }
          },
          grid: {
            color: "#B0B0B0" // Cor da grade do eixo X (cinza claro)
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Nível de Água", //Título do Gráfico
          font: {
            size: 18 // Tamanho da fonte do título
          },
          color: '#c0c8fd' // Cor do título
        },
        legend: {
          display: true,
          position: "top", // Posição da legenda (top, bottom, left, right)
          labels: {
            font: {
              size: 11 // Tamanho da fonte das labels da legenda
            },
            color: "#c0c8fd", // Cor da legenda
            padding: 10 // Espaçamento entre as labels da legenda
          }
        }
      }
    }
  });

  // Função para buscar dados do Supabase e atualizar o gráfico
  async function fetchDataFromSupabase() {
    console.log("Buscando dados do Supabase...");

    const { data, error } = await supabase
      .from("dados")
      .select("*")
      .eq("id", 1383); // Filtra pelo ID 1383

    if (error) {
      console.error("Erro ao buscar dados do Supabase:", error);
      return;
    }

    console.log("Dados retornados pelo Supabase:", data); // Verifique os dados retornados

    if (data && data.length > 0) {
      const payload = data[0].payload; // Acessa o JSON da coluna "payload"
      console.log("Payload retornado:", payload); // Verifique o payload

      if (payload && payload.dados) {
        const dados = payload.dados; // Acessa o objeto "dados" dentro do payload
        console.log("Dados extraídos do payload:", dados); // Verifique os dados extraídos

        // Verifica se os dados mudaram
        const novosDados = {
          Bloco3: dados.Bloco3.nivel_agua
        };

        const dadosAtuais = {
          Bloco3: historicoNiveis.Bloco3[historicoNiveis.Bloco3.length - 1]
        };

        // Se os dados não mudaram, não atualize o gráfico
        if (
          novosDados.Bloco3 === dadosAtuais.Bloco3
        ) {
          console.log("Dados não mudaram. Gráfico não será atualizado.");
          return;
        }

        // Processamento e Atualização do Gráfico
        if (dados.Bloco1) {
          // Usa o timestamp da coluna "recebido_em" em vez do timestamp do JSON
          const recebidoEm = new Date(data[0].recebido_em); // Converte o timestamp para um objeto Date
          const formattedTimestamp = recebidoEm.toLocaleString("pt-BR", {
            //day: "2-digit",
            //month: "2-digit",
            //year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }); // Formata para "DD/MM/YYYY, HH:MM:SS"

          timestamps.push(formattedTimestamp); // Adiciona o timestamp formatado ao array
          historicoNiveis.Bloco3.push(dados.Bloco3.nivel_agua);
        }

        // Limita o número de timestamps exibidos no gráfico
        if (timestamps.length > 48) {
          timestamps.shift(); // Remove o timestamp mais antigo
          historicoNiveis.Bloco3.shift();
        }

        console.log("Timestamps:", timestamps); // Verifique os timestamps
        console.log("Histórico de Níveis:", historicoNiveis); // Verifique os níveis de água

        // Atualização do Gráfico
        chart.data.labels = timestamps;
        chart.data.datasets[0].data = historicoNiveis.Bloco3;

        chart.update();
      } else {
        console.error("Payload ou objeto 'dados' não encontrado no retorno do Supabase.");
      }
    } else {
      console.log("Nenhum dado encontrado no Supabase.");
    }
  }

  // Busca os dados imediatamente ao carregar a página
  fetchDataFromSupabase();

  // Configura um intervalo para buscar os dados a cada 5 segundos (5000 milissegundos)
  setInterval(fetchDataFromSupabase, 1000);
});
