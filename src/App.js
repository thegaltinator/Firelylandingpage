import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Calendar, 
  DollarSign, 
  Phone, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { submitToAirtable } from './utils/airtable';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitToAirtable(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        console.log('Successfully submitted to Airtable:', result.recordId);
      } else {
        setSubmitError(typeof result.error === 'string' ? result.error : 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToForm = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Response",
      description: "AI calls prospects within seconds of form submission, not hours or days later."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Validation",
      description: "Advanced qualification ensures only high-intent prospects reach your closers."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Auto-Booking",
      description: "Seamlessly schedules appointments with your best closers when prospects are hot."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Self-Closing",
      description: "Handles lower-ticket sales automatically, maximizing your revenue potential."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Lead Submits Form",
      description: "Prospect fills out your website form or landing page"
    },
    {
      number: "2", 
      title: "AI Calls Instantly",
      description: "Our agent calls within seconds, not hours or days"
    },
    {
      number: "3",
      title: "Validates & Closes", 
      description: "Qualifies prospects and either books appointments or closes deals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-accent-900/10 to-primary-900/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h2 className="text-2xl font-bold">
                Firely<span className="text-primary-400">.ai</span>
              </h2>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-primary-400 transition-all duration-300 font-medium">Features</a>
              <a href="#how-it-works" className="hover:text-primary-400 transition-all duration-300 font-medium">How It Works</a>
              <a href="#pricing" className="hover:text-primary-400 transition-all duration-300 font-medium">Pricing</a>
              <button onClick={scrollToForm} className="button-primary">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect"
            >
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block hover:text-primary-400 transition-colors">Features</a>
                <a href="#how-it-works" className="block hover:text-primary-400 transition-colors">How It Works</a>
                <a href="#pricing" className="block hover:text-primary-400 transition-colors">Pricing</a>
                <button onClick={scrollToForm} className="button-primary w-full">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                AI Sales Agents That 
                <span className="block gradient-text">Never Sleep</span>
              </h1>
                              <p className="text-xl text-gray-300 leading-relaxed">
                  AI sales team that works 24/7 like they got a fire under their ass.
                  The moment a lead fills out your form, our AI agent calls them instantly. 
                  Validates prospects, books appointments, and closes deals. 
                  Built on NEPQ philosophy for maximum sales velocity.
                </p>
              <div className="space-y-4">
                <button onClick={scrollToForm} className="button-primary text-lg px-10 py-4">
                  <Phone className="w-6 h-6 inline mr-2" />
                  See If We Can Close You
                </button>
                <p className="text-gray-400 text-sm">Fill out the form below to experience our AI in action</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto">
                {/* Phone Screen Mockup */}
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden">
                      {/* Screen Content */}
                      <div className="bg-gradient-to-b from-dark-800 to-dark-900 h-[400px] flex flex-col justify-between p-6">
                        
                        {/* Top Status Bar */}
                        <div className="flex justify-between items-center text-white text-sm">
                          <span>9:41</span>
                          <div className="flex space-x-1">
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                          </div>
                        </div>

                        {/* Incoming Call UI */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                          <p className="text-white text-sm opacity-75">Incoming call</p>
                          
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">AI</span>
                            </div>
                            {/* Pulsing rings */}
                            {[1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                className="absolute inset-0 border-2 border-primary-400 rounded-full"
                                animate={{
                                  scale: [1, 2, 2.5],
                                  opacity: [0.6, 0.3, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.4,
                                }}
                              />
                            ))}
                          </div>

                          <div className="text-center">
                            <h3 className="text-white text-xl font-semibold">Firely AI Agent</h3>
                            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                          </div>

                          {/* Sound Wave Visualization */}
                          <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-gradient-to-t from-primary-400 to-accent-500 rounded-full"
                                style={{ height: '20px' }}
                                animate={{
                                  scaleY: [0.3, 1, 0.3],
                                  opacity: [0.4, 1, 0.4]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Call Action Buttons */}
                        <div className="flex justify-center space-x-12">
                          <motion.div 
                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-8 h-8 text-white" />
                          </motion.div>
                          <motion.div 
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          >
                            <Phone className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Firely.ai Closes More Deals
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-dark-700/30 via-dark-800/30 to-dark-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl card-hover relative overflow-hidden group"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-400/50 to-transparent"></div>
                  <div className="text-white relative z-10">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-300 relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How Firely.ai Works
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center max-w-xs"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                    viewport={{ once: true }}
                    className="hidden lg:block"
                  >
                    <ArrowRight className="w-8 h-8 text-gray-500" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Ready to See Firely.ai in Action?
            </h2>
            <p className="text-xl text-gray-300">
              Fill out this form and our AI will call you to demonstrate its capabilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-700/30 to-dark-800/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-300">{submitError}</p>
                  </motion.div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="w-full bg-dark-700/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="w-full bg-dark-700/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      required
                      className="w-full bg-dark-700/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      className="w-full bg-dark-700/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-dark-700/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300"
                  >
                    <option value="">Company Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="button-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 inline mr-2 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Phone className="w-6 h-6 inline mr-2" />
                      Get AI Demo Call
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h3>
                <p className="text-gray-300 mb-6">
                  Our AI agent will call you shortly to demonstrate its capabilities.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                    setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '' });
                  }}
                  className="button-primary"
                >
                  Submit Another
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Firely<span className="text-primary-400">.ai</span>
              </h3>
              <p className="text-gray-400">AI Sales Agents That Never Sleep</p>
            </div>
            <div className="flex space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Firely.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 