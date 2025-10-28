// components/ui/Breadcrumb.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string; // Optional href - if not provided, it's just text (current page)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean; // Show home icon/link at the start
  className?: string;
}

export default function Breadcrumb({ items, showHome = true, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {/* Home Link */}
        {showHome && (
          <>
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-neutral-600 hover:text-primary-600 transition-colors group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-neutral-300" strokeWidth={2} />
          </>
        )}

        {/* Breadcrumb Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={cn(
                    "truncate max-w-[200px] sm:max-w-none",
                    isLast 
                      ? 'text-neutral-900 font-semibold' 
                      : 'text-neutral-600 font-medium'
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight 
                  className="w-4 h-4 text-neutral-300 flex-shrink-0" 
                  strokeWidth={2} 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}