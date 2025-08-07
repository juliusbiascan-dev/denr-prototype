import { db } from '@/lib/db';

async function listEquipment() {
  try {
    const equipments = await db.equipment.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        validUntil: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('=== EQUIPMENT LIST ===');
    console.log(`Total equipment: ${equipments.length}`);
    console.log('');

    const now = new Date();

    equipments.forEach((equipment, index) => {
      const isExpired = new Date(equipment.validUntil) < now;
      const status = isExpired ? '❌ EXPIRED' : '✅ ACTIVE';

      console.log(`${index + 1}. ${equipment.name}`);
      console.log(`   ID: ${equipment.id}`);
      console.log(`   Category: ${equipment.category}`);
      console.log(`   Status: ${status}`);
      console.log(`   Valid Until: ${equipment.validUntil.toLocaleDateString()}`);
      console.log(`   URL: https://localhost:3001/equipments/${equipment.id}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error listing equipment:', error);
  } finally {
    await db.$disconnect();
  }
}

listEquipment();
