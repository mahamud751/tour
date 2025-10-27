'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary-400">
          <Mail className="w-5 h-5" />
          <span className="font-semibold">Stay Updated</span>
        </div>
        <h3 className="font-heading font-bold text-2xl text-white">
          Get Travel Inspiration
        </h3>
        <p className="text-neutral-400 leading-relaxed">
          Subscribe to our newsletter and be the first to receive exclusive deals, 
          travel tips, and destination guides straight to your inbox.
        </p>
      </div>

      {/* Newsletter Form */}
      <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
        {isSubscribed ? (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-heading font-semibold text-white text-lg">
              Welcome to the Roamio Family!
            </h4>
            <p className="text-neutral-400">
              Thank you for subscribing. Check your inbox for our welcome email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newsletter-email" className="text-white font-medium">
                Email Address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-primary-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 border-0"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </Button>

            <p className="text-neutral-500 text-xs text-center">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};