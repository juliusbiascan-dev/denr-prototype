import { EquipmentPieGraph } from '@/features/overview/components/equipment-pie-graph';
import { getEquipmentCategoryData } from '@/data/equipment-stats';

export default async function Stats() {
  const data = await getEquipmentCategoryData();

  return <EquipmentPieGraph data={data} />;
}
