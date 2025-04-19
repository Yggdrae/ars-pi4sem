interface FlexTableProps<T> {
    data: T[];
    columns: {
        header: string;
        accessor: keyof T;
    }[];
}

export function FlexTable<T>({ data, columns }: FlexTableProps<T>) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse border border-[#333]">
                <thead>
                    <tr className="bg-[#1E1E1E] text-left text-content-primary">
                        {columns.map((col) => (
                            <th key={String(col.accessor)} className="p-3 border-b border-[#444]">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="text-content-ternary hover:bg-[#2A2A2A] transition">
                            {columns.map((col) => (
                                <td key={String(col.accessor)} className="p-3 border-b border-[#444]">
                                    {String(row[col.accessor])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
