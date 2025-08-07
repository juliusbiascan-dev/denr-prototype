'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { QRPrintUtils } from '@/components/qr-print-utils';
import { Equipment } from '@/constants/data';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
interface EquipmentTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}
export function EquipmentTable<TData, TValue>({
  data,
  totalItems,
  columns
}: EquipmentTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // equipments data
    columns, // equipments columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
    enableRowSelection: true,
    initialState: {
      rowSelection: {}
    }
  });

  const selectedEquipments = table.getFilteredSelectedRowModel().rows.map(row => row.original) as Equipment[];

  return (
    <DataTable
      table={table}
      actionBar={
        <QRPrintUtils
          equipments={data as Equipment[]}
          selectedEquipments={selectedEquipments}
        />
      }
    >
      <DataTableToolbar table={table}>
        <QRPrintUtils
          equipments={data as Equipment[]}
          selectedEquipments={selectedEquipments}
        />
      </DataTableToolbar>
    </DataTable>
  );
}
