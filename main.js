class ProductManager{
    constructor(){
        this.productos = []
    }

    static id = 0

    addProduct(title, description, price, img, code, stock){
        for(let i = 0; i < this.productos.length;i++){
            if(this.productos[i].code === code){
                console.log(`El código ${code} está repetido.`);
                break;
            }
        }

        const newProduct ={
            title, description, price, img, code, stock
        }

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.productos.push({
                ...newProduct,
                id:ProductManager.id,
            });
        }else{
            console.log("Completá todos los campos.")
        }

    }
    
    getProduct(){
        return this.productos;
    }

    exists(id) {
        return this.productos.find((product) => product.id === id);
    }    

    getProductById(id){
        !this.exists(id) ? console.log("No se encontró nada.") : console.log(this.exists(id));
    }
}

const productos = new ProductManager();

console.log(productos.getProduct());

//Producto I / II
productos.addProduct('Avión a escala 100:1', 'Este nuevo avión a escala es genial, tus amigos tal vez crean que tenés un avión de verdad!', '89000', 'img1', '273849', '3');
productos.addProduct('Avión a escala 50:1', 'Reíte de todos tus amigos con este avión a escala, es mas grande que el modelo 100:1!', '1500000', 'img2', '334534', '5');

console.log(productos.getProduct());

//Producto III (con código repetido)
productos.addProduct('Avión a escala 1:1', 'Estás en las ligas mayores. Un avión a tamaño real, serás la envidia de tus amigos, eco friendly, con un consumo de combustible de 15.000 lts/h', '120000000', 'img2', '334534', '2');

//Buscar producto por ID
productos.getProductById(1)