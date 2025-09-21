export const welcomeEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #7e22ce, #a855f7); color: white; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 20px; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to EmeraldScentSational!</h1>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>Welcome to the world of luxury fragrances! We're thrilled to have you join our exclusive community.</p>
      <p>Discover your signature scent from our curated collection of premium fragrances.</p>
      <p>Happy shopping!</p>
    </div>
    <div class="footer">
      <p>© 2025 EmeraldScentSational. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const orderConfirmationTemplate = (orderNumber: string, total: number) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #7e22ce, #a855f7); color: white; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 20px; }
    .order-details { background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Confirmed!</h1>
    </div>
    <div class="content">
      <h2>Thank you for your order!</h2>
      <div class="order-details">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Total:</strong> ₦${total.toLocaleString()}</p>
      </div>
      <p>We'll send you another email when your order ships.</p>
    </div>
    <div class="footer">
      <p>© 2025 EmeraldScentSational. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const orderShippedTemplate = (orderNumber: string, trackingNumber: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #7e22ce, #a855f7); color: white; padding: 40px 20px; text-align: center; }
    .content { padding: 40px 20px; }
    .tracking-info { background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Order Has Shipped!</h1>
    </div>
    <div class="content">
      <h2>Great news!</h2>
      <p>Your order has been shipped and is on its way to you.</p>
      <div class="tracking-info">
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      </div>
      <p>Your luxury fragrances will be with you soon!</p>
    </div>
    <div class="footer">
      <p>© 2025 EmeraldScentSational. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;