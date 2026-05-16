import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { hazardTypeData } from '../../utils/dummyData';

const Categories = () => {
  const [categories, setCategories] = useState(hazardTypeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', fill: '#3B82F6', value: 10 });

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData(categories[index]);
    } else {
      setEditingIndex(null);
      setFormData({ name: '', fill: '#3B82F6', value: 10 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const newCategories = [...categories];
      newCategories[editingIndex] = formData;
      setCategories(newCategories);
    } else {
      setCategories([...categories, formData]);
    }
    handleCloseModal();
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const newCategories = [...categories];
      newCategories.splice(index, 1);
      setCategories(newCategories);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0 pb-8 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-admin-text tracking-tight m-0">Hazard Categories</h1>
          <p className="text-admin-text-muted text-sm mt-1 mb-0">Manage the types of hazards citizens can report.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-blue-500 text-white border-none hover:bg-blue-600"
        >
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
            {categories.map((cat, index) => (
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
                    <button 
                      onClick={() => handleOpenModal(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-blue-500 hover:border-blue-500"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors bg-transparent border border-admin-border text-admin-text hover:bg-admin-bg hover:text-red-500 hover:border-red-500 text-red-500 border-red-500/30 hover:bg-red-500/10"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-admin-card border border-admin-border rounded-xl shadow-xl w-full max-w-md animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-admin-border">
              <h2 className="text-xl font-bold text-admin-text m-0">
                {editingIndex !== null ? 'Edit Category' : 'Add Category'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-admin-bg rounded-lg text-admin-text-muted hover:text-admin-text transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-admin-text mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-admin-input-bg border border-admin-border rounded-lg px-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-admin-text mb-1">Color Code</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={formData.fill}
                    onChange={(e) => setFormData({...formData, fill: e.target.value})}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={formData.fill}
                    onChange={(e) => setFormData({...formData, fill: e.target.value})}
                    className="flex-1 bg-admin-input-bg border border-admin-border rounded-lg px-4 py-2 text-sm text-admin-text transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-admin-border mt-6">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-admin-border text-admin-text hover:bg-admin-bg transition-colors cursor-pointer bg-transparent"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer border-none"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
