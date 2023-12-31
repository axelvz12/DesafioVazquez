const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = 'productos.txt';
    this.logFilePath = 'log.txt';
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
    }
  }

  async saveProducts() {
    await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  async logAction(action, productId, details) {
    const logEntry = `${new Date().toISOString()} - ${action} - Product ID: ${productId} - ${details}\n`;
    await fs.appendFile(this.logFilePath, logEntry, 'utf-8');
  }

  async getProducts() {
    return this.products;
  }

  async addProduct(product) {
    const id = this.generateId();
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    await this.saveProducts();
    await this.logAction('Add', newProduct.id, `Product added: ${newProduct.title}`);
    return newProduct;
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const originalProduct = { ...this.products[index] };
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.saveProducts();
      await this.logAction('Update', id, `Product updated: ${JSON.stringify(originalProduct)} -> ${JSON.stringify(this.products[index])}`);
      return this.products[index];
    } else {
      throw new Error('Product not found');
    }
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Ejemplo de uso
async function main() {
  const productManager = new ProductManager();

  // Agregar un producto
  const newProduct = await productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });

  console.log('Productos después de agregar:', await productManager.getProducts());

  // Obtener un producto por ID
  try {
    const productById = await productManager.getProductById(newProduct.id);
    console.log('Producto encontrado por ID:', productById);
  } catch (error) {
    console.error(error.message);
  }

  // Actualizar un producto
  try {
    const updatedProduct = await productManager.updateProduct(newProduct.id, {
      description: 'Producto actualizado',
      price: 250,
    });
    console.log('Producto actualizado:', updatedProduct);
  } catch (error) {
    console.error(error.message);
  }

  console.log('Productos después de actualizar:', await productManager.getProducts());


}

main();
