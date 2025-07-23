from django.core.management.base import BaseCommand
from books.models import Book
from datetime import datetime

class Command(BaseCommand):
    help = 'Populate the database with sample books'

    def handle(self, *args, **options):
        # Clear existing books
        Book.objects.all().delete()
        
        # Sample books data
        books_data = [
            {
                'title': 'The Midnight Library',
                'author': 'Matt Haig',
                'genre': 'Fiction',
                'rating': 4.2,
                'publication_date': '2020-08-13',
                'description': 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
                'cover_image': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
                'pages': 288,
                'isbn': '978-0525559474',
                'language': 'English',
                'publisher': 'Viking',
                'price': 16.99,
                'in_stock': True
            },
            {
                'title': 'Project Hail Mary',
                'author': 'Andy Weir',
                'genre': 'Science Fiction',
                'rating': 4.6,
                'publication_date': '2021-05-04',
                'description': 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
                'cover_image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
                'pages': 496,
                'isbn': '978-0593135204',
                'language': 'English',
                'publisher': 'Ballantine Books',
                'price': 18.99,
                'in_stock': True
            },
            {
                'title': 'The Seven Husbands of Evelyn Hugo',
                'author': 'Taylor Jenkins Reid',
                'genre': 'Historical Fiction',
                'rating': 4.5,
                'publication_date': '2017-06-13',
                'description': 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
                'cover_image': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop',
                'pages': 400,
                'isbn': '978-1501161933',
                'language': 'English',
                'publisher': 'Atria Books',
                'price': 15.99,
                'in_stock': True
            },
            {
                'title': 'Educated',
                'author': 'Tara Westover',
                'genre': 'Biography',
                'rating': 4.4,
                'publication_date': '2018-02-20',
                'description': 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
                'cover_image': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop',
                'pages': 334,
                'isbn': '978-0399590504',
                'language': 'English',
                'publisher': 'Random House',
                'price': 17.99,
                'in_stock': False
            },
            {
                'title': 'The Psychology of Money',
                'author': 'Morgan Housel',
                'genre': 'Business',
                'rating': 4.3,
                'publication_date': '2020-09-08',
                'description': 'Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
                'cover_image': 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300&h=450&fit=crop',
                'pages': 256,
                'isbn': '978-0857197689',
                'language': 'English',
                'publisher': 'Harriman House',
                'price': 14.99,
                'in_stock': True
            },
            {
                'title': 'Dune',
                'author': 'Frank Herbert',
                'genre': 'Science Fiction',
                'rating': 4.1,
                'publication_date': '1965-08-01',
                'description': 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
                'cover_image': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop',
                'pages': 688,
                'isbn': '978-0441172719',
                'language': 'English',
                'publisher': 'Ace',
                'price': 19.99,
                'in_stock': True
            },
            {
                'title': 'The Alchemist',
                'author': 'Paulo Coelho',
                'genre': 'Fiction',
                'rating': 3.9,
                'publication_date': '1988-01-01',
                'description': 'A mystical story that transforms the life of a young Andalusian shepherd as he travels from Spain to Egypt in search of treasure.',
                'cover_image': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop',
                'pages': 163,
                'isbn': '978-0062315007',
                'language': 'English',
                'publisher': 'HarperOne',
                'price': 13.99,
                'in_stock': True
            },
            {
                'title': 'Atomic Habits',
                'author': 'James Clear',
                'genre': 'Self-Help',
                'rating': 4.7,
                'publication_date': '2018-10-16',
                'description': 'Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits.',
                'cover_image': 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=450&fit=crop',
                'pages': 320,
                'isbn': '978-0735211292',
                'language': 'English',
                'publisher': 'Avery',
                'price': 16.99,
                'in_stock': True
            }
        ]

        # Create book objects
        for book_data in books_data:
            book = Book.objects.create(**book_data)
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created book: "{book.title}"')
            )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully populated database with {len(books_data)} books!')
        ) 