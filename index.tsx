import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tambahkan ini di bagian Header/Navbar dalam index.tsx
const Header = () => {
  return (
    <div className="absolute top-4 left-4 z-[50] flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2 pr-4 rounded-xl border border-slate-700 shadow-2xl">
      {/* Logo SSDI */}
      <img 
        src="/logo-ssdi.png" // Path ini otomatis membaca folder public
        alt="Logo SSDI" 
        className="w-10 h-10 object-contain"
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/40?text=S"; }} // Fallback jika link mati
      />
      
      {/* Teks Inisiatif */}
      <div>
        <h1 className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent leading-none">
          SSDI
        </h1>
        <p className="text-[10px] text-slate-400 font-medium">
          South Solok Data Initiative
        </p>
      </div>
    </div>
  );
};
  
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
