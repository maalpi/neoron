'use client'
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AeroportoData } from "@/interfaces/aeroporto-data";
import { useDeleteAeroporto } from '../../hooks/deleteAeroporto';
import { usePatchAeroporto } from "@/hooks/patchAeroporto";

interface DescribeProps {
    data: AeroportoData;
}

export default function Describe({ data }: DescribeProps) {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date(data.date).toISOString().split("T")[0]);
    const [time, setTime] = useState(data.date.match(/\d\d:\d\d/)?.[0] || '');

    const { handleDelete } = useDeleteAeroporto();
    const { handleUpdate } = usePatchAeroporto();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500 background-none p-0 cursor-pointer hover:text-zinc-700">mais detalhes</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(event) => handleUpdate(event, data, date, time, setLoading)}>
          <DialogHeader>
            <DialogTitle>Detalhes de voo</DialogTitle>
            <DialogDescription>
              Adicione as seguintes informações abaixo para editar o voo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="flight-code">Código do voo</Label>
                <Input name="flight-code" placeholder="AAA123" required  defaultValue={data.flightCode}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departure-date">Data de partida</Label>
                <Input id="departure-date" type="date" required onChange={(e) => setDate(e.target.value)} defaultValue={new Date(data.date).toISOString().split("T")[0]} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departure-time">Horário de partida</Label>
                <Input id="departure-time" type="time" required onChange={(e) => setTime(e.target.value)} defaultValue={data.date .match(/\d\d:\d\d/)?.[0] || ''}/>
              </div>
            </div>
            <DialogTitle>Origem:</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="originPostalCode">Código Postal</Label>
                <Input name="originPostalCode" placeholder="58430015" required defaultValue={data.origin.postalCode}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="originCountry">País</Label>
                <Input name="originCountry" placeholder="Brasil" required defaultValue={data.origin.country}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="originCity">Cidade</Label>
                <Input name="originCity" placeholder="Campina Grande" required  defaultValue={data.origin.city}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="originState">Estado</Label>
                <Input name="originState" placeholder="Paraiba" required defaultValue={data.origin.state}/>
              </div>
            </div>
            <DialogTitle>Destino:</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="destinationPostalCode">Código Postal</Label>
                <Input name="destinationPostalCode" placeholder="58430015" required defaultValue={data.destination.postalCode}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destinationCountry">País</Label>
                <Input name="destinationCountry" placeholder="Brasil" required defaultValue={data.destination.country}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destinationCity">Cidade</Label>
                <Input name="destinationCity" placeholder="Crato" required defaultValue={data.destination.city} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destinationState">Estado</Label>
                <Input name="destinationState" placeholder="Ceara" required defaultValue={data.destination.state} />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
                <Button variant="destructive" onClick={() => handleDelete(data, setLoading)} disabled={loading}>
                  {loading ? 'Excluindo...' : 'Excluir voo'}
                </Button>
              </DialogClose>
            <Button variant="secondary" type="submit">Editar voo</Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
