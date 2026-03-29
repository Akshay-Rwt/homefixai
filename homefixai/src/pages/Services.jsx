import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, SlidersHorizontal, ArrowRight, Wrench } from 'lucide-react'
import { servicesData } from '../services/data'

const categories = ['All', 'Air Conditioning', 'Appliances', 'Cleaning', 'Plumbing', 'Electrical']

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const uniqueCategories = [...new Set(servicesData.map(s => s.category))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Our Services</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Browse our comprehensive range of home services or use our AI chatbot for instant recommendations
        </p>
        <Link
          to="/ai-chatbot"
          className="inline-flex items-center text-violet-600 font-semibold hover:text-violet-700"
        >
          Try AI Chatbot Instead
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-all"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Services
            </button>
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
        </p>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Service Image/Header */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="text-5xl mb-3">{service.image}</div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700">
                  {service.category}
                </span>
              </div>

              {/* Service Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-slate-600 text-sm line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-slate-600">
                    <span className="w-24">Duration:</span>
                    <span className="font-medium text-slate-900">{service.duration}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <span className="w-24">Provider:</span>
                    <span className="font-medium text-slate-900">{service.providerName}</span>
                  </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">₹{service.price}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-amber-500">⭐</span>
                    <span className="font-semibold text-slate-900">{service.rating}</span>
                  </div>
                </div>

                {/* Book Button */}
                <Link
                  to={`/booking?serviceId=${service.id}`}
                  className="block w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold text-center hover:opacity-90 transition-all"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Wrench className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No services found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search or filters, or use our AI chatbot for help
          </p>
          <Link
            to="/ai-chatbot"
            className="inline-flex items-center text-violet-600 font-semibold hover:text-violet-700"
          >
            Ask AI Assistant
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          Not sure which service you need?
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Describe your problem to our AI-powered diagnostic chatbot. We'll analyze your issue and recommend the perfect service.
        </p>
        <Link
          to="/ai-chatbot"
          className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all"
        >
          Start AI Chat
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  )
}