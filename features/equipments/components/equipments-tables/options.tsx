// 'use server';

// import { db } from "@/lib/db";

// export async function getCategories() {
//   try {
//     const equipments = await db.equipment.findMany({
//       select: {
//         category: true
//       },
//       distinct: ['category']
//     });

//     return equipments.map(equipment => ({
//       value: equipment.category,
//       label: equipment.category
//     }));
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return [];
//   }
// }

'use client';

import { useState, useEffect } from 'react';

// Default categories in case of empty database or error
export const DEFAULT_CATEGORIES = [
  { value: 'General Equipment', label: 'General Equipment' },
  { value: 'Laboratory Equipment', label: 'Laboratory Equipment' },
  { value: 'Other Equipment', label: 'Other Equipment' }
];

export function useCategoryOptions() {
  const [options, setOptions] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (mounted && data.success && Array.isArray(data.categories)) {
          // Ensure we have valid categories, if not, keep defaults
          const validCategories = data.categories.filter((c: { value?: string, label?: string }) => c.value && c.label);
          if (validCategories.length > 0) {
            setOptions(validCategories);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Keep default categories on error
      }
    }

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return options;
}

// For SSR contexts
export const CATEGORY_OPTIONS = DEFAULT_CATEGORIES;
