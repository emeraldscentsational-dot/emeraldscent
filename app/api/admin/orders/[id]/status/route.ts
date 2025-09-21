import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/utils/email';
import { orderShippedTemplate } from '@/lib/utils/email-templates';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status, trackingNumber } = await request.json();

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        status,
        trackingNumber,
      },
      include: {
        user: true,
      },
    });

    // Send email notification if order is shipped
    if (status === 'SHIPPED' && trackingNumber) {
      try {
        await sendEmail(
          order.user.email,
          'Your Order Has Shipped!',
          orderShippedTemplate(order.orderNumber, trackingNumber)
        );
      } catch (emailError) {
        console.error('Failed to send shipping email:', emailError);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}