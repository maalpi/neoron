'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from '@/hooks/getUser';
import { useDeleteAccount } from '@/hooks/deleteUser';
import { useUpdateAccount } from '@/hooks/updateUser';

interface PerfilFormProps {
  email: string;
}

export default function PerfilForm({ email }: PerfilFormProps) {
  const { userData } = useUserData(email);
  const { deleteAccount } = useDeleteAccount();
  const { updateAccount } = useUpdateAccount();

  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmailInput(userData.email || '');
      setPassword(userData.password || '');
    }
  }, [userData]);

  const handleDelete = () => {
    deleteAccount(email);
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateAccount(email, { name, email: emailInput, password });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Meu perfil</CardTitle>
          <CardDescription>Você consegue alterar ou excluir sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user">Usuário</Label>
                <Input
                  id="user"
                  name="user"
                  type="text"
                  placeholder="usuário"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="e-mail"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button 
                variant="destructive" 
                className="w-full mr-4 mt-7" 
                onClick={handleDelete}
              >
                Excluir
              </Button>
              <Button type="submit" className="w-full mt-7">Editar</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
