import React from 'react';
import { Clock, Wrench, CheckCircle2 } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let badgeColor = '';
  let Icon = null;
  let text = '';

  switch (status.toLowerCase()) {
    case 'pending':
    case 'submitted':
      badgeColor = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      Icon = Clock;
      text = 'Pending';
      break;
    case 'in progress':
    case 'in-progress':
      badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      Icon = Wrench;
      text = 'In Progress';
      break;
    case 'resolved':
      badgeColor = 'bg-green-500/20 text-green-400 border-green-500/30';
      Icon = CheckCircle2;
      text = 'Resolved';
      break;
    default:
      badgeColor = 'bg-gray-800 text-gray-300 border-gray-700';
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
