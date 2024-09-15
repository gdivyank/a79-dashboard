"use client"
import { useState } from 'react';
import Table from './components/Table';
import Chatbot from './components/Chatbot';
import Header from './components/Header';

interface RowData {
  name: string;
  country: string;
  language: string;
  games: string;
}
export default function Home() {
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);

  const handleRowSelection = (rows: RowData[]) => {
    setSelectedRows(rows);
  };

  return (
    <div>

      <Header/>
    <div className="container">
      <div className='table-content-container'>
      <div className="table-container">
        <Table onRowSelection={handleRowSelection} />
      </div>
      </div>
    
      <div className="chat-container">
        <Chatbot selectedRows={selectedRows} />
      </div>
    </div>
    </div>
  );
}
