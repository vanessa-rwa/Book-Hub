import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { mockBooks } from "../data/mockBooks";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  genre: string;
  rating: number;
  publication_date: string;
  description: string;
  pages: number;
  isbn: string;
  language: string;
  publisher: string;
  price: number;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookFilters {
  genre: string;
  minRating: number;
  maxRating: number;
  author: string;
  yearRange: { start: number; end: number };
  sortBy: string;
  sortOrder: string;
}

export interface SearchState {
  query: string;
  filters: BookFilters;
  isLoading: boolean;
  results: Book[];
  totalResults: number;
  currentPage: number;
  booksPerPage: number;
  isUsingFallback: boolean;
}

interface BookContextType {
  state: SearchState;
  dispatch: React.Dispatch<BookAction>;
  searchBooks: (query: string) => void;
  updateFilters: (filters: Partial<BookFilters>) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
}

type BookAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_BOOKS"; payload: Book[] }
  | { type: "UPDATE_FILTERS"; payload: Partial<BookFilters> }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_FALLBACK"; payload: boolean };

const initialFilters: BookFilters = {
  genre: "All Genres",
  minRating: 0,
  maxRating: 5,
  author: "",
  yearRange: { start: 1900, end: new Date().getFullYear() },
  sortBy: "title",
  sortOrder: "asc",
};

const initialState: SearchState = {
  query: "",
  filters: initialFilters,
  isLoading: false,
  results: [],
  totalResults: 0,
  currentPage: 1,
  booksPerPage: 8,
  isUsingFallback: false,
};

const BookContext = createContext<BookContextType | undefined>(undefined);

function bookReducer(state: SearchState, action: BookAction): SearchState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, query: action.payload };
    case "SET_BOOKS":
      return {
        ...state,
        results: action.payload,
        totalResults: action.payload.length,
        currentPage: 1,
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: initialFilters,
        currentPage: 1,
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_FALLBACK":
      return { ...state, isUsingFallback: action.payload };
    default:
      return state;
  }
}

const API_URL = "https://bookhub-backend-a0gfbea4h4g0hwak.southafricanorth-01.azurewebsites.net/api/books/";

// Enhanced API fetch with better error handling
async function fetchBooksFromApi(
  query: string,
  filters: BookFilters
): Promise<Book[]> {
  console.log("🔗 Fetching from API:", API_URL);
  
  const params = new URLSearchParams();

  if (query) params.append("search", query);
  if (filters.genre && filters.genre !== "All Genres") {
    params.append("genre", filters.genre);
  }
  if (filters.minRating != null) {
    params.append("min_rating", filters.minRating.toString());
  }
  if (filters.maxRating != null) {
    params.append("max_rating", filters.maxRating.toString());
  }
  if (filters.author) params.append("author", filters.author);

  if (
    filters.yearRange &&
    filters.yearRange.start != null &&
    filters.yearRange.end != null
  ) {
    params.append("year_start", filters.yearRange.start.toString());
    params.append("year_end", filters.yearRange.end.toString());
  }

  params.append("sort_by", filters.sortBy);
  params.append("sort_order", filters.sortOrder);

  const fullUrl = `${API_URL}?${params.toString()}`;
  console.log("📡 Full API URL:", fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log("📊 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ API Response:", data);
    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}

// Fallback function using mock data
function filterMockBooks(query: string, filters: BookFilters): Book[] {
  console.log("🔄 Using mock data fallback");
  
  let filteredBooks = [...mockBooks];

  // Apply search query
  if (query) {
    const searchLower = query.toLowerCase();
    filteredBooks = filteredBooks.filter(
      book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply genre filter
  if (filters.genre && filters.genre !== "All Genres") {
    filteredBooks = filteredBooks.filter(book => book.genre === filters.genre);
  }

  // Apply rating filter
  filteredBooks = filteredBooks.filter(
    book => book.rating >= filters.minRating && book.rating <= filters.maxRating
  );

  // Apply author filter
  if (filters.author) {
    const authorLower = filters.author.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(authorLower)
    );
  }

  // Apply year range filter
  filteredBooks = filteredBooks.filter(book => {
    const year = new Date(book.publication_date).getFullYear();
    return year >= filters.yearRange.start && year <= filters.yearRange.end;
  });

  // Apply sorting
  filteredBooks.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (filters.sortBy) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "author":
        aValue = a.author;
        bValue = b.author;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "publicationDate":
        aValue = new Date(a.publication_date);
        bValue = new Date(b.publication_date);
        break;
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }

    if (filters.sortOrder === "desc") {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
  });

  return filteredBooks;
}

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const loadBooks = async (query: string, filters: BookFilters) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_FALLBACK", payload: false });
    
    try {
      console.log("🚀 Attempting to fetch books from API...");
      const books = await fetchBooksFromApi(query, filters);
      console.log("✅ Successfully fetched books from API:", books.length);
      dispatch({ type: "SET_BOOKS", payload: books });
    } catch (error) {
      console.error("❌ API failed, using fallback data:", error);
      
      // Use mock data as fallback
      const fallbackBooks = filterMockBooks(query, filters);
      console.log("🔄 Using fallback books:", fallbackBooks.length);
      
      dispatch({ type: "SET_BOOKS", payload: fallbackBooks });
      dispatch({ type: "SET_FALLBACK", payload: true });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    loadBooks(state.query, state.filters);
  }, [state.query, state.filters]);

  const searchBooks = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const updateFilters = (newFilters: Partial<BookFilters>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: newFilters });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
        searchBooks,
        updateFilters,
        clearFilters,
        setCurrentPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a BookProvider");
  return context;
};
