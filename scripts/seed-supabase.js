#!/usr/bin/env node

require('dotenv').config();
const supabase = require('../configs/supabase');

async function upsertProductByName(name, fields) {
  const { data: existing, error: findError } = await supabase
    .from('produtos')
    .select('*')
    .eq('nome', name)
    .maybeSingle();

  if (findError) throw findError;

  if (!existing) {
    const insertPayload = { nome: name, preco: 0, ...fields };
    const { error: insertError } = await supabase.from('produtos').insert([insertPayload]);
    if (insertError) throw insertError;
    return 'inserted';
  }

  const { error: updateError } = await supabase
    .from('produtos')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', existing.id);
  if (updateError) throw updateError;
  return 'updated';
}

async function run() {
  console.log('🌱 Enriquecendo produtos no Supabase...');

  const tasks = [
    upsertProductByName('Produto 1', {
      nome: 'Relógio Clássico Premium',
      descricao:
        'Relógio analógico com aço inoxidável e pulseira em couro. Movimento quartz japonês, vidro em cristal mineral resistente a riscos e resistência à água de 5 ATM. Elegante e durável para uso casual e social.',
      image_url:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      preco: 499.9,
      categoria: 'Acessórios',
      estoque: 35,
    }),
    upsertProductByName('Produto 2', {
      nome: 'Fone de Ouvido Wireless ANC',
      descricao:
        'Bluetooth com cancelamento ativo de ruído (ANC), drivers de 40mm, até 30h de bateria e carregamento rápido USB-C. Almofadas em memória viscoelástica para conforto prolongado.',
      image_url:
        'https://images.unsplash.com/photo-1518441902110-5815b1fd9552?q=80&w=1200&auto=format&fit=crop',
      preco: 799.0,
      categoria: 'Áudio',
      estoque: 80,
    }),
    upsertProductByName('Produto 3', {
      nome: 'Mochila Executiva Antifurto',
      descricao:
        'Compartimento para notebook 15.6", tecido impermeável, zíperes ocultos, porta USB externo e suporte para mala. Estrutura ergonômica com alças respiráveis e reforçadas.',
      image_url:
        'https://images.unsplash.com/photo-1520975922284-0f49c4e9f2c8?q=80&w=1200&auto=format&fit=crop',
      preco: 259.9,
      categoria: 'Acessórios',
      estoque: 120,
    }),
  ];

  const results = await Promise.all(tasks);
  console.log('✅ Concluído:', results);
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Erro ao semear dados:', err.message || err);
    process.exit(1);
  });


