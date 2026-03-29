import { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Users, Star, CheckCircle, Clock, AlertCircle, Filter, MoreHorizontal, Wrench } from 'lucide-react'
import { providersData } from '../services/data'

const mockBookings = [
  { id: 'HF-12345678', service: 'Deep Clean AC', customer: 'Rahul Sharma', date: '2024-01-15', time: '10:00 AM', status: 'completed', amount: 599 },
  { id: 'HF-23456789', service: 'Washing Machine Drum Checkup', customer: 'Priya Patel', date: '2024-01-15', time: '2:00 PM', status: 'in-progress', amount: 499 },
  { id: 'HF-34567890', service: '5-Seater Sofa Shampoo Treatment', customer: 'Amit Kumar', date: '2024-01-16', time: '9:00 AM', status: 'pending', amount: 899 },
  { id: 'HF-45678901', service: 'Kitchen Sink Drain Unblock', customer: 'Sneha Reddy', date: '2024-01-16', time: '11:00 AM', status: 'pending', amount: 399 },
  { id: 'HF-56789012', service: 'AC Gas Refill', customer: 'Vikram Singh', date: '2024-01-17', time: '3:00 PM', status: 'scheduled', amount: 1299 },
  { id: 'HF-67890123', service: 'Ceiling Fan Installation', customer: 'Neha Gupta', date: '2024-01-18', time: '10:00 AM', status: 'scheduled', amount: 549 }
]

const statusColors = {
  completed: 'bg-green-100 text-green-700 border-green-200',
  'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  scheduled: 'bg-purple-100 text-purple-700 border-purple-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200'
}

const statusIcons = {
  completed: <CheckCircle className="h-4 w-4" />,
  'in-progress': <Clock className="h-4 w-4" />,
  pending: <AlertCircle className="h-4 w-4" />,
  scheduled: <Calendar className="h-4 w-4" />,
  cancelled: <AlertCircle className="h-4 w-4" />
}

export default function ProviderDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const provider = providersData[0] // Using first provider as example

  const filteredBookings = mockBookings.filter(booking => 
    selectedFilter === 'all' || booking.status === selectedFilter
  )

  const stats = {
    totalRevenue: mockBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.amount : 0), 0),
    totalBookings: mockBookings.length,
    pendingBookings: mockBookings.filter(b => b.status === 'pending').length,
    completedBookings: mockBookings.filter(b => b.status === 'completed').length,
    rating: provider.rating,
    reviews: provider.reviews
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Provider Dashboard</h1>
          <p className="text-slate-600">Welcome back, {provider.name}</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-violet-50 rounded-xl border border-violet-200">
          <Wrench className="h-5 w-5 text-violet-600" />
          <span className="font-semibold text-violet-700">{provider.specialty}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalBookings}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pendingBookings}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedBookings}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Rating</p>
              <p className="text-2xl font-bold text-slate-900">⭐ {stats.rating}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-slate-500">{stats.reviews} reviews</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Filters */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Recent Bookings</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table/List */}
        <div className="divide-y divide-slate-200">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {booking.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-slate-900">{booking.service}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${statusColors[booking.status]}`}>
                          {statusIcons[booking.status]}
                          <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                      <p className="text-slate-600">{booking.customer}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time}
                        </span>
                        <span className="font-semibold text-slate-900">₹{booking.amount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all">
                          Decline
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                          Accept
                        </button>
                      </>
                    )}
                    {booking.status === 'scheduled' && (
                      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                        Start Job
                      </button>
                    )}
                    {booking.status === 'in-progress' && (
                      <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all">
                        Complete
                      </button>
                    )}
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h3>
              <p className="text-slate-600">No bookings match the selected filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 transition-all cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">View Calendar</h3>
              <p className="text-sm text-slate-600">Manage your schedule</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 transition-all cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">View Customers</h3>
              <p className="text-sm text-slate-600">See your customer list</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-violet-300 transition-all cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Earnings</h3>
              <p className="text-sm text-slate-600">Track your income</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Integration Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Booking Dashboard</h3>
            <p className="text-white/80">
              Your services are automatically recommended to customers based on their issues through our AI diagnostic chatbot.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
            <span className="text-2xl">🤖</span>
            <span className="font-semibold">RAG Enabled</span>
          </div>
        </div>
      </div>
    </div>
  )
}