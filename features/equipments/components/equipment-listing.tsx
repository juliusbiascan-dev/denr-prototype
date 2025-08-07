
import { Equipment } from '@/constants/data';
import { searchParamsCache } from '@/lib/searchparams';
import { EquipmentTable } from './equipments-tables';
import { columns } from './equipments-tables/columns';
import { getEquipments } from '@/data/equipment';

type EquipmentListingPage = {};

export default async function EquipmentListingPage({ }: EquipmentListingPage) {
  try {
    // Showcasing the use of search params cache in nested RSCs
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');
    const categories = searchParamsCache.get('category');

    const filters = {
      page,
      limit: pageLimit,
      ...(search && { search }),
      ...(categories && { categories: categories })
    };

    const data = await getEquipments(filters);

    if (!data.success) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Failed to load equipments</h3>
            <p className="text-gray-500">{data.message || 'An error occurred while fetching equipment data.'}</p>
          </div>
        </div>
      );
    }

    const totalEquipments = data.total_equipments;
    const equipments: Equipment[] = data.equipments.map((equipment: any) => ({
      name: equipment.name,
      description: equipment.description,
      createdAt: equipment.createdAt,
      id: equipment.id,
      validUntil: equipment.validUntil,
      category: equipment.category,
      updatedAt: equipment.updatedAt
    }));

    return (
      <EquipmentTable
        data={equipments}
        totalItems={totalEquipments}
        columns={columns}
      />
    );
  } catch (error) {
    console.error('Error in EquipmentListingPage:', error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
          <p className="text-gray-500">Unable to load equipment data. Please try again later.</p>
        </div>
      </div>
    );
  }
}
