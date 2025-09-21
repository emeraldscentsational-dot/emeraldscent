import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
    const scentNotes =
      searchParams.get("scentNotes")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "newest";
    const inStock = searchParams.get("inStock") === "true";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isPublished: true,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { scentNotes: { hasSome: [search] } },
      ];
    }

    if (category) {
      where.categoryId = category;
    }

    if (scentNotes.length > 0) {
      where.scentNotes = { hasSome: scentNotes };
    }

    if (inStock) {
      where.inventory = { gt: 0 };
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: "desc" };
    switch (sort) {
      case "price-low":
        orderBy = { price: "asc" };
        break;
      case "price-high":
        orderBy = { price: "desc" };
        break;
      case "name":
        orderBy = { name: "asc" };
        break;
      case "rating":
        // For rating sorting, we'll need to handle this differently
        // since we can't directly order by aggregated reviews
        orderBy = { createdAt: "desc" }; // Fallback
        break;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true },
          },
          reviews: {
            where: { isApproved: true },
            select: { rating: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average rating for each product manually
    const productsWithAvgRating = products.map((product) => {
      const approvedReviews = product.reviews;
      const avgRating =
        approvedReviews.length > 0
          ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) /
            approvedReviews.length
          : 0;

      return {
        ...product,
        avgRating,
      };
    });

    // If sorting by rating, sort the products after calculating average ratings
    if (sort === "rating") {
      productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);
    }

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products: productsWithAvgRating,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
