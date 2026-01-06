'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName);
      router.push('/login');
    } catch (err: any) {
      let message = err.message || 'Registration failed. Please try again.';

      if (
        message.toLowerCase().includes('already exists') ||
        message.includes('email-already-in-use') ||
        message.includes('user_already_exists') ||
        err.code === 'auth/email-already-in-use'
      ) {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailTakenError = error?.includes('already registered');

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background glow layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-indigo-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.15),transparent_70%)]" />
      
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-0 w-96 h-96 rounded-full blur-3xl bg-blue-500/20" />
        <div className="absolute bottom-40 right-0 w-80 h-80 rounded-full blur-3xl bg-indigo-600/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-cyan-600/10" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-6 text-sm transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </motion.button>

        {/* Compact Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-30" />
          
          <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-2 text-white/60 text-sm">Join Professional Todo Manager today</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  <p>{error}</p>
                  {isEmailTakenError && (
                    <button
                      type="button"
                      onClick={() => router.push('/login')}
                      className="mt-3 w-full py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 font-medium transition text-sm"
                    >
                      Go to Sign In →
                    </button>
                  )}
                </div>
              )}

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="First name (optional)"
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border ${
                      errors.firstName ? 'border-red-500/50' : 'border-white/20'
                    } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-white/40`}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    {...register('lastName')}
                    type="text"
                    placeholder="Last name (optional)"
                    className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border ${
                      errors.lastName ? 'border-red-500/50' : 'border-white/20'
                    } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-white/40`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email address"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border ${
                    errors.email ? 'border-red-500/50' : 'border-white/20'
                  } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-white/40`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border ${
                    errors.password ? 'border-red-500/50' : 'border-white/20'
                  } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-white/40`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border ${
                    errors.confirmPassword ? 'border-red-500/50' : 'border-white/20'
                  } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-sm placeholder:text-white/40`}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
              </div>

              {/* Login Link */}
              <div className="text-center text-sm">
                <a href="/login" className="text-cyan-300 hover:text-cyan-200 underline transition">
                  Already have an account? Sign in
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-600 text-white font-semibold shadow-xl shadow-blue-500/40 hover:shadow-blue-500/60 disabled:opacity-70 transition text-sm"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;