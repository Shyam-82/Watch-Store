import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await fetch("http://localhost:3001/cart");
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await fetch(`http://localhost:3001/cart/${id}`, {
      method: "DELETE",
    });

    loadCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-10">

      <h1 className="text-5xl font-bold text-center text-yellow-500 mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-2xl text-gray-400">
          Cart is Empty
        </h2>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-2xl p-6 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-xl"
                />

                <h3 className="text-2xl font-bold mt-4">
                  {item.name}
                </h3>

                <p className="text-yellow-500 text-xl mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 bg-red-500 px-5 py-2 rounded-lg w-full font-semibold hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          <div className="mt-10 text-center">
            <h2 className="text-4xl font-bold text-green-400">
              Total: ₹{total}
            </h2>
          </div>
        </>
      )}

    </div>
  );
}

export default Cart;