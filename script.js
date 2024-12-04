// Configuración inicial
const API_URL = 'http://localhost:3000/api'; // Ajusta según tu backend

// Funciones de utilidad
function showAlert(message, type = 'success') {
    // Implementar sistema de alertas
    alert(message);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Gestión de Equipos
async function cargarEquipos() {
    try {
        const response = await fetch(`${API_URL}/equipos`);
        const equipos = await response.json();
        const tbody = document.getElementById('equiposTableBody');
        tbody.innerHTML = '';
        
        equipos.forEach(equipo => {
            tbody.innerHTML += `
                <tr>
                    <td>${equipo.id}</td>
                    <td>${equipo.tipo_equipo}</td>
                    <td>${equipo.marca}</td>
                    <td>${equipo.modelo}</td>
                    <td>${equipo.numero_serie}</td>
                    <td>
                        <span class="badge bg-${equipo.estado === 'Activo' ? 'success' : 'warning'}">
                            ${equipo.estado}
                        </span>
                    </td>
                    <td>${equipo.ubicacion_nombre || 'No asignada'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarEquipo(${equipo.id})">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarEquipo(${equipo.id})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar equipos', 'error');
        console.error('Error:', error);
    }
}

async function guardarEquipo() {
    const form = document.getElementById('equipoForm');
    const formData = new FormData(form);
    const equipo = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_URL}/equipos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipo)
        });

        if (response.ok) {
            showAlert('Equipo guardado exitosamente');
            $('#equipoModal').modal('hide');
            cargarEquipos();
        } else {
            throw new Error('Error al guardar');
        }
    } catch (error) {
        showAlert('Error al guardar equipo', 'error');
        console.error('Error:', error);
    }
}

async function editarEquipo(id) {
    try {
        const response = await fetch(`${API_URL}/equipos/${id}`);
        const equipo = await response.json();
        
        // Rellenar el formulario con los datos del equipo
        const form = document.getElementById('equipoForm');
        Object.keys(equipo).forEach(key => {
            const input = form.elements[key];
            if (input) input.value = equipo[key];
        });
        
        $('#equipoModal').modal('show');
    } catch (error) {
        showAlert('Error al cargar equipo', 'error');
        console.error('Error:', error);
    }
}

async function eliminarEquipo(id) {
    if (!confirm('¿Está seguro de eliminar este equipo?')) return;

    try {
        const response = await fetch(`${API_URL}/equipos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('Equipo eliminado exitosamente');
            cargarEquipos();
        } else {
            throw new Error('Error al eliminar');
        }
    } catch (error) {
        showAlert('Error al eliminar equipo', 'error');
        console.error('Error:', error);
    }
}

// Gestión de Personal
async function cargarPersonal() {
    try {
        const response = await fetch(`${API_URL}/personal`);
        const personal = await response.json();
        const tbody = document.getElementById('personalTableBody');
        tbody.innerHTML = '';
        
        personal.forEach(persona => {
            tbody.innerHTML += `
                <tr>
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.cargo}</td>
                    <td>${persona.departamento}</td>
                    <td>${persona.correo_electronico}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarPersonal(${persona.id})">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarPersonal(${persona.id})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar personal', 'error');
        console.error('Error:', error);
    }
}

async function guardarPersonal() {
    const form = document.getElementById('personalForm');
    const formData = new FormData(form);
    const personal = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_URL}/personal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personal)
        });

        if (response.ok) {
            showAlert('Personal guardado exitosamente');
            $('#personalModal').modal('hide');
            cargarPersonal();
        } else {
            throw new Error('Error al guardar');
        }
    } catch (error) {
        showAlert('Error al guardar personal', 'error');
        console.error('Error:', error);
    }
}

// Gestión de Ubicaciones
async function cargarUbicaciones() {
    try {
        const response = await fetch(`${API_URL}/ubicaciones`);
        const ubicaciones = await response.json();
        const tbody = document.getElementById('ubicacionesTableBody');
        tbody.innerHTML = '';
        
        ubicaciones.forEach(ubicacion => {
            tbody.innerHTML += `
                <tr>
                    <td>${ubicacion.id}</td>
                    <td>${ubicacion.nombre_ubicacion}</td>
                    <td>${ubicacion.direccion}</td>
                    <td>${ubicacion.ciudad}</td>
                    <td>${ubicacion.pais}</td>
                    <td>${ubicacion.codigo_postal}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarUbicacion(${ubicacion.id})">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarUbicacion(${ubicacion.id})">
                            <i class='bx bx-trash'></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar ubicaciones', 'error');
        console.error('Error:', error);
    }
}

async function guardarUbicacion() {
    const form = document.getElementById('ubicacionForm');
    const formData = new FormData(form);
    const ubicacion = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_URL}/ubicaciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ubicacion)
        });

        if (response.ok) {
            showAlert('Ubicación guardada exitosamente');
            $('#ubicacionModal').modal('hide');
            cargarUbicaciones();
        } else {
            throw new Error('Error al guardar');
        }
    } catch (error) {
        showAlert('Error al guardar ubicación', 'error');
        console.error('Error:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos iniciales
    cargarEquipos();
    cargarPersonal();
    cargarUbicaciones();

    // Limpiar formularios al cerrar modales
    ['equipoModal', 'personalModal', 'ubicacionModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        modal.addEventListener('hidden.bs.modal', function () {
            const form = modal.querySelector('form');
            if (form) form.reset();
        });
    });
});

// Manejadores de eventos para cambio de secciones
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        showSection(section);
    });
});

// Sidebar toggle
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");

sidebarBtn.onclick = function() {
    sidebar.classList.toggle("active");
    if(sidebar.classList.contains("active")){
        sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
    }else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

// Función para mostrar secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar título en la barra superior
    document.querySelector('.dashboard').textContent = 
        sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    
    // Actualizar estado activo en el menú
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Función para cargar datos de ejemplo (simulado)
function loadMockData() {
    // Simulación de datos para el dashboard
    document.querySelector('.overview-boxes .box:nth-child(1) .number').textContent = '124';
    document.querySelector('.overview-boxes .box:nth-child(2) .number').textContent = '12';
    document.querySelector('.overview-boxes .box:nth-child(3) .number').textContent = '45';
    document.querySelector('.overview-boxes .box:nth-child(4) .number').textContent = '5';
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadMockData();
    // Mostrar dashboard por defecto
    showSection('dashboard');
});

// Función para manejar la búsqueda
document.querySelector('.search-box input').addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
        // Implementar lógica de búsqueda aquí
        console.log('Búsqueda:', this.value);
    }
});

// Manejador para el menú de perfil
document.querySelector('.profile-details').addEventListener('click', function() {
    // Implementar menú desplegable de perfil
    console.log('Click en perfil');
});
