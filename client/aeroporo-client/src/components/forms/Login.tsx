'use client'

import React, { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import Link from "next/link"

// importando a funçao signin para lidar com a autenticacao
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  console.log(error);

  useEffect(() => {
    // Verificando os  parâmetros na URL para identificar possíveis erros de login
    const query = new URLSearchParams(window.location.search);
    const errorParam = query.get('error');
    setError(errorParam);
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Extraindo os dados do form
    const email = formData.get("user") as string; // Obtém o email do campo
    const senha = formData.get("senha") as string; // Obtém a senha do campo

    // Chama à função `signIn` do NextAuth com o provedor "credentials", configurado no route
    const result = await signIn("credentials", {
      email, // Envia o email
      password: senha, // envia as infos do usuario
      callbackUrl: "/aeroporto", // Se o login for bem sucedido ele redereciona o usuario a uma pagina nova
      redirect: false // evita rederenciament automatic
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "ERROR: Dados de login incorretos.",
        description: "Porfavor, crie uma nova conta ou verifique se os dados estão corretos.",
        action: <ToastAction altText="Try again">Fechar</ToastAction>,
      });
      setError(result.error); // Atualiza o estado de erro para exibir na UI, se necessário
    } else if (result?.ok) {
      router.push("/aeroporto");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login Aeroporto</CardTitle>
          <CardDescription>Digite o seu e-mail e senha para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user">E-mail</Label>
                <Input id="user" name="user" type="text" placeholder="e-mail" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" name="senha" type="password" placeholder="senha" />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="w-full mt-7">Login</Button>
            </CardFooter>
          </form>
          <div className="text-center text-sm">
            Não tem conta?{" "}
            <Link href="/registro" className="underline">
              Crie agora
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
