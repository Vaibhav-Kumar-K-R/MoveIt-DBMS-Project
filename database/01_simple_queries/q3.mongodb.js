use("test");

// Find all the vendors from Kundapura
db.vendors.find({
  city: {
    $regex: /kundapura/i,
  },
});
