"use server";

import { db } from "@/lib/db";

export const getEquipmentStats = async () => {
  try {
    // Get total count of equipments
    const totalEquipments = await db.equipment.count();

    // Get equipment count by category
    const equipmentsByCategory = await db.equipment.groupBy({
      by: ['category'],
      _count: {
        id: true,
      },
    });

    // Get equipments created this month
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const equipmentsThisMonth = await db.equipment.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get last month's count for comparison
    const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const equipmentsLastMonth = await db.equipment.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    // Calculate growth rate
    const monthlyGrowthRate = equipmentsLastMonth > 0
      ? ((equipmentsThisMonth - equipmentsLastMonth) / equipmentsLastMonth) * 100
      : 100;

    // Get expired/expiring equipment counts
    const now = new Date();
    const expiredEquipments = await db.equipment.count({
      where: {
        validUntil: {
          lt: now,
        },
      },
    });

    const expiringInNext30Days = await db.equipment.count({
      where: {
        validUntil: {
          gte: now,
          lt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      },
    });

    // Get equipment by creation date for charts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const equipmentsByMonth = await db.equipment.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        createdAt: true,
        category: true,
      },
    });

    // Group by month
    const monthlyData = equipmentsByMonth.reduce((acc, equipment) => {
      const month = equipment.createdAt.toISOString().substring(0, 7); // YYYY-MM format
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEquipments,
      equipmentsThisMonth,
      equipmentsLastMonth,
      monthlyGrowthRate,
      expiredEquipments,
      expiringInNext30Days,
      equipmentsByCategory: equipmentsByCategory.map(item => ({
        category: item.category,
        count: item._count.id,
      })),
      monthlyData,
    };
  } catch (error) {
    console.error('Error fetching equipment stats:', error);
    return {
      totalEquipments: 0,
      equipmentsThisMonth: 0,
      equipmentsLastMonth: 0,
      monthlyGrowthRate: 0,
      expiredEquipments: 0,
      expiringInNext30Days: 0,
      equipmentsByCategory: [],
      monthlyData: {},
    };
  }
};

export const getEquipmentCategoryData = async () => {
  try {
    const equipments = await db.equipment.findMany({
      select: {
        category: true,
      },
    });

    // Count equipment by category
    const categoryCount: Record<string, number> = {};
    equipments.forEach((equipment) => {
      const category = equipment.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Convert to chart data format with colors
    const colors = [
      'var(--primary)',
      'hsl(var(--primary) / 0.8)',
      'hsl(var(--primary) / 0.6)',
      'hsl(var(--primary) / 0.4)',
      'hsl(var(--primary) / 0.2)',
      'hsl(var(--secondary))',
      'hsl(var(--secondary) / 0.8)',
      'hsl(var(--secondary) / 0.6)'
    ];

    const data = Object.entries(categoryCount).map(
      ([category, count], index) => ({
        category,
        count,
        fill: colors[index % colors.length]
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching equipment category data:', error);
    return [];
  }
};
