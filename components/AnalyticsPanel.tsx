import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GeoStats, LayerType, ChatMessage } from '../types';
import { analyzeGeoData } from '../services/geminiService';

interface AnalyticsPanelProps {
  data: GeoStats[];
  activeLayer: LayerType;
  regionName: string;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ data, activeLayer, regionName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial Auto-Analysis when layer/dashboard changes
  useEffect(() => {
    const runInitialAnalysis = async () => {
      setMessages([]); // Clear old context
      setIsAnalyzing(true);
      
      const initialMessage: ChatMessage = {
        id: 'init',
        role: 'model',
        text: `Initializing AI analysis for **${regionName}** (${activeLayer})...`,
        timestamp: new Date(),
        isLoading: true
      };
      setMessages([initialMessage]);

      // Add a slight delay to mimic processing the "newly loaded" dashboard data
      await new Promise(r => setTimeout(r, 1000));

      const analysis = await analyzeGeoData(regionName, activeLayer, data);
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: analysis,
        timestamp: new Date()
      }]);
      setIsAnalyzing(false);
    };

    runInitialAnalysis();
  }, [activeLayer, regionName, data]);

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

    const analysis = await analyzeGeoData(regionName, activeLayer, data, userMsg.text);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: analysis,
      timestamp: new Date()
    }]);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 w-96 shrink-0 z-20 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fas fa-brain text-purple-400"></i>
          Gemini Insights
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
          Connected to: {regionName}
        </p>
      </div>

      {/* Chart Section */}
      <div className="h-64 p-4 border-b border-slate-800 bg-slate-800/20 relative group">
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">Live Data Feed</span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex justify-between">
            <span>Trend: {activeLayer}</span>
            <span className="text-blue-400 font-normal">Last 12 Mo</span>
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
            <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gemini Chat Section */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-900">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}>
                {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-purple-400 uppercase tracking-wide">
                    <i className="fas fa-sparkles"></i> AI Analysis
                  </div>
                )}
                {msg.isLoading ? (
                  <div className="flex gap-1 items-center h-5 px-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200"></span>
                    <span className="ml-2 text-xs text-slate-400">Processing satellite data...</span>
                  </div>
                ) : (
                  <div className="markdown-prose whitespace-pre-line">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about vegetation, anomalies..."
              disabled={isAnalyzing}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isAnalyzing}
              className="absolute right-2 top-2 p-1.5 text-purple-400 hover:text-purple-300 disabled:text-slate-600 transition-colors"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
