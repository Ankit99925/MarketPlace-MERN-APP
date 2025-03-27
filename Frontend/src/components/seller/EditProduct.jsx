import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSellerProducts,
editProduct 
} from "../../store/slices/sellerSlice";
const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productNameRef = useRef();
  const brandRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const ratingRef = useRef();
  const navigate = useNavigate();
  const jwtToken = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);
  const { products } = useSelector((state) => state.seller);

  console.log("token", jwtToken);

  const product = products.find((product) => {
    return product._id === id;
  });
  if (!product) {
    return <div>Loading...</div>; // Show a loading message while the product is being fetched
  }

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productNameRef.current.value);
    formData.append("brand", brandRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("image", imageRef.current.files[0]);
    formData.append("rating", ratingRef.current.value);
    // const response = await axios.patch(
    //   `http://localhost:3000/api/seller/editProduct/${product._id}`,
    //   formData,
    //   { headers: { Authorization: `Bearer ${jwtToken.token}` } }
    // );
    // console.log("response", response);
    await dispatch(editProduct({ id: product._id, formData })).unwrap();
    // dispatch(updateProduct({ id: product._id, formData }));
    navigate("/");
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-6 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
            Edit Product
          </h2>
          <form action="POST" onSubmit={handleEditProduct}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  ref={productNameRef}
                  defaultValue={product?.productName}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  ref={brandRef}
                  defaultValue={product.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  ref={priceRef}
                  defaultValue={product.price}
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  ref={categoryRef}
                  defaultValue={product.category}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rating
                </label>
                <input
                  ref={ratingRef}
                  defaultValue={product.rating}
                  type="number"
                  name="rating"
                  id="rating"
                  min="1"
                  max="5"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Rate 1-5"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  defaultValue={product.description}
                  id="description"
                  rows="6"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
              <input type="text" />
              {/* Image Uploader */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Product Image
                </label>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt="Product"
                    className="w-32 h-32 mb-4"
                  />
                )}
                <input
                  ref={imageRef}
                  type="file"
                  name="image"
                  id="image"
                  className="border-2 p-1"
                  accept="image/*"
                />
                <label
                  htmlFor="image"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg cursor-pointer focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:from-blue-600 hover:to-purple-700"
                >
                  Upload Image
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-10  ">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg cursor-pointer focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:from-blue-600 hover:to-purple-700"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProduct;
