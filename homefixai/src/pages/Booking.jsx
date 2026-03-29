import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, User, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle, Wrench } from 'lucide-react'
import { servicesData } from '../services/data'

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const serviceId = searchParams.get('serviceId')
  
  const [selectedService, setSelectedService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  })
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (serviceId) {
      const service = servicesData.find(s => s.id === parseInt(serviceId))
      setSelectedService(service)
    }
  }, [serviceId])

  const availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ]

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep3()) {
      setIsSubmitted(true)
      // Simulate API call
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 3000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-2">
            Your {selectedService?.name} has been scheduled for{" "}
            <strong>{new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            {" "}at <strong>{formData.time}</strong>
          </p>
          <p className="text-slate-600 mb-6">
            We'll send a confirmation to <strong>{formData.email}</strong>
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-600">Booking Reference</p>
            <p className="text-xl font-mono font-bold text-slate-900">HF-{Date.now().toString().slice(-8)}</p>
          </div>
          <p className="text-sm text-slate-500">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Book a Service</h1>
        <p className="text-xl text-slate-600">
          {selectedService ? 'Complete your booking' : 'Select a service to get started'}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        <div className={`flex items-center ${step >= 1 ? 'text-violet-600' : 'text-slate-400'}`}>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 1 ? 'bg-violet-600 text-white' : 'bg-slate-200'
          }`}>
            {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
          </div>
          <span className="ml-2 font-medium">Service</span>
        </div>
        <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-violet-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-violet-600' : 'text-slate-400'}`}>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 2 ? 'bg-violet-600 text-white' : 'bg-slate-200'
          }`}>
            {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
          </div>
          <span className="ml-2 font-medium">Details</span>
        </div>
        <div className={`h-0.5 w-16 ${step >= 3 ? 'bg-violet-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center ${step >= 3 ? 'text-violet-600' : 'text-slate-400'}`}>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
            step >= 3 ? 'bg-violet-600 text-white' : 'bg-slate-200'
          }`}>
            {step > 3 ? <CheckCircle className="h-5 w-5" /> : '3'}
          </div>
          <span className="ml-2 font-medium">Schedule</span>
        </div>
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          {!selectedService && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">No service selected</p>
                <p className="text-sm text-amber-700">
                  Select from our popular services below or <a href="/ai-chatbot" className="underline">use AI Chatbot</a> to find the right service
                </p>
              </div>
            </div>
          )}

          {selectedService && (
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Selected Service</h3>
              <div className="flex items-start space-x-4">
                <div className="text-5xl">{selectedService.image}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-slate-900">{selectedService.name}</h4>
                  <p className="text-slate-600 mt-1">{selectedService.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">₹{selectedService.price}</span>
                      <span className="text-slate-500 ml-2">/ {selectedService.duration}</span>
                    </div>
                    <button
                      onClick={() => { if (validateStep2()) setStep(3) }}
                      className="px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {servicesData.slice(0, 6).map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedService?.id === service.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl shrink-0">{service.image}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{service.name}</h4>
                      <p className="text-sm text-slate-600 line-clamp-1">{service.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-slate-900">₹{service.price}</span>
                        <span className="text-xs text-slate-500">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Contact Details */}
      {step === 2 && selectedService && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Contact Details</h3>
          <form onSubmit={(e) => { e.preventDefault(); if (validateStep2()) setStep(3) }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    errors.name ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    errors.phone ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                  }`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  errors.email ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all flex items-center"
              >
                Continue
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && selectedService && (
        <div className="space-y-6">
          {/* Service Summary */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Booking Summary</h3>
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{selectedService.image}</div>
              <div>
                <p className="font-medium text-slate-900">{selectedService.name}</p>
                <p className="text-sm text-slate-600">{formData.name} • {formData.phone}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xl font-bold text-slate-900">₹{selectedService.price}</p>
              </div>
            </div>
          </div>

          {/* Schedule Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Select Date & Time</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={getTodayDate()}
                    max={getMaxDate()}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      errors.date ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                    }`}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      errors.time ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                    }`}
                  >
                    <option value="">Select a time slot</option>
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Service Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                    errors.address ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
                  }`}
                  placeholder="Enter your complete address with landmark"
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
                  placeholder="Any specific instructions for the service provider"
                ></textarea>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">
                    <strong>Free cancellation</strong> up to 24 hours before the scheduled time
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}