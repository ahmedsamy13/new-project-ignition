# The Ultimate Guide: How to Add a New Feature

This guide explains step-by-step exactly how to build a new feature in the application from scratch until it appears on the screen. We follow the **Feature-Sliced Design (FSD)** architecture.

Let's imagine we want to add a new feature called **"Products"**.

---

## Step 1: Create the Feature Folder

First, go to `src/features/` and create a new folder for your feature (use lowercase with dashes, e.g., `products`).
Create this exact folder structure inside `src/features/products/`:

```text
src/features/products/
├── api/
├── components/
├── hooks/
├── model/
├── store/
└── index.ts
```

---

## Step 2: Data Models & Validation (Zod First)

Always start by defining the shape of your data using Zod. This acts as the single source of truth for both validation and TypeScript interfaces.
Go to the `model` folder and create `product.schema.ts`.

**File Path:** `src/features/products/model/product.schema.ts`
```typescript
import { z } from "zod/v4";

// 1. Define the Zod Schema
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string(),
  createdAt: z.string().datetime(),
});

export const createProductSchema = productSchema.pick({
  name: true,
  price: true,
  description: true,
});

// 2. Derive TypeScript Types automatically
export type Product = z.infer<typeof productSchema>;
export type CreateProductDTO = z.infer<typeof createProductSchema>;
```

---

## Step 3: Setup the Backend Connection (API Layer)

Here we write the functions that talk to the backend to get or send product data.

**File Path:** `src/features/products/api/productApi.ts`
```typescript
import { apiClient } from "@/shared/lib/axios";
import { Product, CreateProductDTO } from "../model/product.schema";
import { ApiResponse } from "@/shared/types"; // Assuming this global type exists

// 1. Query Keys for React Query to avoid spelling mistakes
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// 2. API calls using our pre-configured axios client
export const productApi = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<Product[]>>("/products");
    return response.data;
  },
  
  create: async (data: CreateProductDTO) => {
    const response = await apiClient.post<ApiResponse<Product>>("/products", data);
    return response.data;
  }
};
```

---

## Step 4: Connect API to React (Hooks Layer)

Now we will use `React Query` to wrap our API calls inside Custom Hooks. This handles loading states and caching automatically.

**File Path:** `src/features/products/hooks/useProducts.ts`
```typescript
import { useQuery } from "@tanstack/react-query";
import { productApi, productKeys } from "../api/productApi";

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: productApi.getAll,
  });
}
```

**File Path:** `src/features/products/hooks/useCreateProduct.ts`
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, productKeys } from "../api/productApi";
import { toast } from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      // Force the app to fetch the updated product list automatically
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product added successfully!");
    },
    onError: () => {
      toast.error("An error occurred while adding the product.");
    }
  });
}
```

---

## Step 5: Local Component State (useState)

For UI state that belongs to a specific component (like tracking which products are checked), use React's built-in `useState`. **Do NOT use Zustand for this.** Zustand is strictly reserved for shared, cross-component UI state (like opening a global sidebar).

```typescript
import { useState } from "react";

export function useProductSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  return { selectedIds, toggleSelection };
}
```

---

## Step 6: Build the User Interface (Components Layer)

Now we use everything we built to show data on the screen.

**File Path:** `src/features/products/components/ProductCard.tsx`
```typescript
import { Product } from "../model/product.schema";
import { Button } from "@/shared/ui"; // Use generic shared components

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-500 font-semibold">${product.price}</p>
      <div className="mt-4 flex gap-2">
        <Button variant="primary">Add to Cart</Button>
      </div>
    </div>
  );
}
```

**File Path:** `src/features/products/components/ProductList.tsx`
```typescript
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Spinner } from "@/shared/ui";

export function ProductList() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Failed to load products.</div>;

  // Assuming the real array is inside `data.data` depending on your ApiResponse shape
  const products = data?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## Step 7: The Barrel Export (index.ts)

This step is **very critical**. Other parts of the app are NOT allowed to import from inner folders. They must import everything they need from this file only.

**File Path:** `src/features/products/index.ts`
```typescript
// Export types and schemas if another part of the app needs them
export type { Product } from "./model/product.schema";
export { productSchema } from "./model/product.schema";

// Export components that will be displayed on Pages
export { ProductList } from "./components/ProductList";

// Export hooks if needed elsewhere
export { useProducts } from "./hooks/useProducts";
```

---

## Step 8: Create the Page (Pages Layer)

Now we leave the features folder and go to the pages folder to create the actual screen.

**File Path:** `src/pages/products/ProductsPage.tsx`
```typescript
import { ProductList } from "@/features/products";

export function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products List</h1>
      {/* Put the Feature Component here */}
      <ProductList /> 
    </div>
  );
}
```

**Do not forget to create a Barrel Export for the page too:**
**File Path:** `src/pages/products/index.ts`
```typescript
export { ProductsPage } from "./ProductsPage";
```

---

## Step 9: Connect the Page to the Router

Finally, we need to give this page a URL link so users can visit it.

**First: Add the URL path to our Global Constants**
**File Path:** `src/shared/config/routes.ts`
```typescript
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  EXAMPLES: "/examples",
  PRODUCTS: "/products", // 👈 We added this!
};
```

**Second: Lazy Load the Page**
**File Path:** `src/app/router/LazyImports.ts`
```typescript
import { lazy } from "react";

// ... old imports
export const ProductsPage = lazy(() => import("@/pages/products").then((m) => ({ default: m.ProductsPage }))); // 👈 We added this!
```

**Third: Add the Page to the Actual Router Array**
**File Path:** `src/app/router/routes.tsx`
```typescript
import * as Pages from "./LazyImports";
import { ROUTES } from "@/shared/config/routes";

// Inside the router array, usually under the Protected Routes section, add this line:
{ path: ROUTES.PRODUCTS, element: <SuspenseWrapper><Pages.ProductsPage /></SuspenseWrapper> },
```

---

## Done! 🎉

Now when you visit `/products` in your browser:
1. The Router (`routes.tsx`) loads `ProductsPage`.
2. `ProductsPage` loads `ProductList`.
3. `ProductList` runs the `useProducts` hook.
4. The Hook calls `productApi`.
5. The API sends an HTTP request using `axios` to the backend.
6. When the data returns, `ProductList` renders the `ProductCard` components.

This strict flow keeps your code incredibly organized and easy to scale, no matter how huge the project gets!
