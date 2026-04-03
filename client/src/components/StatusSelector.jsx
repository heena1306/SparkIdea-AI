import React from 'react';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';

const StatusSelector = ({ status, onStatusChange, minimal = false }) => {
  const statuses = [
    { id: 'Pending', label: 'Pending', icon: Circle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { id: 'Started', label: 'Started', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'Completed', label: 'Completed', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  const current = statuses.find(s => s.id === status) || statuses[0];

  if (minimal) {
    return (
      <select 
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border outline-none cursor-pointer ${current.bg} ${current.color} ${current.border}`}
      >
        {statuses.map(s => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((s) => {
        const Icon = s.icon;
        const isActive = status === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onStatusChange(s.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isActive 
                ? `${s.bg} ${s.color} ${s.border} shadow-sm` 
                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? s.color : 'text-slate-300'}`} />
            {s.label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusSelector;
