
import React from "react";
import { BookOpen, Wifi, WifiOff } from "lucide-react";
import { useBooks } from "../contexts/BookContext";

export const Header: React.FC = () => {
  const { state } = useBooks();

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
          
          {/* Connection Status Indicator */}
          <div className="flex items-center gap-2">
            {state.isUsingFallback ? (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                <WifiOff className="h-4 w-4" />
                <span>Offline Mode</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                <Wifi className="h-4 w-4" />
                <span>Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
