import React, { useState } from 'react';
import { LayerType, DashboardConfig } from './types';
import MapViz from './components/MapViz';

const DASHBOARDS: DashboardConfig[] = [
  {
    id: 'pemicu_tambang',
    title: { id: 'Pemicu Tambang', en: 'Mining Drivers' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/pemicu-tambang',
    icon: 'fa-triangle-exclamation',
    layerType: LayerType.CUSTOM,
    description: { id: 'Analisis Faktor Pemicu Kegiatan Tambang', en: 'Mining activity causal factors' }
  },
  {
    id: 'command_center',
    title: { id: 'Command Center Solok Selatan', en: 'South Solok Command Center' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboard-solok-selatan-2026',
    icon: 'fa-desktop',
    layerType: LayerType.CUSTOM,
    description: { id: 'Pusat Data & Informasi Terpadu', en: 'Integrated data & info center' }
  },
  {
    id: 'lubuk_gadang',
    title: { id: 'Nagari Lubuk Gadang', en: 'Lubuk Gadang Village' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboardnagarilubukgadangok',
    icon: 'fa-map',
    layerType: LayerType.LAND_COVER,
    description: { id: 'Dashboard Regional Nagari Lubuk Gadang', en: 'Village-level administrative dashboard' }
  },
  {
    id: 'audit_kopi',
    title: { id: 'Audit Kopi (Risiko EUDR)', en: 'Coffee Audit (EUDR Risk)' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/eudrrisk',
    icon: 'fa-mug-hot',
    layerType: LayerType.COFFEE,
    description: { id: 'Analisis Risiko Deforestasi & Kepatuhan EUDR', en: 'Deforestation & EUDR compliance' }
  },
  {
    id: 'bantuan_pangan',
    title: { id: 'Bantuan Pangan', en: 'Food Assistance' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/bantuanpangan',
    icon: 'fa-bowl-rice',
    layerType: LayerType.URBAN,
    description: { id: 'Analisis distribusi bantuan pangan masyarakat', en: 'Food aid distribution analytics' }
  },
  {
    id: 'data_kemiskinan',
    title: { id: 'Data Kemiskinan', en: 'Poverty Data' },
    url: 'https://mrgridhoarazzak.users.earthengine.app/view/monitoringdanprediksikemiskinan20-23',
    icon: 'fa-users-line',
    layerType: LayerType.URBAN,
    description: { id: 'Analisis Sebaran Data Kemiskinan Wilayah', en: 'Regional poverty distribution mapping' }
  },
  {
    id: 'prioritas_csr',
    title: { id: 'Prioritas CSR', en: 'CSR Priorities' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/prioritas-csr',
    icon: 'fa-hand-holding-heart',
    layerType: LayerType.CUSTOM,
    description: { id: 'Analisis Prioritas Program CSR Wilayah', en: 'Regional CSR priority analysis' }
  },
  {
    id: 'sdg_solsel',
    title: { id: "SDG's Solok Selatan", en: "South Solok SDG's" },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/sdgs2-solok-selatan',
    icon: 'fa-chart-line',
    layerType: LayerType.CUSTOM,
    description: { id: 'Pencapaian Tujuan Pembangunan Berkelanjutan', en: 'Sustainable development goal tracking' }
  },
  {
    id: 'karbon_lb_gadang',
    title: { id: 'Karbon Lubuk Gadang Sel.', en: 'South Lubuk Gadang Carbon' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/agblbgs',
    icon: 'fa-leaf',
    layerType: LayerType.CUSTOM,
    description: { id: 'Analisis Cadangan Karbon Atas Tanah', en: 'Above-ground carbon stock analysis' }
  },
  {
    id: 'kelayakan_pembangunan',
    title: { id: 'Kelayakan Pembangunan', en: 'Development Suitability' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/kelayakan-pembangunan',
    icon: 'fa-building-circle-check',
    layerType: LayerType.URBAN,
    description: { id: 'Analisis Kesesuaian Lahan Pembangunan', en: 'Land use suitability for construction' }
  },
  {
    id: 'mitigasi_bencana',
    title: { id: 'Mitigasi Bencana', en: 'Disaster Mitigation' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/miyigasi-bencana',
    icon: 'fa-house-fire',
    layerType: LayerType.CUSTOM,
    description: { id: 'Analisis Risiko & Mitigasi Bencana', en: 'Disaster risk and mitigation planning' }
  },
  {
    id: 'insar_monitor',
    title: { id: 'Analisis InSAR', en: 'InSAR Analysis' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/insar',
    icon: 'fa-arrows-up-down',
    layerType: LayerType.CUSTOM,
    description: { id: 'Analisis Deformasi Permukaan (Radar)', en: 'Surface deformation radar analysis' }
  },
  {
    id: 'dashboard_mrv',
    title: { id: 'Dashboard MRV', en: 'MRV Dashboard' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/mrv-prediction-sako-utara',
    icon: 'fa-satellite-dish',
    layerType: LayerType.CUSTOM,
    description: { id: 'Prediction & Verification (Gako Utara)', en: 'Verification and prediction monitor' }
  },
  {
    id: 'sipantra_psm',
    title: { id: 'SIPANTRA - PSM', en: 'SIPANTRA - Spatial Monitor' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/dashboard-psm',
    icon: 'fa-map-location-dot',
    layerType: LayerType.URBAN,
    description: { id: 'Sistem Pantau Citra & Tata Ruang', en: 'Satellite and spatial planning system' }
  },
  {
    id: 'radar_mining_monitor',
    title: { id: 'Perubahan Lahan Tambang', en: 'Mining Land Change' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/radar-mining-monitor',
    icon: 'fa-person-digging',
    layerType: LayerType.CUSTOM,
    description: { id: 'Monitoring Lahan Akibat Aktivitas Tambang', en: 'Mining footprint land-use tracking' }
  },
  {
    id: 'peta_sejarah_1941',
    title: { id: 'Peta Sejarah 1941', en: '1941 Historical Map' },
    url: 'https://ee-mrgridhoarazzak.projects.earthengine.app/view/peta-sekarah-solok-selatan',
    icon: 'fa-clock-rotate-left',
    layerType: LayerType.CUSTOM,
    description: { id: 'Arsip Peta Sejarah Solok Selatan', en: 'South Solok historical map archives' }
  }
];

const TRANSLATIONS = {
  id: {
    sidebarHeader: 'South Solok',
    sidebarSub: 'Spatial Data Initiative',
    menuTitle: 'Menu Dashboard',
    customUrl: 'Input URL GEE Kustom',
    footerTitle: 'SSDI - SOUTH SOLOK DATA INITIATIVE',
    footerSub: 'Platform Intelijen Spasial Terpadu',
    powered: 'Didukung oleh Google Earth Engine'
  },
  en: {
    sidebarHeader: 'South Solok',
    sidebarSub: 'Spatial Data Initiative',
    menuTitle: 'Dashboard Menu',
    customUrl: 'Custom GEE URL Input',
    footerTitle: 'SSDI - SOUTH SOLOK SPATIAL DATA INITIATIVE',
    footerSub: 'Integrated Spatial Intelligence Platform',
    powered: 'Powered by Google Earth Engine'
  }
};

const App: React.FC = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardConfig>(DASHBOARDS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [customUrl, setCustomUrl] = useState('');

  const handleDashboardSelect = (dashboard: DashboardConfig) => {
    setActiveDashboard(dashboard);
    setCustomUrl('');
  };

  const handleCustomUrlApply = () => {
    if (customUrl) {
      setActiveDashboard({
        id: 'custom',
        title: { id: 'Dashboard Kustom', en: 'Custom Dashboard' },
        url: customUrl,
        icon: 'fa-link',
        layerType: LayerType.CUSTOM,
        description: { id: 'URL GEE eksternal', en: 'External GEE URL' }
      });
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans text-slate-100 selection:bg-emerald-500/30">
      
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 flex flex-col border-r border-slate-800 bg-slate-900 z-30 shadow-2xl shrink-0`}>
        <div className={`h-20 flex items-center ${sidebarOpen ? 'px-4 justify-between' : 'justify-center'} border-b border-slate-800 shrink-0 bg-slate-900`}>
           {sidebarOpen ? (
             <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-slate-700 p-1 shrink-0 shadow-lg shadow-emerald-900/20">
                  <i className="fas fa-satellite text-emerald-600 text-lg"></i>
               </div>
               <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-[10px] text-white uppercase tracking-tighter truncate">{t.sidebarHeader}</span>
                  <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest truncate">{t.sidebarSub}</span>
               </div>
             </div>
           ) : (
             <i className="fas fa-satellite text-emerald-600 text-xl"></i>
           )}
        </div>

        {/* Language Switcher */}
        <div className={`py-2 border-b border-slate-800 bg-slate-900/50 ${sidebarOpen ? 'px-4' : 'flex justify-center'}`}>
           <div className={`flex bg-slate-800 rounded p-0.5 ${sidebarOpen ? 'w-full' : 'flex-col w-10'}`}>
              <button onClick={() => setLang('id')} className={`flex-1 text-[9px] font-bold py-1 rounded transition-all ${lang === 'id' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>ID</button>
              <button onClick={() => setLang('en')} className={`flex-1 text-[9px] font-bold py-1 rounded transition-all ${lang === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>EN</button>
           </div>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar bg-slate-900">
           {sidebarOpen && <div className="text-[9px] font-bold text-slate-500 uppercase px-3 py-2">{t.menuTitle}</div>}
           {DASHBOARDS.map((dash) => (
             <button
               key={dash.id}
               onClick={() => handleDashboardSelect(dash)}
               className={`w-full flex items-center px-3 py-2.5 rounded text-xs transition-all border ${
                 activeDashboard.id === dash.id ? 'bg-emerald-600/10 border-emerald-500/50 text-emerald-100 shadow-sm' : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
               }`}
             >
               <i className={`fas ${dash.icon} w-5 text-center shrink-0`}></i>
               {sidebarOpen && (
                 <div className="ml-3 text-left overflow-hidden">
                   <div className="font-semibold truncate">{dash.title[lang]}</div>
                   <div className="text-[9px] opacity-40 truncate">{dash.description[lang]}</div>
                 </div>
               )}
             </button>
           ))}

           {sidebarOpen && (
             <div className="mt-4 p-3 bg-slate-800/20 rounded border border-slate-700/50">
               <div className="text-[9px] font-bold text-slate-500 uppercase mb-1.5">{t.customUrl}</div>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={customUrl}
                   onChange={(e) => setCustomUrl(e.target.value)}
                   className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-[10px] focus:border-emerald-500 outline-none text-slate-300"
                   placeholder="https://..."
                 />
                 <button 
                   onClick={handleCustomUrlApply}
                   className="bg-emerald-600 text-white px-2 rounded hover:bg-emerald-500 transition-colors"
                 >
                   <i className="fas fa-arrow-right text-[10px]"></i>
                 </button>
               </div>
             </div>
           )}
        </nav>

        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="h-10 border-t border-slate-800 flex items-center justify-center text-slate-600 hover:text-white transition-colors bg-slate-900 shrink-0">
          <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
      </div>

      {/* Main Map Display Area - Full Dashboard Output */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
        <div className="flex-1 relative w-full h-full">
           <MapViz activeLayer={activeDashboard.layerType} opacity={1} geeUrl={activeDashboard.url} />
        </div>
        
        <footer className="bg-slate-950 border-t border-slate-800/50 px-4 py-1.5 flex items-center justify-between text-[9px] text-slate-500 z-30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 tracking-tighter uppercase">{t.footerTitle}</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline italic opacity-50">{t.footerSub}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="hidden sm:inline opacity-40">{t.powered}</span>
             <i className="fas fa-microchip text-emerald-600 opacity-60"></i>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
