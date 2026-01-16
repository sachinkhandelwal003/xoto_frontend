import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ProductContext = createContext();

// ✅ STATIC IMAGES LIST (High Quality Furniture Images)
const STATIC_FALLBACKS = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Sofa (Green)
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Chair
  "https://images.unsplash.com/photo-1567016432979-99fecb6d9692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern Sofa
  "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Beige Sofa
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Living Room
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Fancy Interior
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://xoto.ae"; 

  // --- DATA FORMATTER (The Brain) ---
  const formatProduct = (item) => {
    if (!item) return null;

    // --- 1. IMAGE LOGIC (Smart Fallback) ---
    let primaryImage = null;
    let allImages = [];

    // Step A: Check API for "Main Photos"
    if (item.photos && Array.isArray(item.photos) && item.photos.length > 0) {
        // Filter out empty strings if any
        const validPhotos = item.photos.filter(p => p && typeof p === 'string' && p.length > 5);
        if (validPhotos.length > 0) {
            primaryImage = validPhotos[0];
            allImages = [...validPhotos];
        }
    }
    
    // Step B: Check API for "Variant Photos" (if main is missing)
    if (!primaryImage && item.ProductColors && Array.isArray(item.ProductColors)) {
        item.ProductColors.forEach(variant => {
            if (variant.photos && variant.photos.length > 0) {
                const validVariantPhotos = variant.photos.filter(p => p && typeof p === 'string' && p.length > 5);
                if (validVariantPhotos.length > 0) {
                    if (!primaryImage) primaryImage = validVariantPhotos[0];
                    allImages = [...allImages, ...validVariantPhotos];
                }
            }
        });
    }

    // Step C: ✅ STATIC FALLBACK (Agar API se image nahi mili)
    if (!primaryImage) {
        // Trick: Product ID ke last character se index nikalo
        // Isse har product ko ek fixed random image milegi (Reload pe change nahi hogi)
        const idStr = item._id || item.id || "default";
        const charCode = idStr.charCodeAt(idStr.length - 1);
        const staticIndex = charCode % STATIC_FALLBACKS.length;
        
        primaryImage = STATIC_FALLBACKS[staticIndex];
        allImages = [primaryImage]; // Gallery me bhi yahi dikhao
    }

    // --- 2. DATA MAPPING ---
    return {
      id: item._id || item.id, 
      name: item.name || "Untitled Product",
      
      // Images
      image: primaryImage,        // Card ke liye
      images: allImages,          // Gallery ke liye
      
      // Price
      price: item.discountedPrice || item.price || 0,
      originalPrice: (item.discountedPrice && item.discountedPrice < item.price) ? item.price : null,
      
      // Details
      description: item.description || "Premium quality furniture for your modern home.",
      category: item.category?.name || "Furniture",
      brand: item.brandName?.brandName || item.brandName?.name || "XOTO Living",
      
      // Stats
      rating: 4.5, // Thoda realistic rating
      reviews: item.quantity > 0 ? item.quantity + 5 : 12, 
      
      // Flags
      isNew: item.isFeatured || false,
      isPopular: item.isActive || false,
      
      // Specifications
      colors: item.ProductColors?.length || 0,
      fullFeatures: item.keyFeatures || ["Durable Material", "Modern Design", "Easy Assembly"],
      material: item.material || ["Solid Wood", "Fabric"],
      careInstructions: item.careInstructions || "Wipe with a clean, dry cloth.",
      stock: item.quantity || 0
    };
  };

  // --- FETCH ALL PRODUCTS ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products/get-all-products?page=1&limit=100`);
        
        const rawData = response.data?.data?.products || response.data?.products || response.data?.data || [];
        
        if (Array.isArray(rawData)) {
            setProducts(rawData.map(formatProduct));
        } else {
            console.error("API returned non-array product data:", rawData);
            setProducts([]);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- FETCH SINGLE PRODUCT ---
  const getSingleProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/products/get-product-by-id?id=${id}`);
      
      const rawItem = response.data?.data || response.data;
      const formattedItem = formatProduct(rawItem);
      
      setLoading(false);
      return formattedItem; 
    } catch (err) {
      console.error("Single Product Fetch Error:", err);
      setLoading(false);
      return null;
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);