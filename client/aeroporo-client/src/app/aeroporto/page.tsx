import React from 'react';

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TableAeroporto from '@/components/table/Tabela';

export default async function Home() {

  // Obtém a sessão atual
//   const session = await getServerSession();

  // Verifica se a sessão está autorizada
//   if(!session) {
//     redirect("/");
//   };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 z-20">
        <TableAeroporto/>
    </main>
  );
}
