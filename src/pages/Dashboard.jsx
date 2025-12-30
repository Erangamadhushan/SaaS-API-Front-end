import { useState, useEffect,useContext } from "react";
import api from "../api/api";
import { menuItems, statsCards, recentOrders } from "../data/dashboard.data";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const { logout, logoutAll } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchData = async () => {
      const user = await api.get("/dashboard");
      setData(user.data.user);
      console.log("Dashboard data:", user.data);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      {data ? (
        <>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? "w-64" : "w-20"
              } bg-linear-to-b from-purple-600 to-purple-800 text-white transition-all duration-300 flex flex-col`}
            >
              {/* Logo */}
              <div className="p-6 items-center justify-between">
                <h1
                  className={`text-2xl font-bold ${!sidebarOpen && "hidden"}`}
                >
                  Dashboard
                </h1>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-white hover:bg-purple-700 p-2 rounded-lg transition"
                >
                  {sidebarOpen ? "◀" : "▶"}
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 px-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 hover:text-black rounded-lg mb-2 transition ${
                      activeMenu === item.id
                        ? "bg-white text-black bg-opacity-20 shadow-lg"
                        : "hover:bg-white hover:bg-opacity-10"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </button>
                ))}
              </nav>

              {/* User Profile */}
              <div className="p-4 border-t border-purple-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  {sidebarOpen && (
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-purple-200">Admin</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              {/* Header */}
              <div className="bg-white shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Welcome back, {data.email} 👋
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Here's what's happening with your business today
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <span className="text-2xl">🔔</span>
                      <span className="absolute top-1 right-1 w-3 h-3 bg-pink-500 rounded-full"></span>
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                      <span className="text-2xl">⚙️</span>
                    </button>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      <span className="text-2xl">logout</span>
                    </button>
                    <button
                      onClick={logoutAll}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      <span className="text-2xl">logout all</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {statsCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-gray-500 text-sm">{card.title}</p>
                          <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {card.value}
                          </h3>
                        </div>
                        <div
                          className={`w-12 h-12 bg-linear-to-br ${card.color} rounded-lg flex items-center justify-center text-2xl`}
                        >
                          {card.icon}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm font-medium">
                          {card.change}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                          vs last month
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Orders */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        Recent Orders
                      </h3>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                              Order ID
                            </th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                              Customer
                            </th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                              Product
                            </th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                              Amount
                            </th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium text-sm">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-gray-100 hover:bg-gray-50 transition"
                            >
                              <td className="py-4 px-4 text-sm font-medium text-gray-800">
                                {order.id}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-600">
                                {order.customer}
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-600">
                                {order.product}
                              </td>
                              <td className="py-4 px-4 text-sm font-medium text-gray-800">
                                {order.amount}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-700"
                                      : order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Activity & Quick Actions */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-linear-to-br from-purple-600 to-pink-500 rounded-xl shadow-sm p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition flex items-center space-x-3">
                          <span>➕</span>
                          <span>Add New User</span>
                        </button>
                        <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition flex items-center space-x-3">
                          <span>📦</span>
                          <span>Create Product</span>
                        </button>
                        <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 text-left transition flex items-center space-x-3">
                          <span>📊</span>
                          <span>View Reports</span>
                        </button>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800 font-medium">
                              New user registered
                            </p>
                            <p className="text-xs text-gray-500">
                              2 minutes ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800 font-medium">
                              Order #12349 completed
                            </p>
                            <p className="text-xs text-gray-500">
                              15 minutes ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800 font-medium">
                              Product added to inventory
                            </p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800 font-medium">
                              Payment received
                            </p>
                            <p className="text-xs text-gray-500">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
