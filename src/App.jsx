import FooterColumnLinks from "./components/FooterColumnLinks";
import { useState } from 'react';
import { nanoid } from "nanoid";
import Product from "./components/Product";
import { initialProducts } from './fixtures';
import { initialCategories } from "./fixtures";

const footerLinks = [
  {
    title: "Our store",
    links: ["About us", "Contact us", "Become a partner"],
  },
  {
    title: "Our policies",
    links: ["Return policies", "Shipping policy", "Terms of service"],
  },
  {
    title: "Our products",
    links: ["Home page", "Search", "Catalog"],
  }
];

// const PRODUCTS = [
//   {
//     name: "Shoes",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Asics_Gel-Cumulus_22.jpg",
//     price: 50,
//   },
//   {
//     name: "Men's shirt",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/0/09/Shirt%2C_men%27s_%28AM_2015.44.1-1%29.jpg",
//     price: 36,
//   },
//   {
//     name: "Men's jeans",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Jeans_for_men.jpg",
//     price: 45,
//   },
//   {
//     name: "Samsung galaxy",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/d/da/%D0%92%D0%BD%D1%83%D1%82%D1%80%D1%96%D1%88%D0%BD%D1%96%D0%B9_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD_Samsung_Galaxy_Fold_2.png",
//     price: 1200,
//   },
//   {
//     name: "Chair",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Rey_Chair.png",
//     price: 25,
//   },
//   {
//     name: "Fridge",
//     image_url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Custom_Door_Fridge_2.jpg",
//     price: 600,
//   }
// ];

const productTemplate = {
  name: 'new product',
  image_url: 'https://placehold.co/600x400?text=New\nProduct',
  category: 0,
  price: 0.0,
  quantity: 1,
  id: nanoid(),
};

function App() {

  const [editing, setEditing] = useState(false);

  //state variable for the form
  const [product, setProduct] = useState(productTemplate);

  //state variable for the category form
  const [category, setCategory] = useState({
    id: nanoid(),
    name: '',
  });

  const [products, setProducts] = useState(initialProducts);

  const [categories, setCategories] = useState(initialCategories);
  

  const categoryOptions = categories.map(category => (
    <option key={(category.id)} value={category.id}>
      {category.name}
    </option>
  ))

  const footerColumns = footerLinks.map(column => <FooterColumnLinks key={column.title} data={column} />);

  const productList = products.map(product => <Product key={product.name} product={product} />);

  function handleSubmit(e){
    e.preventDefault();
    setProducts([...products, product]);
    setProduct(productTemplate);
    setEditing(false);

  }
  const productForm =(
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <label htmlFor="product-name">Name</label>
        <input 
          id="product-name"
          name="product-name"
          type="text"
          value={product.name}
          onChange={(e) => setProduct({...product, name: e.target.value })}
          />
      </div>

      <div className="control-group">
        <label htmlFor="product-image">Name: </label>
        <input 
          id="product-image"
          name="product-image"
          type="text"
          value={product.image_url}
          onChange={(e) => setProduct({...product, image_url: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="product-category">Category: </label>
        <select
          id="product-category"
          name="product-category"
          onChange={(e) => setProduct({...product, category: e.target.value })}
        >
          {/* <option value="0">uncategorized</option> */}
          {categoryOptions}
        </select>
      </div>

      <div>
        <label htmlFor="product-price">Price: </label>
        <input
          id="product-price"
          name="product-price"
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({...product, price: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="product-quantity">Quantity: </label>
        <input
          id="product-quantity"
          name="product-quantity"
          type="number"
          value={product.quantity}
          onChange={(e) => setProduct({...product, quantity: e.target.value })}
        />
      </div>

      <div className="btn-group">
        <button className="btn-primary">Save</button>
        <button className="btn-cancel" onClick={() => setEditing(false)} >Cancel</button>
      </div>

    </form>
  )

  const categoryForm = (
    <form>
      <div className="control-group">
        <label htmlFor="category-name">Name: </label>
        <input
          id="category-name"
          name="category-name"
          type="text"
        />
      </div>
      <div className="btn-group">
        <button className="btn-primary">Save</button>
        <button className="btn-cancel" onClick={() => setEditing(false)} >Cancel</button>
      </div>
    </form>
  )
  
  return (
    <div class="app">
      <section id="content">
        <header>
          <div>
            <h1>Shop Mart</h1>
            <div>
              <button className="icon-btn"><span>&#129293;</span><span className="badge">2</span></button>
              <button className="icon-btn"><span>&#128722;</span><span className="badge">1</span></button>
            </div>
          </div>
          
          <div>
            <nav>
              <button>Home</button>
              <button>Catalog</button>
              <button>All products</button>
              <button>Wishlist</button>
            </nav>
            <form>
              <input type="search" placeholder="search" />
              <button type="button">Go</button>
            </form>
          </div>
          <div>
            <button 
              className="btn-primary"
              onClick={() => setEditing('product')}
            >New Product</button>
            <button className="btn-secondary"
              onClick={() => setEditing('category')}
            >New Category</button>
          </div>
        </header>

        <div className="add-form">
          {editing === 'product' && productForm}
          {editing === 'category' && categoryForm}
        </div>

        <main>
          {productList}
        </main>
      </section>
      <footer>
        <div>
          {footerColumns}
        </div>
        <div>
          &copy; Yves Rene Shema, 2024
        </div>
        
      </footer>
    </div>
  );
}

export default App;
