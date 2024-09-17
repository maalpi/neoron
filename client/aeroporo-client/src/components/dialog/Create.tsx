'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateFlight } from '@/hooks/createAeroporto';
import { AeroportoData } from '@/interfaces/aeroporto-data'; // Importa a interface

export default function Create() {
  const { handleSubmit } = useCreateFlight();
  const [flightCode, setFlightCode] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [origin, setOrigin] = useState({ postalCode: '', country: '', city: '', state: '' });
  const [destination, setDestination] = useState({ postalCode: '', country: '', city: '', state: '' });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Formatar data e hora para ISO 8601
    const formattedDateTime = new Date(`${departureDate}T${departureTime}`).toISOString();

    // Criar objeto de voo
    const flightData: AeroportoData = {
      id: '', // Adicione um id vazio ou remova se o backend gerar
      flightCode,
      date: formattedDateTime,
      origin,
      destination
    };

    handleSubmit(flightData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar voo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Criação de voo</DialogTitle>
            <DialogDescription>
              Adicione as seguintes informações abaixo para cadastrar um novo voo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="flight-code">Código do voo</Label>
                <Input id="flight-code" placeholder="AAA123" required value={flightCode} onChange={e => setFlightCode(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departure-date">Data de partida</Label>
                <Input id="departure-date" type="date" required value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departure-time">Horário de partida</Label>
                <Input id="departure-time" type="time" required value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
              </div>
            </div>
            <DialogTitle>Origem:</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="origin-postal-code">Código Postal</Label>
                <Input id="origin-postal-code" placeholder="58430015" required value={origin.postalCode} onChange={e => setOrigin({ ...origin, postalCode: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="origin-country">País</Label>
                <Input id="origin-country" placeholder="Brasil" required value={origin.country} onChange={e => setOrigin({ ...origin, country: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="origin-city">Cidade</Label>
                <Input id="origin-city" placeholder="Campina Grande" required value={origin.city} onChange={e => setOrigin({ ...origin, city: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="origin-state">Estado</Label>
                <Input id="origin-state" placeholder="Paraiba" required value={origin.state} onChange={e => setOrigin({ ...origin, state: e.target.value })} />
              </div>
            </div>
            <DialogTitle>Destino:</DialogTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="destination-postal-code">Código Postal</Label>
                <Input id="destination-postal-code" placeholder="58430015" required value={destination.postalCode} onChange={e => setDestination({ ...destination, postalCode: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination-country">País</Label>
                <Input id="destination-country" placeholder="Brasil" required value={destination.country} onChange={e => setDestination({ ...destination, country: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination-city">Cidade</Label>
                <Input id="destination-city" placeholder="Crato" required value={destination.city} onChange={e => setDestination({ ...destination, city: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination-state">Estado</Label>
                <Input id="destination-state" placeholder="Ceara" required value={destination.state} onChange={e => setDestination({ ...destination, state: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar voo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
