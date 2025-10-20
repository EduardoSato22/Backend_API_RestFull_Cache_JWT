const supabase = require('../configs/supabase');

class SupabaseService {
  // Usuários
  async getAllUsers() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getUserById(id) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createUser(userData) {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateUser(id, userData) {
    const { data, error } = await supabase
      .from('usuarios')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteUser(id) {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  async findUserByUsername(username) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('usuario', username)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Produtos
  async getAllProducts() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getProductById(id) {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createProduct(productData) {
    const { data, error } = await supabase
      .from('produtos')
      .insert([productData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateProduct(id, productData) {
    const { data, error } = await supabase
      .from('produtos')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteProduct(id) {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  // Clientes
  async getAllClients() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getClientById(id) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createClient(clientData) {
    const { data, error } = await supabase
      .from('clientes')
      .insert([clientData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateClient(id, clientData) {
    const { data, error } = await supabase
      .from('clientes')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteClient(id) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

module.exports = new SupabaseService();
