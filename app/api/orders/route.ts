import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, addressId, promoCode, paymentMethod, paymentProof } =
      await request.json();

    // Get address to calculate shipping
    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 400 });
    }

    // Get shipping fee for the state
    const shippingZone = await prisma.shippingZone.findUnique({
      where: { state: address.state },
    });
    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const shippingCost = subtotal > 50000 ? 0 : shippingZone?.fee || 2500;
    let discount = 0;

    // Apply promo code discounts
    if (promoCode === "WELCOME10") {
      discount = subtotal * 0.1;
    } else if (promoCode === "SAVE5000") {
      discount = 5000;
    }

    const total = subtotal + shippingCost - discount;

    // Generate order number
    const orderNumber = `ES${Date.now()}`;
    const paymentRef = `PAY_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        paymentRef,
        userId: session.user.id,
        addressId,
        subtotal,
        shippingCost,
        discount,
        promoCode,
        total,
        status:
          paymentMethod === "BANK_TRANSFER" ? "PAYMENT_PENDING" : "PENDING",
        paymentStatus: "pending",
        paymentMethod:
          paymentMethod === "bank_transfer" ? "BANK_TRANSFER" : "PAYSTACK",
        paymentProof,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({
      orderId: order.id,
      paymentRef,
      total,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        address: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
