import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Tag, FileText } from "lucide-react";

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
      <div className='min-h-screen flex items-center justify-center bg-[#DDE5E1]'>
        <Card className="w-full max-w-md border-[#7FA8A7] bg-white">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-[#7FA8A7]/20 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#7FA8A7]" />
            </div>
            <h2 className="text-xl font-semibold text-[#08933D] mb-2">Equipment Not Found</h2>
            <p className="text-[#0C1B72] text-center">The equipment you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isExpired = new Date(data.validUntil) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(data.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#DDE5E1] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#08933D] mb-2">Equipment Details</h1>
          <p className="text-[#0C1B72]">Complete information about this equipment</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Information Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-[#7FA8A7] bg-white">
              <CardHeader className="pb-4 bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-[#08933D]">{data.name}</CardTitle>
                    <CardDescription className="mt-2 text-base text-[#0C1B72]">Equipment Information</CardDescription>
                  </div>
                  <Badge variant={isExpired ? "destructive" : "default"} className={`ml-4 ${!isExpired ? 'bg-[#08933D] text-white hover:bg-[#08933D]/90' : ''}`}>
                    {isExpired ? "Expired" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#08933D]/10 rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-[#08933D]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0C1B72]">Category</p>
                    <p className="text-gray-700">{data.category}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#7FA8A7]/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#7FA8A7]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#0C1B72]">Description</p>
                    <p className="text-gray-700 leading-relaxed">{data.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Validity Status Card */}
            <Card className="shadow-lg border-[#7FA8A7] bg-white">
              <CardHeader className="bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5">
                <CardTitle className="text-lg flex items-center space-x-2 text-[#08933D]">
                  <CalendarDays className="w-5 h-5" />
                  <span>Validity Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-[#0C1B72]">Valid Until</p>
                  <p className={`text-lg font-semibold ${isExpired ? 'text-red-600' : 'text-[#08933D]'}`}>
                    {new Date(data.validUntil).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {!isExpired && (
                  <div>
                    <p className="font-medium text-[#0C1B72]">Days Remaining</p>
                    <p className={`text-lg font-semibold ${daysUntilExpiry <= 30 ? 'text-amber-600' : 'text-[#08933D]'}`}>
                      {daysUntilExpiry} days
                    </p>
                  </div>
                )}
                {isExpired && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm font-medium">⚠️ This equipment has expired</p>
                    <p className="text-red-600 text-xs mt-1">
                      Expired {Math.abs(daysUntilExpiry)} days ago
                    </p>
                  </div>
                )}
                {!isExpired && daysUntilExpiry <= 30 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-700 text-sm font-medium">⚠️ Expiring soon</p>
                    <p className="text-amber-600 text-xs mt-1">
                      Please plan for renewal or replacement
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timestamps Card */}
            <Card className="shadow-lg border-[#7FA8A7] bg-white">
              <CardHeader className="bg-gradient-to-r from-[#08933D]/5 to-[#7FA8A7]/5">
                <CardTitle className="text-lg flex items-center space-x-2 text-[#08933D]">
                  <Clock className="w-5 h-5" />
                  <span>Record Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-[#0C1B72]">Created</p>
                  <p className="text-gray-700">
                    {new Date(data.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-[#7FA8A7]">
                    {new Date(data.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#0C1B72]">Last Updated</p>
                  <p className="text-gray-700">
                    {new Date(data.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-[#7FA8A7]">
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
  );
}
