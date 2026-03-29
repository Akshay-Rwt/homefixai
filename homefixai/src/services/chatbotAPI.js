import { servicesData } from './data.js'

/**
 * AI-Powered Diagnostic Chatbot Service
 * 
 * This service simulates the RAG (Retrieval-Augmented Generation) pipeline:
 * 1. User input is analyzed for keywords and intent
 * 2. Relevant services are retrieved from the knowledge base
 * 3. AI formulates a helpful response with service recommendations
 */

class ChatbotAPI {
  constructor() {
    this.knowledgeBase = servicesData
    this.conversationHistory = []
  }

  /**
   * Simple keyword matching to simulate vector embeddings
   * In production, this would use SentenceTransformers or OpenAI embeddings
   */
  calculateRelevanceScore(userInput, service) {
    const input = userInput.toLowerCase()
    const textToMatch = [
      service.name,
      service.description,
      service.category,
      ...service.keywords,
      ...service.symptoms
    ].join(' ').toLowerCase()

    let score = 0
    const words = input.split(/\s+/)

    // Exact phrase matching (higher weight)
    for (const phrase of service.symptoms) {
      if (input.includes(phrase.toLowerCase())) {
        score += 10
      }
    }

    // Keyword matching
    for (const word of words) {
      if (textToMatch.includes(word)) {
        score += 3
      }
    }

    // Category matching bonus
    if (textToMatch.includes(input) || input.includes(service.category.toLowerCase())) {
      score += 5
    }

    return score
  }

  /**
   * Retrieve relevant services based on user query
   * Simulates vector search in a real RAG system
   */
  retrieveServices(userInput) {
    const scoredServices = this.knowledgeBase.map(service => ({
      service,
      score: this.calculateRelevanceScore(userInput, service)
    }))

    // Sort by relevance score and return top matches
    scoredServices.sort((a, b) => b.score - a.score)

    const relevantServices = scoredServices
      .filter(item => item.score > 0)
      .slice(0, 3)
      .map(item => item.service)

    return relevantServices
  }

  /**
   * Generate AI response using retrieved services
   * In production, this would call OpenAI/Gemini API with a system prompt
   */
  generateResponse(userInput, relevantServices) {
    const input = userInput.toLowerCase()
    let response = ''

    // No relevant services found
    if (relevantServices.length === 0) {
      const suggestions = this.knowledgeBase
        .slice(0, 5)
        .map(s => s.name)
        .join(', ')
      return (
        `I couldn't find a specific service matching "${userInput}". ` +
        `Here are some popular services we offer: ${suggestions}. ` +
        `Could you describe your problem in more detail? For example, mention the appliance and what issue you're experiencing.`
      )
    }

    // Generate contextual response based on top service
    const topService = relevantServices[0]

    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! 👋 I'm your AI diagnostic assistant. Tell me what issue you're facing, and I'll recommend the right service. For example: "My AC isn't cooling properly" or "There's water leaking from my sink"`
    }

    // Build diagnostic response
    const diagnosis = this.formulateDiagnosis(input, topService)
    response += `${diagnosis}\n\n`

    // Add service recommendation
    response += `**I recommend:** ${topService.name}\n`
    response += `- ${topService.description}\n`
    response += `- 💰 Price: ₹${topService.price}\n`
    response += `- ⏱️ Duration: ${topService.duration}\n`
    response += `- ⭐ Provider: ${topService.providerName} (Rating: ${topService.rating})\n`

    // Add alternatives if available
    if (relevantServices.length > 1) {
      response += `\n**Alternative options:**\n`
      for (let i = 1; i < relevantServices.length; i++) {
        const alt = relevantServices[i]
        response += `- ${alt.name} (₹${alt.price})\n`
      }
    }

    // Call to action
    response += `\nWould you like me to add "${topService.name}" to your booking? Just say "Book it" or "Yes"!`

    return response
  }

  /**
   * Formulate diagnosis based on symptoms mentioned
   */
  formulateDiagnosis(input, service) {
    const symptoms = service.symptoms.filter(s => input.includes(w => s.toLowerCase().includes(w)))
    
    if (symptoms.length > 0) {
      return `Based on what you've described, this sounds like a **${service.category.toLowerCase()}** issue. The symptoms you mentioned match common problems we see with this type of service.`
    }

    const categoryIssues = {
      'Air Conditioning': 'AC issues can be caused by various factors including dust buildup, gas leaks, or component wear.',
      'Appliances': 'Appliance problems often result from regular wear and tear, but can usually be fixed by a professional.',
      'Cleaning': 'Professional cleaning can restore your items and extend their lifespan.',
      'Plumbing': 'Plumbing issues should be addressed quickly to prevent water damage.',
      'Electrical': 'Electrical problems require immediate professional attention for safety.'
    }

    return categoryIssues[service.category] || "I can help you find the right service for this issue."
  }

  /**
   * Main chat endpoint - simulates POST /ai-diagnosis
   */
  async chat(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Add to conversation history
    this.conversationHistory.push({ role: 'user', content: userMessage })

    // Retrieve relevant services (RAG retrieval step)
    const relevantServices = this.retrieveServices(userMessage)

    // Generate response (LLM generation step simulation)
    const aiResponse = this.generateResponse(userMessage, relevantServices)

    this.conversationHistory.push({ role: 'assistant', content: aiResponse })

    return {
      success: true,
      message: aiResponse,
      recommendedServices: relevantServices,
      topService: relevantServices[0] || null,
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Check if user wants to book a service
   */
  detectBookingIntent(message) {
    const bookingKeywords = ['book', 'yes', 'okay', 'sure', 'please', 'add', 'confirm', 'book it', 'do it']
    const negativeKeywords = ['no', 'dont', "don't", 'not', 'cancel']
    
    const msg = message.toLowerCase().trim()
    
    if (negativeKeywords.some(k => msg.includes(k))) {
      return false
    }
    
    return bookingKeywords.some(k => msg.includes(k))
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.conversationHistory
  }

  /**
   * Clear conversation
   */
  clearHistory() {
    this.conversationHistory = []
  }
}

// Export singleton instance
export const chatbotAPI = new ChatbotAPI()