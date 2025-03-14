//|******************************************************************************************************|
//| Arquivo responsável pelas cores, formatação e configurações do gráfico do menu lateral.              |
//|******************************************************************************************************|



//----ESSE JS Controla função dos botões do menu NAVBAR e Gráficos



//! Active Navbar Item

// Seleciona todos os itens de navegação
const navItems = document.querySelectorAll(".nav-item");

// Adiciona um evento de clique a cada item de navegação
navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});



//! Criação do gráfico Chart JS
const chartData = {
  labels: ["Workshop", "Theater", "Concert", "Sport"],
  data: [40, 15, 25, 20],
};

const chart = document.getElementById("doughnut");
const eventList = document.querySelector(".chart ul");

// Inicializa um gráfico do tipo 'doughnut' usando Chart.js
new Chart(chart, {
  type: "doughnut",
  data: {
    labels: ["Workshop", "Theater", "Concert", "Sport"],
    datasets: [
      {
        label: "# of Events",
        data: [8, 3, 5, 4],
        backgroundColor: ["#582bac", "#b31a4d", "#e48e2c", "#4a920f"],
        offset: 10,
        hoverOffset: 8,
        hoverBorderColor: "#9a999b",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#8b8a96",
          font: {
            size: 12,
            weight: 600,
          },
        },
      },
    },
    layout: {
      padding: {
        bottom: 10,
      },
    },
  },
});



//! Essa função population, cria elementos de lista (<li>) para cada rótulo de evento do grafico mostrando sua respectiva porcentagem
  function population() {
  chartData.labels.forEach((label, i) => {
    let eachEvent = document.createElement("li");
    eachEvent.innerHTML = `${label}: <span class="percentage">${chartData.data[i]}%</span> `;
    eventList.appendChild(eachEvent);
  });
}

population();








