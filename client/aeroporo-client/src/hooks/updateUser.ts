import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export function useUpdateAccount() {
  const { toast } = useToast();
  const router = useRouter();

  const updateAccount = async (email: string, userData: { name: string; email: string; password: string }) => {
    // Mostrar confirmação ao usuário
    const confirmUpdate = window.confirm("Você tem certeza de que deseja atualizar suas informações?");
    
    if (!confirmUpdate) {
      return; // Se o usuário cancelar, não fazer nada
    }

    try {
      const response = await fetch(`http://localhost:3001/users/update?email=${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      toast({
        title: 'Success',
        description: 'Conta atualizada com sucesso.',
      });


      router.push('/perfil'); // Redirecionar para a página inicial ou qualquer outra página
    } catch (error) {
      toast({
        title: 'Error',
        description: `Falha ao atualizar conta: ${(error as Error).message}`,
        variant: 'destructive',
      });
    }
  };

  return { updateAccount };
}
