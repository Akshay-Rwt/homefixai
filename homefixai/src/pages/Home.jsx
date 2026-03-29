import { Link } from 'react-router-dom'
import { MessageCircle, Sparkles, Zap, Shield, Clock, ArrowRight, Wrench, Phone, Mail } from 'lucide-react'
import { servicesData } from '../services/data'

export default function Home() {
  const featuredServices = servicesData.slice(0, 6)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">AI-Powered Diagnostics</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Home Services Made
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Smarter with AI
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-xl">
                Just describe your problem to our AI chatbot. We'll diagnose the issue and recommend the perfect service in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-chatbot"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Try AI Chatbot
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Browse Services
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-white/70 text-sm">Services</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-white/70 text-sm">Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-white/70 text-sm">Rating</p>
                </div>
              </div>
            </div>

            {/* Chat Demo Card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">HomeFix AI</p>
                    <p className="text-xs text-green-500">● Online</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-slate-100 rounded-2xl rounded-br-none p-3 max-w-xs">
                    <p className="text-sm text-slate-700">"My washing machine is making a loud banging noise when it spins."</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl rounded-bl-none p-3 max-w-sm">
                    <p className="text-sm text-white">
                      It sounds like a drum alignment issue. I recommend <strong>Washing Machine Drum Checkup</strong> (₹499). Shall I add this to your booking?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose HomeFix AI?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the future of home services with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Diagnostics</h3>
            <p className="text-slate-600">
              Our AI understands your problem and recommends the right service in seconds. No more searching through menus.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Verified Professionals</h3>
            <p className="text-slate-600">
              All our service providers are thoroughly vetted and trained. Get quality service from trusted experts.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Quick Turnaround</h3>
            <p className="text-slate-600">
              Book services instantly and get them done fast. Most services are completed within 1-2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Popular Services
              </h2>
              <p className="text-slate-600">Most booked services this month</p>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center text-violet-600 font-semibold hover:text-violet-700"
            >
              View All
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                to={`/booking?serviceId=${service.id}`}
                className="group p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl hover:border-violet-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.image}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">₹{service.price}</span>
                    <span className="text-slate-500 text-sm ml-1">/ {service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <span>⭐</span>
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/services"
              className="inline-flex items-center text-violet-600 font-semibold hover:text-violet-700"
            >
              View All Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Fix Your Home Issues?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our AI diagnose your problem and find the right service in seconds.
            </p>
            <Link
              to="/ai-chatbot"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all shadow-xl"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start AI Chat Now
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Need Help Right Away?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Our support team is available 24/7 to assist you with any queries or emergencies.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Call Us</h3>
                  <p className="text-slate-600">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email Us</h3>
                  <p className="text-slate-600">support@homefixai.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Quick Contact Form</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              />
              <textarea
                placeholder="Describe your issue"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}