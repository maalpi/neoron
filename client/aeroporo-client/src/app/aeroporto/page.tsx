import React from 'react';

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TableAeroporto from '@/components/table/Tabela';
import  Create  from '@/components/dialog/Create';
import { Navigation } from '@/components/nav';

export default async function Home() {

//   Obtém a sessão atual
  const session = await getServerSession();

//   Verifica se a sessão está autorizada
  if(!session) {
    redirect("/");
    // console.log(session)
  };

  return (
    <>
    <Navigation/>
    <main className="flex min-h-screen items-center justify-center flex-col bg-slate-950">
        <Create/>
        <TableAeroporto/>
    </main>
    
  </>
  );
}
