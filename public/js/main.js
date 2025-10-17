document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const navMenu = document.getElementById('nav-menu');
    const currentPage = window.location.pathname.split('/').pop();

    // --- RENDERIZAÇÃO DO MENU DE NAVEGAÇÃO ---
    let menuHtml = '<ul>';
    menuHtml += '<li><a href="index.html">Início</a></li>';
    menuHtml += '<li><a href="produtos.html">Produtos</a></li>';
    if (token) {
        menuHtml += '<li><a href="dados.html">Dados Protegidos</a></li>';
        menuHtml += '<li><button id="logout-btn">Logout</button></li>';
    } else {
        menuHtml += '<li><a href="login.html">Login</a></li>';
    }
    menuHtml += '</ul>';
    navMenu.innerHTML = menuHtml;

    // --- LÓGICA DE LOGOUT ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch('/logout', { 
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    // --- LÓGICA DA PÁGINA DE LOGIN ---
    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usuario = e.target.usuario.value;
            const senha = e.target.senha.value;
            const errorMessage = document.getElementById('error-message');

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dados.html';
            } else {
                errorMessage.textContent = data.message || 'Falha no login.';
            }
        });
    }

    // --- LÓGICA DA PÁGINA DE PRODUTOS ---
    if (currentPage === 'produtos.html') {
        const productsList = document.getElementById('products-list');
        fetch('/produtos')
            .then(res => res.json())
            .then(products => {
                if (products.length === 0) {
                    productsList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                    return;
                }
                let listHtml = '<ul>';
                products.forEach(p => {
                    listHtml += `<li>
                        <span class="item-title">${p.nome}</span> - R$ ${p.preco}<br>
                        <small>${p.descricao}</small>
                    </li>`;
                });
                listHtml += '</ul>';
                productsList.innerHTML = listHtml;
            });
    }

    // --- LÓGICA DA PÁGINA DE DADOS PROTEGIDOS ---
    if (currentPage === 'dados.html') {
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        const fetchWithAuth = (url) => fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            }
            return res.json();
        });

        // Buscar Clientes
        const clientsList = document.getElementById('clients-list');
        fetchWithAuth('/clientes').then(clients => {
             if (clients.length === 0) {
                clientsList.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
                return;
            }
            let listHtml = '<ul>';
            clients.forEach(c => {
                listHtml += `<li><span class="item-title">${c.nome} ${c.sobrenome}</span> (${c.email})</li>`;
            });
            listHtml += '</ul>';
            clientsList.innerHTML = listHtml;
        });

        // Buscar Usuários
        const usersList = document.getElementById('users-list');
        fetchWithAuth('/usuarios').then(users => {
             if (users.length === 0) {
                usersList.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
                return;
            }
            let listHtml = '<ul>';
            users.forEach(u => {
                listHtml += `<li><span class="item-title">${u.usuario}</span></li>`;
            });
            listHtml += '</ul>';
            usersList.innerHTML = listHtml;
        });
    }
}); 