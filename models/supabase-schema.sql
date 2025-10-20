-- Script SQL para criar as tabelas no Supabase (PostgreSQL)

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    image_url TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    estoque INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados de exemplo
INSERT INTO usuarios (usuario, senha, email) VALUES 
('admin', '$2b$10$rQZ8KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8', 'admin@example.com'),
('user1', '$2b$10$rQZ8KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8fG9KjV8', 'user1@example.com')
ON CONFLICT (usuario) DO NOTHING;

INSERT INTO produtos (nome, descricao, image_url, preco, categoria, estoque) VALUES 
('Relógio Clássico Premium', 'Relógio analógico com caixa em aço inoxidável e pulseira em couro legítimo. Movimento quartz japonês, vidro em cristal mineral resistente a riscos e resistência à água de 5 ATM. Ideal para uso casual e social, combinando elegância e durabilidade.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop', 499.90, 'Acessórios', 35),
('Fone de Ouvido Wireless ANC', 'Fones Bluetooth com cancelamento ativo de ruído (ANC), drivers de 40mm, autonomia de até 30 horas e carregamento rápido via USB-C. Almofadas em memória viscoelástica e resposta de frequência de 20Hz-20kHz para áudio balanceado e imersivo.', 'https://images.unsplash.com/photo-1518441902110-5815b1fd9552?q=80&w=1200&auto=format&fit=crop', 799.00, 'Áudio', 80),
('Mochila Executiva Antifurto', 'Mochila com compartimento para notebook até 15.6", tecido impermeável, zíperes ocultos, porta USB externo e suporte para mala de viagem. Estrutura ergonômica com alças respiráveis e reforçadas para maior conforto.', 'https://images.unsplash.com/photo-1520975922284-0f49c4e9f2c8?q=80&w=1200&auto=format&fit=crop', 259.90, 'Acessórios', 120)
ON CONFLICT DO NOTHING;

INSERT INTO clientes (nome, sobrenome, email, telefone, endereco) VALUES 
('João', 'Silva', 'joao.silva@example.com', '(11) 99999-9999', 'Rua A, 123'),
('Maria', 'Santos', 'maria.santos@example.com', '(11) 88888-8888', 'Rua B, 456'),
('Pedro', 'Oliveira', 'pedro.oliveira@example.com', '(11) 77777-7777', 'Rua C, 789')
ON CONFLICT (email) DO NOTHING;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_usuarios_usuario ON usuarios(usuario);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);

-- Configurar RLS (Row Level Security) se necessário
-- ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
