import React, { useState } from 'react';

interface FlexTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
  }[];
  actions?: {
    label: string;
    onClick: (row: T) => void;
    className?: string;
  }[];
  itemsPerPage?: number;
}

export function FlexTable<T>({ data, columns, actions, itemsPerPage = 5 }: FlexTableProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-[#333]">
        <thead>
          <tr className="bg-[#1E1E1E] text-content-primary">
            {columns.map((col) => (
              <th key={String(col.accessor)} className="p-3 border-b border-[#444] text-left">
                {col.header}
              </th>
            ))}
            {actions && <th className="p-3 border-b border-[#444] text-left">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-content-ternary hover:bg-[#2A2A2A] transition">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="p-3 border-b border-[#444]">
                  <div className="flex justify-between items-center w-full">
                    {String(row[col.accessor])}
                  </div>
                </td>
              ))}
              {actions && (
                <td className="p-3 border-b border-[#444]">
                  <div className="flex items-center gap-2">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => action.onClick(row)}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-colors text-sm ${action.className || 'bg-[#E5D3B3] text-[#1E1E1E] hover:bg-[#d8c6a6]'}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-[#1E1E1E] text-[#E5D3B3] hover:bg-[#333] disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                page === index + 1 ? 'bg-[#E5D3B3] text-[#1E1E1E]' : 'bg-[#1E1E1E] text-[#E5D3B3] hover:bg-[#333]'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-[#1E1E1E] hover:bg-[#333] disabled:opacity-50 border-[#E5D3B3] text-[#E5D3B3]"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
