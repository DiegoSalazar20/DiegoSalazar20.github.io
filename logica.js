const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animatedChildren = entry.target.querySelectorAll('[data-animate]');

            animatedChildren.forEach(el => {
                const animation = el.getAttribute("data-animate");
                el.classList.remove("invisible");
                el.classList.remove("animate__animated", animation);
                void el.offsetWidth;
                el.classList.add("animate__animated", animation);
            });
        } else {
            const animatedChildren = entry.target.querySelectorAll('[data-animate]');

            animatedChildren.forEach(el => {
                const animation = el.getAttribute("data-animate");
                el.classList.remove("animate__animated", animation);
                el.classList.add("invisible");
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll("section").forEach(section => observer.observe(section));

document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('invisible'));



document.querySelector('.formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const correo = document.getElementById('correo').value.trim();

    const datos = {
        idUsuario: 0,
        nombre: nombre,
        edad: edad,
        correo: correo
    };

    fetch('https://www.proyectomultimedios.somee.com/api/Usuario/Registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.exito) {
                console.log('Datos enviados correctamente:', data);
                mostrarModal(data.mensaje || 'Suscripción exitosa');
            } else {
                console.warn('Advertencia:', data);

                mostrarModal(data.mensaje || 'No se pudo completar la suscripción');
            }
        })
        .catch(error => {
            console.error('Hubo un error al enviar los datos:', error);
            mostrarModal('Ocurrió un error al conectar con el servidor');
        });
});

function abrirMenu() {
    const menu = document.getElementById('menu-lateral');
    menu.style.display = 'block';
    menu.classList.remove('animate__fadeOutRight');
    menu.classList.add('animate__animated', 'animate__fadeInRight');
}

function cerrarMenu() {
    const menu = document.getElementById('menu-lateral');
    menu.classList.remove('animate__fadeInRight');
    menu.classList.add('animate__fadeOutRight');
}

function mostrarModal(mensaje) {
    const modal = document.getElementById("modal");
    const mensajeElemento = document.getElementById("modal-mensaje");

    mensajeElemento.textContent = mensaje;
    modal.classList.remove("oculto");

    setTimeout(() => {
        cerrarModal();
    }, 3000);
}

function cerrarModal() {
    document.getElementById("modal").classList.add("oculto");
}


