import { db } from '@/lib/db';

async function seedEquipmentData() {
  try {
    // Check if equipment data already exists
    const existingCount = await db.equipment.count();

    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} equipment records.`);
      return;
    }

    console.log('Seeding equipment data...');

    const equipmentData = [
      {
        name: 'Excavator CAT 320',
        description: 'Heavy-duty excavator for construction work',
        category: 'Construction',
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
      {
        name: 'Safety Helmet - Type A',
        description: 'Personal protective equipment for construction sites',
        category: 'Safety',
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months from now
      },
      {
        name: 'Forest Ranger Drone',
        description: 'Aerial monitoring equipment for forest surveillance',
        category: 'Monitoring',
        validUntil: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000), // 2 years from now
      },
      {
        name: 'Water Quality Tester',
        description: 'Portable device for testing water quality parameters',
        category: 'Testing',
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
      },
      {
        name: 'GPS Survey Equipment',
        description: 'High-precision GPS equipment for land surveying',
        category: 'Survey',
        validUntil: new Date(Date.now() + 540 * 24 * 60 * 60 * 1000), // 18 months from now
      },
      {
        name: 'Environmental Monitor',
        description: 'Multi-parameter environmental monitoring station',
        category: 'Monitoring',
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
      {
        name: 'Tree Coring Equipment',
        description: 'Specialized equipment for tree age determination',
        category: 'Research',
        validUntil: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months from now
      },
      {
        name: 'Soil Sampler Kit',
        description: 'Complete kit for soil sample collection and analysis',
        category: 'Testing',
        validUntil: new Date(Date.now() + 450 * 24 * 60 * 60 * 1000), // 15 months from now
      },
      {
        name: 'Wildlife Camera Trap',
        description: 'Motion-activated camera for wildlife monitoring',
        category: 'Monitoring',
        validUntil: new Date(Date.now() + 600 * 24 * 60 * 60 * 1000), // 20 months from now
      },
      {
        name: 'First Aid Kit - Advanced',
        description: 'Comprehensive first aid kit for field operations',
        category: 'Safety',
        validUntil: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 4 months from now
      },
      // EXPIRED EQUIPMENT FOR TESTING
      {
        name: 'Old Chainsaw Model X1',
        description: 'Vintage chainsaw equipment that has exceeded its safety certification period',
        category: 'Forestry',
        validUntil: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // Expired 1 year ago
      },
      {
        name: 'Expired Fire Extinguisher',
        description: 'Fire safety equipment that requires immediate recertification',
        category: 'Safety',
        validUntil: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // Expired 6 months ago
      },
      {
        name: 'Outdated Geological Scanner',
        description: 'Geological survey equipment with outdated calibration',
        category: 'Survey',
        validUntil: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Expired 3 months ago
      },
      {
        name: 'Legacy Weather Station',
        description: 'Old weather monitoring station requiring replacement',
        category: 'Monitoring',
        validUntil: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Expired 1 month ago
      },
      {
        name: 'Expired Protective Gear Set',
        description: 'Personal protective equipment that has exceeded its service life',
        category: 'Safety',
        validUntil: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Expired 1 week ago
      },
    ];

    // Add some equipment with dates spread over the last 6 months for chart data
    const createdDates = [
      new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), // 5 months ago
      new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 4 months ago
      new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),  // 3 months ago
      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),  // 2 months ago
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),  // 1 month ago
      new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),  // 2 weeks ago
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),   // 1 week ago
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),   // 3 days ago
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),   // 1 day ago
      // Additional dates for expired equipment
      new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // 13+ months ago (for expired chainsaw)
      new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 6+ months ago (for expired fire extinguisher)
      new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 3+ months ago (for expired scanner)
      new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),  // 1.5 months ago (for legacy weather station)
      new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),  // 2 weeks ago (for expired protective gear)
    ];

    for (let i = 0; i < equipmentData.length; i++) {
      await db.equipment.create({
        data: {
          ...equipmentData[i],
          createdAt: createdDates[i] || new Date(), // Use current date if we run out of preset dates
        },
      });
    }

    console.log(`Successfully seeded ${equipmentData.length} equipment records.`);
  } catch (error) {
    console.error('Error seeding equipment data:', error);
  } finally {
    await db.$disconnect();
  }
}

seedEquipmentData();
