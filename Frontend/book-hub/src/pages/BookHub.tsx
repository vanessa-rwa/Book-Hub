import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { BookFilters } from "../components/BookFilters";
import { BookGrid } from "../components/BookGrid";
import { BookDetails } from "../components/BookDetails";
import { BookProvider } from "../contexts/BookContext";
import { useBooks } from "../contexts/BookContext";

import { WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBooks } from "../data/mockBooks";

const BookHubContent: React.FC = () => {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showFallbackAlert, setShowFallbackAlert] = useState(true);
  const { state } = useBooks();

  useEffect(() => {
    const fetchBook = async () => {
      if (!selectedBookId) {
        setSelectedBook(null);
        return;
      }

      setLoading(true);
      try {
        console.log("🔗 Fetching book details for ID:", selectedBookId);
        
        if (state.isUsingFallback) {
          // Use mock data for book details
          const mockBook = mockBooks.find(book => book.id === selectedBookId);
          if (mockBook) {
            console.log("🔄 Using mock book data:", mockBook);
            setSelectedBook(mockBook);
          } else {
            throw new Error("Book not found in mock data");
          }
        } else {
          // Fetch from API
          const response = await fetch(
            `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/${selectedBookId}/`
          );
          
          console.log("📊 Book detail response status:", response.status);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log("✅ Book detail response:", data);
          setSelectedBook(data);
        }
      } catch (error) {
        console.error("❌ Error fetching book:", error);
        
        // Fallback to mock data if API fails
        const mockBook = mockBooks.find(book => book.id === selectedBookId);
        if (mockBook) {
          console.log("🔄 Falling back to mock book data");
          setSelectedBook(mockBook);
        } else {
          setSelectedBook(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [selectedBookId, state.isUsingFallback]);

  const handleBookSelect = (bookId: number) => {
    console.log("📖 Book selected:", bookId);
    setSelectedBookId(bookId);
  };

  const handleBackToGrid = () => {
    setSelectedBookId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Fallback Alert */}
      {state.isUsingFallback && showFallbackAlert && (
        <div className="mx-4 mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-amber-600" />
              <span className="text-amber-800">
                Currently using offline mode. Some features may be limited. 
                The app will automatically reconnect when the backend is available.
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFallbackAlert(false)}
              className="text-amber-600 hover:text-amber-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {selectedBook ? (
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-muted-foreground">Loading book details...</span>
            </div>
          ) : (
            <BookDetails book={selectedBook} onBack={handleBackToGrid} />
          )}
        </main>
      ) : (
        <>
          <Hero />
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <BookFilters />
              <BookGrid onBookSelect={handleBookSelect} />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export const BookHub: React.FC = () => {
  return (
    <BookProvider>
      <BookHubContent />
    </BookProvider>
  );
};
