"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { useSession } from "next-auth/react";
import {
  useGetAddressesQuery,
  useAddAddressMutation,
  useCreateOrderMutation,
} from "@/lib/store/api/ordersApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, Plus, Building2, Upload } from "lucide-react";
import toast from "react-hot-toast";

// Define types for our data structures
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

interface ShippingZone {
  state: string;
  fee: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [paymentProof, setPaymentProof] = useState<string[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const [selectedShippingFee, setSelectedShippingFee] = useState(0);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "Nigeria",
    zipCode: "",
    isDefault: false,
  });

  const { data: addresses } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/checkout");
      return;
    }

    if (items.length === 0) {
      router.push("/shop");
      return;
    }
  }, [session, items, router]);

  // Fetch shipping zones on component mount
  useEffect(() => {
    const fetchShippingZones = async () => {
      try {
        const response = await fetch("/api/shipping-zones");
        if (response.ok) {
          const zones = await response.json();
          setShippingZones(zones);
        }
      } catch (error) {
        console.error("Failed to fetch shipping zones:", error);
      }
    };

    fetchShippingZones();
  }, []);

  // Calculate shipping fee based on selected address
  useEffect(() => {
    if (selectedAddress && addresses && shippingZones.length > 0) {
      const address = addresses.find(
        (addr: Address) => addr.id === selectedAddress
      );
      if (address) {
        const zone = shippingZones.find(
          (z: ShippingZone) => z.state === address.state
        );
        setSelectedShippingFee(zone ? zone.fee : 2500); // Default fee if state not found
      }
    }
  }, [selectedAddress, addresses, shippingZones]);

  const shippingCost = total > 50000 ? 0 : selectedShippingFee;
  const finalTotal = total + shippingCost - discount;

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await addAddress(newAddress).unwrap();
      setSelectedAddress(result.id);
      setShowAddressForm(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "Nigeria",
        zipCode: "",
        isDefault: false,
      });
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  const handleApplyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(total * 0.1);
      toast.success("Promo code applied! 10% discount");
    } else if (promoCode.toLowerCase() === "save5000") {
      setDiscount(5000);
      toast.success("Promo code applied! ₦5,000 discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    if (paymentMethod === "bank_transfer" && paymentProof.length === 0) {
      toast.error("Please upload payment proof for bank transfer");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.salePrice || item.price,
        })),
        addressId: selectedAddress,
        promoCode: promoCode || undefined,
        paymentMethod,
        paymentProof:
          paymentMethod === "bank_transfer" ? paymentProof[0] : undefined,
      };

      const result = await createOrder(orderData).unwrap();

      if (paymentMethod === "paystack") {
        // Initialize Paystack payment
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        document.body.appendChild(script);

        script.onload = () => {
          const handler = (window as any).PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: session?.user?.email!,
            amount: finalTotal * 100, // Convert to kobo
            currency: "NGN",
            ref: result.paymentRef,
            callback: function (response: any) {
              toast.success("Payment successful!");
              dispatch(clearCart());
              router.push(`/account?tab=orders`);
            },
            onClose: function () {
              toast.error("Payment cancelled");
              setIsProcessing(false);
            },
          });
          handler.openIframe();
        };
      } else {
        // Bank transfer - order created with pending status
        toast.success("Order created! Please wait for payment verification.");
        dispatch(clearCart());
        router.push(`/account?tab=orders`);
      }
    } catch (error) {
      toast.error("Failed to create order");
      setIsProcessing(false);
    }
  };

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  if (!session || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {addresses && addresses.length > 0 ? (
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={setSelectedAddress}
                  >
                    {addresses.map((address: Address) => (
                      <div
                        key={address.id}
                        className="flex items-start space-x-2 p-4 border rounded-lg"
                      >
                        <RadioGroupItem
                          value={address.id}
                          id={address.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={address.id}
                            className="cursor-pointer"
                          >
                            <div className="font-medium">{address.street}</div>
                            <div className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </div>
                            <div className="text-sm text-gray-600">
                              {address.country}
                            </div>
                            {address.isDefault && (
                              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded mt-1">
                                Default
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                ) : null}

                <Button
                  variant="outline"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>

                {showAddressForm && (
                  <form
                    onSubmit={handleAddAddress}
                    className="mt-4 space-y-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              street: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <select
                          id="state"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        >
                          <option value="">Select State</option>
                          {nigerianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) =>
                            setNewAddress((prev) => ({
                              ...prev,
                              zipCode: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress((prev) => ({
                            ...prev,
                            isDefault: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <Label htmlFor="isDefault">Set as default address</Label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit">Save Address</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem
                        value="paystack"
                        id="paystack"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label htmlFor="paystack" className="cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center mr-3">
                              <CreditCard className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Paystack</div>
                              <div className="text-sm text-gray-600">
                                Pay securely with card, bank transfer, or USSD
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem
                        value="bank_transfer"
                        id="bank_transfer"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="bank_transfer"
                          className="cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center mr-3">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Bank Transfer</div>
                              <div className="text-sm text-gray-600">
                                Transfer money directly to our bank account
                              </div>
                            </div>
                          </div>
                        </label>

                        {paymentMethod === "bank_transfer" && (
                          <div className="mt-4">
                            <Label>Upload Payment Proof</Label>
                            <CloudinaryUpload
                              onUpload={(urls) => setPaymentProof(urls)}
                              multiple={false}
                            />
                            <div className="text-sm text-gray-500 mt-2">
                              Please upload a screenshot or scan of your bank
                              transfer receipt
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ₦
                        {(
                          (item.salePrice || item.price) * item.quantity
                        ).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyPromoCode}>
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `₦${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !selectedAddress}
                  className="w-full bg-purple-700 hover:bg-purple-800"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
