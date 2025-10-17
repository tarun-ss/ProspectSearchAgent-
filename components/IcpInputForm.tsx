import React, { useState } from 'react';

interface IcpInputFormProps {
  onSearch: (icpJson: string) => void;
  isLoading: boolean;
}

const defaultIcp = {
  industry: ["SaaS", "FinTech", "B2B Software"],
  geography: ["USA"],
  employee_count_min: 100,
  revenue_min: 20000000,
  keywords: ["AI", "data analytics", "automation"],
  signals: {
    funding: true,
    hiring_data_roles: true
  },
  tech_stack: ["Snowflake", "AWS"]
};

const IcpInputForm: React.FC<IcpInputFormProps> = ({ onSearch, isLoading }) => {
  const [icp, setIcp] = useState(JSON.stringify(defaultIcp, null, 2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(icp);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="icp" className="block text-gray-300 text-sm font-semibold mb-2">
            Ideal Customer Profile (JSON)
          </label>
          <textarea
            id="icp"
            rows={15}
            className="shadow-inner appearance-none border border-slate-700 rounded-lg w-full py-3 px-4 bg-slate-900/70 text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm transition-colors"
            value={icp}
            onChange={(e) => setIcp(e.target.value)}
            placeholder="Enter your ICP in JSON format"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className={`inline-flex items-center justify-center font-bold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-300 ${isLoading ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg transform hover:scale-105'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Find Prospects
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IcpInputForm;