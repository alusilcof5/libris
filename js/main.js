import { fetchBooks } from './api.js';

const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const createBookCard = (book) => {
  const title = book.title || 'Sin título';
  const publishDate = book.first_publish_year || 'N/A';
  const publishers = book.publisher ? book.publisher.join(', ') : 'Desconocido';
  const key = book.key || '#';
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/128x193?text=Sin+Portada';

  return `
    <div class="book-card" onclick="window.open('https://openlibrary.org${key}', '_blank')">
      <img src="${coverUrl}" alt="Portada de ${title}" />
      <h3>${title}</h3>
      <p><strong>Año:</strong> ${publishDate}</p>
      <p><strong>Editorial:</strong> ${publishers}</p>
    </div>
  `;
};

const renderBooks = (books) => {
  if (!books || books.length === 0) {
    booksContainer.innerHTML = '<p>No se encontraron libros.</p>';
    return;
  }
  booksContainer.innerHTML = books.map(createBookCard).join('');
};

const start = async (searchTerm = '') => {
  try {
    booksContainer.innerHTML = '<p>Cargando libros...</p>';
    const books = await fetchBooks(searchTerm);
    renderBooks(books);
  } catch (error) {
    booksContainer.innerHTML = `<p>Error al cargar los libros: ${error.message}</p>`;
  }
};


start();


searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  start(searchTerm);
});


searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    start(searchTerm);
  }
});


