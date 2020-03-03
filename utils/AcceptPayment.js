//import { BookingTrip } from "../Redux/Actions/TripsActions";

// step 1
function getAuthToken() {
  return fetch("https://accept.paymobsolutions.com/api/auth/tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: ""
      //add your's
    })
  }).then(res => res.json());
}

// step 2
function createOrderRegistration(data) {
  return fetch("https://accept.paymobsolutions.com/api/ecommerce/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      auth_token: data.token,
      delivery_needed: false,
      merchant_id: data.merchant_id,
      amount_cents: parseInt(data.price), // add the amount 200 = 2 EGP
      currency: "EGP",
      merchant_order_id: data.id,
      items: [],
      shipping_data: {
        // Mandatory if the delivery is needed
        apartment: 803,
        email: data.email,
        floor: "10",
        first_name: data.firstName,
        last_name: data.lastName,
        street: "20 taha",
        building: "20",
        phone_number: data.phone,
        postal_code: "22828",
        city: data.city,
        country: "EG",
        state: data.state
      }
    })
  }).then(res => res.json());
}

function getPaymentKey(data) {
  return fetch(
    "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth_token: data.token,
        amount_cents: parseInt(data.price), // add the amount 200 = 2 EGP
        currency: "EGP",
        expiration: 3600,
        order_id: data.order_id,
        billing_data: {
          // Mandatory if the delivery is needed
          apartment: 803,
          email: data.email,
          floor: "10",
          first_name: data.firstName,
          last_name: data.lastName,
          street: "20 taha",
          building: "20",
          phone_number: data.phone,
          postal_code: "22828",
          city: data.city,
          country: "EG",
          state: data.state
        },
        integration_id: 7209 // from weaccept website
      })
    }
  ).then(res => res.json());
}

export { getAuthToken, createOrderRegistration, getPaymentKey };
