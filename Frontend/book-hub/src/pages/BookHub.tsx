import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { BookFilters } from "../components/BookFilters";
import { BookGrid } from "../components/BookGrid";
import { BookDetails } from "../components/BookDetails";
import { BookProvider } from "../contexts/BookContext";
import { mockBooks } from "../data/mockBooks";

const BookHubContent: React.FC = () => {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!selectedBookId) {
        setSelectedBook(null);
        return;
      }

      // Instant fallback to mock data for immediate response
      const mockBook = mockBooks.find(book => book.id === selectedBookId);
      if (mockBook) {
        console.log("⚡ Instant fallback to mock book data");
        setSelectedBook(mockBook);
        setLoading(false);
      } else {
        setSelectedBook(null);
        setLoading(false);
        return;
      }

      // Try API in background (non-blocking)
      setLoading(true);
      try {
        console.log("🔗 Fetching book details from API in background for ID:", selectedBookId);
        
        const response = await fetch(
          `https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/${selectedBookId}/`
        );
        
        console.log("📊 Book detail response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Book detail response from API:", data);
          setSelectedBook(data);
        } else {
          console.log("⚠️ API returned error, keeping mock data");
        }
      } catch (error) {
        console.error("❌ Error fetching book from API:", error);
        console.log("🔄 Keeping mock data as fallback");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [selectedBookId]);

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

      {selectedBook ? (
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-muted-foreground">Updating book details...</span>
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
