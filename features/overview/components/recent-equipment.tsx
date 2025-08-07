import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/db';

// Equipment type definition
type Equipment = {
  id: string;
  name: string;
  description: string;
  category: string;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
};

// Function to get recent equipment from database
async function getRecentEquipments(): Promise<Equipment[]> {
  try {
    return await db.equipment.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching recent equipment:', error);
    return [];
  }
}

// Function to generate category icon fallback
function getCategoryIcon(category: string): string {
  const categoryMap: Record<string, string> = {
    'Electronics': 'EL',
    'Tools': 'TL',
    'Machinery': 'MC',
    'Vehicles': 'VH',
    'Office': 'OF',
    'Safety': 'SF',
    'IT': 'IT',
    'Medical': 'MD',
    'Laboratory': 'LB',
    'Construction': 'CN',
    'Furniture': 'FR',
    'Default': 'EQ'
  };
  return categoryMap[category] || categoryMap['Default'];
}

// Function to check if equipment is expiring soon
function isExpiringSoon(validUntil: Date): boolean {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  return validUntil <= thirtyDaysFromNow && validUntil > now;
}

// Function to check if equipment is expired
function isExpired(validUntil: Date): boolean {
  return validUntil < new Date();
}

// Function to format date
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export async function RecentEquipment() {
  const recentEquipments = await getRecentEquipments();

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Equipment</CardTitle>
        <CardDescription>
          {recentEquipments.length > 0
            ? `${recentEquipments.length} equipment items added recently.`
            : 'No equipment found.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {recentEquipments.map((equipment) => (
            <div key={equipment.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarFallback className='text-xs font-semibold'>
                  {getCategoryIcon(equipment.category)}
                </AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1 flex-1'>
                <p className='text-sm leading-none font-medium truncate'>{equipment.name}</p>
                <p className='text-muted-foreground text-sm truncate'>{equipment.description}</p>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='text-xs'>
                    {equipment.category}
                  </Badge>
                  {isExpired(equipment.validUntil) && (
                    <Badge variant='destructive' className='text-xs'>
                      Expired
                    </Badge>
                  )}
                  {isExpiringSoon(equipment.validUntil) && !isExpired(equipment.validUntil) && (
                    <Badge variant='secondary' className='text-xs'>
                      Expiring Soon
                    </Badge>
                  )}
                </div>
              </div>
              <div className='ml-auto text-right'>
                <div className='text-xs text-muted-foreground'>Valid Until</div>
                <div className='text-sm font-medium'>{formatDate(equipment.validUntil)}</div>
              </div>
            </div>
          ))}
          {recentEquipments.length === 0 && (
            <div className='text-center text-muted-foreground py-4'>
              No equipment found. Add some equipment to see them here.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
