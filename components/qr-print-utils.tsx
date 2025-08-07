'use client';

import { Equipment } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { Printer, Download, MoreVertical } from 'lucide-react';
import QRCode from 'qrcode';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QRPrintUtilsProps {
  equipments: Equipment[];
  selectedEquipments?: Equipment[];
}

export function QRPrintUtils({ equipments, selectedEquipments }: QRPrintUtilsProps) {
  const generateQRCodeDataURL = async (equipment: Equipment): Promise<string> => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3001'}/equipments/${equipment.id}`;
    return await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  };

  const printQRCodes = async (items: Equipment[]) => {
    try {
      const qrCodes = await Promise.all(
        items.map(async (equipment) => ({
          equipment,
          dataURL: await generateQRCodeDataURL(equipment)
        }))
      );

      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Equipment QR Codes</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 10px;
              background: white;
              padding: 0;
            }
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin: 15px 0;
              padding: 0 10px;
            }
            .qr-item {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 12px;
              text-align: center;
              background: white;
              page-break-inside: avoid;
              width: 100%;
              box-sizing: border-box;
            }
            .qr-item img {
              margin: 8px 0;
              max-width: 100%;
              height: auto;
            }
            .equipment-name {
              font-weight: bold;
              font-size: clamp(12px, 3vw, 14px);
              margin-bottom: 4px;
              word-break: break-word;
            }
            .equipment-id {
              font-size: clamp(10px, 2.5vw, 12px);
              color: #666;
              margin-bottom: 8px;
              word-break: break-all;
            }
            .equipment-category {
              font-size: clamp(9px, 2.5vw, 11px);
              color: #888;
              background: #f5f5f5;
              padding: 2px 6px;
              border-radius: 4px;
              display: inline-block;
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding: 0 10px;
            }
            .header h1 {
              font-size: clamp(18px, 4vw, 24px);
              margin: 10px 0;
            }
            .header p {
              font-size: clamp(12px, 3vw, 14px);
              margin: 5px 0;
            }
            @media screen and (max-width: 480px) {
              body {
                margin: 5px;
              }
              .qr-grid {
                grid-template-columns: 1fr;
                gap: 10px;
              }
              .qr-item {
                padding: 10px;
              }
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
              .qr-grid {
                gap: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Equipment QR Codes</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Items: ${qrCodes.length}</p>
          </div>
          <div class="qr-grid">
            ${qrCodes.map(({ equipment, dataURL }) => `
              <div class="qr-item">
                <div class="equipment-name">${equipment.name}</div>
                <div class="equipment-id">ID: ${equipment.id}</div>
                <img src="${dataURL}" alt="QR Code for ${equipment.name}" />
                <div class="equipment-category">${equipment.category}</div>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for images to load before printing
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 1000);

    } catch (error) {
      console.error('Error generating QR codes for printing:', error);
      alert('Error generating QR codes for printing');
    }
  };

  const downloadQRCodes = async (items: Equipment[]) => {
    try {
      const JSZip = (await import('jszip')).default;
      const zipFile = new JSZip();

      const qrCodes = await Promise.all(
        items.map(async (equipment) => ({
          equipment,
          dataURL: await generateQRCodeDataURL(equipment)
        }))
      );

      // Add QR codes to zip
      qrCodes.forEach(({ equipment, dataURL }) => {
        const base64Data = dataURL.split(',')[1];
        zipFile.file(`${equipment.name}-${equipment.id}.png`, base64Data, { base64: true });
      });

      // Generate and download zip
      const content = await zipFile.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `equipment-qr-codes-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR codes:', error);
      alert('Error downloading QR codes');
    }
  };

  const hasSelection = selectedEquipments && selectedEquipments.length > 0;
  const itemsToProcess = hasSelection ? selectedEquipments : equipments;

  return (
    <>
      {/* Mobile View - Context Menu */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={itemsToProcess.length === 0}>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => printQRCodes(itemsToProcess)}>
              <Printer className="h-4 w-4 mr-2" />
              <span>Print {hasSelection ? `(${selectedEquipments.length})` : 'All'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadQRCodes(itemsToProcess)}>
              <Download className="h-4 w-4 mr-2" />
              <span>Download {hasSelection ? `(${selectedEquipments.length})` : 'All'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop View - Regular Buttons */}
      <div className="hidden sm:flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => printQRCodes(itemsToProcess)}
          disabled={itemsToProcess.length === 0}
        >
          <Printer className="h-4 w-4 mr-2" />
          Print {hasSelection ? `Selected (${selectedEquipments.length})` : 'All'} QR Codes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadQRCodes(itemsToProcess)}
          disabled={itemsToProcess.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Download {hasSelection ? `Selected (${selectedEquipments.length})` : 'All'} QR Codes
        </Button>
      </div>
    </>
  );
}
