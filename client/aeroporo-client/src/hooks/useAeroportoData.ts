'use client'
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from 'axios';
import { AeroportoData } from "@/interfaces/aeroporto-data";

// @ts-ignore
const fetchData = async (): AxiosPromise<AeroportoData[]> => {
    const response = await axios.get<AeroportoData[]>('https://nest-neoron-deploy.onrender.com/aeroporto');
    return response;
  }
  
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
  