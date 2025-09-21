import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { state, fee } = await request.json();

    const zone = await prisma.shippingZone.update({
      where: { id: params.id },
      data: { state, fee },
    });

    return NextResponse.json(zone);
  } catch (error) {
    console.error("Error updating shipping zone:", error);
    return NextResponse.json(
      { error: "Failed to update shipping zone" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.shippingZone.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting shipping zone:", error);
    return NextResponse.json(
      { error: "Failed to delete shipping zone" },
      { status: 500 }
    );
  }
}
