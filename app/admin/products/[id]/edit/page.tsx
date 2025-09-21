"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdateProductMutation } from "@/lib/store/api/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import {
  useGetCategoriesQuery,
  useGetProductQuery,
} from "@/lib/store/api/productsApi";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { data: product, isLoading: productLoading } = useGetProductQuery(
    params.id as string
  );
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    sku: "",
    inventory: "",
    categoryId: "",
    size: "",
    scentNotes: [] as string[],
    images: [] as string[],
    isPublished: true,
  });

  const scentNoteOptions = [
    "Woody",
    "Floral",
    "Citrus",
    "Oriental",
    "Fresh",
    "Spicy",
    "Fruity",
    "Aquatic",
    "Vanilla",
    "Musk",
    "Amber",
    "Rose",
    "Jasmine",
    "Sandalwood",
    "Cedar",
    "Bergamot",
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        salePrice: product.salePrice?.toString() || "",
        sku: product.sku,
        inventory: product.inventory.toString(),
        categoryId: product.categoryId,
        size: product.size || "",
        scentNotes: product.scentNotes,
        images: product.images,
        isPublished: product.isPublished,
      });
    }
  }, [product]);

  const handleScentNoteToggle = (note: string) => {
    setFormData((prev) => ({
      ...prev,
      scentNotes: prev.scentNotes.includes(note)
        ? prev.scentNotes.filter((n) => n !== note)
        : [...prev.scentNotes, note],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    try {
      await updateProduct({
        id: params.id as string,
        ...formData,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice
          ? parseFloat(formData.salePrice)
          : undefined,
        inventory: parseInt(formData.inventory),
      }).unwrap();

      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  if (productLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sku: e.target.value }))
                    }
                    placeholder="Enter product SKU"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (₦) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salePrice">Sale Price (₦)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salePrice: e.target.value,
                      }))
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="inventory">Inventory *</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={formData.inventory}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        inventory: e.target.value,
                      }))
                    }
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category and Details */}
          <Card>
            <CardHeader>
              <CardTitle>Category & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, categoryId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, size: e.target.value }))
                    }
                    placeholder="e.g., 50ml, 100ml"
                  />
                </div>
              </div>

              <div>
                <Label>Scent Notes</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {scentNoteOptions.map((note) => (
                    <div key={note} className="flex items-center space-x-2">
                      <Checkbox
                        id={note}
                        checked={formData.scentNotes.includes(note)}
                        onCheckedChange={() => handleScentNoteToggle(note)}
                      />
                      <Label htmlFor={note} className="text-sm">
                        {note}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images *</CardTitle>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={(urls) =>
                  setFormData((prev) => ({ ...prev, images: urls }))
                }
                multiple={true}
                maxFiles={5}
                currentImages={formData.images}
              />
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isPublished: !!checked }))
                  }
                />
                <Label htmlFor="published">Product is published</Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-700 hover:bg-purple-800"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
