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
import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteGame } from '@/actions/Games/actions';
import toast from 'react-hot-toast';

const GameTable = ({ games }: { games: Game[] }) => {
  const router = useRouter();
  // const {data, isError, isLoading} = deleteGame()

  const handleDeleteGame = async (id: string | number) => {
    try {
      const response = await deleteGame(id);
      const { status, data } = response as {
        status: number;
        data?: { message?: string };
      };
      if (status !== 200) {
        throw new Error(data?.message || 'Failed to delete game');
      }
      if (status === 200) {
        // Optionally, show success message or refresh the page
        toast.success(data?.message || 'Game deleted successfully');
        window.location.reload(); // Refresh the page to reflect changes
      }
    } catch (error) {
      // Optionally, handle error (e.g., show error message)
      console.error('Error deleting game:', error);
    }
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
                      if (game.id !== undefined) {
                        handleDeleteGame(game.id);
                      }
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
    </div>
  );
};

export default GameTable;
