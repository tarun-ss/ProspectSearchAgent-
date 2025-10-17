import React, { useState } from 'react';
import { findProspects } from './services/geminiService';
import { Prospect } from './types';
import IcpInputForm from './components/IcpInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (icpJson: string) => {
    setIsLoading(true);
    setError(null);
    setProspects([]);
    try {
      const results = await findProspects(icpJson);
      setProspects(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <header className="text-center my-8 md:my-12">
            <div className="flex items-center justify-center gap-3 mb-3">
                <svg className="w-10 h-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                    Prospect Finder AI
                </h1>
            </div>
          <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">
            Define your Ideal Customer Profile (ICP) and let our AI agent discover matching B2B prospects for you.
          </p>
        </header>

        <main className="max-w-3xl mx-auto">
          <IcpInputForm onSearch={handleSearch} isLoading={isLoading} />

          {isLoading && (
            <div className="flex flex-col justify-center items-center mt-12 text-center">
              <Spinner />
              <p className="mt-4 text-gray-400">Searching for prospects...</p>
              <p className="text-sm text-gray-500">This may take a moment.</p>
            </div>
          )}

          {error && (
            <div className="mt-8 text-center p-4 bg-red-900/50 border border-red-700/50 text-red-300 rounded-lg">
              <p className="font-semibold">Error Occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!isLoading && prospects.length > 0 && <ResultsDisplay prospects={prospects} />}
          
          {!isLoading && !error && prospects.length === 0 && (
             <div className="mt-12 text-center text-gray-500">
                <p>Your search results will appear here.</p>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;