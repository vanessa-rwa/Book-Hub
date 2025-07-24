
import React from "react";
import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
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
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              New Releases
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Best Sellers
            </a>
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
