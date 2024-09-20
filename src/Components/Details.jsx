import React, { useContext, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import { toast } from "react-toastify";
import Nav from "./Nav";
import Loader from "./Loader";

const Details = () => {
  const { products, addToCart, removeFromCart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const productRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        toast.error("Product not found");
        navigate("/");
      }
    };

    fetchProduct();
  }, [id, products, navigate]);

  useEffect(() => {
    if (product && !loading) {
      gsap.from(productRef.current, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        ease: "power3.out"
      });
    }
  }, [product, loading]);

  const handleDelete = () => {
    removeFromCart(product.id);
    toast.success("Product deleted successfully");
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      <Nav />
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <div ref={productRef} className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-2 text-2xl leading-8 font-semibold text-gray-900">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-4 text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              <div className="mt-6 flex space-x-3">
                <Link
                  to={`/edit/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart!");
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
