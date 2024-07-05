1. Issue when reducing the quantity
2. show a recently ordered page
   1. once the stripe checkout is success
   2. send the cart items to ordersDetails api
   3. clear the local (redux cart)
   4. after being on the success page for 2 seconds
   5. Redirect the user to the myorders page
3. cache the network requests [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
4. improve the performance (memo, useMemo and useCallback)

---

1. test
2. test@gmail.com
3. 123456

---

- show a recently ordered page

1. once the stripe checkout is success
2. send the cart items to ordersDetails API
3. clear the local (redux cart)
4. after being on the success page for 2 seconds
5. Redirect the user to the myorders page
6. improve the app performance (memo, useMemo and useCallback)
7. cache the network requests https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching

---

wew@sky.com
4242 4242 4242 4242
12 / 25 212
dssds

const handleOrders = async () => {
const modifiedCartItems = cartItems.map(({ \_id, ...rest }) => rest)

      console.log(`modifiedCartItems ${modifiedCartItems}`)

      try {
        const res = await fetch('/api/order/save-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modifiedCartItems),
        })
        const data = await res.json()
        setOrderedItems(data)

        handleClearCart()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    handleOrders()
