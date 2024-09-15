import { NextResponse } from 'next/server';

// Define types for the data and API requests
interface TableEntry {
  name: string;
  country: string;
  language: string;
  games: string;
}

interface MessageContext {
  tabular_data?: string;
}

interface ApiRequestBody {
  content: string;
  message_context?: MessageContext;
}

interface ApiResponseBody {
  id: number;
  content: string;
  message_context: MessageContext;
}

// Sample data
const tableData: TableEntry[] = [
  { name: 'John Doe', country: 'USA', language: 'English', games: 'Chess' },
  { name: 'Jane Smith', country: 'UK', language: 'English', games: 'Tennis' },
  { name: 'Carlos Ruiz', country: 'Spain', language: 'Spanish', games: 'Football' },
];

function findAnswerFromTableData(question: string): string {
  const normalizedQuestion = question.toLowerCase();
  
  const rowMatch = normalizedQuestion.match(/row (\d+)/);
  const rowIndex = rowMatch ? parseInt(rowMatch[1], 10) - 1 : null;

  if (rowIndex !== null && rowIndex >= 0 && rowIndex < tableData.length) {
    if (normalizedQuestion.includes('name')) {
      return `The name in row ${rowIndex + 1} is ${tableData[rowIndex].name}.`;
    }
    if (normalizedQuestion.includes('country')) {
      return `The country in row ${rowIndex + 1} is ${tableData[rowIndex].country}.`;
    }
    if (normalizedQuestion.includes('language')) {
      return `The language in row ${rowIndex + 1} is ${tableData[rowIndex].language}.`;
    }
    if (normalizedQuestion.includes('games') || normalizedQuestion.includes('sport')) {
      return `The games in row ${rowIndex + 1} are ${tableData[rowIndex].games}.`;
    }
  }

  if (normalizedQuestion.includes('name')) {
    const names = tableData.map((entry) => entry.name).join(', ');
    return `The names in the table are: ${names}.`;
  }
  if (normalizedQuestion.includes('country')) {
    const countries = tableData.map((entry) => entry.country).join(', ');
    return `The countries in the table are: ${countries}.`;
  }
  if (normalizedQuestion.includes('language')) {
    const languages = [...new Set(tableData.map((entry) => entry.language))].join(', ');
    return `The languages spoken are: ${languages}.`;
  }
  if (normalizedQuestion.includes('games') || normalizedQuestion.includes('sport')) {
    const games = [...new Set(tableData.map((entry) => entry.games))].join(', ');
    return `The games listed in the table are: ${games}.`;
  }

  return "Sorry, I couldn't find any relevant data.";
}

// API Route Handlers
export async function POST(request: Request) {
  const { content, message_context }: ApiRequestBody = await request.json();

  const botResponseContent = findAnswerFromTableData(content);

  return NextResponse.json<ApiResponseBody>({
    id: Math.floor(Math.random() * 1000),
    content: botResponseContent,
    message_context: message_context || {},
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const conversationId = url.searchParams.get('conversationId');

  return NextResponse.json({
    name: 'Chat Conversation',
    id: Number(conversationId),
    messages: [],
  });
}
