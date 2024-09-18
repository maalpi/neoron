// hooks/useUserData.ts

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name?: string;
  email?: string;
  password?: string;
}

export function useUserData(email: string) {
  const [userData, setUserData] = useState<UserData>({});
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const response = await fetch(`https://nest-neoron-deploy.onrender.com/users/search/email?email=${email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          setError((error as Error).message);
          toast({
            title: 'Error',
            description: `Failed to fetch user data: ${(error as Error).message}`,
            variant: 'destructive',
          });
        }
      }
    };

    fetchUserData();
  }, [email, toast]);

  return { userData, error };
}
