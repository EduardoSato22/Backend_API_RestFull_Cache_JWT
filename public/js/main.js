document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const navMenu = document.getElementById('nav-menu');
    const currentPage = window.location.pathname.split('/').pop();

    // --- RENDERIZAÇÃO DO MENU DE NAVEGAÇÃO ---
    let menuHtml = '<ul>';
    menuHtml += '<li><a href="index.html">Início</a></li>';
    menuHtml += '<li><a href="produtos.html">Produtos</a></li>';
    menuHtml += '<li><a href="cache.html">Monitor Cache</a></li>';
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
            await fetch('/api/logout', { 
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

            const response = await fetch('/api/login', {
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
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usuario = document.getElementById('signup-usuario').value;
            const senha = document.getElementById('signup-senha').value;
            const errorMessage = document.getElementById('error-message');

            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            });

            const data = await response.json();
            if (response.ok) {
                // Após cadastro, fazer login automático
                const loginRes = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, senha })
                });
                const loginData = await loginRes.json();
                if (loginRes.ok) {
                    localStorage.setItem('token', loginData.token);
                    window.location.href = 'dados.html';
                } else {
                    errorMessage.textContent = loginData.message || 'Cadastro realizado, mas falha no login.';
                }
            } else {
                errorMessage.textContent = data.message || 'Falha no cadastro.';
            }
        });
    }

    // --- LÓGICA DA PÁGINA DE PRODUTOS ---
    if (currentPage === 'produtos.html') {
        const productsList = document.getElementById('products-list');
        const cacheInfo = document.getElementById('cache-info');
        
        fetch('/api/produtos')
            .then(res => res.json())
            .then(data => {
                // Mostrar informações do cache se disponíveis
                if (cacheInfo && data.cache) {
                    const cacheStatus = data.cache.fromCache ? '✅ Cache HIT' : '❌ Cache MISS';
                    const cacheTime = data.cache.timestamp ? 
                        new Date(data.cache.timestamp).toLocaleString('pt-BR') : 'N/A';
                    
                    cacheInfo.innerHTML = `
                        <div style="background: ${data.cache.fromCache ? '#d4edda' : '#fff3cd'}; 
                                    color: ${data.cache.fromCache ? '#155724' : '#856404'}; 
                                    padding: 10px; border-radius: 5px; margin: 10px 0;">
                            <strong>${cacheStatus}</strong><br>
                            <small>Timestamp: ${cacheTime}</small>
                        </div>
                    `;
                }
                
                const products = data.products || data;
                if (products.length === 0) {
                    productsList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                    return;
                }
                const gridCss = `
                    <style>
                        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
                        .product-card { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
                        .product-image { width: 100%; height: 180px; object-fit: cover; background: #f2f2f2; }
                        .product-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
                        .product-title { font-size: 1.05rem; font-weight: 700; color: #222; }
                        .product-desc { color: #555; font-size: 0.95rem; line-height: 1.4; max-height: 4.2em; overflow: hidden; }
                        .product-meta { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
                        .price { font-weight: 800; color: #1f7a1f; }
                        .category { background: #eef6ff; color: #0b5ed7; font-size: .75rem; padding: 2px 8px; border-radius: 999px; }
                    </style>
                `;
                const cards = products.map(p => {
                    const imageUrl = p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop';
                    const descricao = p.descricao || 'Produto de alta qualidade, desenvolvido com atenção aos detalhes e foco na experiência do usuário. Ideal para uso diário e ambientes profissionais.';
                    const categoria = p.categoria || 'Geral';
                    const preco = (Number(p.preco) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    return `
                        <div class="product-card">
                            <img class="product-image" src="${imageUrl}" alt="${p.nome}">
                            <div class="product-body">
                                <div class="product-title">${p.nome}</div>
                                <div class="product-desc">${descricao}</div>
                                <div class="product-meta">
                                    <span class="price">${preco}</span>
                                    <span class="category">${categoria}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                productsList.innerHTML = gridCss + `<div class="products-grid">${cards}</div>`;
            })
            .catch(error => {
                console.error('Erro ao carregar produtos:', error);
                productsList.innerHTML = '<p>Erro ao carregar produtos.</p>';
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
    
    // Função global para atualizar produtos
    window.refreshProducts = function() {
        if (currentPage === 'produtos.html') {
            const productsList = document.getElementById('products-list');
            const cacheInfo = document.getElementById('cache-info');
            
            productsList.innerHTML = '<p>Carregando produtos...</p>';
            cacheInfo.innerHTML = '';
            
            fetch('/api/produtos')
                .then(res => res.json())
                .then(data => {
                    // Mostrar informações do cache se disponíveis
                    if (cacheInfo && data.cache) {
                        const cacheStatus = data.cache.fromCache ? '✅ Cache HIT' : '❌ Cache MISS';
                        const cacheTime = data.cache.timestamp ? 
                            new Date(data.cache.timestamp).toLocaleString('pt-BR') : 'N/A';
                        
                        cacheInfo.innerHTML = `
                            <div style="background: ${data.cache.fromCache ? '#d4edda' : '#fff3cd'}; 
                                        color: ${data.cache.fromCache ? '#155724' : '#856404'}; 
                                        padding: 10px; border-radius: 5px; margin: 10px 0;">
                                <strong>${cacheStatus}</strong><br>
                                <small>Timestamp: ${cacheTime}</small>
                            </div>
                        `;
                    }
                    
                    const products = data.products || data;
                    if (products.length === 0) {
                        productsList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
                        return;
                    }
                    const gridCss = `
                        <style>
                            .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
                            .product-card { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
                            .product-image { width: 100%; height: 180px; object-fit: cover; background: #f2f2f2; }
                            .product-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
                            .product-title { font-size: 1.05rem; font-weight: 700; color: #222; }
                            .product-desc { color: #555; font-size: 0.95rem; line-height: 1.4; max-height: 4.2em; overflow: hidden; }
                            .product-meta { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
                            .price { font-weight: 800; color: #1f7a1f; }
                            .category { background: #eef6ff; color: #0b5ed7; font-size: .75rem; padding: 2px 8px; border-radius: 999px; }
                        </style>
                    `;
                    const cards = products.map(p => {
                        const imageUrl = p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop';
                        const descricao = p.descricao || 'Produto de alta qualidade, desenvolvido com atenção aos detalhes e foco na experiência do usuário. Ideal para uso diário e ambientes profissionais.';
                        const categoria = p.categoria || 'Geral';
                        const preco = (Number(p.preco) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        return `
                            <div class="product-card">
                                <img class="product-image" src="${imageUrl}" alt="${p.nome}">
                                <div class="product-body">
                                    <div class="product-title">${p.nome}</div>
                                    <div class="product-desc">${descricao}</div>
                                    <div class="product-meta">
                                        <span class="price">${preco}</span>
                                        <span class="category">${categoria}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('');
                    productsList.innerHTML = gridCss + `<div class="products-grid">${cards}</div>`;
                })
                .catch(error => {
                    console.error('Erro ao carregar produtos:', error);
                    productsList.innerHTML = '<p>Erro ao carregar produtos.</p>';
                });
        }
    };
});