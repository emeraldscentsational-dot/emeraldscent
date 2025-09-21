import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/utils/email";
import { orderConfirmationTemplate } from "@/lib/utils/email-templates";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, amount, customer } = event.data;

      // Find the order by payment reference
      const order = await prisma.order.findFirst({
        where: { paymentRef: reference },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (order) {
        // Update order status
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "completed",
            status: "PROCESSING",
          },
        });

        // Update product inventory
        for (const item of order.items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              inventory: {
                decrement: item.quantity,
              },
            },
          });
        }

        // Send order confirmation email
        try {
          await sendEmail(
            order.user.email,
            "Order Confirmation - EmeraldScentSational",
            orderConfirmationTemplate(order.orderNumber, order.total)
          );
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
