'use client'
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from 'axios';
import { AeroportoData } from "@/interfaces/aeroporto-data";

const fetchData = async (): Promise<AeroportoData[]> => {
  try {
    const response: AxiosResponse<AeroportoData[]> = await axios.get('http://localhost:3001/aeroporto');
    return response.data; // Retorne apenas os dados
  } catch (error) {
    // Trate o erro conforme necessário
    console.error('Erro ao buscar dados', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
  
  export function useAeroportoData() {
    console.log('query page');
    const query = useQuery({
      queryFn: fetchData,
      queryKey: ['aeroporto-data'],
    });
  
    console.log(query);
    return {
      ...query,
      data: query.data, // Aqui `data` já é o array de aeroportos
    };
  }
  