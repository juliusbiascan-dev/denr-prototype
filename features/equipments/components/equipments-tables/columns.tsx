'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Equipment } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle, QrCode, Eye, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';
import { QRCodeDisplay } from '@/components/qr-code-display';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteEquipmentAction } from '@/actions/equipment';
import { AlertModal } from '@/components/modal/alert-modal';

// Inline Actions Component
const InlineActions = ({ equipment }: { equipment: Equipment }) => {
  const [showQR, setShowQR] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteEquipmentAction(equipment.id);

      if (result.success) {
        router.refresh();
        router.push('/dashboard/equipments');
      } else {
        console.error('Error deleting equipment:', result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowQR(!showQR)}
          className="h-8 w-8 p-0"
          title="Toggle QR Code"
        >
          <QrCode className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/dashboard/equipments/${equipment.id}`)}
          className="h-8 w-8 p-0"
          title="Edit Equipment"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteModal(true)}
          className="h-8 w-8 p-0"
          title="Delete Equipment"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {showQR && (
        <div className="mt-2 p-2 border rounded-lg bg-white shadow-sm">
          <QRCodeDisplay
            value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3001'}/equipments/${equipment.id}`}
            size={120}
            className="mx-auto"
          />
          <p className="text-xs text-center mt-1 text-gray-600">
            {equipment.name}
          </p>
        </div>
      )}

      <AlertModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export const columns: ColumnDef<Equipment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'photo_url',
  //   header: 'IMAGE',
  //   cell: ({ row }) => {
  //     return (
  //       <div className='relative aspect-square'>
  //         <Image
  //           src={row.getValue('photo_url')}
  //           alt={row.getValue('name')}
  //           fill
  //           className='rounded-lg'
  //         />
  //       </div>
  //     );
  //   }
  // },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Equipment, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Equipment['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Search Equipments',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Equipment, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const status = cell.getValue<Equipment['category']>();
      const Icon = status === 'active' ? CheckCircle2 : XCircle;

      return (
        <Badge variant='outline' className='capitalize'>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categories',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },

  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ cell }) => {
      const description = cell.getValue<Equipment['description']>();
      const truncatedDescription = description && description.length > 50
        ? `${description.substring(0, 50)}...`
        : description;

      return (
        <div className="max-w-[200px] truncate" title={description}>
          {truncatedDescription}
        </div>
      );
    }
  },
  {
    accessorKey: 'validUntil',
    header: 'Valid Until'
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <InlineActions equipment={row.original} />,
    enableSorting: false,
    enableHiding: false,
  }
]
