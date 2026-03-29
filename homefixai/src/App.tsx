import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Services from './pages/Services'
import AIChatbot from './pages/AIChatbot'
import Booking from './pages/Booking'
import ProviderDashboard from './pages/ProviderDashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-zinc-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App