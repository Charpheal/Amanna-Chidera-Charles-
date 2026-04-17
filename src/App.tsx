/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Globe, 
  Zap, 
  Bot, 
  MessageSquare, 
  ShoppingCart,
  Users,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Feature, Testimonial, CartItem } from './types';

// Mock Data
const FEATURES: Feature[] = [
  {
    id: 'voice',
    title: 'Voice-powered interaction',
    description: 'Natural conversations with Chidera. Just speak, she listens and executes.',
    icon: 'Mic'
  },
  {
    id: 'ai',
    title: 'Smart AI integration',
    description: 'Deeply integrated with your business data to provide relevant, smart assistance.',
    icon: 'Bot'
  },
  {
    id: 'multi',
    title: 'Multilingual support',
    description: 'Fluent in English, Pidgin, and Igbo. Bringing technology to everyone.',
    icon: 'Globe'
  },
  {
    id: 'realtime',
    title: 'Real-time responses',
    description: 'Low latency interactions that feel like talking to a real human.',
    icon: 'Zap'
  },
  {
    id: 'shopping',
    title: 'Smart shopping assistant',
    description: 'Personalized recommendations and help finding exactly what you need.',
    icon: 'ShoppingBag'
  },
  {
    id: 'cart',
    title: 'Seamless add-to-cart',
    description: 'Voice-activated shopping experience. "Chidera, add this to my cart."',
    icon: 'ShoppingCart'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ada Obi',
    role: 'CEO, Lagos Retail Co.',
    content: 'Chidera has transformed how our customers interact with our store. The Pidgin support is a game-changer.',
    avatar: 'https://picsum.photos/seed/ada/100/100'
  },
  {
    id: '2',
    name: 'Chuka Eze',
    role: 'Founder, TechNext',
    content: 'The low latency and natural voice quality are incredible. It feels like the future of customer service.',
    avatar: 'https://picsum.photos/seed/chuka/100/100'
  },
  {
    id: '3',
    name: 'Sarah Adeyemi',
    role: 'Product Manager, ShopFast',
    content: 'Integration was seamless. Our cart conversion rates jumped by 15% since we added Chidera.',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  }
];

// Helper to get Icon
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = { Mic, Bot, Globe, Zap, ShoppingBag, ShoppingCart };
  const Icon = icons[name] || MessageSquare;
  return <Icon className={className} />;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: { name: string, price: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: Date.now().toString(), name: product.name, price: product.price, quantity: 1 }];
    });
    setDemoMessage(`"Chidera, added ${product.name} to your cart!"`);
    setTimeout(() => setDemoMessage(""), 3000);
  };

  const toggleDemo = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setDemoMessage("\"Kedu! I'm Chidera. How can I help you today?\"");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Mic className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Chidera <span className="text-violet-500">AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Demo</a>
            <a href="#testimonials" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Client Space</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-violet-600 text-[10px] flex items-center justify-center rounded-full text-white font-bold">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <a href="#demo" className="btn-primary flex items-center gap-2">
              Talk to Chidera
            </a>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">About</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Features</a>
              <a href="#demo" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Demo</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Client Space</a>
              <button 
                onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}
                className="flex items-center gap-4 text-2xl font-bold"
              >
                Cart ({cart.length})
              </button>
              <a href="#demo" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">
                Talk to Chidera
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                The Future of Voice Commerce
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Meet Chidera, Your <span className="text-violet-500">Multilingual</span> Voice Assistant.
              </h1>
              <p className="text-lg text-zinc-400 mb-10 max-w-lg">
                The first AI voice agent that speaks your language. Boost sales and engagement with intuitive, multilingual shopping experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#demo" className="btn-primary group flex items-center justify-center gap-2">
                  Try the Demo
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#about" className="btn-secondary flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 glass-card p-4 mx-auto max-w-sm aspect-square flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />
                
                {/* Simulated Waveform */}
                <div className="flex items-center gap-1.5 h-12 mb-8">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: isListening ? [10, 48, 20, 35, 15] : [10, 15, 10],
                        opacity: isListening ? 1 : 0.5
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.6, 
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 bg-violet-500 rounded-full"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
                    <Mic className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Chidera v2.0</h3>
                  <p className="text-sm text-zinc-400">Listening for "Chidera..."</p>
                </div>

                {/* Status bubble */}
                <AnimatePresence>
                  {demoMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute bottom-8 left-6 right-6 bg-zinc-900 border border-violet-500/30 p-4 rounded-xl shadow-xl"
                    >
                      <p className="text-sm font-medium text-violet-400 italic">{demoMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full -z-10 scale-110" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full -z-10 scale-150" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding bg-zinc-900/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Designed for the Next Generation of Commerce.</h2>
              <div className="space-y-6 text-zinc-400">
                <p>
                  Chidera is more than just a voice assistant; she is a powerful business partner designed to bridge the gap between technology and human conversation.
                </p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                    <Globe className="text-violet-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Local Context, Global Power</h4>
                    <p className="text-sm">With deep understanding of Pidgin and local dialects, Chidera reaches customers other AI assistants ignore.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                    <Users className="text-violet-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Empowering Small Businesses</h4>
                    <p className="text-sm">We provide enterprise-level AI capability to startups and retail stores at an affordable scale.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/tech1/400/500" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="glass-card p-6 aspect-square flex flex-col justify-end">
                  <p className="text-5xl font-bold text-violet-500 mb-2">98%</p>
                  <p className="text-sm text-zinc-400">Accuracy Rate</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="glass-card p-6 aspect-square flex flex-col justify-end">
                  <p className="text-5xl font-bold text-violet-500 mb-2">10ms</p>
                  <p className="text-sm text-zinc-400">Latency</p>
                </div>
                <img src="https://picsum.photos/seed/tech2/400/500" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Core Capabilities</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">Chidera is packed with features that make conversational commerce inevitable.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:bg-white/10 transition-colors group cursor-default"
                >
                  <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors">
                    <IconRenderer name={feature.icon} className="text-violet-500 group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="section-padding bg-zinc-900/50">
          <div className="max-w-5xl mx-auto glass-card overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-6">Talk to Chidera Now</h2>
                <p className="text-zinc-400 mb-8">
                  Experience the future of voice commerce. Click the mic and try saying "Add the premium headphones to my cart."
                </p>
                
                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => addToCart({ name: "Pro Headphones", price: 299 })}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Pro Headphones</p>
                        <p className="text-xs text-zinc-500">$299.00</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-600" />
                  </button>
                  <button 
                    onClick={() => addToCart({ name: "Smart Speaker", price: 149 })}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Smart Speaker</p>
                        <p className="text-xs text-zinc-500">$149.00</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-600" />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={toggleDemo}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 shadow-2xl shadow-red-500/50' : 'bg-violet-600 shadow-2xl shadow-violet-500/50 hover:scale-105'}`}
                  >
                    {isListening ? (
                      <X className="w-10 h-10 text-white" />
                    ) : (
                      <Mic className="w-10 h-10 text-white" />
                    )}
                    {isListening && (
                      <motion.div 
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-red-400 rounded-full"
                      />
                    )}
                  </button>
                </div>
                <p className="text-center text-xs text-zinc-500 mt-4 uppercase tracking-widest font-bold">
                  {isListening ? 'Listening...' : 'Click to start'}
                </p>
              </div>

              <div className="bg-zinc-950 p-8 flex flex-col justify-center items-center border-l border-white/5">
                <div className="w-full max-w-xs space-y-6">
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                      <p className="text-sm">How much are the headphones?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-violet-600 p-4 rounded-2xl rounded-br-none max-w-[80%] shadow-lg shadow-violet-500/20">
                      <p className="text-sm">The Pro Headphones go for $299. You want me to add it to your bag?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                      <p className="text-sm italic">"Chidera, add am for cart"</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-violet-600 p-4 rounded-2xl rounded-br-none max-w-[80%]">
                      <p className="text-sm">Done! I don add the Pro Headphones for your cart. Wetin again you need?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-zinc-400">Join the thousands of businesses scaling with Chidera.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="glass-card p-8 flex flex-col h-full">
                  <p className="text-zinc-300 mb-8 italic flex-grow">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-violet-500/30" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-zinc-900/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Let's build the future together.</h2>
              <p className="text-zinc-400 mb-10">
                Ready to integrate Chidera into your business? Our team is ready to help you set up and scale.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                    <Mail className="text-violet-500 w-5 h-5" />
                  </div>
                  <p className="text-zinc-300">hello@chidera.ai</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                    <MapPin className="text-violet-500 w-5 h-5" />
                  </div>
                  <p className="text-zinc-300">Victoria Island, Lagos</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                    <Phone className="text-violet-500 w-5 h-5" />
                  </div>
                  <p className="text-zinc-300">+234 800 CHIDERA</p>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-violet-600 transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-violet-600 transition-all">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-violet-600 transition-all">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <form className="glass-card p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-violet-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-violet-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-violet-500 outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-zinc-950">Integration Request</option>
                  <option className="bg-zinc-950">Enterprise Quote</option>
                  <option className="bg-zinc-950">Partnership Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-violet-500 outline-none transition-all" placeholder="Tell us about your business needs..." />
              </div>
              <button className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Mic className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">Chidera <span className="text-violet-500">AI</span></span>
          </div>
          
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>

          <p className="text-sm text-zinc-600">
            &copy; 2026 Chidera Technology Ltd. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold">Your Bag</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                    <p className="text-zinc-500">Your bag is empty.</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-violet-500 font-bold mt-4 hover:underline">
                      Keep shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-zinc-900 rounded-xl overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/seed/${item.name}/200/200`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <button 
                            onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                            className="text-zinc-600 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-500 mb-2">${item.price}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))}
                              className="px-3 py-1 hover:bg-white/5"
                            >-</button>
                            <span className="px-3 py-1 text-sm border-x border-white/10">{item.quantity}</span>
                            <button 
                              onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))}
                              className="px-3 py-1 hover:bg-white/5"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-zinc-900 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <button className="btn-primary w-full py-4 text-center text-lg">
                    Checkout with Chidera Pay
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
                    Secured by Chidera Security
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
