import React from 'react';
import { Prospect } from '../types';
import ProspectCard from './ProspectCard';

interface ResultsDisplayProps {
  prospects: Prospect[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prospects }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Found Prospects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {prospects.map((prospect, index) => (
          <ProspectCard key={index} prospect={prospect} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;