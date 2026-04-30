import Link from "next/link";
import { LayoutDashboard, Users, Mail, Film, Settings, LogOut, Bell, Search, TrendingUp, Calendar } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="text-xl font-bold tracking-widest text-primary uppercase">
            Admin <span className="text-white">Panel</span>
          </Link>
        </div>
        
        <div className="flex-1 py-8 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Film size={20} /> Projects
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Mail size={20} /> Messages
            <span className="ml-auto bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Calendar size={20} /> Schedule
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Settings size={20} /> Settings
          </a>
        </div>

        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-medium transition-colors">
            <LogOut size={20} /> Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-8">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-6 ml-auto">
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-yellow-200"></div>
              <span className="text-sm font-medium hidden sm:block">Alexander P.</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              + New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <span className="text-green-400 text-sm font-medium">+12%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">24.5k</h3>
              <p className="text-gray-400 text-sm">Profile Views</p>
            </div>
            
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <Film size={24} />
                </div>
                <span className="text-green-400 text-sm font-medium">+2</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">42</h3>
              <p className="text-gray-400 text-sm">Total Projects</p>
            </div>

            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Mail size={24} />
                </div>
                <span className="text-red-400 text-sm font-medium">-5%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">128</h3>
              <p className="text-gray-400 text-sm">Unread Inquiries</p>
            </div>

            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                  <Users size={24} />
                </div>
                <span className="text-green-400 text-sm font-medium">+18%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">1.2M</h3>
              <p className="text-gray-400 text-sm">Social Followers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Messages */}
            <div className="lg:col-span-2 bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Recent Inquiries</h2>
                <a href="#" className="text-primary text-sm font-medium hover:underline">View All</a>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Sarah Jenkins", role: "Casting Director", subject: "Lead Role: The Horizon Project", time: "2 hours ago", unread: true },
                  { name: "Michael Chang", role: "Producer", subject: "Meeting confirmation for Tuesday", time: "5 hours ago", unread: true },
                  { name: "Emily Woods", role: "Press", subject: "Interview Request - GQ Magazine", time: "1 day ago", unread: false },
                  { name: "David Miller", role: "Agent", subject: "Updated script for Episode 4", time: "2 days ago", unread: false }
                ].map((msg, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-lg border ${msg.unread ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent'} hover:bg-white/5 transition-colors cursor-pointer`}>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-400 flex-shrink-0">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`font-medium text-sm truncate ${msg.unread ? 'text-white' : 'text-gray-300'}`}>{msg.name}</h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{msg.time}</span>
                      </div>
                      <p className="text-xs text-primary mb-1">{msg.role}</p>
                      <p className={`text-sm truncate ${msg.unread ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>{msg.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Upcoming</h2>
                <button className="text-gray-400 hover:text-white"><Settings size={16} /></button>
              </div>
              
              <div className="relative pl-6 border-l border-white/10 space-y-8">
                {[
                  { title: "Script Reading: Neon Shadows", time: "Today, 2:00 PM", type: "Reading" },
                  { title: "GQ Photoshoot", time: "Tomorrow, 9:00 AM", type: "Press" },
                  { title: "Meeting with Agent", time: "Wed, 11:30 AM", type: "Meeting" },
                  { title: "Flight to London", time: "Fri, 8:00 AM", type: "Travel" }
                ].map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 bg-[#0a0a0a] border-2 border-primary rounded-full"></div>
                    <p className="text-xs text-primary font-medium mb-1">{event.type}</p>
                    <h4 className="text-sm font-bold text-white mb-1">{event.title}</h4>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
