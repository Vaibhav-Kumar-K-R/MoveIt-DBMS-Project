import { Package, Warehouse, Truck, Users } from "lucide-react";

const cardData: { title: string; value: number; icon: any; color?: string }[] =
  [
    {
      title: "Total Vendors",
      value: 0,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Warehouses",
      value: 0,
      icon: Warehouse,
      color: "text-indigo-500",
    },
    {
      title: "Warehouses Open",
      value: 0,
      icon: Warehouse,
      color: "text-green-500",
    },
    {
      title: "Warehouses Closed",
      value: 0,
      icon: Warehouse,
      color: "text-red-500",
    },
    {
      title: " Managers",
      value: 0,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: " Employees",
      value: 0,
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Drivers",
      value: 0,
      icon: Users,
      color: "text-teal-500",
    },
    {
      title: " Delivery Boys",
      value: 0,
      icon: Users,
      color: "text-cyan-500",
    },
    {
      title: " Orders",
      value: 0,
      icon: Package,
      color: "text-orange-500",
    },
    {
      title: " Vehicles",
      value: 0,
      icon: Truck,
      color: "text-gray-500",
    },
    {
      title: "Available Vehicles",
      value: 0,
      icon: Truck,
      color: "text-green-500",
    },
    {
      title: " Active Orders",
      value: 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: " Delivered Orders",
      value: 0,
      icon: Package,
      color: "text-green-500",
    },
  ];

export { cardData };
