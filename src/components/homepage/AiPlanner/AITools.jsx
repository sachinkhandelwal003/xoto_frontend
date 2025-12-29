import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Sparkles, Image as ImageIcon, 
  LayoutDashboard, LogOut, Bell, 
  Search, ArrowRight, Wand2, Armchair, 
  Trees, ScanLine, Layers, MonitorPlay 
} from 'lucide-react';
import { Typography, Badge, Input, Tag } from 'antd';

const { Title, Text } = Typography;

// --- Mock Data for Tools ---
const toolsData = [
  {
    id: 'interior',
    title: 'Interior Transformation',
    description: 'Redesign your room instantly with AI.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    route: '/aiPlanner/interior',
    category: 'Design',
    icon: <Armchair size={20} />,
    isNew: false
  },
  {
    id: 'exterior',
    title: 'Exterior Upgrade',
    description: "Refresh your home's curb appeal.",
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    route: '/aiPlanner/exterior',
    category: 'Design',
    icon: <Home size={20} />,
    isNew: true
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    description: 'Upgrade your garden with AI.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80', // Garden image
    route: '/aiPlanner/landscape', // LINKED TO YOUR PREVIOUS COMPONENT
    category: 'Design',
    icon: <Trees size={20} />,
    isNew: false
  },
  {
    id: 'furniture',
    title: 'Smart Furniture Swap',
    description: 'See chosen furniture in your space.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    route: '/aiPlanner/furniture',
    category: 'Staging',
    icon: <Layers size={20} />,
    isNew: true
  },
  {
    id: 'virtual',
    title: 'Virtual Design Studio',
    description: 'Furnish empty rooms automatically.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    route: '/aiPlanner/virtual',
    category: 'Staging',
    icon: <MonitorPlay size={20} />,
    isNew: false
  },
  {
    id: 'image',
    title: 'Image Perfection',
    description: 'Enhance lighting and resolution.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    route: '/aiPlanner/image',
    category: 'Present',
    icon: <ScanLine size={20} />,
    isNew: false
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
          --color-primary-light: #F3E8FF;
          --color-body: #F8F9FC;
        }
        .tool-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* --- SIDEBAR (Matches previous style) --- */}
      <div 
        className="hidden lg:flex fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex-col transition-all duration-300 shadow-sm hover:shadow-xl"
        style={{ width: isSidebarHovered ? '260px' : '80px' }}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className="h-24 flex items-center justify-center relative mb-4">
           <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shrink-0 z-10">
             <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full"/>
                <div className="w-1 h-6 bg-white rounded-full"/>
                <div className="w-1 h-4 bg-white rounded-full"/>
             </div>
           </div>
           <span className={`ml-3 font-bold text-xl tracking-tight text-gray-900 absolute left-20 transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0'}`}>
             Ideal House
           </span>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 px-3">
           {/* Sidebar Items */}
           <div onClick={() => navigate('/')} className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <Home size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Explore</span>
           </div>

           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer bg-[var(--color-primary-light)] text-[var(--color-primary)]">
             <Sparkles size={24} className="shrink-0" />
             <span className={`font-bold whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>AI Tools</span>
           </div>

           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <LayoutDashboard size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Post</span>
           </div>
           
           <div className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
             <Bell size={24} className="shrink-0" />
             <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Notifications</span>
           </div>
        </div>

        <div className="p-4 mt-auto">
          <button className="w-full bg-[#ff4d6d] hover:bg-[#ff3355] text-white py-3 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 overflow-hidden">
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
                   <h1 className="text-3xl font-black text-gray-900 tracking-tight">AI Tools</h1>
                   <p className="text-gray-500 mt-1">Transform your real estate visuals with our suite of AI engines.</p>
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
                    onClick={() => navigate(tool.route)}
                    className="group bg-white rounded-3xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm transition-all duration-300 tool-card-hover relative"
                  >
                    {/* Image Area */}
                    <div className="h-56 relative overflow-hidden bg-gray-100">
                       <img 
                          src={tool.image} 
                          alt={tool.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       
                       {/* Overlay Gradient */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                       {/* Badges */}
                       <div className="absolute top-4 right-4 flex gap-2">
                         {tool.isNew && (
                           <span className="bg-[#10B981] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                             New
                           </span>
                         )}
                         <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg text-white">
                            {tool.icon}
                         </div>
                       </div>
                       
                       {/* Simulate 'Before/After' slider handle visually */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Wand2 size={18} className="text-white" />
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                            {tool.title}
                          </h3>
                       </div>
                       <p className="text-gray-500 text-sm leading-relaxed mb-4">
                         {tool.description}
                       </p>
                       
                       <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span>Launch Tool</span>
                          <ArrowRight size={16} />
                       </div>
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
           
           {/* Footer Footer */}
           <div className="max-w-7xl mx-auto mt-12 text-center">
              <p className="text-gray-400 text-sm">© 2024 Ideal House AI. Transforming spaces intelligently.</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AITools;