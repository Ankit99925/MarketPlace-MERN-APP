import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSellerProducts } from "../../store/slices/sellerSlice";
import { modalService, modalConfigs } from "../../utils/modalService";
import PlantLoader from "../shared/PlantLoader";

const EditProduct = () => {
  const { isLoading, products } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Plant");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const product = products?.find((p) => p._id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  useEffect(() => {
    if (product) {
      // Transform data before reset
      const formData = {
        ...product,
        // Convert tags array to comma-separated string if it's an array
        tags: Array.isArray(product.tags)
          ? product.tags.join(", ")
          : product.tags,
        // Ensure category is set for subcategory dropdown
        category: product.category || "Plant",
      };

      // Reset form with transformed data
      reset(formData);

      // Set related state
      setSelectedCategory(product.category);
      setImagePreview(product.imageUrl);
    }
  }, [product, reset]);

  // Fetch products if not already loaded
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchSellerProducts());
    }
  }, [dispatch, products]);

  if (isLoading) {
    return <PlantLoader />;
  }

  const categoryMap = {
    Plant: ["Indoor", "Outdoor", "Hanging"],
    Seed: ["Flower Seeds", "Vegetable Seeds", "Herbs"],
    "Plant Care": ["Fertilizers", "Tools", "Accessories"],
    Pots: ["Planters", "Pots", "Accessories"],
  };

  const onSubmit = async (data) => {
    // Pass only serializable data to modal
    modalService(
      modalConfigs.edit({
        id,
        productData: {
          ...data,
          image: data.image?.[0]
            ? {
                name: data.image[0].name,
                size: data.image[0].size,
                type: data.image[0].type,
              }
            : null,
        },
        // Store actual file separately
        imageFile: data.image?.[0] || null,
      })
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8
    dark:bg-gray-900
    ">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl
      dark:bg-gray-800
      ">
        {errors.root?.serverError && (
          <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-700">{errors.root.serverError.message}</p>
          </div>
        )}

        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Edit Product
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Fill in the details to edit the product
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                {...register("productName", {
                  required: "Product name is required",
                })}
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500
                  dark:bg-gray-800 dark:text-white
                  ${errors.productName ? "border-red-300" : "border-gray-300"}`}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                {...register("brand", { required: "Brand is required" })}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
                placeholder="Enter brand name"
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.brand.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  type="number"
                  step="0.01"
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                  dark:bg-gray-800 dark:text-white
                  "
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                {...register("stock", {
                  required: "Stock is required",
                  min: { value: 0, message: "Stock must be positive" },
                })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
                placeholder="Enter stock quantity"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category")}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
              >
                {Object.keys(categoryMap).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub Category
              </label>
              <select
                {...register("subCategory")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
              >
                {categoryMap[selectedCategory].map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Minimum rating is 1" },
                  max: { value: 5, message: "Maximum rating is 5" },
                })}
                type="number"
                min="1"
                max="5"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
                placeholder="Rate 1-5"
              />
            </div>

            {/* Featured Product */}
            <div>
              <label className="flex items-center">
                <input
                  {...register("isFeatured")}
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500
                  dark:bg-gray-800 dark:text-white
                  "
                />
                <span className="ml-2 text-sm text-gray-600">
                  Featured Product
                </span>
              </label>
            </div>

            {/* Tags */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                {...register("tags")}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
                placeholder="organic, indoor, beginner-friendly"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500
                dark:bg-gray-800 dark:text-white
                "
                placeholder="Describe your product..."
              />
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-md
                      dark:bg-gray-800 dark:text-white
                      "
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400
                      dark:bg-gray-800 dark:text-white
                      "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Upload a file</span>
                      <input
                        {...register("image", {
                          validate: {
                            isImage: (files) =>
                              !files?.[0] ||
                              files[0]?.type.startsWith("image/") ||
                              "File must be an image",
                            fileSize: (files) =>
                              !files?.[0] ||
                              files[0]?.size <= 10000000 ||
                              "File must be less than 10MB",
                          },
                        })}
                        type="file"
                        name="image"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
