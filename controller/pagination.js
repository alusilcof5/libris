// Variables globales
let books = [];
let currentPage = 1;
const itemsPerPage = 12;

// Elementos DOM
const booksContainer = document.getElementById("booksContainer");
const pagination = document.getElementById("pagination");
const pageInfo = document.getElementById("pageInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Renderizar libros de la página actual
function renderBooks() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageBooks = books.slice(start, end);
    
    booksContainer.innerHTML = pageBooks.map(book => `
        <div class="book-card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" 
                 alt="${book.title}" onerror="this.src='https://via.placeholder.com/150x200'">
            <h3>${book.title}</h3>
            <p>${book.author_name ? book.author_name[0] : 'Autor desconocido'}</p>
        </div>
    `).join('');
    
    updatePagination();
}

// Actualizar controles de paginación
function updatePagination() {
    const totalPages = Math.ceil(books.length / itemsPerPage);
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pagination.style.display = totalPages > 1 ? "flex" : "none";
}

// Event listeners
prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderBooks();
    }
});

nextBtn?.addEventListener("click", () => {
    if (currentPage < Math.ceil(books.length / itemsPerPage)) {
        currentPage++;
        renderBooks();
    }
});

// Cargar libros desde API
async function loadBooks() {
    try {
        const response = await fetch('https://openlibrary.org/search.json?q=programming&limit=50');
        const data = await response.json();
        books = data.docs.filter(book => book.title && book.author_name && book.cover_i);
        renderBooks();
    } catch (error) {
        booksContainer.innerHTML = '<p>Error al cargar libros</p>';
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadBooks);