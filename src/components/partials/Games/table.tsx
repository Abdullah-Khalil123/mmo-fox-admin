'use client';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Game } from '@/types/game';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ConfirmDeleteDialog from '@/components/layouts/Dialog';
import { useDeleteGame } from '@/hooks/useGames';

const GameTable = ({ games }: { games: Game[] }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const { mutate, isPending } = useDeleteGame();
  const handleDeleteGame = async () => {
    if (selectedId === null) return;
    mutate(selectedId, {
      onSuccess: () => {
        setOpenDialog(false);
        setSelectedId(null);
        toast.success('Game deleted successfully');
      },
      onError: (error) => {
        setOpenDialog(false);
        console.error('Error deleting game:', error);
        toast.error('Failed to delete game');
      },
    });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Services</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game: Game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.id}</TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>
                {game.categories &&
                  game.categories.map((category, idx) => (
                    <span
                      className="inline-flex mr-1 items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      key={idx}
                    >
                      {category.name}
                    </span>
                  ))}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2 max-w-[400px]">
                  {game.services &&
                    game.services.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {service.name}
                      </span>
                    ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      router.push(`/games/${game.id}`);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(`/games/${game.id}/services`);
                    }}
                  >
                    Services
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      router.push(`/games/${game.id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedId(game.id as string | number);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDeleteDialog
        onConfirm={handleDeleteGame}
        onOpenChange={setOpenDialog}
        open={openDialog}
        isPending={isPending}
        description="Are you sure you want to delete this game?"
        title="Delete game?"
      />
    </div>
  );
};

export default GameTable;
