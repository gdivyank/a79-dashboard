'use client'; // Required for client-side components in Next.js 13

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { tableData } from '../api/dataLayer/tableData';

const Table = ({ onRowSelection }: { onRowSelection: (rows: any[]) => void }) => {
  const [gridApi, setGridApi] = useState<any>(null);
  


  const columns = [
    { headerName: 'Name', field: 'name', filter: true, width: 240  },  // Added filter
    { headerName: 'Country', field: 'country', filter: true, width: 240  },  // Added filter
    { headerName: 'Language', field: 'language', filter: true, width: 240  },  // Added filter
    { headerName: 'Games', field: 'games', filter: true, width: 240  },  // Added filter
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    onRowSelection(selectedRows);
  };

  return (
    <div>
      <div className='table-title'>Table Name 123</div>
   
    <div className="ag-theme-alpine-dark" 
    >
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
