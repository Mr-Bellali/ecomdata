const Products = ({ products }: { products: any[] }) => {
    if (products.length === 0) return <p>No products found.</p>;
  
    return (
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-review">{product.review}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Products;
  