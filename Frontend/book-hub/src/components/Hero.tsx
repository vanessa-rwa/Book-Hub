
import React from 'react';
import { SearchBar } from './SearchBar';
import { useBooks } from '../contexts/BookContext';

export const Hero: React.FC = () => {
  const { state } = useBooks();

  const getViewContent = () => {
    switch (state.currentView) {
      case 'categories':
        return {
          title: 'Browse by Categories',
          subtitle: 'Explore books organized by genre. Find your favorite categories and discover new ones.',
          stats: [
            { value: '12+', label: 'Categories' },
            { value: '8', label: 'Genres Available' },
            { value: '100%', label: 'Organized' }
          ]
        };
      case 'new-releases':
        return {
          title: 'New Releases',
          subtitle: 'Discover the latest books published in the last 2 years. Stay up to date with fresh content.',
          stats: [
            { value: '3', label: 'New Books' },
            { value: '2023-2024', label: 'Publication Years' },
            { value: 'Fresh', label: 'Content' }
          ]
        };
      case 'best-sellers':
        return {
          title: 'Best Sellers',
          subtitle: 'Top-rated books with 4+ star ratings. These are the most loved and recommended reads.',
          stats: [
            { value: '5', label: 'Top Books' },
            { value: '4.0+', label: 'Star Rating' },
            { value: 'Highly', label: 'Rated' }
          ]
        };
      case 'browse':
      default:
        return {
          title: 'Discover Your Next Great Read',
          subtitle: 'Explore thousands of books across every genre. Find ratings, reviews, and detailed information to help you choose your perfect book.',
          stats: [
            { value: '8', label: 'Books Available' },
            { value: '8', label: 'Genres' },
            { value: '4.8', label: 'Average Rating' }
          ]
        };
    }
  };

  const content = getViewContent();

  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
          
          <div className="pt-4">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
