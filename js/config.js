//|******************************************************************************************************|
//| Arquivo com dados de autenticação no SUPABSE. Contem url, chaves e cria a instância do banco         |
//|******************************************************************************************************|


// config.js - Atualizado para Supabase mantendo estrutura original
const supabaseUrl = "https://ibcfcbqlobnwygviigad.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2ZjYnFsb2Jud3lndmlpZ2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODUzMTIsImV4cCI6MjA1NjE2MTMxMn0.9TsBtgHRw91dlPOOppcrAdU-c1rJn7ibW80u8fP6Fhc";

// Inicializa o Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm";

const supabase = createClient(supabaseUrl, supabaseKey);

// Exporta o cliente do Supabase
export { supabase };

