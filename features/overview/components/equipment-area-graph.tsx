import { db } from '@/lib/db';
import { EquipmentAreaChart } from './equipment-area-chart';

interface EquipmentValidityData {
  month: string;
  expiring: number;
  valid: number;
}

// Server component to fetch validity data
export async function EquipmentAreaGraphContainer() {
  try {
    // Get equipment validity data for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const equipments = await db.equipment.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        validUntil: true,
        createdAt: true,
      },
    });

    // Generate monthly data
    const monthlyData: EquipmentValidityData[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });

      // Calculate validity for this month
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const validCount = equipments.filter(eq =>
        eq.validUntil > monthEnd
      ).length;

      const expiringCount = equipments.filter(eq =>
        eq.validUntil <= monthEnd && eq.validUntil > date
      ).length;

      monthlyData.push({
        month: monthName,
        valid: validCount,
        expiring: expiringCount,
      });
    }

    return <EquipmentAreaChart data={monthlyData} />;
  } catch (error) {
    console.error('Error fetching equipment validity data:', error);
    return <EquipmentAreaChart data={[]} />;
  }
}
