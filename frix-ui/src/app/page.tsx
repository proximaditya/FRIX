"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Flame, Trophy, Users, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { syncAndGetUser } from "@/actions/user";

// Mock Data for the Social Feed
const LIVE_DEBATES = [
  { id: "tech-debate", title: "Go vs Node.js for Backend Scale", teamA: "@Aditya", teamB: "@Prime", viewers: 2543, tag: "Tech" },
  { id: "ai-future", title: "AGI will arrive before 2030", teamA: "@SamA", teamB: "@Elon", viewers: 8902, tag: "AI" },
  { id: "gaming-01", title: "GTA 6 will disappoint fans", teamA: "@GamerX", teamB: "@SonyFan", viewers: 1204, tag: "Gaming" },
];

const PAST_RESULTS = [
  { id: "past-1", title: "React vs Vue", winner: "Team A (@Aditya)", score: "+45 AI | 80% Crowd", time: "2 hours ago" },
  { id: "past-2", title: "Is Web3 dead?", winner: "Team B (@CryptoBro)", score: "+12 AI | 55% Crowd", time: "5 hours ago" },
];

export default function SocialLobby() {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const data = await syncAndGetUser();
      setDbUser(data);
    }
    loadUser();
  }, []);

  const winRate = dbUser && dbUser.totalMatches > 0 
    ? Math.round((dbUser.wins / dbUser.totalMatches) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      <nav className="p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-400">
            FRIX.ai
          </h1>
          
          <div className="flex-1 max-w-md mx-8 relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search debaters, topics, or arenas..." 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-bold text-zinc-400">
              Welcome, {user?.firstName || "Debater"}
            </span>
            <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full font-bold text-sm transition-colors border border-zinc-700">
              <Trophy size={16} className="text-yellow-400" /> {dbUser ? dbUser.eloRating : "..."} ELO
            </button>
            {/* 🔥 FIXED FOR CLERK V5 */}
            <UserButton fallbackRedirectUrl="/" />
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <Flame className="text-rose-500" /> LIVE ARENAS
            </h2>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-sm transition-colors">
              <PlusCircle size={18} /> CREATE ARENA
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIVE_DEBATES.map((debate, i) => (
              <motion.div 
                key={debate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-5 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-bl-lg tracking-wider animate-pulse">
                  LIVE
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded uppercase tracking-wider">
                    {debate.tag}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400 text-xs font-mono">
                    <Users size={14} /> {debate.viewers.toLocaleString()}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-4 group-hover:text-purple-300 transition-colors">{debate.title}</h3>
                <div className="flex justify-between items-center text-sm font-mono bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-blue-400">{debate.teamA}</span>
                  <span className="text-zinc-600 font-black italic">VS</span>
                  <span className="text-rose-400">{debate.teamB}</span>
                </div>
                
                <Link href={`/arena/${debate.id}`} className="mt-4 w-full flex items-center justify-center gap-2 bg-zinc-800 group-hover:bg-purple-600 text-white py-2 rounded-lg font-bold text-sm transition-all">
                  JOIN AS SPECTATOR <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-rose-500"></div>
             <h2 className="text-lg font-black mb-1">@{dbUser ? dbUser.username : "Loading..."}</h2>
             <p className="text-zinc-400 text-sm mb-4">"Ready to enter the FRIX Arena."</p>
             
             <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center">
                 <div className="text-2xl font-black text-emerald-400">{winRate}%</div>
                 <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Win Rate</div>
               </div>
               <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center">
                 <div className="text-2xl font-black text-purple-400">{dbUser ? dbUser.mvpMedals : 0}</div>
                 <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">MVP Medals</div>
               </div>
             </div>
          </div>

          <div>
            <h2 className="text-lg font-black mb-4 flex items-center gap-2">
              PAST BATTLES
            </h2>
            <div className="space-y-3">
              {PAST_RESULTS.map((past) => (
                <div key={past.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-sm">{past.title}</span>
                    <span className="text-xs text-zinc-500">{past.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-400 font-mono text-xs">Winner: {past.winner}</span>
                    <span className="text-zinc-400 font-mono text-xs">{past.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}