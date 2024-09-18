import PerfilForm from "@/components/forms/Perfil";
import { Navigation } from "@/components/nav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Perfil() {
    const session = await getServerSession();

    if(!session) {
        redirect("/");
        // console.log(session)
      };
 
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950	">
        <Navigation />
        <PerfilForm email={session!.user?.email}/>
      </main>
    );
  }
  