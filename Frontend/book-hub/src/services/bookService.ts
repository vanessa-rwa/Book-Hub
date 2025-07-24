import { Book } from "../types/book";
import { mockBooks } from "../data/mockBooks";

// Primary API URL with fallback
const API_BASE = import.meta.env.VITE_API_URL || "https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net";
const API_URL = `${API_BASE}/api`;

console.log("🔗 API URL:", API_URL);

// Enhanced fetch with retry mechanism
async function fetchWithRetry(url: string, options: RequestInit = {}, retries: number = 3): Promise<Response> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...options,
  };

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📡 Fetching (attempt ${i + 1}/${retries}):`, url);
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        console.error(`❌ HTTP ${response.status}: ${response.statusText}`);
        if (i === retries - 1) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        continue;
      }
      
      console.log(`✅ Success:`, url);
      return response;
    } catch (error) {
      console.error(`🔄 Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('All retry attempts failed');
}

export const bookService = {
  // Health check endpoint
  async healthCheck(): Promise<any> {
    try {
      const response = await fetchWithRetry(`${API_URL}/health/`);
      return response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Get all books with enhanced error handling and fallback
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await fetchWithRetry(`${API_URL}/books/`);
      const data = await response.json();
      console.log(`📚 Loaded ${data.length} books from API`);
      return data;
    } catch (error) {
      console.error('Error fetching books from API:', error);
      
      // FALLBACK: Return mock books when API is unavailable
      console.warn('⚠️ API unavailable, using mock books as fallback');
      return mockBooks;
    }
  },

  // Get book by ID
  async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetchWithRetry(`${API_URL}/books/${id}/`);
      return response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      
      // FALLBACK: Return mock book
      const mockBook = mockBooks.find(book => book.id === id.toString());
      if (mockBook) {
        return mockBook;
      }
      throw error;
    }
  },

  // Test connectivity
  async testConnection(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      return false;
    }
  }
};
