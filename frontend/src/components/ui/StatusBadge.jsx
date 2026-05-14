import React from 'react';
import { Clock, Wrench, CheckCircle2 } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let badgeColor = '';
  let Icon = null;
  let text = '';

  switch (status.toLowerCase()) {
    case 'pending':
    case 'submitted':
      badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
      Icon = Clock;
      text = 'Pending';
      break;
    case 'in progress':
    case 'in-progress':
      badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
      Icon = Wrench;
      text = 'In Progress';
      break;
    case 'resolved':
      badgeColor = 'bg-green-100 text-green-800 border-green-200';
      Icon = CheckCircle2;
      text = 'Resolved';
      break;
    default:
      badgeColor = 'bg-gray-100 text-gray-800 border-gray-200';
      Icon = Clock;
      text = status;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${badgeColor}`}>
      <Icon size={14} strokeWidth={2.5} />
      {text}
    </span>
  );
};

export default StatusBadge;
