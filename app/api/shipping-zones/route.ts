import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const zones = await prisma.shippingZone.findMany({
      orderBy: { state: "asc" },
    });

    return NextResponse.json(zones);
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping zones" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { state, fee } = await request.json();

    const zone = await prisma.shippingZone.create({
      data: { state, fee },
    });

    return NextResponse.json(zone);
  } catch (error) {
    console.error("Error creating shipping zone:", error);
    return NextResponse.json(
      { error: "Failed to create shipping zone" },
      { status: 500 }
    );
  }
}
