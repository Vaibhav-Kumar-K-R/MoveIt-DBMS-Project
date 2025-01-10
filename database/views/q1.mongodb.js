use("test");

db.createView("ListAllDeliveryPersons", "employees", [
	{ $match: { role: "delivery_boy" } },
]);
