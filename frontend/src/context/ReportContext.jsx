/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const defaultState = {
  hazardType:  null,      // 'Pothole' | 'Debris' | 'Flooding' | etc.
  severity:    'Medium',  // 'Low' | 'Medium' | 'High' | 'Critical'
  title:       '',
  description: '',
  location:    null,      // { lat, lng, address }
  photos:      [],        // File[]
};

const ReportContext = createContext(null);

export function ReportProvider({ children }) {
  const [state, setState] = useState(defaultState);

  function updateField(key, value) {
    setState(prev => ({ ...prev, [key]: value }));
  }

  function resetReport() {
    setState(defaultState);
  }

  return (
    <ReportContext.Provider value={{ state, updateField, resetReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReport must be used inside <ReportProvider>');
  return ctx;
}