// import PageContainer from '@/components/layout/page-container';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { EquipmentAreaGraphContainer } from './equipment-area-graph';
// import { EquipmentBarGraphContainer } from './equipment-bar-graph';
// import { EquipmentPieGraphContainer } from './equipment-pie-graph';
// import { RecentEquipment } from './recent-equipment';
// import { EquipmentStatsCards } from './equipment-stats-cards';
// import { Suspense } from 'react';
// import { EquipmentAreaGraphSkeleton } from './equipment-area-graph-skeleton';
// import { EquipmentBarGraphSkeleton } from './equipment-bar-graph-skeleton';
// import { EquipmentPieGraphSkeleton } from './equipment-pie-graph-skeleton';
// import { RecentEquipmentSkeleton } from './recent-equipment-skeleton';
// import { EquipmentStatsCardsSkeleton } from './equipment-stats-cards-skeleton';

// export default function OverViewPage() {
//   return (
//     <PageContainer>
//       <div className='flex flex-1 flex-col space-y-2'>
//         <div className='flex items-center justify-between space-y-2'>
//           <h2 className='text-2xl font-bold tracking-tight'>
//             Hi, Welcome back 👋
//           </h2>
//           <div className='hidden items-center space-x-2 md:flex'>
//             <Button>Download</Button>
//           </div>
//         </div>
//         <Tabs defaultValue='overview' className='space-y-4'>
//           <TabsList>
//             <TabsTrigger value='overview'>Overview</TabsTrigger>
//             <TabsTrigger value='analytics' disabled>
//               Analytics
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value='overview' className='space-y-4'>
//             <Suspense fallback={<EquipmentStatsCardsSkeleton />}>
//               <EquipmentStatsCards />
//             </Suspense>
//             <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
//               <div className='col-span-4'>
//                 <Suspense fallback={<EquipmentBarGraphSkeleton />}>
//                   <EquipmentBarGraphContainer />
//                 </Suspense>
//               </div>
//               <Card className='col-span-4 md:col-span-3'>
//                 <Suspense fallback={<RecentEquipmentSkeleton />}>
//                   <RecentEquipment />
//                 </Suspense>
//               </Card>
//               <div className='col-span-4'>
//                 <Suspense fallback={<EquipmentAreaGraphSkeleton />}>
//                   <EquipmentAreaGraphContainer />
//                 </Suspense>
//               </div>
//               <div className='col-span-4 md:col-span-3'>
//                 <Suspense fallback={<EquipmentPieGraphSkeleton />}>
//                   <EquipmentPieGraphContainer />
//                 </Suspense>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </PageContainer>
//   );
// }
