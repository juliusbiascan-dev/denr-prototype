import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function RecentEquipmentSkeleton() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <Skeleton className='h-6 w-[160px]' /> {/* CardTitle */}
        <Skeleton className='h-4 w-[200px]' /> {/* CardDescription */}
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='flex items-center'>
              <Skeleton className='h-9 w-9 rounded-full' /> {/* Avatar */}
              <div className='ml-4 space-y-1 flex-1'>
                <Skeleton className='h-4 w-[150px]' /> {/* Equipment Name */}
                <Skeleton className='h-4 w-[180px]' /> {/* Description */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-[60px] rounded-full' /> {/* Category Badge */}
                  <Skeleton className='h-5 w-[50px] rounded-full' /> {/* Status Badge */}
                </div>
              </div>
              <div className='ml-auto text-right space-y-1'>
                <Skeleton className='h-3 w-[60px]' /> {/* "Valid Until" label */}
                <Skeleton className='h-4 w-[80px]' /> {/* Date */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
