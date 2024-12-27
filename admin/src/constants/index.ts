import { Package, Warehouse, Truck, Users } from "lucide-react";

const cardData: { title: string; value: number; icon: any; color?: string }[] =
  [
    {
      title: "Total Vendors",
      value: 0,
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Warehouses",
      value: 0,
      icon: Warehouse,
      color: "text-indigo-400",
    },
    {
      title: "Warehouses Open",
      value: 0,
      icon: Warehouse,
      color: "text-green-400",
    },
    {
      title: "Warehouses Closed",
      value: 0,
      icon: Warehouse,
      color: "text-red-400",
    },
    {
      title: " Managers",
      value: 0,
      icon: Users,
      color: "text-purple-400",
    },
    {
      title: " Employees",
      value: 0,
      icon: Users,
      color: "text-yellow-400",
    },
    {
      title: "Drivers",
      value: 0,
      icon: Users,
      color: "text-teal-400",
    },
    {
      title: " Delivery Boys",
      value: 0,
      icon: Users,
      color: "text-cyan-400",
    },
    {
      title: " Orders",
      value: 0,
      icon: Package,
      color: "text-orange-400",
    },
    {
      title: " Vehicles",
      value: 0,
      icon: Truck,
      color: "text-gray-400",
    },
    {
      title: "Available Vehicles",
      value: 0,
      icon: Truck,
      color: "text-green-400",
    },
    {
      title: " Active Orders",
      value: 0,
      icon: Package,
      color: "text-blue-400",
    },
    {
      title: " Delivered Orders",
      value: 0,
      icon: Package,
      color: "text-green-400",
    },
  ];

export { cardData };
