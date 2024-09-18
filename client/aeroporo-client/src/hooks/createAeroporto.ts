import axios from 'axios';
import { AeroportoData } from '@/interfaces/aeroporto-data';
import { useToast } from "@/hooks/use-toast";

export const useCreateFlight = () => {
  const { toast } = useToast();

  const handleSubmit = async (flightData: AeroportoData) => {
    try {
      const response = await axios.post('https://nest-neoron-deploy.onrender.com/aeroporto', flightData);
      console.log('Voo criado com sucesso:', response.data);

      // Mostrar uma mensagem de sucesso
      toast({
        title: "Voo criado com sucesso",
        description: "O voo foi adicionado com sucesso.",
      });

      // Redirecionar ou recarregar a página após sucesso
      window.location.reload();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';
        // Mostrar uma mensagem de erro específica para erros de Axios
        toast({
          variant: "destructive",
          title: "Erro ao criar voo",
          description: `Detalhes: ${errorMessage}`,
        });
      } else {
        // Mostrar uma mensagem de erro genérica para erros desconhecidos
        toast({
          variant: "destructive",
          title: "Erro ao criar voo",
          description: `Erro desconhecido. Por favor, tente novamente.`,
        });
      }
      console.error('Erro ao criar o voo:', error);
    }
  };

  return { handleSubmit };
};
