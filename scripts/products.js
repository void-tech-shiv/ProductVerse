// Base Product class
class Product {
    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    // Method to get product info
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description
        };
    }

    // Method to display product (to be overridden by subclasses)
    display() {
        return `Product: ${this.name} - $${this.price}`;
    }
}

// Electronics product subclass
class Electronics extends Product {
    constructor(id, name, price, description, brand, warranty) {
        super(id, name, price, description);
        this.brand = brand;
        this.warranty = warranty;
    }

    display() {
        return `${super.display()} | Brand: ${this.brand} | Warranty: ${this.warranty} years`;
    }

    getTechSpecs() {
        return `Brand: ${this.brand}, Warranty: ${this.warranty} years`;
    }
}

// Clothing product subclass
class Clothing extends Product {
    constructor(id, name, price, description, size, color, material) {
        super(id, name, price, description);
        this.size = size;
        this.color = color;
        this.material = material;
    }

    display() {
        return `${super.display()} | Size: ${this.size} | Color: ${this.color} | Material: ${this.material}`;
    }

    getSizeInfo() {
        return `Size: ${this.size}, Color: ${this.color}, Material: ${this.material}`;
    }
}

// Book product subclass
class Book extends Product {
    constructor(id, name, price, description, author, genre, pages) {
        super(id, name, price, description);
        this.author = author;
        this.genre = genre;
        this.pages = pages;
    }

    display() {
        return `${super.display()} | Author: ${this.author} | Genre: ${this.genre} | Pages: ${this.pages}`;
    }

    getBookInfo() {
        return `Author: ${this.author}, Genre: ${this.genre}, Pages: ${this.pages}`;
    }
}

// Export classes for use in other files
window.Product = Product;
window.Electronics = Electronics;
window.Clothing = Clothing;
window.Book = Book;