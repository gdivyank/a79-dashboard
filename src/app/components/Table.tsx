'use client'; // Required for client-side components in Next.js 13

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { tableData } from '../api/dataLayer/tableData';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { RowData } from '../types';

interface TableProps {
  onRowSelection: (rows: RowData[]) => void;
}

const Table: React.FC<TableProps> = ({ onRowSelection }) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const columns: ColDef<RowData>[] = [
    { headerName: 'Name', field: 'name', filter: true, width: 240 },
    { headerName: 'Country', field: 'country', filter: true, width: 240 },
    { headerName: 'Language', field: 'language', filter: true, width: 240 },
    { headerName: 'Games', field: 'games', filter: true, width: 240 },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedRows = gridApi.getSelectedRows();
      onRowSelection(selectedRows);
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className='table-title'>Table Name 123</div>
      <div className="ag-theme-alpine-dark" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columns}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          domLayout="autoHeight"  // Makes the grid adjust height dynamically
        />
      </div>
    </div>
  );
};

export default Table;
