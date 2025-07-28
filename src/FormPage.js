import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft } from 'lucide-react';
import { submitToAirtable } from './utils/airtable';

function FormPage({ onBack }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    salesChallenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Convert phone to number and prepare data for Airtable
      const airtableData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: parseInt(formData.phone.replace(/\D/g, '')), // Remove non-digits and convert to number
        company_size: formData.companySize,
        sales_challenges: formData.salesChallenges,
        // Status will be set to 'Pending' in the airtable.js file
      };

      const result = await submitToAirtable(airtableData);
      
      if (result.success) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          companySize: '',
          salesChallenges: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col justify-center items-center p-6">
      
      {/* Background Tie-Dye Color Splotches - Same as homepage */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
                 <motion.div
           className="absolute top-1/4 left-1/5 w-40 h-32 bg-blue-400 filter blur-3xl opacity-50"
           style={{ 
             borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
             transform: 'rotate(15deg)'
           }}
           animate={{
             scale: [1, 1.4, 1],
             opacity: [0.50, 0.65, 0.50],
             rotate: [15, 25, 15]
           }}
           transition={{
             duration: 8,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
                 <motion.div
           className="absolute bottom-1/4 right-1/5 w-48 h-36 bg-purple-500 filter blur-3xl opacity-45"
           style={{ 
             borderRadius: '45% 55% 65% 35% / 60% 40% 60% 40%',
             transform: 'rotate(-20deg)'
           }}
           animate={{
             scale: [1, 1.3, 1],
             opacity: [0.45, 0.60, 0.45],
             rotate: [-20, -10, -20]
           }}
           transition={{
             duration: 10,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 2
           }}
         />
                 <motion.div
           className="absolute bottom-1/3 left-1/3 w-36 h-40 bg-pink-400 filter blur-3xl opacity-48"
           style={{ 
             borderRadius: '70% 30% 50% 50% / 40% 70% 30% 60%',
             transform: 'rotate(45deg)'
           }}
           animate={{
             scale: [1, 1.5, 1],
             opacity: [0.48, 0.63, 0.48],
             rotate: [45, 55, 45]
           }}
           transition={{
             duration: 12,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 4
           }}
         />
                 <motion.div
           className="absolute top-2/3 right-1/6 w-32 h-28 bg-cyan-400 filter blur-3xl opacity-46"
           style={{ 
             borderRadius: '55% 45% 40% 60% / 65% 35% 65% 35%',
             transform: 'rotate(-30deg)'
           }}
           animate={{
             scale: [1, 1.2, 1],
             opacity: [0.46, 0.58, 0.46],
             rotate: [-30, -20, -30]
           }}
           transition={{
             duration: 6,
             repeat: Infinity,
             ease: "easeInOut",
             delay: 1
           }}
         />
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text">Firely.ai</h1>
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-text-subtle hover:text-text transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col justify-center items-center text-center space-y-8 pt-16 md:pt-20 pb-12 md:pb-16">
        
        {/* Contact Form Section */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
                Ready to Experience Mia?
              </h2>
              <p className="text-lg md:text-xl text-text-subtle max-w-2xl mx-auto">
                Fill out the form below and Mia will call you within 60 seconds to demonstrate her sales capabilities firsthand.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-bubble p-8 md:p-12 max-w-2xl mx-auto"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-text mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-text mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                {/* Email Row */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone & Company Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-text mb-2">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>

                {/* Sales Challenges */}
                <div>
                  <label htmlFor="salesChallenges" className="block text-sm font-medium text-text mb-2">
                    Tell us about your sales challenges (optional)
                  </label>
                  <textarea
                    id="salesChallenges"
                    name="salesChallenges"
                    value={formData.salesChallenges}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-text placeholder-text-subtle/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="What sales challenges are you facing? What's your current lead volume?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  {submitStatus === 'success' && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      🎉 Success! Mia will call you within 60 seconds.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      ❌ Something went wrong. Please try again or contact support.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`button-primary-neumorphic text-lg py-4 px-12 w-full md:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Phone size={20} fill="currentColor" />
                      <span>{isSubmitting ? 'Submitting...' : 'Get Called by Mia Now'}</span>
                    </span>
                  </motion.button>
                  <p className="text-xs text-text-subtle mt-3">
                    By submitting this form, you agree to receive a call from our AI agent Mia within 60 seconds.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default FormPage; 