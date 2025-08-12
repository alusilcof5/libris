document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
        alert('Por favor llena todos los campos.');
        return;
    }

    const responseDiv = document.getElementById('formResponse');
    responseDiv.textContent = `Gracias, ${name}, tu mensaje ha sido enviado.`;
    responseDiv.style.color = '#27ae60';

    // Limpia el formulario
    this.reset();
});


