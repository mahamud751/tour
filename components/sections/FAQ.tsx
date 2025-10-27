'use client';

import { useState, useMemo } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { faqs } from '@/data/mockData';
import type { FAQ as FAQType } from '@/types'; 

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Dynamic categories: Explicit type guard for TS narrowing
  const categories = useMemo((): string[] => {
    const catArray = faqs.map(faq => faq.category);
    const uniqueCats = [...new Set(catArray.filter((cat): cat is string => Boolean(cat)))];
    return ['All', ...uniqueCats.sort()];  
  }, []);

  const filteredFaqs: FAQType[] = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (openItems.length === filteredFaqs.length) {
      setOpenItems([]);
    } else {
      setOpenItems(filteredFaqs.map(faq => faq.id));
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                <MessageCircle className="w-4 h-4" />
                Need Help?
              </div>
              <h2 className="heading-secondary">
                Frequently Asked <span className="text-primary-600">Questions</span>
              </h2>
              <p className="body-large text-neutral-600">
                Find quick answers to common questions about booking, payments, 
                travel requirements, and more. Can&apos;t find what you&apos;re looking for? 
                Our support team is here to help.
              </p>
            </div>

            {/* Support CTA */}
            <Card className="card-elevated border-primary-100 bg-gradient-to-r from-primary-50 to-coral-50">
              <CardContent className="p-6">
                <h3 className="heading-tertiary mb-3">Still have questions?</h3>
                <p className="body-base text-neutral-600 mb-4">
                  Our travel experts are available 24/7 to help you plan your perfect adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="btn-primary">
                    Contact Support
                  </Button>
                  <Button variant="outline">
                    Call Us: +1 (555) 123-ROAM
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">24/7</div>
                <div className="text-sm text-neutral-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">5 min</div>
                <div className="text-sm text-neutral-600">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">98%</div>
                <div className="text-sm text-neutral-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - FAQ List */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category); 
                    setOpenItems([]);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    "border hover:border-primary-300",
                    activeCategory === category
                      ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25"
                      : "bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600 border-neutral-300"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Expand/Collapse All */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">
                {filteredFaqs.length} questions in {activeCategory.toLowerCase()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAll}
                className="text-primary-600 hover:text-primary-700"
              >
                {openItems.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
              </Button>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.includes(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                  index={index}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">No questions found</h3>
                <p className="text-neutral-600">
                  No questions available for this category. Try selecting a different category or contact our support team.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual FAQ Item Component (Uses aliased FAQType)
interface FAQItemProps {
  faq: FAQType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ faq, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <Card className={cn(
      "card group transition-all duration-500 overflow-hidden",
      "hover:shadow-lg hover:border-primary-200",
      isOpen && "border-primary-200 bg-primary-50/50"
    )}>
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                {index + 1}
              </span>
              {faq.category && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium">
                  {faq.category}
                </span>
              )}
            </div>
            <h3 className={cn(
              "font-heading font-semibold text-neutral-800 transition-colors",
              "group-hover:text-primary-600",
              isOpen && "text-primary-600"
            )}>
              {faq.question}
            </h3>
          </div>
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full border transition-all duration-500",
            "flex items-center justify-center",
            isOpen 
              ? "bg-primary-500 border-primary-500 text-white rotate-180" 
              : "bg-white border-neutral-300 text-neutral-600 group-hover:border-primary-500 group-hover:text-primary-500"
          )}>
            {isOpen ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Answer Content */}
        <div className={cn(
          "px-6 transition-all duration-500 overflow-hidden",
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="border-t border-neutral-200 pt-4">
            <p className="body-base text-neutral-700 leading-relaxed">
              {faq.answer}
            </p>
            
            {/* Helpful Actions */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
              <span className="text-sm text-neutral-500">Was this helpful?</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50">
                  Yes
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50">
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};