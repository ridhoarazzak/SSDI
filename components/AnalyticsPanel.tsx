import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GeoStats, LayerType, ChatMessage } from '../types';
import { analyzeGeoData } from '../services/geminiService';

interface AnalyticsPanelProps {
  data: GeoStats[];
  activeLayer: LayerType;
  regionName: string;
  lang: 'id' | 'en';
}

const UI_STRINGS = {
  id: {
    title: 'Wawasan Gemini AI',
    analyzing: 'Menganalisis data...',
    processing: 'Memproses wawasan...',
    placeholder: 'Tanyakan sesuatu tentang wilayah ini...',
    error: 'Gagal menganalisis data.'
  },
  en: {
    title: 'Gemini AI Insights',
    analyzing: 'Analyzing data...',
    processing: 'Processing insights...',
    placeholder: 'Ask something about this region...',
    error: 'Analysis failed.'
  }
};

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ data, activeLayer, regionName, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = UI_STRINGS[lang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const runInitialAnalysis = async () => {
      setMessages([]);
      setIsAnalyzing(true);
      
      const initialMessage: ChatMessage = {
        id: 'init',
        role: 'model',
        text: `${t.analyzing} **${regionName}**...`,
        timestamp: new Date(),
        isLoading: true
      };
      setMessages([initialMessage]);

      const analysis = await analyzeGeoData(regionName, activeLayer, data, lang);
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: analysis,
        timestamp: new Date()
      }]);
      setIsAnalyzing(false);
    };

    runInitialAnalysis();
  }, [activeLayer, regionName, data, lang]);

  const handleSendMessage = async () => {
    if (!input.trim() || isAnalyzing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAnalyzing(true);

    const analysis = await analyzeGeoData(regionName, activeLayer, data, lang, userMsg.text);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: analysis,
      timestamp: new Date()
    }]);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 w-80 lg:w-96 shrink-0 z-20 shadow-2xl transition-all duration-300">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <i className="fas fa-sparkles text-emerald-400"></i>
          {t.title}
        </h2>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter truncate">
          {regionName}
        </p>
      </div>

      <div className="h-40 p-3 border-b border-slate-800 bg-slate-800/10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" hide />
            <YAxis tick={{fontSize: 8, fill: '#475569'}} width={20} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px', fontSize: '9px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[92%] rounded p-3 text-xs leading-relaxed shadow-sm ${
              msg.role === 'user' ? 'bg-emerald-800 text-white' : 'bg-slate-800 border border-slate-700 text-slate-300'
            }`}>
              {msg.isLoading ? (
                <div className="flex items-center gap-2">
                  <i className="fas fa-circle-notch fa-spin text-emerald-400"></i>
                  <span>{t.processing}</span>
                </div>
              ) : (
                <div className="whitespace-pre-line prose prose-invert prose-xs">{msg.text}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-900">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.placeholder}
            disabled={isAnalyzing}
            className="w-full bg-slate-800 border border-slate-700 rounded pl-3 pr-10 py-2.5 text-[11px] focus:border-emerald-500 outline-none text-slate-200 transition-all"
          />
          <button onClick={handleSendMessage} className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-400 transition-colors">
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
