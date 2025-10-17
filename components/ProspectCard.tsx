import React from 'react';
import { Prospect } from '../types';

interface ProspectCardProps {
  prospect: Prospect;
}

const ProspectCard: React.FC<ProspectCardProps> = ({ prospect }) => {
  const formatRevenue = (revenue: number) => {
    if (!revenue) return "N/A";
    if (revenue >= 1_000_000_000) {
      return `$${(revenue / 1_000_000_000).toFixed(1)}B`;
    }
    if (revenue >= 1_000_000) {
      return `$${(revenue / 1_000_000).toFixed(1)}M`;
    }
    if (revenue >= 1_000) {
      return `$${(revenue / 1_000).toFixed(1)}K`;
    }
    return `$${revenue}`;
  };

  const confidenceColor = (score: number) => {
    if (score > 0.75) return 'from-green-500/50 to-green-800/50 text-green-200 border-green-400/50';
    if (score > 0.5) return 'from-yellow-500/50 to-yellow-700/50 text-yellow-200 border-yellow-400/50';
    return 'from-red-500/50 to-red-800/50 text-red-200 border-red-400/50';
  };

  const SignalChip: React.FC<{ active: boolean; label: string }> = ({ active, label }) => (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
        active
          ? 'bg-emerald-900/50 text-emerald-300'
          : 'bg-slate-700/50 text-slate-400'
      }`}
    >
      <svg className={`mr-1.5 h-2 w-2 ${active ? 'text-emerald-400' : 'text-slate-500'}`} fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      {label}
    </span>
  );

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-[1.02] hover:border-slate-600">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-100">{prospect.company_name}</h3>
            <a href={`http://${prospect.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
              {prospect.domain}
            </a>
          </div>
          <div className={`text-xs font-bold px-3 py-1 rounded-full border bg-gradient-to-br ${confidenceColor(prospect.confidence)}`}>
            {`${Math.round(prospect.confidence * 100)}% Match`}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300 mb-5 border-t border-b border-slate-700 py-4">
          <div><strong className="block text-gray-400 text-xs">Industry</strong> {prospect.industry}</div>
          <div><strong className="block text-gray-400 text-xs">Revenue</strong> {formatRevenue(prospect.revenue)}</div>
          <div><strong className="block text-gray-400 text-xs">Funding</strong> {prospect.funding_stage}</div>
        </div>
        
        <div className="flex items-center space-x-4 mb-5">
            <h4 className="font-semibold text-gray-300 text-sm">Signals:</h4>
            <SignalChip active={prospect.signals.recent_hiring} label="Hiring" />
            <SignalChip active={prospect.signals.new_funding} label="Funding" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-300 text-sm mb-2">Key Contacts</h4>
          <ul className="space-y-3">
            {prospect.contacts.map((contact, index) => (
              <li key={index} className="text-sm bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <p className="font-semibold text-gray-200">{contact.name}</p>
                <p className="text-gray-400">{contact.title}</p>
                <p className="text-blue-400 text-xs truncate mt-1">{contact.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-700">
         <p className="text-xs text-gray-500">
          Sources: {prospect.source.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ProspectCard;