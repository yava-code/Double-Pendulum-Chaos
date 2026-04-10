import React from 'react';
import DoublePendulum from './components/DoublePendulum';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Double Pendulum Chaos</h1>
        <p className="text-gray-500 text-sm">
          Explore sensitivity to initial conditions — small angle changes lead to wildly different trajectories.
        </p>
      </header>
      <main className="w-full flex justify-center">
        <DoublePendulum />
      </main>
      <footer className="mt-8 text-xs text-gray-400">
        Built with React, TypeScript &amp; Recharts
      </footer>
    </div>
  );
};

export default App;
