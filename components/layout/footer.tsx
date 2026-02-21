'use client';

import { subscribeToNewsletter } from 'lib/shopify/actions';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setMessage(result.error || 'Failed to join.');
    }
  }

  return (
    <footer className="bg-[#411b3f] text-white border-t border-white/5 py-24 px-6 lg:px-14">
      <div className="mx-auto max-w-(--breakpoint-2xl)">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* 1. THE LOGO - Standalone */}
          <div className="md:col-span-3">
            <Link href="/" className="outline-none">
              <div 
                role="img"
                aria-label="Vellonex Logo"
                style={{
                  width: '160px',
                  height: '50px',
                  backgroundImage: 'url("/vellonex-logo.png")',
                  backgroundSize: 'contain',
                  backgroundPosition: 'left center',
                  backgroundRepeat: 'no-repeat',
                  mixBlendMode: 'screen',
                }}
              />
            </Link>
          </div>

          {/* 2. SERVICE */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase">Service</h3>
            <ul className="flex flex-col gap-4 text-[12px] text-white/50 tracking-[0.1em]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/jewelry-care" className="hover:text-white transition-colors">Jewelry Care</Link></li>
              <li><Link href="/repairs" className="hover:text-white transition-colors">Repairs</Link></li>
            </ul>
          </div>

          {/* 3. SHOP */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase">Shop</h3>
            <ul className="flex flex-col gap-4 text-[12px] text-white/50 tracking-[0.1em]">
              <li><Link href="/search/the-orbit-rings" className="hover:text-white transition-colors">Rings</Link></li>
              <li><Link href="/search/the-acoustic-earrings" className="hover:text-white transition-colors">Earrings</Link></li>
              <li><Link href="/search/the-link-bracelets" className="hover:text-white transition-colors">Bracelets</Link></li>
              <li><Link href="/search/the-foundation-necklaces" className="hover:text-white transition-colors">Necklaces</Link></li>
            </ul>
          </div>

          {/* 4. ABOUT */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase">About</h3>
            <ul className="flex flex-col gap-4 text-[12px] text-white/50 tracking-[0.1em]">
              <li><Link href="/about-us" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/stockists" className="hover:text-white transition-colors">Stockists</Link></li>
              <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* 5. NEWSLETTER */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase">Stay Informed</h3>
            <p className="text-white/60 text-[12px] leading-relaxed tracking-wider">
              {status === 'success' 
                ? "Thank you for subscribing." 
                : "Subscribe to receive updates on new collections and editorial stories."}
            </p>
            {status !== 'success' && (
              <form action={handleSubmit} className="relative mt-2">
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-[12px] tracking-[0.2em] outline-none focus:border-white transition-colors placeholder:text-white/30"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-0 bottom-2 text-[11px] font-bold hover:text-white/70 tracking-widest uppercase disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}
            {status === 'error' && <p className="text-red-400 text-[10px] mt-2 uppercase">{message}</p>}
          </div>

        </div>
        {/* THIN HORIZONTAL LINE & BOTTOM LEGAL BAR */}
        <div className="mt-24">
          <div className="w-full h-px bg-white/10 mb-8" /> 
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[11px] tracking-widest uppercase font-medium">
              © 2026 VELLONEX. ALL RIGHTS RESERVED.
            </p>
            
            <div className="flex gap-6 items-center text-white/30">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 01-1.87-1.48v7.14c.03 1.37-.22 2.82-.95 4.02-1.36 2.33-4.15 3.65-6.79 3.23-2.22-.31-4.22-1.81-5.12-3.89-.9-2.03-.68-4.57.59-6.39 1.13-1.63 3.07-2.61 5.06-2.53.1 1.65.04 3.3.05 4.95-.6-.05-1.22.06-1.78.3-.77.34-1.37 1.05-1.59 1.86-.34.98-.08 2.14.63 2.91.73.86 1.95 1.2 3.03.88 1.18-.32 2.05-1.45 2.17-2.66.01-1.94.01-3.88.01-5.83V0c-.01.01-.01.01-.01.02z"/>
                </svg>
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}