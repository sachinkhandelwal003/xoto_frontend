import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // === CHART DATA ===
  const salesData = [
    { name: 'Mon', sales: 2400, orders: 24 },
    { name: 'Tue', sales: 3210, orders: 32 },
    { name: 'Wed', sales: 2800, orders: 28 },
    { name: 'Thu', sales: 3980, orders: 40 },
    { name: 'Fri', sales: 4500, orders: 45 },
    { name: 'Sat', sales: 5200, orders: 52 },
    { name: 'Sun', sales: 3800, orders: 38 },
  ];

  const categoryData = [
    { name: 'Garden Tools', value: 35, color: '#10b981' },
    { name: 'Plants & Seeds', value: 28, color: '#8b5cf6' },
    { name: 'Outdoor Decor', value: 20, color: '#f59e0b' },
    { name: 'Irrigation', value: 12, color: '#3b82f6' },
    { name: 'Services', value: 5, color: '#6b7280' },
  ];

  const freelancerStats = [
    { month: 'Jan', active: 45, completed: 120 },
    { month: 'Feb', active: 52, completed: 138 },
    { month: 'Mar', active: 48, completed: 142 },
    { month: 'Apr', active: 61, completed: 165 },
    { month: 'May', active: 72, completed: 180 },
    { month: 'Jun', active: 68, completed: 192 },
  ];

  // === QUICK STATS ===
  const stats = [
    { label: 'Total Revenue', value: '$48,921', change: '+18.2%', trend: 'up', icon: 'fas fa-dollar-sign' },
    { label: 'Active Freelancers', value: '68', change: '+12%', trend: 'up', icon: 'fas fa-user-hard-hat' },
    { label: 'E-Commerce Orders', value: '1,234', change: '+22%', trend: 'up', icon: 'fas fa-shopping-cart' },
    { label: 'Landscaping Projects', value: '342', change: '+28%', trend: 'up', icon: 'fas fa-tree' },
    { label: 'Avg. Project Value', value: '$1,280', change: '+9%', trend: 'up', icon: 'fas fa-chart-line' },
    { label: 'Customer Ratings', value: '4.8★', change: '+0.3', trend: 'up', icon: 'fas fa-star' },
  ];

  const recentActivity = [
    { action: 'New landscaping project in Mumbai', user: 'Rajesh Kumar', time: '10 mins ago', icon: 'fas fa-seedling', color: 'text-green-600' },
    { action: 'Order #7892 - Garden Kit Delivered', user: 'Priya Sharma', time: '25 mins ago', icon: 'fas fa-truck', color: 'text-blue-600' },
    { action: 'Freelancer completed lawn design', user: 'Amit Patel', time: '1 hr ago', icon: 'fas fa-check-circle', color: 'text-purple-600' },
    { action: 'New review: 5★ for irrigation setup', user: 'Neha Gupta', time: '2 hrs ago', icon: 'fas fa-star', color: 'text-yellow-600' },
    { action: 'Bulk plant order #4451 processed', user: 'System', time: '3 hrs ago', icon: 'fas fa-box-open', color: 'text-indigo-600' },
  ];

  const quickActions = [
    { title: 'Add Product', icon: 'fas fa-plus-circle', path: '/ecommerce/products/new', bg: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Post Job', icon: 'fas fa-bullhorn', path: '/freelance/jobs/new', bg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: 'View Orders', icon: 'fas fa-clipboard-list', path: '/ecommerce/orders', bg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Manage Team', icon: 'fas fa-users-cog', path: '/admin/team', bg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ];

  const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#6b7280'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === PURPLE HEADER === */}
      <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="text-purple-200 text-sm mt-1">Landscaping Freelance & E-Commerce Platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-purple-800 text-white px-4 py-2 rounded-lg text-sm border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50 transition">
              <i className="fas fa-download mr-2"></i> Export
            </button>
            <button className="bg-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-500 transition flex items-center">
              <i className="fas fa-sync-alt mr-2"></i> Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* === QUICK ACTIONS === */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <a
              key={i}
              href={action.path}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
            >
              <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <i className={`${action.icon} ${action.iconColor} text-xl`}></i>
              </div>
              <span className="text-sm font-semibold text-gray-800">{action.title}</span>
            </a>
          ))}
        </div>

        {/* === STATS CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <i className={`${stat.icon} text-green-600 text-lg`}></i>
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* === CHARTS ROW === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales & Orders Line Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Orders Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6' }} name="Revenue ($)" />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === FREELANCER GROWTH BAR CHART === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Freelancer Growth (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={freelancerStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#8b5cf6" name="Active Freelancers" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="#10b981" name="Projects Completed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* === RECENT ACTIVITY === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <a href="/activity" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-50 ${act.color}`}>
                  <i className={`${act.icon} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate">
                    <span className="font-semibold">{act.user}</span>{' '}
                    <span className="font-normal text-gray-600">{act.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{act.time}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-ellipsis-h text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;