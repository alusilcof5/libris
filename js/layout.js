document.addEventListener('DOMContentLoaded', () => {
    fetch('./header.html')
        .then(res => res.text())
        .then(data => {
            const header = document.getElementById('header-placeholder');
            if (header) {
                header.innerHTML = data;
            }
        });

    fetch('./footer.html')
        .then(res => res.text())
        .then(data => {
            const footer = document.getElementById('footer-placeholder');
            if (footer) {
                footer.innerHTML = data;
            }
        });
});


document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;

    // Alternar la clase 'active' para mostrar/ocultar respuesta
    faqItem.classList.toggle('active');
  });
});


