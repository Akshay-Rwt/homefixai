import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, MessageCircle, X, Copy, ThumbsUp, Lightbulb, Calendar, CheckCircle } from 'lucide-react'
import { chatbotAPI } from '../services/chatbotAPI'
import { useNavigate } from 'react-router-dom'

const exampleQueries = [
  { text: "My AC isn't cooling properly", icon: "❄️" },
  { text: "Washing machine making loud noise", icon: "🧺" },
  { text: "Sink water not draining", icon: "🚿" },
  { text: "Sofa has stains from party", icon: "🛋️" }
]

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! 👋 I'm your AI diagnostic assistant for home services. Tell me what issue you're facing, and I'll recommend the right service. For example: \"My AC isn't cooling\" or \"There's water leaking from my sink\""
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recommendedService, setRecommendedService] = useState(null)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await chatbotAPI.chat(userMessage)
      
      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        services: response.recommendedServices,
        topService: response.topService
      }

      setMessages(prev => [...prev, assistantMessage])
      
      if (response.topService) {
        setRecommendedService(response.topService)
      }

      // Check if user wants to book
      if (chatbotAPI.detectBookingIntent(userMessage) && recommendedService) {
        setTimeout(() => {
          navigate(`/booking?serviceId=${recommendedService.id}`)
        }, 1000)
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble processing your request. Please try again or contact our support team."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (query) => {
    setInput(query)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const handleBookService = (serviceId) => {
    navigate(`/booking?serviceId=${serviceId}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-slate-900">AI Diagnostic Chatbot</h1>
            <p className="text-slate-600">Powered by RAG & LLM Technology</p>
          </div>
        </div>
        
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Simply describe your home issue, and our AI will diagnose the problem and recommend the perfect service for you.
        </p>
      </div>

      {/* Tech Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl mb-2">🧠</div>
          <p className="text-sm font-medium text-slate-900">LLM Powered</p>
          <p className="text-xs text-slate-500">Natural Language Understanding</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl mb-2">📚</div>
          <p className="text-sm font-medium text-slate-900">RAG System</p>
          <p className="text-xs text-slate-500">Retrieval-Augmented Generation</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl mb-2">🔍</div>
          <p className="text-sm font-medium text-slate-900">Semantic Search</p>
          <p className="text-xs text-slate-500">Intent-based Matching</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <div className="text-2xl mb-2">⚡</div>
          <p className="text-sm font-medium text-slate-900">Instant Results</p>
          <p className="text-xs text-slate-500">Real-time Recommendations</p>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {/* Avatar */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-violet-500 to-indigo-600'
                    : 'bg-gradient-to-br from-indigo-500 to-violet-600'
                }`}>
                  {msg.role === 'user' ? (
                    <span className="text-white text-lg">👤</span>
                  ) : (
                    <MessageCircle className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Message */}
                <div className={`rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-violet-600">HomeFix AI</span>
                      {msg.topService && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                          ✓ Service Found
                        </span>
                      )}
                    </div>
                  )}
                  
                  {msg.content.split('\n').map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-2 last:mb-0 whitespace-pre-wrap">
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong>{line.slice(2, -2)}</strong>
                      ) : line.startsWith('-') ? (
                        <span className="block ml-4">• {line.slice(1)}</span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}

                  {/* Service Recommendation Card */}
                  {msg.topService && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-200">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{msg.topService.image}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{msg.topService.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{msg.topService.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <span className="text-xl font-bold text-slate-900">₹{msg.topService.price}</span>
                              <span className="text-sm text-slate-500 ml-1">/ {msg.topService.duration}</span>
                            </div>
                            <button
                              onClick={() => handleBookService(msg.topService.id)}
                              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-green-600 transition-colors"
                        title="Helpful"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Example Queries (shown when only welcome message) */}
          {messages.length === 1 && !isLoading && (
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-500 mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Try asking about:
              </p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(item.text)}
                    className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all text-sm"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSend} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your home issue..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-2 text-center">
            This AI uses semantic matching and predefined patterns for demonstration. In production, it would use real LLM APIs.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">1. Describe Your Issue</h3>
          <p className="text-slate-600 text-sm">Tell us what's wrong in natural language. No technical knowledge required.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">2. AI Diagnoses</h3>
          <p className="text-slate-600 text-sm">Our RAG-powered AI analyzes your description and matches it to the right service.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">3. Book Instantly</h3>
          <p className="text-slate-600 text-sm">Receive a recommendation with price and duration. Book with one click.</p>
        </div>
      </div>
    </div>
  )
}