import React from 'react';

export default function DataTable({ columns = [], data = [], emptyMessage = 'No records found.' }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase bg-slate-50 dark:bg-slate-800/50">
            {columns.map((col, idx) => (
              <th key={idx} className="py-3 px-4">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-slate-400 text-xs">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-3.5 px-4 text-slate-800 dark:text-slate-200">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
