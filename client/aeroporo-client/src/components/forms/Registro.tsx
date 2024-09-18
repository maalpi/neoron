'use client';

import React, { useState } from 'react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast()

// Função para lidar com o registro
async function registerUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Faz a requisição para registrar o usuário
      const response = await fetch('https://nest-neoron-deploy.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          variant: 'destructive',
          title: 'Erro ao cadastrar!',
          description: errorData.message || 'Houve um problema ao cadastrar o usuário.',
          action: <ToastAction altText="Try again">Fechar</ToastAction>,
        });
        return
      }

      // Redireciona o usuário para a página de login após o registro bem-sucedido
      toast({
        variant: 'default',
        title: 'Cadastro realizado com sucesso!',
        description: `Usuário cadastrado.`,
      });
      router.push('/');
    } catch (e) {
      console.error('Erro ao cadastrar usuário:', e);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center font-sans bg-slate-950">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Se Cadastre</CardTitle>
          <CardDescription>
            Coloque suas informações para criar a conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerUser} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Exibe a mensagem de erro */}
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
