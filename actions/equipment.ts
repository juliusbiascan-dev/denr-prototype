"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { EquipmentSchema, EquipmentUpdateSchema } from "@/schemas";
import { createEquipment, updateEquipment, deleteEquipment, getEquipmentById } from "@/data/equipment";

export const createEquipmentAction = async (values: z.infer<typeof EquipmentSchema>) => {
  // Validate input
  const validatedFields = EquipmentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, category, description, validUntil } = validatedFields.data;

  try {
    const result = await createEquipment({
      name,
      category,
      description,
      validUntil: validUntil || new Date()
    });

    if (result.success) {
      revalidatePath("/dashboard/equipments");
      return { success: result.message };
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.error("Equipment creation error:", error);
    return { error: "Something went wrong!" };
  }
};

export const updateEquipmentAction = async (
  id: string,
  values: z.infer<typeof EquipmentSchema>
) => {
  // Validate input
  const validatedFields = EquipmentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, category, description, validUntil } = validatedFields.data;

  try {
    // Check if equipment exists
    const existingEquipment = await getEquipmentById(id);

    if (!existingEquipment.success) {
      return { error: "Equipment not found!" };
    }

    const result = await updateEquipment(id, {
      name,
      category,
      description,
      validUntil
    });

    if (result.success) {
      revalidatePath("/dashboard/equipments");
      revalidatePath(`/dashboard/equipments/${id}`);
      return { success: result.message };
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.error("Equipment update error:", error);
    return { error: "Something went wrong!" };
  }
};

export const deleteEquipmentAction = async (id: string) => {
  try {
    // Check if equipment exists
    const existingEquipment = await getEquipmentById(id);

    if (!existingEquipment.success) {
      return { error: "Equipment not found!" };
    }

    const result = await deleteEquipment(id);

    if (result.success) {
      revalidatePath("/dashboard/equipments");
      return { success: result.message };
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.error("Equipment deletion error:", error);
    return { error: "Something went wrong!" };
  }
};
