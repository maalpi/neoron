import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { signOut } from 'next-auth/react';

export function useDeleteAccount() {
  const { toast } = useToast();
  const router = useRouter();

  const deleteAccount = async (email: string) => {
    // Mostrar confirmação ao usuário
    const confirmDelete = window.confirm("Você tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, não fazer nada
    }

    try {
      const response = await fetch(`https://nest-neoron-deploy.onrender.com/users/delete?email=${email}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      toast({
        title: 'Success',
        description: 'Conta excluída com sucesso.',
      });

      // Desconectar o usuário e redirecionar para a página inicial
      await signOut({ redirect: false });
      router.push('/'); // Redirecionar para a página inicial ou outra página
    } catch (error) {
      toast({
        title: 'Error',
        description: `Falha ao excluir conta: ${(error as Error).message}`,
        variant: 'destructive',
      });
    }
  };

  return { deleteAccount };
}
