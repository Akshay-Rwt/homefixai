import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">HomeFix AI</span>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered home services booking platform. Get instant diagnostics and book professional services seamlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Providers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">AC Repair & Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plumbing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electrical Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Appliance Repair</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Deep Cleaning</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-violet-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-violet-400" />
                <span>support@homefixai.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-violet-400 mt-1" />
                <span>123 Tech Street, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 HomeFix AI. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2 md:mt-0">
            Built with RAG & AI Technology
          </p>
        </div>
      </div>
    </footer>
  )
}