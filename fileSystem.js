import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++

        let newProduct = {
            title, description, price, img, code, stock, id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado :(")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        }

    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto ELIMINADO!!!!!")
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()

        let productsModif = [
            {id, ...producto},
            ...productOld
        ];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    }
}

const productos = new ProductManager();

productos.getProducts();

productos.updateProducts({
    title: 'Avión a escala 50:1',
    description: 'Reíte de todos tus amigos con este avión a escala, es mas grande que el modelo 100:1!',
    price: '100000000',
    img: 'img2',
    code: '334534',
    stock: '5',
    id: 1
})