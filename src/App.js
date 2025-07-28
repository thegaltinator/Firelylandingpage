import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FormPage from './FormPage';

// Smooth scroll function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showFormPage, setShowFormPage] = React.useState(false);

  // If form page should be shown, render FormPage component
  if (showFormPage) {
    return <FormPage onBack={() => setShowFormPage(false)} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative flex flex-col justify-center items-center p-6">
      
      {/* Background Tie-Dye Color Splotches */}
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
          <nav className="hidden md:flex items-center space-x-8 text-text-subtle font-medium">
            <button onClick={() => scrollToSection('features')} className="hover:text-text transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-text transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-text transition-colors">Contact</button>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-text-subtle font-medium hover:text-text transition-colors">Log in</button>
                          <button 
                className="button-primary-neumorphic flex items-center space-x-2"
                onClick={() => setShowFormPage(true)}
              >
                <span>Sign up</span>
                <ArrowRight size={16} />
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-text"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-white/20 z-20"
            >
              <div className="px-6 py-4 space-y-4">
                <button 
                  onClick={() => {
                    scrollToSection('features');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-text hover:text-text-subtle transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('how-it-works');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-text hover:text-text-subtle transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-text hover:text-text-subtle transition-colors"
                >
                  Contact
                </button>
                <div className="pt-4 border-t border-white/20">
                  <button className="block w-full text-left text-text-subtle hover:text-text transition-colors mb-3">
                    Log in
                  </button>
                  <button 
                    className="button-primary-neumorphic text-sm py-2 px-4 w-full"
                    onClick={() => {
                      setShowFormPage(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
                         </motion.div>
           )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col justify-center items-center text-center space-y-8 md:space-y-12 pt-16 md:pt-20 pb-12 md:pb-16">
        
        {/* Copy Section - Outside the bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl w-full"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-text mb-6 md:mb-8 px-4">
            An AI sales team that sells like it has a fire under its ass 24/7
          </h1>
          
          {/* iPhone-Style Call Interface - Moved between headline and subheadline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 md:mb-8"
          >
            
            {/* Signal Lines Coming from Bubble Edges */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top edge lines */}
              <motion.div
                className="absolute w-0.5 h-12 bg-gradient-to-t from-green-400 to-transparent origin-bottom"
                style={{ transform: 'translateY(-60px) translateX(-60px)' }}
                animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-0.5 h-12 bg-gradient-to-t from-green-400 to-transparent origin-bottom"
                style={{ transform: 'translateY(-60px) translateX(0px)' }}
                animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-0.5 h-12 bg-gradient-to-t from-green-400 to-transparent origin-bottom"
                style={{ transform: 'translateY(-60px) translateX(60px)' }}
                animate={{ opacity: [0, 1, 0], scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
              />
              
              {/* Side edge lines */}
              <motion.div
                className="absolute w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent origin-left"
                style={{ transform: 'translateX(-170px) translateY(-10px)' }}
                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-12 h-0.5 bg-gradient-to-l from-green-400 to-transparent origin-right"
                style={{ transform: 'translateX(170px) translateY(10px)' }}
                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
              />
            </div>

            {/* Glass Bubble - Much Longer iPhone Style */}
            <div className="glass-bubble w-96 sm:w-[28rem] h-24 sm:h-28 flex items-center px-6 sm:px-10 relative mx-auto">
              
              {/* iPhone Call Content */}
              <div className="flex items-center justify-between w-full relative z-10">
                {/* M Avatar - Left */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg relative">
                  M
                  
                  {/* Water ripple rings emanating from M avatar center */}
                  <div className="ripple ripple-1" />
                  <div className="ripple ripple-2" />
                  <div className="ripple ripple-3" />
                </div>

                {/* Call Info - Center */}
                <div className="text-center flex-1">
                  <div className="text-xs text-text-subtle font-medium mb-1">incoming call</div>
                  <div className="text-sm font-bold text-text">Mia from Firely 🔥</div>
                </div>
                
                {/* Call Actions - Right */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <motion.button
                    className="call-button-decline"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    className="call-button-accept cursor-pointer relative"
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "4px 4px 8px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.2), inset -1px -1px 2px rgba(0, 0, 0, 0.2), 0 0 0 rgba(34, 197, 94, 0.4)",
                        "6px 6px 12px rgba(0, 0, 0, 0.4), -3px -3px 8px rgba(255, 255, 255, 0.15), inset 2px 2px 4px rgba(255, 255, 255, 0.25), inset -2px -2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.6)",
                        "4px 4px 8px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.2), inset -1px -1px 2px rgba(0, 0, 0, 0.2), 0 0 0 rgba(34, 197, 94, 0.4)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    onClick={() => setShowFormPage(true)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <p className="text-base md:text-lg text-text-subtle max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
            Never tired, no sick days. Just relentless performance.
            Firely's AI agent engages, qualifies, and books meetings the second a lead comes in.
          </p>
          
          <motion.button 
            className="button-primary-neumorphic text-lg py-4 px-8 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFormPage(true)}
          >
            <span className="relative z-10">Let's Book a Demo</span>
          </motion.button>
        </motion.div>


        {/* Lower Copy Section */}
        <section id="features">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mt-8 md:mt-12 space-y-8 md:space-y-12 px-4"
        >
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text text-center">Lightning Fast Response</h3>
              <p className="text-text-subtle">Connect with leads in under 30 seconds. Strike while the iron's hot and capture interest at its peak.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text text-center">Smart Qualification</h3>
              <p className="text-text-subtle">Our AI asks the right questions to identify serious buyers and filter out time-wasters automatically.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text text-center">Revenue on Autopilot</h3>
              <p className="text-text-subtle">Close smaller deals instantly and book high-value prospects with your best closers automatically.</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-text">73%</div>
                <div className="text-sm text-text-subtle">Higher conversion rate</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text">4.2x</div>
                <div className="text-sm text-text-subtle">More qualified leads</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text">24/7</div>
                <div className="text-sm text-text-subtle">Never miss a lead</div>
              </div>
            </div>
          </div>


        </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24 bg-gradient-to-b from-transparent to-white/20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
                How Mia Closes Deals While You Sleep
              </h2>
              <p className="text-lg md:text-xl text-text-subtle max-w-3xl mx-auto">
                Our AI doesn't just make calls - it follows a proven sales methodology that converts leads into revenue 24/7.
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="glass-bubble p-8 text-center h-full relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl relative">
                    1
                    {/* Small ripple for visual interest */}
                    <div className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-0 animate-ping"></div>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-4">Lead Capture</h3>
                  <p className="text-text-subtle">
                    The moment someone fills out your form, Mia receives an instant alert with their information and intent level.
                  </p>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform -translate-y-1/2 z-0"></div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="glass-bubble p-8 text-center h-full relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl relative">
                    2
                    {/* Small ripple for visual interest */}
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full opacity-0 animate-ping animation-delay-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-4">Instant Contact</h3>
                  <p className="text-text-subtle">
                    Within 30 seconds, Mia calls the prospect with a personalized approach based on their form responses and behavior.
                  </p>
                </div>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-green-400 to-orange-500 transform -translate-y-1/2 z-0"></div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="glass-bubble p-8 text-center h-full relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl relative">
                    3
                    {/* Small ripple for visual interest */}
                    <div className="absolute inset-0 border-2 border-orange-400 rounded-full opacity-0 animate-ping animation-delay-1000"></div>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-4">Close or Book</h3>
                  <p className="text-text-subtle">
                    Mia either closes the deal on the spot for smaller tickets or books a meeting with your best closer for high-value prospects.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white/20 to-transparent">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text text-center">
                Ready to turn your leads into revenue?
              </h2>
              <p className="text-lg text-text-subtle max-w-2xl mx-auto">
                Join hundreds of businesses using Firely to close more deals, faster. 
                No contracts, no setup fees. Just results.
              </p>
              <p className="text-lg text-text-subtle">
                Not sure if you're sold yet?
              </p>
              <motion.button 
                className="button-primary-neumorphic text-lg py-4 px-8 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFormPage(true)}
              >
                <span className="relative z-10">See if Mia Can Close You</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold text-text">Firely.ai</h3>
              <p className="text-text-subtle max-w-md">
                Revolutionary AI call agents that validate leads and close deals 24/7. 
                Built for businesses that never want to miss an opportunity.
              </p>
              <div className="flex space-x-4">
                <button className="text-text-subtle hover:text-text transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-text-subtle hover:text-text transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-text-subtle hover:text-text transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text text-center md:text-left">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-text-subtle hover:text-text transition-colors">Features</a></li>
                <li><button className="text-text-subtle hover:text-text transition-colors">Integrations</button></li>
                <li><button className="text-text-subtle hover:text-text transition-colors">API</button></li>
                <li><button className="text-text-subtle hover:text-text transition-colors">Security</button></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text text-center md:text-left">Support</h4>
              <ul className="space-y-2">
                <li><button className="text-text-subtle hover:text-text transition-colors">Help Center</button></li>
                <li><button onClick={() => setShowFormPage(true)} className="text-text-subtle hover:text-text transition-colors">Contact</button></li>
                <li><button className="text-text-subtle hover:text-text transition-colors">Status</button></li>
                <li><button className="text-text-subtle hover:text-text transition-colors">Privacy</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-subtle text-sm">
              © 2024 Firely.ai. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-text-subtle hover:text-text transition-colors text-sm">Terms</button>
              <button className="text-text-subtle hover:text-text transition-colors text-sm">Privacy</button>
              <button className="text-text-subtle hover:text-text transition-colors text-sm">Cookies</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App; 