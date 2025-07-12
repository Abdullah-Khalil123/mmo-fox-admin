'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useServiceById } from '@/hooks/useServices';

export default function ViewService() {
  const { data, isLoading, isError } = useServiceById(1);
  const service = data?.data;
  
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading service data</div>;
  }
  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg rounded-2xl p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
            No image available
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="ID" value={service.id} />
          <Info label="Game ID" value={service.gameId} />
          <Info label="Category ID" value={service.categoryId} />
          <Info label="Vendor ID" value={service.vendorId} />
          <Info
            label="Price"
            value={`${service.currency} ${service.basePrice}`}
          />
          <Info
            label="Status"
            value={<Badge variant="outline">{service.status}</Badge>}
          />
          <Info
            label="Type"
            value={<Badge variant="secondary">{service.type}</Badge>}
          />
          <Info
            label="Published"
            value={
              <Badge variant="default">
                {service.published ? 'Yes' : 'No'}
              </Badge>
            }
          />
          <Info
            label="Created At"
            value={new Date(service.createdAt).toLocaleString()}
          />
          <Info
            label="Updated At"
            value={new Date(service.updatedAt).toLocaleString()}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button className="flex-1" variant="outline">
            View Details
          </Button>
        </div>
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
