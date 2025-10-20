require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Log de configuração
if (process.env.NODE_ENV !== 'production') {
  console.log('📊 Supabase configurado:', {
    url: supabaseUrl,
    environment: process.env.NODE_ENV || 'development'
  });
}

module.exports = supabase;
