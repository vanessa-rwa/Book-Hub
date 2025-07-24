
import React from "react";
import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooks } from "../contexts/BookContext";

export const Header: React.FC = () => {
  const { state, setCurrentView } = useBooks();

  const handleNavigationClick = (view: 'browse' | 'categories' | 'new-releases' | 'best-sellers') => {
    setCurrentView(view);
  };

  const getNavLinkClass = (view: 'browse' | 'categories' | 'new-releases' | 'best-sellers') => {
    const isActive = state.currentView === view;
    return `transition-colors cursor-pointer ${
      isActive 
        ? 'text-primary font-medium' 
        : 'text-muted-foreground hover:text-foreground'
    }`;
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">BookHub</h1>
              <p className="text-sm text-muted-foreground">Discover Your Next Read</p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavigationClick('browse')}
              className={getNavLinkClass('browse')}
            >
              Browse
            </button>
            <button 
              onClick={() => handleNavigationClick('categories')}
              className={getNavLinkClass('categories')}
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavigationClick('new-releases')}
              className={getNavLinkClass('new-releases')}
            >
              New Releases
            </button>
            <button 
              onClick={() => handleNavigationClick('best-sellers')}
              className={getNavLinkClass('best-sellers')}
            >
              Best Sellers
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </Button>

            <Button size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
