'use client'

import React, { useState, useMemo } from 'react';
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";

  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { useAeroportoData } from '@/hooks/useAeroportoData';
  
export default function TableAeroporto() {
    const rowsPerPage = 5;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);
    const { data, isLoading } = useAeroportoData();

    const end = Math.min(startIndex + rowsPerPage,  data?.data?.length);
    
    return (
      <div className='flex justify-center top-10 items-center flex-col min-h-screen fixed w-full px-4'>
        <h1 className='text-white'>Table</h1>
        <div className="overflow-x-clip overflow-y-auto max-w-full max-h-[500px] bg-gray-200 shadow-md rounded-lg">
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {data?.data?.length > 0 ? (
                
                  <Table className="min-w-[600px] z-40">
                    <TableCaption>Lista de Pokémons Favoritos</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px] text-center">Código Voo</TableHead>
                        <TableHead className="w-[140px] text-center">Data</TableHead>
                        <TableHead className="w-[100px] hidden lg:table-cell text-center">Horario</TableHead>
                        <TableHead className="w-[100px] text-center">Saída</TableHead>
                        <TableHead className="w-[100px] hidden lg:table-cell text-center">Destino</TableHead>
                        <TableHead className="w-[100px] hidden lg:table-cell text-center">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data.slice(startIndex, endIndex).map((aeroporto) => (
                        <TableRow key={aeroporto.flightCode}>
                          <TableCell className='text-zinc-900 text-center'>
                              {aeroporto.flightCode}
                          </TableCell>
                          <TableCell className='text-zinc-900 text-center'>{new Date(aeroporto.date).toLocaleDateString()}</TableCell>
                          <TableCell className="hidden lg:table-cell text-zinc-900 text-center">
                              {aeroporto.date .match(/\d\d:\d\d/)}
                          </TableCell>
                          <TableCell className='text-zinc-900 text-center'>
                          {aeroporto.origin.city}
                          </TableCell>
                          <TableCell className="text-zinc-900 hidden lg:table-cell text-center">
                          {aeroporto.destination.city}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className='text-zinc-900' colSpan={4}>Total de Pokémons Favoritos</TableCell>
                        <TableCell className="text-right text-zinc-900">{data?.data?.length}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>

              ) : (
                <p className='text-white'>Nenhum dado disponível.</p>
              )}
            </>
          )}

        </div>
        <Pagination className='mt-2'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : 'cursor-pointer'
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                end >= data?.data?.length  ? "pointer-events-none opacity-50" : 'cursor-pointer'
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage); //10
                setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
      
    );
  }