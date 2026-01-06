'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Database, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
  };

  const handleLogin = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  // ✅ FIXED: loading ONLY (no user block)
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
  <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent animate-pulse">
    Loading...
  </p>
</div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-indigo-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.15),transparent_70%)]" />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Professional Todo Manager
          </motion.div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-500/50 text-white font-medium transition"
            >
              Login
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition"
            >
              Sign Up
            </motion.button>
          </div>
        </nav>

        {/* Hero */}
        <main className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent mb-6"
          >
            Professional Todo Manager
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-cyan-300 mb-8 font-medium"
          >
            by Mahad Khan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 max-w-3xl mb-12"
          >
            A secure, persistent, and lightning-fast task management solution built
            for professionals who demand focus, privacy, and performance.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 mb-20">
            <button
              onClick={handleGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition"
            >
              Get Started / Sign Up
            </button>

            <button
              onClick={handleLogin}
              className="px-10 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:border-blue-500/50 transition"
            >
              Login
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {[
              { icon: Lock, title: 'Secure', desc: 'Your data stays private and encrypted.' },
              { icon: Database, title: 'Persistent', desc: 'Tasks saved and synced securely.' },
              { icon: Zap, title: 'Fast', desc: 'Instant updates with smooth UX.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.2 }}
                className="bg-black/60 border border-white/20 rounded-2xl p-8"
              >
                <f.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">{f.title}</h3>
                <p className="text-white/70">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </main>

        <footer className="py-10 text-center text-white/50">
          © {new Date().getFullYear()} Professional Todo Manager
        </footer>
      </div>
    </div>
  );
}
