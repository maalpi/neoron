export interface LocalData {
    postalCode: string;
    country: string;
    city: string;
    state: string;
  }
  
  export interface AeroportoData {
    id: string;
    flightCode: string;
    date: string; // Pode deixar como string, pois vem no formato ISO
    origin: LocalData;
    destination: LocalData;
  }
  
  export type AeroportoResponse = AeroportoData[]; // API retorna diretamente um array
  