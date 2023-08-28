const library = {
    books: [],
  
    loadBooks: async function() {
        const bookData = await Promise.all([
          fetch('book1.json').then(response => response.json()),
          fetch('book2.json').then(response => response.json()),
          fetch('book3.json').then(response => response.json())
        ]);
        this.books = bookData;
      
        // Сортировка книг по годам
        this.sortByYear();
      
        // Вызываю функцию для отображения отсортированного списка
        this.displaySortedBooks();
      },
  
    searchBook: function(title) {
      return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    },
  
    displayBookInfo: function(book) {
      const bookInfo = document.getElementById('bookInfo');
      bookInfo.innerHTML = `
        <h2>${book.title}</h2>
        <p>Год издания: ${book.year}</p>
        <p>${book.description}</p>
      `;
    },
  
    sortByYear: function() {
      this.books.sort((a, b) => a.year - b.year);
    },
  
    // Функция для отображения отсортированного списка книг
    displaySortedBooks: function() {
      const sortedBooks = document.getElementById('sortedBooks');
      sortedBooks.innerHTML = '';
  
      for (let book of this.books) {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Год издания: ${book.year}</p>
          <p>${book.description}</p>
        `;
        sortedBooks.appendChild(bookElement);
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', async () => {
    await library.loadBooks();
  
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
  
    searchButton.addEventListener('click', () => {
      const searchTitle = searchInput.value;
      const foundBook = library.searchBook(searchTitle);
  
      if (foundBook) {
        library.displayBookInfo(foundBook);
      } else {
        alert('Книга не найдена');
      }
    });
  });