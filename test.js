const data = [
  {
    _id: "6592ac8e1870e8e94a5aad3a",
    product: {
      _id: "6590a09520e570673db30728",
      name: "dda",
      image: {
        image_url:
          "https://res.cloudinary.com/dy8zfwmwx/image/upload/v1703977111/product/uvkdmcoorned4umwgskx.jpg",
      },
      price: 500,
    },
    qty: 3,
  },
  {
    _id: "6592b3f01870e8e94a5aadba",
    product: {
      _id: "6590a27120e570673db3073f",
      name: "gucchi",
      image: {
        image_url:
          "https://res.cloudinary.com/dy8zfwmwx/image/upload/v1703977586/product/jdgylbw5nffgasgsd0kv.avif",
      },
      price: 400,
    },
    qty: 5,
  },
];

// Calculate total price
const totalPrice = data.reduce((acc, item) => {
  const itemPrice = item.product.price * item.qty;
  return acc + itemPrice;
}, 0);

console.log("Total Price:", totalPrice);
