import { useToast } from "@/hooks/use-toast";

interface FlightData {
  flightCode: string;
  origin: {
    postalCode: string;
    country: string;
    city: string;
    state: string;
  };
  destination: {
    postalCode: string;
    country: string;
    city: string;
    state: string;
  };
}

export const usePatchAeroporto = () => {
  const { toast } = useToast();

  const handleUpdate = async (
    event: React.FormEvent,
    data: FlightData,
    date: string,
    time: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Combina a data e o tempo no formato correto
    const fullDate = `${date}T${time}:00.000Z`;

    const updatedData = {
      flightCode: formData.get("flight-code") as string,
      date: fullDate,
      origin: {
        postalCode: formData.get("originPostalCode") as string,
        country: formData.get("originCountry") as string,
        city: formData.get("originCity") as string,
        state: formData.get("originState") as string,
      },
      destination: {
        postalCode: formData.get("destinationPostalCode") as string,
        country: formData.get("destinationCountry") as string,
        city: formData.get("destinationCity") as string,
        state: formData.get("destinationState") as string,
      }
    };

    try {
      const response = await fetch(`http://localhost:3001/aeroporto/update?flightCode=${data.flightCode}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Erro desconhecido';
        toast({
          variant: "destructive",
          title: "Erro ao atualizar voo",
          description: `error: ${errorMessage}`,
        });
        throw new Error(errorMessage);
      }

      toast({
        title: "Voo atualizado com sucesso",
        description: "As informações do voo foram atualizadas.",
      });
    } catch (error) {
      console.error('Erro ao atualizar voo:', error);
      toast({
        variant: "destructive",
        title: "Falha na atualização",
        description: `Erro ao tentar atualizar os dados. ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate };
};
