"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation"; // 🔥 NEW: To grab the URL ID
import { motion } from "framer-motion";
import { Send, ShieldAlert, Activity, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

type Message = {
  user_id: string;
  team: string;
  text: string;
  isAi?: boolean;
  aiScore?: number;
};

export default function DynamicArena() {
  const params = useParams();
  const roomId = params.id as string; // 🔥 Grabs "tech-debate" or "ai-future" from URL

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [scoreBar, setScoreBar] = useState(50); 
  const [isConnected, setIsConnected] = useState(false); 
  const [myTeam, setMyTeam] = useState<"A" | "B">("A"); // 🔥 NEW: Team Selector
  
  const wsRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;
    if (wsRef.current) return; 

    // 🔥 DYNAMIC WEBSOCKET CONNECTION
    const ws = new WebSocket(`ws://localhost:8080/ws?room=${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    
    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.user_id === "FRIX_UMPIRE") {
        try {
          const aiData = JSON.parse(data.text);
          setMessages((prev) => [
            ...prev,
            { user_id: "AI_UMPIRE", team: "AI", text: aiData.comment, isAi: true, aiScore: aiData.score },
          ]);
          setScoreBar((prev) => Math.max(0, Math.min(100, prev + (aiData.score * 5)))); 
        } catch (e) {
          console.error("Parse error:", data.text);
        }
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => {
      if (ws.readyState === 1) ws.close();
      wsRef.current = null;
    };
  }, [roomId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !wsRef.current || !isConnected) return;

    const msg = {
      user_id: "Aditya",
      team: myTeam, // 🔥 Uses the team you selected
      text: input,
    };

    wsRef.current.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      <header className="p-6 border-b border-zinc-800 bg-zinc-900 shadow-xl z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors">
                <ArrowLeft size={18} />
              </Link>
              <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400 uppercase">
                ARENA // {roomId.replace("-", " ")}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 text-sm font-mono text-zinc-400">
              {isConnected ? (
                 <span className="flex items-center gap-2 text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-500/30">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   SYSTEM ONLINE
                 </span>
              ) : (
                <span className="flex items-center gap-2 text-rose-400 bg-rose-900/30 px-3 py-1 rounded-full border border-rose-500/30">
                   <Activity size={14} className="animate-pulse" />
                   CONNECTING...
                 </span>
              )}
            </div>
          </div>

          <div className="relative h-4 w-full bg-zinc-800 rounded-full overflow-hidden flex">
            <motion.div 
              className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] relative"
              animate={{ width: `${scoreBar}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            <motion.div 
              className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] relative"
              animate={{ width: `${100 - scoreBar}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white z-20 transform -translate-x-1/2 rounded-full shadow-[0_0_10px_white]"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex flex-col ${msg.isAi ? "items-center my-8" : msg.team === "A" ? "items-start" : "items-end"}`}
          >
            {msg.isAi ? (
              <div className="bg-zinc-900 border border-purple-500/30 rounded-xl p-5 max-w-lg w-full text-center shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="flex items-center justify-center gap-2 text-purple-400 mb-3 font-bold font-mono text-xs tracking-widest">
                  <ShieldAlert size={14} /> FRIX UMPIRE
                </div>
                <p className="text-zinc-200 text-sm leading-relaxed mb-4">"{msg.text}"</p>
                <div className={`text-2xl font-black font-mono ${msg.aiScore! > 0 ? "text-blue-400" : msg.aiScore! < 0 ? "text-rose-400" : "text-zinc-400"}`}>
                  SCORE: {msg.aiScore! > 0 ? `+${msg.aiScore}` : msg.aiScore}
                </div>
              </div>
            ) : (
              <div className={`max-w-md rounded-2xl p-4 shadow-lg ${msg.team === "A" ? "bg-blue-950/40 border border-blue-500/20 text-blue-50" : "bg-rose-950/40 border border-rose-500/20 text-rose-50"}`}>
                <div className="text-xs font-bold opacity-60 mb-2 font-mono flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${msg.team === "A" ? "bg-blue-400" : "bg-rose-400"}`}></div>
                  {msg.user_id}
                </div>
                <p className="leading-relaxed text-sm">{msg.text}</p>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-zinc-900 border-t border-zinc-800 pb-8">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-3">
          {/* TEAM SELECTOR BUTTON */}
          <button
            type="button"
            onClick={() => setMyTeam(myTeam === "A" ? "B" : "A")}
            className={`px-4 py-4 rounded-xl font-black flex items-center gap-2 transition-all ${
              myTeam === "A" ? "bg-blue-600/20 text-blue-400 border border-blue-500/50" : "bg-rose-600/20 text-rose-400 border border-rose-500/50"
            }`}
          >
            <RefreshCw size={18} /> TEAM {myTeam}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isConnected}
            placeholder={isConnected ? "Type your argument..." : "Waiting for Server..."}
            className="flex-1 bg-zinc-950 border border-zinc-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!isConnected || !input.trim()}
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Send size={18} /> DEBATE
          </button>
        </form>
      </footer>
    </div>
  );
}