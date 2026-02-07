import React, { useState } from 'react';
import { LayerType, DashboardConfig } from './types';
import MapViz from './components/MapViz';

// Configuration for the specific dashboards
const DASHBOARDS: DashboardConfig[] = [
  {
    id: 'command_center',
    title: 'Command Center Solok Selatan',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboard-solok-selatan-2026',
    icon: 'fa-desktop',
    layerType: LayerType.CUSTOM,
    description: 'Pusat Data & Informasi Terpadu'
  },
  {
    id: 'lubuk_gadang',
    title: 'Nagari Lubuk Gadang',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboardnagarilubukgadangok',
    icon: 'fa-map',
    layerType: LayerType.LAND_COVER,
    description: 'Regional dashboard for Nagari Lubuk Gadang'
  },
  {
    id: 'lubuk_gadang_2025',
    title: 'Dashboard Nagari Lubuk Gadang',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboardlulclbgadang',
    icon: 'fa-satellite-dish',
    layerType: LayerType.SATELLITE,
    description: 'Analisis Tutupan Lahan Berbasis Satelit (2025)'
  },
  {
    id: 'audit_kopi',
    title: 'Audit Kopi (EUDR Risk)',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/eudrrisk',
    icon: 'fa-mug-hot',
    layerType: LayerType.COFFEE,
    description: 'Analisis Risiko Deforestasi & Kepatuhan EUDR'
  },
  {
    id: 'bantuan_pangan',
    title: 'Bantuan Pangan',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/bantuanpangan',
    icon: 'fa-hand-holding-heart',
    layerType: LayerType.CUSTOM,
    description: 'Analisis distribusi bantuan pangan'
  },
  {
    id: 'data_kemiskinan',
    title: 'Data Kemiskinan',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/data-kemiskinan',
    icon: 'fa-users',
    layerType: LayerType.CUSTOM,
    description: 'Analisis Sebaran Data Kemiskinan'
  },
  {
    id: 'sdgs_solok_selatan',
    title: "SDG's Solok Selatan",
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/sdgs2-solok-selatan',
    icon: 'fa-globe',
    layerType: LayerType.CUSTOM,
    description: 'Pencapaian Tujuan Pembangunan Berkelanjutan'
  },
  {
    id: 'karbon_lb_gadang',
    title: 'Karbon Lubuk Gadang Sel.',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/agblbgs',
    icon: 'fa-leaf',
    layerType: LayerType.CUSTOM,
    description: 'Analisis Cadangan Karbon'
  },
  {
    id: 'kelayakan_pembangunan',
    title: 'Kelayakan Pembangunan',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/kelayakan-pembangunan',
    icon: 'fa-hard-hat',
    layerType: LayerType.URBAN,
    description: 'Analisis Kesesuaian Lahan Pembangunan'
  },
  {
    id: 'mitigasi_bencana',
    title: 'Mitigasi Bencana',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/miyigasi-bencana',
    icon: 'fa-shield-halved',
    layerType: LayerType.CUSTOM,
    description: 'Analisis Risiko & Mitigasi Bencana'
  },
  {
    id: 'insar_analysis',
    title: 'Analisis InSAR',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/insar',
    icon: 'fa-rss',
    layerType: LayerType.SATELLITE,
    description: 'Analisis Deformasi Permukaan (Radar)'
  },
  {
    id: 'mrv_prediction',
    title: 'Dashboard MRV',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/mrv-prediction-sako-utara',
    icon: 'fa-chart-line',
    layerType: LayerType.CUSTOM,
    description: 'Prediction & Verification (Sako Utara)'
  },
  {
    id: 'sipantra_psm',
    title: 'SIPANTRA - PSM',
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboard-psm',
    icon: 'fa-satellite',
    layerType: LayerType.URBAN,
    description: 'Sistem Pantau Citra & Tata Ruang'
  }
];

const App: React.FC = () => {
  // Initialize with the first dashboard (Command Center)
  const [activeDashboard, setActiveDashboard] = useState<DashboardConfig>(DASHBOARDS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Custom URL state
  const [customUrl, setCustomUrl] = useState('');

  // Sync state when dashboard changes
  const handleDashboardSelect = (dashboard: DashboardConfig) => {
    setActiveDashboard(dashboard);
    setCustomUrl(''); // Clear custom URL when selecting a preset
  };

  const handleCustomUrlApply = () => {
    if (customUrl) {
      setActiveDashboard({
        id: 'custom',
        title: 'Custom Dashboard',
        url: customUrl,
        icon: 'fa-link',
        layerType: LayerType.CUSTOM,
        description: 'User provided GEE URL'
      });
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans text-slate-100">
      
      {/* Sidebar Controls */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-16'} transition-all duration-300 flex flex-col border-r border-slate-800 bg-slate-900 z-30 shadow-xl`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800 shrink-0 bg-slate-900">
           <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/50">
             <i className="fas fa-tree text-white text-xs"></i>
           </div>
           {sidebarOpen && (
             <div className="ml-3 flex flex-col justify-center">
                <span className="font-bold tracking-tight text-white text-sm leading-tight">South Solok</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">Data Initiative</span>
             </div>
           )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
           
           {/* Primary Dashboards List */}
           {sidebarOpen && <div className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2 mt-2 tracking-wider">Maps</div>}
           
           {DASHBOARDS.map((dash) => (
             <button
               key={dash.id}
               onClick={() => handleDashboardSelect(dash)}
               className={`w-full flex items-center px-3 py-3.5 rounded-lg text-sm transition-all group relative border ${
                 activeDashboard.id === dash.id && !customUrl
                   ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-900/10' 
                   : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
               }`}
             >
               <div className={`w-6 flex justify-center ${activeDashboard.id === dash.id ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'}`}>
                 <i className={`fas ${dash.icon}`}></i>
               </div>
               
               {sidebarOpen ? (
                 <div className="ml-3 text-left overflow-hidden">
                   <div className="font-medium truncate">{dash.title}</div>
                   <div className={`text-[10px] truncate ${activeDashboard.id === dash.id ? 'text-emerald-200/70' : 'text-slate-500'}`}>
                     {dash.description}
                   </div>
                 </div>
               ) : (
                  // Tooltip for collapsed state
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-xs rounded shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                    <div className="font-bold mb-0.5">{dash.title}</div>
                    <div className="text-[10px] text-slate-400">{dash.description}</div>
                  </div>
               )}
             </button>
           ))}
           
           <div className="my-4 border-t border-slate-800"></div>

           {/* Custom URL Input */}
           {sidebarOpen && (
             <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
               <div className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider flex items-center gap-2">
                 <i className="fas fa-link"></i> Add External Map
               </div>
               <div className="flex flex-col gap-2">
                 <input 
                    type="text" 
                    placeholder="https://..." 
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                 />
                 <button 
                   onClick={handleCustomUrlApply}
                   disabled={!customUrl}
                   className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs py-1.5 rounded transition-colors border border-slate-600 hover:border-slate-500"
                 >
                   Load Map
                 </button>
               </div>
             </div>
           )}
        </nav>

        {/* Footer Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-12 border-t border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      {/* Main Map Area - Taking up full remaining width */}
      <div className="flex-1 relative flex flex-col bg-slate-900">
        <div className="flex-1 relative w-full overflow-hidden">
          <MapViz activeLayer={activeDashboard.layerType} opacity={1} geeUrl={activeDashboard.url} />
        </div>
        
        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500 z-30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 tracking-wide uppercase">South Solok Data Initiative</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline opacity-70">Spatial Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="hidden sm:inline">Powered by Google Earth Engine</span>
             <i className="fas fa-satellite text-emerald-600"></i>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default App;
