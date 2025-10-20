const { getDB } = require('../configs/mongodb');
const { ObjectId } = require('mongodb');

class MongoDBService {
  constructor() {
    this.db = getDB();
  }

  // Usuários
  async getAllUsers() {
    return await this.db.collection('usuarios').find({}).toArray();
  }

  async getUserById(id) {
    return await this.db.collection('usuarios').findOne({ _id: new ObjectId(id) });
  }

  async createUser(userData) {
    const result = await this.db.collection('usuarios').insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return await this.getUserById(result.insertedId);
  }

  async updateUser(id, userData) {
    const result = await this.db.collection('usuarios').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...userData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) return null;
    return await this.getUserById(id);
  }

  async deleteUser(id) {
    const result = await this.db.collection('usuarios').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async findUserByUsername(username) {
    return await this.db.collection('usuarios').findOne({ usuario: username });
  }

  // Produtos
  async getAllProducts() {
    return await this.db.collection('produtos').find({}).toArray();
  }

  async getProductById(id) {
    return await this.db.collection('produtos').findOne({ _id: new ObjectId(id) });
  }

  async createProduct(productData) {
    const result = await this.db.collection('produtos').insertOne({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return await this.getProductById(result.insertedId);
  }

  async updateProduct(id, productData) {
    const result = await this.db.collection('produtos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...productData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) return null;
    return await this.getProductById(id);
  }

  async deleteProduct(id) {
    const result = await this.db.collection('produtos').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Clientes
  async getAllClients() {
    return await this.db.collection('clientes').find({}).toArray();
  }

  async getClientById(id) {
    return await this.db.collection('clientes').findOne({ _id: new ObjectId(id) });
  }

  async createClient(clientData) {
    const result = await this.db.collection('clientes').insertOne({
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return await this.getClientById(result.insertedId);
  }

  async updateClient(id, clientData) {
    const result = await this.db.collection('clientes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...clientData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) return null;
    return await this.getClientById(id);
  }

  async deleteClient(id) {
    const result = await this.db.collection('clientes').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = new MongoDBService();
