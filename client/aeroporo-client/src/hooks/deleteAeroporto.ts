import { AeroportoData } from "@/interfaces/aeroporto-data";
import { useToast } from "@/hooks/use-toast";

export const useDeleteAeroporto = () => {
  const { toast } = useToast();

  const handleDelete = async (data: AeroportoData, setLoading: (loading: boolean) => void) => {
    const confirmed = window.confirm('Tem certeza de que deseja excluir este voo?');

    if (!confirmed) {
      return; // Se o usuário cancelar, a função é interrompida aqui
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/aeroporto/delete?flightCode=${data.flightCode}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: `ERROR: ${errorData.message}`,
          description: "Por favor, tente novamente mais tarde.",
        });
        throw new Error('Erro ao excluir o voo');
      }

      toast({
        title: "SUCESSO ao destruir elemento",
        description: "Voo excluído com sucesso.",
      });
      // Aqui você pode adicionar qualquer lógica para redirecionar ou atualizar a página

    } catch (error) {
      console.error('Erro ao excluir voo:', error);
      toast({
        variant: "destructive",
        title: "Falha na exclusão",
        description: `Erro ao tentar excluir o voo. ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete };
};