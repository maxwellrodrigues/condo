//|******************************************************************************************************|
//| Arquivo responsável pela atualizações dos níveis de água, estatus bomba, tensão e corrente.          |
//| Executa também as animações de ponteiros dos medidores e a atulização dos dados de tempos em tempos. |
//|******************************************************************************************************|

// Importa a configuração do Supabase
import { supabase } from "./config.js";

//*************************************************************************************************************
//---------------------------------- FUNÇÕES DE ATUALIZAÇÃO PARA BLOCO 1 --------------------------------------
//*************************************************************************************************************

// Atualiza o nível de água para Bloco1
function updateWaterLevel1(percentage) {
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  const waterContainer = document.querySelector("#bloco1 .water-container");
  const waterElement = document.getElementById("water-level1");
  if (!waterContainer || !waterElement) return;

  const containerHeight = waterContainer.clientHeight;
  const waterMinHeight = containerHeight * 0.08;
  const waterMaxHeight = containerHeight * 0.78;
  const adjustedPercentage = (Math.pow(percentage / 100, 1.2)) * 100;
  const newHeight = waterMinHeight + ((waterMaxHeight - waterMinHeight) * (adjustedPercentage / 100));
  waterElement.style.height = `${newHeight}px`;

  const capsulaNivel = document.querySelector("#bloco1 .capsula-nivel");
  if (capsulaNivel) {
    capsulaNivel.textContent = `${percentage.toFixed(0)}%`;
  }
}

//------------------------- Função para atualizar a rotação do ponteiro do voltímetro 1---------------------------
function updateVoltimetro1(value) {
  const ponteiro = document.getElementById("ponteiro-voltimetro1");
  const maxVoltage = 300;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxVoltage) value = maxVoltage;

  const angle = (value / maxVoltage) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaVoltimetro = document.querySelector("#bloco1 .capsula-voltimetro");
  if (capsulaVoltimetro) {
    capsulaVoltimetro.textContent = `${value.toFixed(0)} V`;
  }
}

//----------------------- Função para atualizar a rotação do ponteiro do Amperímetro 1---------------------------
function updateAmperimetro1(value) {
  const ponteiro = document.getElementById("ponteiro-amperimetro1");
  const maxCurrent = 60;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxCurrent) value = maxCurrent;

  const angle = (value / maxCurrent) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaAmperimetro = document.querySelector("#bloco1 .capsula-amperimetro");
  if (capsulaAmperimetro) {
    capsulaAmperimetro.textContent = `${value.toFixed(0)} A`;
  }
}

//*************************************************************************************************************
//---------------------------------- FUNÇÕES DE ATUALIZAÇÃO PARA BLOCO 2 --------------------------------------
//*************************************************************************************************************

// Atualiza o nível de água para Bloco 2
function updateWaterLevel2(percentage) {
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  const waterContainer = document.querySelector("#bloco2 .water-container");
  const waterElement = document.getElementById("water-level2");
  if (!waterContainer || !waterElement) return;

  const containerHeight = waterContainer.clientHeight;
  const waterMinHeight = containerHeight * 0.08;
  const waterMaxHeight = containerHeight * 0.78;
  const adjustedPercentage = (Math.pow(percentage / 100, 1.2)) * 100;
  const newHeight = waterMinHeight + ((waterMaxHeight - waterMinHeight) * (adjustedPercentage / 100));
  waterElement.style.height = `${newHeight}px`;

  const capsulaNivel = document.querySelector("#bloco2 .capsula-nivel");
  if (capsulaNivel) {
    capsulaNivel.textContent = `${percentage.toFixed(0)}%`;
  }
}

//------------------------- Função para atualizar a rotação do ponteiro do voltímetro 2---------------------------
function updateVoltimetro2(value) {
  const ponteiro = document.getElementById("ponteiro-voltimetro2");
  const maxVoltage = 300;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxVoltage) value = maxVoltage;

  const angle = (value / maxVoltage) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaVoltimetro = document.querySelector("#bloco2 .capsula-voltimetro");
  if (capsulaVoltimetro) {
    capsulaVoltimetro.textContent = `${value.toFixed(0)} V`;
  }
}

//----------------------- Função para atualizar a rotação do ponteiro do Amperímetro 2---------------------------
function updateAmperimetro2(value) {
  const ponteiro = document.getElementById("ponteiro-amperimetro2");
  const maxCurrent = 60;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxCurrent) value = maxCurrent;

  const angle = (value / maxCurrent) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaAmperimetro = document.querySelector("#bloco2 .capsula-amperimetro");
  if (capsulaAmperimetro) {
    capsulaAmperimetro.textContent = `${value.toFixed(0)} A`;
  }
}

//*************************************************************************************************************
//---------------------------------- FUNÇÕES DE ATUALIZAÇÃO PARA BLOCO 3 --------------------------------------
//*************************************************************************************************************

// Atualiza o nível de água para Bloco 3
function updateWaterLevel3(percentage) {
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  const waterContainer = document.querySelector("#bloco3 .water-container");
  const waterElement = document.getElementById("water-level3");
  if (!waterContainer || !waterElement) return;

  const containerHeight = waterContainer.clientHeight;
  const waterMinHeight = containerHeight * 0.08;
  const waterMaxHeight = containerHeight * 0.78;
  const adjustedPercentage = (Math.pow(percentage / 100, 1.2)) * 100;
  const newHeight = waterMinHeight + ((waterMaxHeight - waterMinHeight) * (adjustedPercentage / 100));
  waterElement.style.height = `${newHeight}px`;

  const capsulaNivel = document.querySelector("#bloco3 .capsula-nivel");
  if (capsulaNivel) {
    capsulaNivel.textContent = `${percentage.toFixed(0)}%`;
  }
}

//------------------------- Função para atualizar a rotação do ponteiro do voltímetro 3---------------------------
function updateVoltimetro3(value) {
  const ponteiro = document.getElementById("ponteiro-voltimetro3");
  const maxVoltage = 300;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxVoltage) value = maxVoltage;

  const angle = (value / maxVoltage) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaVoltimetro = document.querySelector("#bloco3 .capsula-voltimetro");
  if (capsulaVoltimetro) {
    capsulaVoltimetro.textContent = `${value.toFixed(0)} V`;
  }
}

//----------------------- Função para atualizar a rotação do ponteiro do Amperímetro 3---------------------------
function updateAmperimetro3(value) {
  const ponteiro = document.getElementById("ponteiro-amperimetro3");
  const maxCurrent = 60;
  const maxAngle = 260;

  if (value < 0) value = 0;
  if (value > maxCurrent) value = maxCurrent;

  const angle = (value / maxCurrent) * maxAngle;
  animateNeedle(ponteiro, angle);

  const capsulaAmperimetro = document.querySelector("#bloco3 .capsula-amperimetro");
  if (capsulaAmperimetro) {
    capsulaAmperimetro.textContent = `${value.toFixed(0)} A`;
  }
}

//---------------------------------------- FIM ATUALIZAÇÃO DOS BLOCOS ----------------------------------------

//---------------------------- Função para animar o ponteiro suavemente até um novo ângulo------------------------
function animateNeedle(element, targetAngle) {
  if (element.animationFrame) {
    cancelAnimationFrame(element.animationFrame);
  }

  let currentAngle = parseFloat(element.dataset.angle) || 0;
  const step = (targetAngle - currentAngle) / 40;

  function moveNeedle() {
    currentAngle += step;

    if ((step > 0 && currentAngle >= targetAngle) || (step < 0 && currentAngle <= targetAngle)) {
      currentAngle = targetAngle;
    } else {
      element.animationFrame = requestAnimationFrame(moveNeedle);
    }

    element.style.transform = `rotate(${currentAngle}deg)`;
    element.dataset.angle = currentAngle;
  }

  moveNeedle();
}

//------------------- Função para obter dados do Supabase e atualizar a interface do usuário------------------
async function fetchDataFromSupabase() {
  // Busca os dados da tabela "dados" no Supabase
  const { data, error } = await supabase
    .from("dados")
    .select("*")
    .eq("id", 1383); // Filtra pelo ID 1383

  if (error) {
    console.error("Erro ao buscar dados do Supabase:", error);
    return;
  }

  // Verifica se há dados disponíveis
  if (data && data.length > 0) {
    const payload = data[0].payload; // Acessa o JSON da coluna "payload"
    const dados = payload.dados; // Acessa o objeto "dados" dentro do payload

    // Atualiza a interface com os dados iniciais
    updateInterface(dados);
  }

  // Escuta mudanças em tempo real na tabela "dados"
  const subscription = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "dados", filter: "id=eq.1383" },
      (payload) => {
        const newPayload = payload.new; // Dados atualizados
        const newDados = newPayload.dados; // Acessa o objeto "dados" dentro do payload

        // Atualiza a interface com os novos dados
        updateInterface(newDados);
      }
    )
    .subscribe();

  return subscription;
}




// Função para atualizar a interface com os dados recebidos
function updateInterface(dados) {
  // Bloco 1
  const bloco1 = dados.Bloco1;
  if (bloco1) {
    updateWaterLevel1(bloco1.nivel_agua);
    updateVoltimetro1(bloco1.tensao_bomba);
    updateAmperimetro1(bloco1.corrente_bomba);

    const statusBombaElement1 = document.querySelector("#bloco1 .capsula-status");
    if (statusBombaElement1) {
      statusBombaElement1.textContent = bloco1.bomba_ligada ? "Bomba Ligada" : "Bomba Desligada";
      statusBombaElement1.style.backgroundColor = bloco1.bomba_ligada ? "#4CAF50" : "#f44336";
    }
  }

  // Bloco 2
  const bloco2 = dados.Bloco2;
  if (bloco2) {
    updateWaterLevel2(bloco2.nivel_agua);
    updateVoltimetro2(bloco2.tensao_bomba);
    updateAmperimetro2(bloco2.corrente_bomba);

    const statusBombaElement2 = document.querySelector("#bloco2 .capsula-status");
    if (statusBombaElement2) {
      statusBombaElement2.textContent = bloco2.bomba_ligada ? "Bomba Ligada" : "Bomba Desligada";
      statusBombaElement2.style.backgroundColor = bloco2.bomba_ligada ? "#4CAF50" : "#f44336";
    }
  }

  // Bloco 3
  const bloco3 = dados.Bloco3;
  if (bloco3) {
    updateWaterLevel3(bloco3.nivel_agua);
    updateVoltimetro3(bloco3.tensao_bomba);
    updateAmperimetro3(bloco3.corrente_bomba);

    const statusBombaElement3 = document.querySelector("#bloco3 .capsula-status");
    if (statusBombaElement3) {
      statusBombaElement3.textContent = bloco3.bomba_ligada ? "Bomba Ligada" : "Bomba Desligada";
      statusBombaElement3.style.backgroundColor = bloco3.bomba_ligada ? "#4CAF50" : "#f44336";
    }
  }
}

// Chama a função para obter os dados do Supabase e atualizar a interface automaticamente
//fetchDataFromSupabase();

setInterval(fetchDataFromSupabase, 1000);
