import React from 'react';

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
}

export function FlexTable<T>({ data, columns, actions }: FlexTableProps<T>) {
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
                    {data.map((row, rowIndex) => (
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

        </div>
    );
}
