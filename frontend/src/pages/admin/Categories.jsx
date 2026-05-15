import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { hazardTypeData } from '../../utils/dummyData';

const Categories = () => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Hazard Categories</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage the types of hazards citizens can report.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-blue-500 text-white border-none hover:bg-blue-600">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-admin-card rounded-xl border border-admin-border overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Category Name</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Color Code</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50">Total Reports</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-admin-text-muted border-b border-admin-border bg-admin-bg/50 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hazardTypeData.map((cat, index) => (
              <tr key={index} className="border-b border-admin-border last:border-0 hover:bg-admin-bg transition-colors">
                <td className="p-4 text-sm text-admin-text font-medium">{cat.name}</td>
                <td className="p-4 text-sm text-admin-text">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.fill }}></div>
                    <span className="text-xs text-admin-text-muted">{cat.fill}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-admin-text">{cat.value * 12}</td> {/* Faking total historical numbers */}
                <td className="p-4 text-sm text-admin-text">
                  <div className="flex gap-2 justify-end">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-blue-500 hover:border-blue-500">
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-red-500 hover:border-red-500 text-red-500 border-red-500/30 hover:bg-red-500/10">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
