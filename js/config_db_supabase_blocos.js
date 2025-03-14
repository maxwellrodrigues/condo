//|******************************************************************************************************|
//| ????????????                                                                                         |
//|******************************************************************************************************|


// config_db_supabase_blocos.js - Atualizado para Supabase mantendo estrutura original
import { supabase } from "./config.js";

// Função que simula o comportamento do Firebase para compatibilidade
async function getDatabaseReference(path) {
  // Divide o caminho em partes (ex: "dados/Bloco1" -> ["dados", "Bloco1"])
  const parts = path.split("/");
  const table = parts[0]; // Nome da tabela (ex: "dados")
  const column = parts[1]; // Coluna ou filtro (ex: "Bloco1")

  // Busca os dados no Supabase
  let { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", column); // Filtra pelo ID (ex: "Bloco1")

  if (error) {
    console.error("Erro ao buscar dados do Supabase:", error);
    return null;
  }

  // Retorna os dados no formato esperado pelo código existente
  return { val: () => data[0] }; // Simula o comportamento do snapshot.val()
}

export { getDatabaseReference };

