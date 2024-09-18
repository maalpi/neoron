import axios from 'axios';
import { AeroportoData } from '@/interfaces/aeroporto-data';
import { useToast } from "@/hooks/use-toast"

export const useCreateFlight = () => {
  const { toast } = useToast()

  const handleSubmit = async (flightData: AeroportoData) => {
    try {
      const response = await axios.post('https://nest-neoron-deploy.onrender.com/aeroporto', flightData);
      console.log('Voo criado com sucesso:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';
        // Quando o erro é de Axios
        toast({
          variant: "destructive",
          title: "Erro ao atualizar voo",
          description: `error: ${errorMessage}`,
        });
      } else {
        // Quando o erro não é de Axios
        toast({
          variant: "destructive",
          title: "Erro ao atualizar voo",
          description: `error: DESCONHECIDO`,
        });
      }
      console.error('Erro ao criar o voo:', error);
    }
  };

  return { handleSubmit };
};
