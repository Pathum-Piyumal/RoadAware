import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { hazardTypeData } from '../../utils/dummyData';
import '../../css/Reports.css';

const Categories = () => {
  return (
    <div className="admin-reports-container">
      <div className="admin-reports-header">
        <div>
          <h1 className="admin-reports-title">Hazard Categories</h1>
          <p className="admin-reports-subtitle">Manage the types of hazards citizens can report.</p>
        </div>
        <button className="admin-reports-btn-outline" style={{ backgroundColor: '#3B82F6', color: 'white', border: 'none' }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Color Code</th>
              <th>Total Reports</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hazardTypeData.map((cat, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500 }}>{cat.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1rem', height: '1rem', backgroundColor: cat.fill, borderRadius: '0.25rem' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{cat.fill}</span>
                  </div>
                </td>
                <td>{cat.value * 12}</td> {/* Faking total historical numbers */}
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="admin-table-action-btn">
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="admin-table-action-btn" style={{ color: '#EF4444' }}>
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
