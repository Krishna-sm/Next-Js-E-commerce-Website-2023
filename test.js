// const data = [
//   {
//     _id: "6592ac8e1870e8e94a5aad3a",
//     product: {
//       _id: "6590a09520e570673db30728",
//       name: "dda",
//       image: {
//         image_url:
//           "https://res.cloudinary.com/dy8zfwmwx/image/upload/v1703977111/product/uvkdmcoorned4umwgskx.jpg",
//       },
//       price: 500,
//     },
//     qty: 3,
//   },
//   {
//     _id: "6592b3f01870e8e94a5aadba",
//     product: {
//       _id: "6590a27120e570673db3073f",
//       name: "gucchi",
//       image: {
//         image_url:
//           "https://res.cloudinary.com/dy8zfwmwx/image/upload/v1703977586/product/jdgylbw5nffgasgsd0kv.avif",
//       },
//       price: 400,
//     },
//     qty: 5,
//   },
// ];

// // Calculate total price
// const totalPrice = data.reduce((acc, item) => {
//   const itemPrice = item.product.price * item.qty;
//   return acc + itemPrice;
// }, 0);

// console.log("Total Price:", totalPrice);



// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ["card"],
//   mode: "payment",
//   line_items: [
//     {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "t-shirt",
//         },
//         unit_amount: totalPrice * 100,
//       },
//       quantity: 1,
//     },
//   ],
//   success_url: "http://localhost:3000/payment/sccuess",
//   cancel_url: "http://localhost:3000/payment/cancel",
// });


// checkout object
//  checkoutSession: {
//     id: 'cs_test_a1TstyuMhZkzqrnPGWjiarDwUsCGDM7s5SC8lT10iVvJMWnFSpFqxmPV9P',
//     object: 'checkout.session',
//     after_expiration: null,
//     allow_promotion_codes: null,
//     amount_subtotal: 130000,
//     amount_total: 130000,
//     automatic_tax: { enabled: false, status: null },
//     billing_address_collection: null,
//     cancel_url: 'http://localhost:3000/payment/cancel?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja291dElkIjoiNjU5NWYwNDkwYjYyN2VlNzRhZDQwYTlkIiwiaWF0IjoxNzA0MzI1MTkzLCJleHAiOjE3MDQzMzIzOTN9.71TZA1T81vOkbDSF_JRx1hqK6iOarUgo0wlPVtfnLEM',
//     client_reference_id: null,
//     client_secret: null,
//     consent: null,
//     consent_collection: null,
//     created: 1704325197,
//     currency: 'inr',
//     currency_conversion: null,
//     custom_fields: [],
//     custom_text: {
//       after_submit: null,
//       shipping_address: null,
//       submit: null,
//       terms_of_service_acceptance: null
//     },
//     customer: null,
//     customer_creation: 'if_required',
//     customer_details: null,
//     customer_email: null,
//     expires_at: 1704411597,
//     invoice: null,
//     invoice_creation: { enabled: false, invoice_data: [Object] },
//     livemode: false,
//     locale: null,
//     metadata: {},
//     mode: 'payment',
//     payment_intent: null,
//     payment_link: null,
//     payment_method_collection: 'if_required',
//     payment_method_configuration_details: null,
//     payment_method_options: {},
//     payment_method_types: [ 'card' ],
//     payment_status: 'unpaid',
//     phone_number_collection: { enabled: false },
//     recovered_from: null,
//     setup_intent: null,
//     shipping_address_collection: null,
//     shipping_cost: null,
//     shipping_details: null,
//     shipping_options: [],
//     status: 'open',
//     submit_type: null,
//     subscription: null,
//     success_url: 'http://localhost:3000/payment/sccuess?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja291dElkIjoiNjU5NWYwNDkwYjYyN2VlNzRhZDQwYTlkIiwiaWF0IjoxNzA0MzI1MTkzLCJleHAiOjE3MDQzMzIzOTN9.71TZA1T81vOkbDSF_JRx1hqK6iOarUgo0wlPVtfnLEM',
//     total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//     ui_mode: 'hosted',
//     url: 'https://checkout.stripe.com/c/pay/cs_test_a1TstyuMhZkzqrnPGWjiarDwUsCGDM7s5SC8lT10iVvJMWnFSpFqxmPV9P#fidkdWxOYHwnPyd1blpxYHZxWjA0SkAzNXRWQzUyPUt2Qz1wdkpEaFVhdkx9Vk9MTE1tUV1JZG9mbn9hc2pxZ1dINEc3V0NcYmE9QlVhYD1Ldmd2bWE8b1x8dHZtSUtubmlgYH1IZ0ZOUTddNTVzb3duUDIxNScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
//   }
// }
//  ○ Compiling /payment/sccuess ...
//  ✓ Compiled /payment/sccuess in 3.7s (1379 modules)
// {
//   props: {
//     params: {},
//     searchParams: {
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja291dElkIjoiNjU5NWYwNDkwYjYyN2VlNzRhZDQwYTlkIiwiaWF0IjoxNzA0MzI1MTkzLCJleHAiOjE3MDQzMzIzOTN9.71TZA1T81vOkbDSF_JRx1hqK6iOarUgo0wlPVtfnLEM'
//     }
//   }

//     const regexPattern = new RegExp(slug, 'i');

//     const existProducts = await ProductModel.find({
//       $or: [
//         { name: { $regex: regexPattern } },
//         { description: { $regex: regexPattern } }
//       ]
//     });


const Stripe =require("stripe");
const stripe = new Stripe(`sk_test_51OE60qSF078NsF8uLD1xxA1dhSbCff3DcJ4vds05RDOb1b4vYtSVZokoKfXkdVXthNN39ylkc3sM2GwkbaQQXpqt00TBWrvow4`);

const init=async()=>{
  const session = await stripe.checkout.sessions.retrieve(
      `cs_test_a1TstyuMhZkzqrnPGWjiarDwUsCGDM7s5SC8lT10iVvJMWnFSpFqxmPV9P`
    );
    console.log({session});
    if (session.payment_status === "paid") {
      console.log("user is paid now");
    }
    
}

init()


// payment done  cs_test_a1TstyuMhZkzqrnPGWjiarDwUsCGDM7s5SC8lT10iVvJMWnFSpFqxmPV9P
// payment not done or may be cancel  cs_test_a1RsrjuilQi5n1kGNOmYSSrAnFQM8RZu7GuDYJtS1fnVeKhmxNpUqUGuXd