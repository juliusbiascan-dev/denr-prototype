"use server";

import { db } from "@/lib/db";
import { matchSorter } from 'match-sorter';

export const getAll = async ({
  categories = [],
  search
}: {
  categories?: string[];
  search?: string;
}) => {
  try {
    // First, get all equipments from the database
    let equipments = await db.equipment.findMany();

    // Filter equipments based on selected categories
    if (categories.length > 0) {
      equipments = equipments.filter((equipment) =>
        categories.includes(equipment.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      equipments = matchSorter(equipments, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return equipments;
  } catch (error) {
    console.error('Error fetching all equipments:', error);
    return [];
  }
}
export const getEquipments = async ({
  page = 1,
  limit = 10,
  categories,
  search
}: {
  page?: number;
  limit?: number;
  categories?: string;
  search?: string;
}) => {
  try {
    const categoriesArray = categories ? categories.split('.') : [];
    const allEquipments = await getAll({
      categories: categoriesArray,
      search
    });
    const totalEquipments = allEquipments.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedEquipments = allEquipments.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Equipment data retrieved successfully',
      total_equipments: totalEquipments,
      offset,
      limit,
      equipments: paginatedEquipments
    };
  } catch (error) {
    console.error('Error fetching equipments:', error);
    return {
      success: false,
      time: new Date().toISOString(),
      message: 'Failed to fetch equipment data',
      total_equipments: 0,
      offset: 0,
      limit,
      equipments: []
    };
  }
}

// Get a specific product by its ID
export const getEquipmentById = async (id: string) => {

  // Find the product by its ID
  const equipment = await db.equipment.findUnique({
    where: { id }
  });

  if (!equipment) {
    return {
      success: false,
      message: `Product with ID ${id} not found`,
      equipment: null
    };
  }

  // Mock current time
  const currentTime = new Date().toISOString();

  return {
    success: true,
    time: currentTime,
    message: `Product with ID ${id} found`,
    equipment
  };
}

export const createEquipment = async (data: {
  // photoUrl: string;
  name: string;
  category: string;
  description: string;
  validUntil: Date;
}) => {
  try {
    // Validate required fields
    if (!data.name || !data.category || !data.description) {
      return {
        success: false,
        message: 'Missing required fields: name, category, and description are required',
        equipment: null
      };
    }

    // Create a new equipment entry in the database
    const newEquipment = await db.equipment.create({
      data: {
        // photo_url: "",
        name: data.name.trim(),
        category: data.category,
        description: data.description.trim(),
        validUntil: data.validUntil
      }
    });

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Equipment created successfully',
      equipment: newEquipment
    };
  } catch (error) {
    console.error('Error creating equipment:', error);
    return {
      success: false,
      message: 'Failed to create equipment. Please try again.',
      equipment: null
    };
  }
}

export const updateEquipment = async (id: string, data: {
  name?: string;
  category?: string;
  description?: string;
  validUntil?: Date;
}) => {
  try {
    // Validate that equipment exists
    const existingEquipment = await db.equipment.findUnique({
      where: { id }
    });

    if (!existingEquipment) {
      return {
        success: false,
        message: `Equipment with ID ${id} not found`,
        equipment: null
      };
    }

    // Prepare update data (only include defined fields)
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.category !== undefined) updateData.category = data.category;
    if (data.description !== undefined) updateData.description = data.description.trim();
    if (data.validUntil !== undefined) updateData.validUntil = data.validUntil;

    // Update the equipment
    const updatedEquipment = await db.equipment.update({
      where: { id },
      data: updateData
    });

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Equipment updated successfully',
      equipment: updatedEquipment
    };
  } catch (error) {
    console.error('Error updating equipment:', error);
    return {
      success: false,
      message: 'Failed to update equipment. Please try again.',
      equipment: null
    };
  }
}


export const deleteEquipment = async (id: string) => {
  try {
    // Check if equipment exists before attempting to delete
    const existingEquipment = await db.equipment.findUnique({
      where: { id }
    });

    if (!existingEquipment) {
      return {
        success: false,
        message: `Equipment with ID ${id} not found`
      };
    }

    // Delete the equipment by its ID
    const deletedEquipment = await db.equipment.delete({
      where: { id }
    });

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Equipment "${deletedEquipment.name}" deleted successfully`,
      equipment: deletedEquipment
    };
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return {
      success: false,
      message: 'Failed to delete equipment. Please try again.'
    };
  }
}