"use client";

import { useState } from "react";
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Truck } from "lucide-react";
import toast from "react-hot-toast";

interface ShippingZone {
  id: string;
  state: string;
  fee: number;
  createdAt: string;
  updatedAt: string;
}

export default function ShippingManagementPage() {
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    fee: "",
  });

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

  React.useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const response = await fetch("/api/shipping-zones");
      if (response.ok) {
        const data = await response.json();
        setZones(data);
      }
    } catch (error) {
      toast.error("Failed to fetch shipping zones");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingZone
        ? `/api/shipping-zones/${editingZone.id}`
        : "/api/shipping-zones";

      const method = editingZone ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: formData.state,
          fee: parseFloat(formData.fee),
        }),
      });

      if (response.ok) {
        toast.success(
          `Shipping zone ${editingZone ? "updated" : "created"} successfully`
        );
        setIsDialogOpen(false);
        resetForm();
        fetchZones();
      } else {
        toast.error("Failed to save shipping zone");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (zone: ShippingZone) => {
    setEditingZone(zone);
    setFormData({
      state: zone.state,
      fee: zone.fee.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, state: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete shipping zone for ${state}?`
      )
    ) {
      try {
        const response = await fetch(`/api/shipping-zones/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Shipping zone deleted successfully");
          fetchZones();
        } else {
          toast.error("Failed to delete shipping zone");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const resetForm = () => {
    setFormData({ state: "", fee: "" });
    setEditingZone(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shipping Management
            </h1>
            <p className="text-gray-600">
              Manage shipping fees for different states
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-700 hover:bg-purple-800">
                <Plus className="h-4 w-4 mr-2" />
                Add Shipping Zone
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingZone ? "Edit Shipping Zone" : "Add New Shipping Zone"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  <Label htmlFor="fee">Shipping Fee (₦)</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={formData.fee}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fee: e.target.value }))
                    }
                    placeholder="Enter shipping fee"
                    required
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading
                      ? "Saving..."
                      : editingZone
                      ? "Update"
                      : "Create"}{" "}
                    Zone
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Shipping Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>Shipping Fee</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.state}</TableCell>
                    <TableCell>₦{zone.fee.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(zone.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(zone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(zone.id, zone.state)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
