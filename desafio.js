class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      if (this.isCodeUnique(product.code)) {
        product.id = this.generateUniqueId();
        this.products.push(product);
      } else {
        throw new Error("El código del producto ya existe");
      }
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        throw new Error("Producto no encontrado");
      }
    }
  
    isCodeUnique(code) {
      return !this.products.some((p) => p.code === code);
    }
  
    generateUniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }
  
  // Crear instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtener productos (debería devolver [])
  console.log(productManager.getProducts());
  
  // Agregar un producto
  try {
    productManager.addProduct({
      title: "Producto prueba",
      description: "Este es un producto de prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });
    console.log("Producto agregado satisfactoriamente");
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener productos (debería devolver el producto agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código (debería arrojar un error)
  try {
    productManager.addProduct({
      title: "Producto repetido",
      description: "Este es otro producto de prueba",
      price: 150,
      thumbnail: "Otra imagen",
      code: "abc123",
      stock: 30,
    });
    console.log("Producto agregado satisfactoriamente");
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener producto por ID (debería arrojar un error porque no existe)
  try {
    const product = productManager.getProductById("nonexistent_id");
    console.log(product);
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener producto por ID (debería devolver el producto agregado anteriormente)
  try {
    const product = productManager.getProductById(productManager.getProducts()[0].id);
    console.log(product);
  } catch (error) {
    console.error(error.message);
  }
  