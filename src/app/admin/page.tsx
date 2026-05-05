"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Mail, Film, Settings, LogOut, Bell, Search, TrendingUp, Calendar, Save, Edit3, X, Image as ImageIcon } from "lucide-react";
import { movies } from "@/lib/movies";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hero, setHero] = useState({
    name: "Arun Venkatesh",
    title: "Bringing Stories to Life.",
    description: "Award-winning actor with over a decade of experience in film, television, and theater.",
    backgroundImage: "/hero.png",
    contactEmail: "arun@alexanderpierce.com",
    phone: "",
    address: "",
    socials: {
      instagram: "",
      twitter: "",
      imdb: "",
      whatsapp: "",
      facebook: ""
    },
    portfolio: {
      title: "Stills & Portraits",
      description: "Capturing the essence of every character through compelling imagery. My portfolio showcases a range of emotions and personas, from intense dramatic headshots to cinematic action stills.",
      features: [
        { title: "Versatile Expressions", description: "Expertise in diverse character ranges." },
        { title: "Cinematic Quality", description: "Professional stills from award-winning sets." }
      ],
      images: ["/hero.png", "/headshot_dramatic.png", "/poster1.png", "/character_action.png", "/poster2.png"]
    }
  });
  const [localMovies, setLocalMovies] = useState(movies);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("isAdmin");
    if (auth !== "true") {
      router.push("/login");
      return;
    }

    const fetchHero = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success) {
          setHero(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    const fetchMoviesData = async () => {
      try {
        const res = await fetch("/api/movies");
        const json = await res.json();
        if (json.success) {
          setLocalMovies(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchHero();
    fetchMoviesData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  const handleSaveHero = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero)
      });
      if (res.ok) {
        setMessage("Hero section updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddMovie = () => {
    setCurrentMovie({
      id: `movie-${Date.now()}`,
      title: "",
      year: new Date().getFullYear().toString(),
      role: "",
      genre: "",
      director: "",
      duration: "",
      language: "English",
      music: "",
      production: "",
      description: "",
      image: "/poster1.png",
      rating: "5.0/5",
      trailerUrl: "",
      watchTrailerUrl: ""
    });
    setIsMovieModalOpen(true);
  };

  const handleEditMovie = (movie: any) => {
    setCurrentMovie({ ...movie });
    setIsMovieModalOpen(true);
  };

  const handleDeleteMovie = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const updatedMovies = localMovies.filter(m => m.id !== id);
      setLocalMovies(updatedMovies);
      
      try {
        await fetch("/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMovies)
        });
        setMessage("Movie deleted!");
      } catch (error) {
        console.error("Failed to delete movie:", error);
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveMovie = async () => {
    if (!currentMovie.title) {
      alert("Movie title is required!");
      return;
    }
    
    let updatedMovies;
    const exists = localMovies.find(m => m.id === currentMovie.id);
    if (exists) {
      updatedMovies = localMovies.map(m => m.id === currentMovie.id ? currentMovie : m);
    } else {
      updatedMovies = [...localMovies, currentMovie];
    }

    setLocalMovies(updatedMovies);
    setIsMovieModalOpen(false);
    setIsSaving(true);

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovies)
      });
      if (res.ok) {
        setMessage(exists ? "Movie updated!" : "Movie added!");
      }
    } catch (error) {
      console.error("Failed to save movie:", error);
    } finally {
      setIsSaving(false);
    }
    
    setTimeout(() => setMessage(""), 3000);
  };

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
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "dashboard" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("hero")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "hero" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Edit3 size={20} /> Edit Hero
          </button>
          <button 
            onClick={() => setActiveTab("movies")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "movies" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Film size={20} /> Movies
          </button>
          <button 
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "portfolio" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <ImageIcon size={20} /> Portfolio
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "messages" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Mail size={20} /> Messages
            <span className="ml-auto bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "settings" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Settings size={20} /> Settings
          </button>
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
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
            {message && <span className="text-green-400 text-sm font-medium animate-pulse">{message}</span>}
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                <img src={hero.backgroundImage} alt={hero.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{hero.name}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                  <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
                </div>
                <button 
                  onClick={() => setActiveTab("movies")}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  + New Movie
                </button>
              </div>

              {/* Hero Profile Card */}
              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5 mb-8 flex flex-col sm:flex-row items-center gap-6 group hover:border-primary/30 transition-all">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors flex-shrink-0">
                  <img src={hero.backgroundImage} alt={hero.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold">{hero.name}</h2>
                  <p className="text-primary text-sm font-medium uppercase tracking-widest">{hero.title}</p>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2 max-w-2xl">{hero.description}</p>
                </div>
                <button 
                  onClick={() => setActiveTab("hero")}
                  className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-sm font-bold uppercase tracking-wider"
                >
                  Edit Profile
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <button 
                  onClick={() => setActiveTab("analytics")}
                  className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5 text-left hover:border-primary/50 transition-all group"
                  suppressHydrationWarning
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <TrendingUp size={24} />
                    </div>
                    <span className="text-green-400 text-sm font-medium">+12%</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">24.5k</h3>
                  <p className="text-gray-400 text-sm">Profile Views</p>
                </button>
                
                <button 
                  onClick={() => setActiveTab("movies")}
                  className={`bg-[#0a0a0a] p-6 rounded-xl border border-white/5 text-left hover:border-primary/50 transition-all group`}
                  suppressHydrationWarning
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Film size={24} />
                    </div>
                    <span className="text-green-400 text-sm font-medium">+2</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{movies.length}</h3>
                  <p className="text-gray-400 text-sm">Total Movies</p>
                </button>

                <button 
                  onClick={() => setActiveTab("messages")}
                  className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5 text-left hover:border-primary/50 transition-all group"
                  suppressHydrationWarning
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Mail size={24} />
                    </div>
                    <span className="text-red-400 text-sm font-medium">-5%</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">128</h3>
                  <p className="text-gray-400 text-sm">Unread Inquiries</p>
                </button>

                <button 
                  onClick={() => setActiveTab("hero")}
                  className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5 text-left hover:border-primary/50 transition-all group"
                  suppressHydrationWarning
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-500/10 text-green-400 rounded-lg group-hover:bg-green-500/20 transition-colors">
                      <Users size={24} />
                    </div>
                    <span className="text-green-400 text-sm font-medium">+18%</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">1.2M</h3>
                  <p className="text-gray-400 text-sm">Social Followers</p>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries */}
                <div className="lg:col-span-2 bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Recent Inquiries</h2>
                    <a href="#" className="text-primary text-sm font-medium hover:underline">View All</a>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Jenkins", role: "Casting Director", subject: "Lead Role: The Horizon Project", time: "2 hours ago", unread: true },
                      { name: "Michael Chang", role: "Producer", subject: "Meeting confirmation for Tuesday", time: "5 hours ago", unread: true },
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

                {/* Upcoming */}
                <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Upcoming</h2>
                    <button className="text-gray-400 hover:text-white"><Settings size={16} /></button>
                  </div>
                  <div className="relative pl-6 border-l border-white/10 space-y-8">
                    {[
                      { title: "Script Reading", time: "Today, 2:00 PM", type: "Reading" },
                      { title: "GQ Photoshoot", time: "Tomorrow, 9:00 AM", type: "Press" },
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
            </>
          ) : activeTab === "movies" ? (
            <div className="max-w-6xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold">Manage Movies</h1>
                  <p className="text-gray-400 text-sm">Add, edit or remove your filmography and theater work.</p>
                </div>
                <button 
                  onClick={handleAddMovie}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  + Add Movie
                </button>
              </div>

              <div className="bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Movie</th>
                      <th className="px-6 py-4 font-semibold">Year</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Genre</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {localMovies.map((proj, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium">{proj.title}</td>
                        <td className="px-6 py-4 text-gray-400">{proj.year}</td>
                        <td className="px-6 py-4 text-gray-400">{proj.role}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">
                            {proj.genre}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <button 
                            onClick={() => handleEditMovie(proj)}
                            className="text-gray-400 hover:text-white text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteMovie(proj.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "portfolio" ? (
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold">Manage Portfolio</h1>
                  <p className="text-gray-400 text-sm">Update your stills, portraits, and portfolio descriptions.</p>
                </div>
                <button 
                  onClick={handleSaveHero}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Portfolio Content</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Section Title</label>
                      <input 
                        type="text" 
                        value={hero.portfolio?.title || ""} 
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, title: e.target.value}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Description</label>
                      <textarea 
                        rows={3} 
                        value={hero.portfolio?.description || ""}
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, description: e.target.value}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50 resize-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Career Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Total Films</label>
                      <input 
                        type="text" 
                        value={hero.portfolio?.stats?.films || ""} 
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, stats: {...(hero.portfolio.stats || {}), films: e.target.value}}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                        placeholder="e.g. 25+"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Awards Won</label>
                      <input 
                        type="text" 
                        value={hero.portfolio?.stats?.awards || ""} 
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, stats: {...(hero.portfolio.stats || {}), awards: e.target.value}}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                        placeholder="e.g. 12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Languages</label>
                      <input 
                        type="text" 
                        value={hero.portfolio?.stats?.languages || ""} 
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, stats: {...(hero.portfolio.stats || {}), languages: e.target.value}}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                        placeholder="e.g. English, Tamil"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Years Active</label>
                      <input 
                        type="text" 
                        value={hero.portfolio?.stats?.yearsActive || ""} 
                        onChange={(e) => setHero({...hero, portfolio: {...hero.portfolio, stats: {...(hero.portfolio.stats || {}), yearsActive: e.target.value}}})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                        placeholder="e.g. 10+ Years"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Portfolio Features</h3>
                  <div className="space-y-6">
                    {(hero.portfolio?.features || []).map((feature: any, idx: number) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">Feature {idx + 1} Title</label>
                          <input 
                            type="text" 
                            value={feature.title} 
                            onChange={(e) => {
                              const newFeatures = [...hero.portfolio.features];
                              newFeatures[idx].title = e.target.value;
                              setHero({...hero, portfolio: {...hero.portfolio, features: newFeatures}});
                            }}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400">Feature {idx + 1} Description</label>
                          <input 
                            type="text" 
                            value={feature.description} 
                            onChange={(e) => {
                              const newFeatures = [...hero.portfolio.features];
                              newFeatures[idx].description = e.target.value;
                              setHero({...hero, portfolio: {...hero.portfolio, features: newFeatures}});
                            }}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary/50" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Gallery Images (5)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {(hero.portfolio?.images || []).map((img: string, i: number) => (
                      <div key={i} className="space-y-2">
                        <div className="aspect-square bg-white/5 rounded-lg border border-white/10 overflow-hidden relative group">
                          <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity flex-col gap-2 p-2">
                            <label className="cursor-pointer bg-primary text-black text-[10px] font-bold uppercase py-1 px-2 rounded hover:bg-primary/80 transition-colors">
                              Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const newImages = [...hero.portfolio.images];
                                      newImages[i] = reader.result as string;
                                      setHero({...hero, portfolio: {...hero.portfolio, images: newImages}});
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <input 
                              type="text" 
                              value={img.startsWith('data:') ? 'Base64 Image' : img} 
                              readOnly
                              className="w-full bg-black/80 border border-white/20 text-[10px] rounded px-1 outline-none text-center truncate"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "messages" ? (
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold mb-2">Messages & Inquiries</h1>
              <p className="text-gray-400 mb-8">Manage your booking requests and press inquiries.</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Mail size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold mb-2">No messages selected</h3>
                <p className="text-gray-400">Select a message from the dashboard to view details here.</p>
              </div>
            </div>
          ) : activeTab === "settings" ? (
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold mb-2">System Settings</h1>
              <p className="text-gray-400 mb-8">Configure your portfolio site behavior and security.</p>
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Profile Visibility</h3>
                  <div className="flex items-center justify-between">
                    <span>Public Profile</span>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                  <h3 className="font-bold mb-4">Security</h3>
                  <button className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Change Password</button>
                </div>
              </div>
            </div>
          ) : activeTab === "analytics" ? (
            <div className="max-w-4xl">
              <h1 className="text-2xl font-bold mb-2">Detailed Analytics</h1>
              <p className="text-gray-400 mb-8">Insights into your profile performance and audience engagement.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[300px]">
                  <TrendingUp size={48} className="text-blue-500 mb-4 opacity-20" />
                  <p className="text-gray-500">Visitor demographics and traffic sources will appear here.</p>
                </div>
                <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[300px]">
                  <Users size={48} className="text-green-500 mb-4 opacity-20" />
                  <p className="text-gray-500">Audience growth and follower trends over time.</p>
                </div>
              </div>
            </div>
          ) : activeTab === "hero" ? (
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold">Edit Hero Section</h1>
                  <p className="text-gray-400 text-sm">Update the main information displayed on the front page.</p>
                </div>
                <button 
                  onClick={handleSaveHero}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <div className="space-y-6 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Actor Name</label>
                    <input 
                      type="text" 
                      value={hero.name}
                      onChange={(e) => setHero({...hero, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Contact Email</label>
                    <input 
                      type="email" 
                      value={hero.contactEmail}
                      onChange={(e) => setHero({...hero, contactEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Mobile Number</label>
                    <input 
                      type="text" 
                      value={hero.phone}
                      onChange={(e) => setHero({...hero, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Address</label>
                    <input 
                      type="text" 
                      value={hero.address}
                      onChange={(e) => setHero({...hero, address: e.target.value})}
                      placeholder="123 Street, City, Country"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-primary uppercase tracking-widest text-xs">Social Links & IDs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Instagram Full Link</label>
                      <input 
                        type="text" 
                        value={hero.socials?.instagram}
                        onChange={(e) => setHero({...hero, socials: {...hero.socials, instagram: e.target.value}})}
                        placeholder="https://instagram.com/yourprofile"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">WhatsApp Number or Link</label>
                      <input 
                        type="text" 
                        value={hero.socials?.whatsapp}
                        onChange={(e) => setHero({...hero, socials: {...hero.socials, whatsapp: e.target.value}})}
                        placeholder="https://wa.me/15551234567"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Facebook Full Link</label>
                      <input 
                        type="text" 
                        value={hero.socials?.facebook}
                        onChange={(e) => setHero({...hero, socials: {...hero.socials, facebook: e.target.value}})}
                        placeholder="https://facebook.com/yourprofile"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Hero Title</label>
                  <input 
                    type="text" 
                    value={hero.title}
                    onChange={(e) => setHero({...hero, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors text-xl font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Hero Description</label>
                  <textarea 
                    rows={4}
                    value={hero.description}
                    onChange={(e) => setHero({...hero, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Background Image</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="text" 
                        value={hero.backgroundImage}
                        onChange={(e) => setHero({...hero, backgroundImage: e.target.value})}
                        placeholder="Path or URL"
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:border-primary/50 outline-none transition-colors"
                      />
                    </div>
                    <div className="flex gap-4">
                      <label className="cursor-pointer px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                        <Edit3 size={16} />
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setHero({...hero, backgroundImage: reader.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <div className="w-20 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                        <img src={hero.backgroundImage} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Please select a tab from the sidebar.</p>
            </div>
          )}
        </div>
      </main>

      {/* Movie Modal */}
      {isMovieModalOpen && currentMovie && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsMovieModalOpen(false)} />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{localMovies.find(m => m.id === currentMovie.id) ? 'Edit Movie' : 'Add New Movie'}</h2>
              <button onClick={() => setIsMovieModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Movie Title</label>
                <input 
                  type="text" 
                  value={currentMovie.title}
                  onChange={(e) => setCurrentMovie({...currentMovie, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Release Year</label>
                <input 
                  type="text" 
                  value={currentMovie.year}
                  onChange={(e) => setCurrentMovie({...currentMovie, year: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Your Role</label>
                <input 
                  type="text" 
                  value={currentMovie.role}
                  onChange={(e) => setCurrentMovie({...currentMovie, role: e.target.value})}
                  placeholder="e.g. Lead Role"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Genre</label>
                <input 
                  type="text" 
                  value={currentMovie.genre}
                  onChange={(e) => setCurrentMovie({...currentMovie, genre: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Director</label>
                <input 
                  type="text" 
                  value={currentMovie.director}
                  onChange={(e) => setCurrentMovie({...currentMovie, director: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Duration</label>
                <input 
                  type="text" 
                  value={currentMovie.duration}
                  onChange={(e) => setCurrentMovie({...currentMovie, duration: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Language</label>
                <input 
                  type="text" 
                  value={currentMovie.language}
                  onChange={(e) => setCurrentMovie({...currentMovie, language: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Music Composer</label>
                <input 
                  type="text" 
                  value={currentMovie.music}
                  onChange={(e) => setCurrentMovie({...currentMovie, music: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Production House</label>
                <input 
                  type="text" 
                  value={currentMovie.production}
                  onChange={(e) => setCurrentMovie({...currentMovie, production: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Live Video Link (Embed URL)</label>
                <input 
                  type="text" 
                  value={currentMovie.trailerUrl}
                  onChange={(e) => setCurrentMovie({...currentMovie, trailerUrl: e.target.value})}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Watch Trailer Link (Button URL)</label>
                <input 
                  type="text" 
                  value={currentMovie.watchTrailerUrl}
                  onChange={(e) => setCurrentMovie({...currentMovie, watchTrailerUrl: e.target.value})}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Star Rating</label>
                <select 
                  value={currentMovie.rating || "9.0"}
                  onChange={(e) => setCurrentMovie({...currentMovie, rating: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors text-white"
                >
                  <option value="10.0" className="bg-[#111] text-white">10.0 - Masterpiece</option>
                  <option value="9.5" className="bg-[#111] text-white">9.5 - Outstanding</option>
                  <option value="9.0" className="bg-[#111] text-white">9.0 - Excellent</option>
                  <option value="8.5" className="bg-[#111] text-white">8.5 - Great</option>
                  <option value="8.0" className="bg-[#111] text-white">8.0 - Very Good</option>
                  <option value="7.5" className="bg-[#111] text-white">7.5 - Good</option>
                  <option value="7.0" className="bg-[#111] text-white">7.0 - Decent</option>
                  <option value="6.0" className="bg-[#111] text-white">6.0 - Average</option>
                  <option value="5.0" className="bg-[#111] text-white">5.0 - Mediocre</option>
                  <option value="4.5" className="bg-[#111] text-white">4.5 - Poor</option>
                  <option value="4.0" className="bg-[#111] text-white">4.0 - Below Average</option>
                  <option value="3.5" className="bg-[#111] text-white">3.5 - Bad</option>
                  <option value="3.0" className="bg-[#111] text-white">3.0 - Very Bad</option>
                  <option value="2.5" className="bg-[#111] text-white">2.5 - Horrible</option>
                  <option value="2.0" className="bg-[#111] text-white">2.0 - Terrible</option>
                  <option value="1.5" className="bg-[#111] text-white">1.5 - Awful</option>
                  <option value="1.0" className="bg-[#111] text-white">1.0 - Disaster</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-400">Movie Banner / Poster Image</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      value={currentMovie.image}
                      onChange={(e) => setCurrentMovie({...currentMovie, image: e.target.value})}
                      placeholder="Path or URL"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:border-primary/50 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex gap-4">
                    <label className="cursor-pointer px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <Edit3 size={16} />
                      Upload
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCurrentMovie({...currentMovie, image: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <div className="w-20 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                      <img src={currentMovie.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-gray-400">Synopsis / Description</label>
              <textarea 
                rows={4}
                value={currentMovie.description}
                onChange={(e) => setCurrentMovie({...currentMovie, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsMovieModalOpen(false)}
                className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-all font-bold uppercase tracking-wider text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveMovie}
                className="px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wider text-sm"
              >
                Save Movie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
