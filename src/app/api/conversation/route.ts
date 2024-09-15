export interface MessageCreate {
  conversation_id?: number;
  content: string;
  message_context?: {
    tabular_data?: string;
  };
}

export interface MessagePublic {
  created_at?: string;
  updated_at?: string;
  content: string;
  role?: string;
  conversation_id?: number;
  id: number;
  message_context: {
    tabular_data?: string;
  };
}

export const tableData = [
  { name: 'John Doe', country: 'USA', language: 'English', games: 'Chess' },
  { name: 'Jane Smith', country: 'UK', language: 'English', games: 'Tennis' },
  { name: 'Carlos Ruiz', country: 'Spain', language: 'Spanish', games: 'Football' },
];

// Utility function to find data based on the user's question
function findAnswerFromTableData(question: string) {
  const normalizedQuestion = question.toLowerCase();
  
  // Check if the question refers to a specific row
  const rowMatch = normalizedQuestion.match(/row (\d+)/);
  const rowIndex = rowMatch ? parseInt(rowMatch[1], 10) - 1 : null; // Convert to 0-based index

  // If a specific row is mentioned
  if (rowIndex !== null && rowIndex >= 0 && rowIndex < tableData.length) {
    // Check which attribute is being asked
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

  // Handle general queries about all rows
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

export async function createMessage(message: MessageCreate): Promise<MessagePublic> {
  const botResponseContent = findAnswerFromTableData(message.content);

  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        content: botResponseContent, // Use the smart response from findAnswerFromTableData
        message_context: message.message_context || {},
      });
    }, 1000);
  });
}

export async function readConversation(conversationId: string): Promise<any> {
  // Simulate fetching conversation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Chat Conversation',
        id: Number(conversationId),
        messages: [],
      });
    }, 1000);
  });
}
