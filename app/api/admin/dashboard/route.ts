import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get dashboard stats
    const [
      totalRevenue,
      newOrders,
      totalCustomers,
      lowStockProducts,
      revenueData
    ] = await Promise.all([
      // Total revenue
      prisma.order.aggregate({
        where: {
          status: { in: ['DELIVERED', 'SHIPPED'] },
        },
        _sum: { total: true },
      }),
      
      // New orders (last 30 days)
      prisma.order.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      
      // Total customers
      prisma.user.count({
        where: { role: 'USER' },
      }),
      
      // Low stock products (less than 10 items)
      prisma.product.count({
        where: {
          inventory: { lt: 10 },
          isPublished: true,
        },
      }),
      
      // Revenue data for chart (last 30 days)
      prisma.order.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: { in: ['DELIVERED', 'SHIPPED'] },
        },
        _sum: { total: true },
      }),
    ]);

    // Process revenue data for chart
    const processedRevenueData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayRevenue = revenueData
        .filter(item => item.createdAt.toISOString().split('T')[0] === dateStr)
        .reduce((sum, item) => sum + (item._sum.total || 0), 0);
      
      processedRevenueData.push({
        date: dateStr,
        revenue: dayRevenue,
      });
    }

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.total || 0,
      newOrders,
      totalCustomers,
      lowStockProducts,
      revenueData: processedRevenueData,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}