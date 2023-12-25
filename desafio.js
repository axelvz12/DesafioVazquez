class ProductManager {
  constructor() {
    this.products = [];
  }

  generateId() {
    // Función para generar un id único (puede ser más compleja en la realidad)
    return Date.now().toString();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const id = this.generateId();
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products[index] = { ...this.products[index], ...updatedFields };
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(index, 1)[0];
    return deletedProduct;
  }
}

// Uso de la clase
const productManager = new ProductManager();

// Obtener productos (debería ser un arreglo vacío)
console.log(productManager.getProducts());

// Agregar un producto
const newProduct = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
};

const addedProduct = productManager.addProduct(newProduct);
console.log('Producto agregado:', addedProduct);

// Obtener productos nuevamente (debería contener el producto recién agregado)
console.log(productManager.getProducts());

// Obtener producto por id
const productId = addedProduct.id;
console.log('Producto por ID:', productManager.getProductById(productId));

// Actualizar producto
const updatedFields = { price: 250, stock: 30 };
const updatedProduct = productManager.updateProduct(productId, updatedFields);
console.log('Producto actualizado:', updatedProduct);

// Eliminar producto
const deletedProduct = productManager.deleteProduct(productId);
console.log('Producto eliminado:', deletedProduct);

// Obtener productos después de la eliminación (debería ser un arreglo vacío nuevamente)
console.log(productManager.getProducts());
