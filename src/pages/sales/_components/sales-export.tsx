import { Download, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SalesExportProps {
  totalItems: number
  totalStores: number
}

export const SalesExport = ({ totalItems, totalStores }: SalesExportProps) => {
  const handleExportExcel = () => {
    // TODO: Implement Excel export functionality
    console.log('Exporting to Excel...')
  }

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    console.log('Exporting to PDF...')
  }

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center">
      <div className="flex flex-wrap gap-3">
        <Button variant="neutral" className="gap-2" onClick={handleExportExcel}>
          <FileSpreadsheet className="w-4 h-4" />
          Export to Excel
        </Button>
        <Button variant="neutral" className="gap-2" onClick={handleExportPDF}>
          <Download className="w-4 h-4" />
          Export to PDF
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Total: {totalItems} items across {totalStores} stores
      </div>
    </div>
  )
}