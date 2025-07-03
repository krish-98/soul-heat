import React from 'react'

export default function Cart() {
  const handleCheckout = async () => {
    const cartItems = [
      {
        _id: '686563d2373063ae13acc049',
        id: '89867627',
        name: 'Mutton CUrry',
        category: 'Salad Items',
        description: 'p1',
        imageId: 'dd3817fc9203575c18ffd5dff3a42c91',
        price: 10000,
        quantity: 7,
        userRef: '685ab347e655c61afc819704',
        createdAt: '2025-07-02T16:52:34.239Z',
        updatedAt: '2025-07-03T06:10:30.908Z',
        __v: 0,
      },
      {
        _id: '686563d2373063ae13acc049',
        id: '89867628',
        name: 'Chicken CUrry',
        category: 'Salad Items',
        description: 'p2',
        imageId: 'dd3817fc9203575c18ffd5dff3a42c91',
        price: 10000,
        quantity: 3,
        userRef: '685ab347e655c61afc819704',
        createdAt: '2025-07-02T16:52:34.239Z',
        updatedAt: '2025-07-03T06:10:30.908Z',
        __v: 0,
      },
    ]

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVhYjM0N2U2NTVjNjFhZmM4MTk3MDQiLCJpYXQiOjE3NTE1MzQ1NTksImV4cCI6MTc1MTUzNTQ1OX0.nBwU_kAF1D3acRp7WsAoqQ0BgXn6ITc-8qh-JKzIqRs`,
          },
          body: JSON.stringify(cartItems),
          // credentials: 'include',
        }
      )

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <h1>Cart page</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}
