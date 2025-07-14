'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGameByID } from '@/hooks/useGames';
import { CategoryFormData } from '@/types/game.schema';

export default function GameView({ id }: { id: number | string }) {
  const { data, isLoading, error } = useGameByID(id);
  const game = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg rounded-2xl p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{game.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{game.slug}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
            No image available
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="ID" value={game.id} />
          <Info label="Slug" value={game.slug} />
          <Info
            label="Created At"
            value={new Date(game.createdAt).toLocaleString()}
          />
          <Info
            label="Updated At"
            value={new Date(game.updatedAt).toLocaleString()}
          />
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-muted-foreground text-sm">Categories</span>
          <div className="flex flex-wrap gap-2">
            {game.categories.map((category: CategoryFormData) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          className="px-10 mt-4"
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
}

// Reusable Info row component
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
