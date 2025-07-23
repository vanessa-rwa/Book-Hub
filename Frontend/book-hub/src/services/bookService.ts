import { Book } from "../types/book";

// Use environment variable or fallback to Azure backend URL
const API_URL = import.meta.env.VITE_API_URL || "https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api";

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${API_URL}/books/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetch(`${API_URL}/books/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch book: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },
};
