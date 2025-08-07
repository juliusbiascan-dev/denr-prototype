import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Tag, FileText } from "lucide-react";
import PageContainer from "@/components/layout/page-container";

export const metadata = {
  title: 'Equipment Details',
  description: 'View detailed equipment information'
};

type PageProps = { params: Promise<{ equipmentId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;

  const data = await db.equipment.findUnique({
    where: { id: params.equipmentId }
  });

  if (!data) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#DDE5E1] dark:bg-gray-900 px-4'>
        <Card className="w-full max-w-md border-[#7FA8A7] bg-white dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-[#7FA8A7]/20 dark:bg-[#7FA8A7]/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#7FA8A7]" />
            </div>
            <h2 className="text-xl font-semibold text-[#08933D] dark:text-green-400 mb-2">Equipment Not Found</h2>
            <p className="text-[#0C1B72] dark:text-gray-300 text-center">The equipment you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(data.validUntil) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(data.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <PageContainer scrollable={true}>

      <div className="min-h-screen bg-[#DDE5E1] dark:bg-gray-900 p-4 w-full transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#08933D] dark:text-green-400 mb-2">Equipment Details</h1>
            <p className="text-[#0C1B72] dark:text-gray-300">Complete information about this equipment</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Information Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-[#7FA8A7] dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
                <CardHeader className="pb-4 bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5 dark:from-green-900/20 dark:to-gray-800/20">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-[#08933D] dark:text-green-400">{data.name}</CardTitle>
                      <CardDescription className="mt-2 text-base text-[#0C1B72] dark:text-gray-300">Equipment Information</CardDescription>
                    </div>
                    <Badge variant={isExpired ? "destructive" : "default"} className={`${!isExpired ? 'bg-[#08933D] text-white hover:bg-[#08933D]/90 dark:bg-green-600 dark:hover:bg-green-700' : ''}`}>
                      {isExpired ? "Expired" : "Active"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#08933D]/10 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-[#08933D] dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0C1B72] dark:text-gray-300">Category</p>
                      <p className="text-gray-700 dark:text-gray-400">{data.category}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#7FA8A7]/20 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#7FA8A7] dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#0C1B72] dark:text-gray-300">Description</p>
                      <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{data.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Validity Status Card */}
              <Card className="shadow-lg border-[#7FA8A7] dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
                <CardHeader className="bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5 dark:from-green-900/20 dark:to-gray-800/20">
                  <CardTitle className="text-lg flex items-center space-x-2 text-[#08933D] dark:text-green-400">
                    <CalendarDays className="w-5 h-5" />
                    <span>Validity Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-[#0C1B72] dark:text-gray-300">Valid Until</p>
                    <p className={`text-lg font-semibold ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-[#08933D] dark:text-green-400'}`}>
                      {new Date(data.validUntil).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {!isExpired && (
                    <div>
                      <p className="font-medium text-[#0C1B72] dark:text-gray-300">Days Remaining</p>
                      <p className={`text-lg font-semibold ${daysUntilExpiry <= 30 ? 'text-amber-600' : 'text-[#08933D]'}`}>
                        {daysUntilExpiry} days
                      </p>
                    </div>
                  )}
                  {isExpired && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-red-700 dark:text-red-400 text-sm font-medium">⚠️ This equipment has expired</p>
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                        Expired {Math.abs(daysUntilExpiry)} days ago
                      </p>
                    </div>
                  )}
                  {!isExpired && daysUntilExpiry <= 30 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-amber-700 dark:text-amber-400 text-sm font-medium">⚠️ Expiring soon</p>
                      <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
                        Please plan for renewal or replacement
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timestamps Card */}
              <Card className="shadow-lg border-[#7FA8A7] dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
                <CardHeader className="bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5 dark:from-green-900/20 dark:to-gray-800/20">
                  <CardTitle className="text-lg flex items-center space-x-2 text-[#08933D] dark:text-green-400">
                    <Clock className="w-5 h-5" />
                    <span>Record Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-[#0C1B72] dark:text-gray-300">Date Registered</p>
                    <p className="text-gray-700 dark:text-gray-400">
                      {new Date(data.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-[#7FA8A7] dark:text-gray-500">
                      {new Date(data.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#0C1B72] dark:text-gray-300">Last Updated</p>
                    <p className="text-gray-700 dark:text-gray-400">
                      {new Date(data.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-[#7FA8A7] dark:text-gray-500">
                      {new Date(data.updatedAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </PageContainer>
  );
}
