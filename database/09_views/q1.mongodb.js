use("test");

// Create a view to list all the delivery persons
db.createView("ListAllDeliveryPersons", "employees", [
  {
    $match: {
      role: "delivery_boy",
    },
  },
]);
