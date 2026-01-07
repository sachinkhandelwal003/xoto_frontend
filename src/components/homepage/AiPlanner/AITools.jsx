import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  // Sidebar Icons
  LayoutGrid, Sparkles, Image as ImageIcon, 
  LogOut, Bell, Search, ArrowRight, 
  
  // Tool Icons
  Trees, Armchair, Home, 
  Sofa, BoxSelect, Wand2, 
  BrainCircuit, Lock
} from 'lucide-react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

// --- Mock Data for Tools ---
const toolsData = [
  {
    id: 'landscaping',
    title: 'AI Landscaping',
    description: 'Generative AI garden planning and vegetation render.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80', 
    route: '/aiPlanner/landscape',
    category: 'Design',
    icon: <Trees size={24} />,
    isNew: false,
    locked: false 
  },
  {
    id: 'interior',
    title: 'Interior Transformation',
    description: 'Redesign your room style instantly with Generative AI.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    route: '/aiPlanner/interior',
    category: 'Design',
    icon: <Armchair size={24} />,
    isNew: false,
    locked: false 
  },
  {
    id: 'exterior',
    title: 'Exterior Remodel',
    description: "Modernize home facades and curb appeal automatically.",
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    route: '/aiPlanner/exterior',
    category: 'Design',
    icon: <Home size={24} />,
    isNew: true,
    locked: true // Locked
  },
  {
    id: 'furniture',
    title: 'Smart Furniture Swap',
    description: 'Remove existing items and place new AI furniture.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    route: '/aiPlanner/furniture',
    category: 'Staging',
    icon: <Sofa size={24} />,
    isNew: true,
    locked: true // Locked
  },
  {
    id: 'virtual',
    title: 'Virtual Staging',
    description: 'Furnish empty rooms with realistic 3D assets.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    route: '/aiPlanner/staging',
    category: 'Staging',
    icon: <BoxSelect size={24} />,
    isNew: false,
    locked: true // Locked
  },
  {
    id: 'image',
    title: 'Image Enhancer',
    description: 'Upscale resolution and fix lighting with one click.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    route: '/aiPlanner/enhance',
    category: 'Present',
    icon: <Wand2 size={24} />,
    isNew: false,
    locked: true // Locked
  }
];

const categories = ['All', 'Design', 'Staging', 'Present'];

const AITools = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tools based on category and search
  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen font-sans bg-[var(--color-body)] overflow-hidden">
      
      {/* --- INJECT CSS VARIABLES --- */}
      <style>{`
        :root {
          --color-primary: #5C039B;
          --color-primary-dark: #3e0269;
          --color-body: #F8F9FC;
        }
        .tool-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* --- SIDEBAR --- */}
      <div 
        className="hidden lg:flex fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex-col transition-all duration-300 shadow-sm hover:shadow-xl"
        style={{ width: isSidebarHovered ? '260px' : '80px' }}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        {/* Sidebar Header / Logo */}
     <div className="h-24 flex items-center justify-center relative mb-4">
  {/* Wrapper jo icon aur text ko group karega */}
  <div className="flex items-center justify-center">
    
    {/* Logo Icon */}
    <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shrink-0 z-10 text-white shadow-lg">
      <BrainCircuit size={24} />
    </div>

    {/* Xoto Text - Iska width aur margin animate hoga */}
    <div 
      className={`overflow-hidden transition-all duration-300 flex items-center
        ${isSidebarHovered ? 'w-20 opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}
    >
      <span className="font-bold text-2xl tracking-tight text-gray-900 whitespace-nowrap">
        xoto
      </span>
    </div>
    
  </div>
</div>
        
        <div className="flex-1 flex flex-col gap-2 px-3">
           {/* Sidebar Items */}
           <div onClick={() => navigate('/')} className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <LayoutGrid size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Explore</span>
           </div>

           {/* Active State with Primary Color Background */}
           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer bg-[var(--color-primary)] text-white shadow-md">
             <Sparkles size={24} className="shrink-0" />
             <span className={`font-bold whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>AI Tools</span>
           </div>

           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <ImageIcon size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>My Designs</span>
           </div>
           
           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <Bell size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Notifications</span>
           </div>
        </div>

        <div className="p-4 mt-auto">
          <button className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 overflow-hidden">
            <LogOut size={20} />
            <span className={`whitespace-nowrap transition-all duration-300 ${isSidebarHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>Log Out</span>
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-full lg:ml-[80px] transition-all duration-300">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-40">
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                   <h1 className="text-3xl font-black text-gray-900 tracking-tight">AI Suite</h1>
                   <p className="text-gray-500 mt-1">Transform your property visuals with xoto AI engines.</p>
                </div>
                <div className="relative w-full md:w-80">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search tools..." 
                     className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
             </div>

             {/* Categories */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                     activeCategory === cat 
                       ? 'bg-black text-white shadow-lg' 
                       : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[var(--color-body)]">
           <div className="max-w-7xl mx-auto">
             
             {/* Tools Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <div 
                    key={tool.id}
                    onClick={() => !tool.locked && navigate(tool.route)}
                    className={`
                        group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 
                        ${tool.locked ? 'cursor-not-allowed grayscale-[0.5] opacity-90' : 'cursor-pointer tool-card-hover'}
                    `}
                  >

                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden bg-gray-100">
                       <img 
                          src={tool.image} 
                          alt={tool.title} 
                          className={`w-full h-full object-cover transition-transform duration-700 ${!tool.locked && 'group-hover:scale-110'}`} 
                       />
                       
                       {/* Overlay Gradient (Standard) */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                       {/* --- LOCKED OVERLAY (IMAGE ONLY) --- */}
                       {tool.locked && (
                         <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20">
                              <Lock size={14} /> Coming Soon
                            </span>
                         </div>
                       )}

                       {/* Badges */}
                       <div className="absolute top-4 right-4 flex gap-2 z-30">
                         {tool.isNew && !tool.locked && (
                           <span className="bg-[#10B981] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                             New
                           </span>
                         )}
                         <div className={`backdrop-blur-md p-1.5 rounded-lg text-white ${tool.locked ? 'bg-black/40' : 'bg-[var(--color-primary)]/80'}`}>
                            {tool.icon}
                         </div>
                       </div>
                       
                       {/* Hover Icon (only if unlocked) */}
                       {!tool.locked && (
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <Sparkles size={20} className="text-white" />
                           </div>
                       )}
                    </div>

                    {/* Content Area (Readable even if locked) */}
                    <div className="p-6">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-bold transition-colors ${!tool.locked ? 'text-gray-900 group-hover:text-[var(--color-primary)]' : 'text-gray-500'}`}>
                            {tool.title}
                          </h3>
                       </div>
                       <p className="text-gray-500 text-sm leading-relaxed mb-4">
                         {tool.description}
                       </p>
                       
                       {/* Button (Hidden if locked) */}
                       {!tool.locked ? (
                           <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                             <span>Launch Tool</span>
                             <ArrowRight size={16} />
                           </div>
                       ) : (
                           // Optional "Locked" Text indicator
                           <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                             <Lock size={14} />
                             <span>Currently Unavailable</span>
                           </div>
                       )}
                    </div>
                  </div>
                ))}
             </div>

             {/* Empty State */}
             {filteredTools.length === 0 && (
               <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                 <Search size={48} className="mb-4 opacity-50" />
                 <p className="text-lg font-medium">No tools found matching "{searchQuery}"</p>
               </div>
             )}

           </div>
           
           {/* Footer */}
           <div className="max-w-7xl mx-auto mt-12 text-center pb-8">
              <p className="text-gray-400 text-sm">© 2024 xoto. Powered by Generative AI.</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AITools;