import { useEffect, useState } from "react";
import WatchViewer3D from "../components/WatchViewer3D";

function Home() {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/watches")
      .then((res) => res.json())
      .then((data) => setWatches(data));
  }, []);

  const addToCart = async (watch) => {
    const cartItem = {
      name: watch.name,
      price: watch.price,
      image: watch.image,
    };

    await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });

    alert("Added To Cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">

      <WatchViewer3D />

      <section className="text-center py-6">
        <h1 className="text-6xl font-bold text-yellow-500">
          Luxury Watch Store
        </h1>

        <p className="mt-4 text-gray-400 text-xl">
          Premium Collection For Modern Lifestyle
        </p>
      </section>

      <section className="p-10">

        <h2 className="text-4xl mb-8 font-bold text-center">
          Featured Collection
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {watches.map((watch) => (
            <div
              key={watch.id}
              className="bg-gray-900 rounded-2xl p-6 hover:scale-105 duration-300 shadow-xl"
            >
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-64 object-cover rounded-xl"
              />

              <h3 className="text-2xl font-bold mt-4">
                {watch.name}
              </h3>

              <p className="text-yellow-500 text-xl mt-2">
                ₹{watch.price}
              </p>

              <button
                onClick={() => addToCart(watch)}
                className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg w-full font-semibold hover:bg-yellow-400"
              >
                Add To Cart
              </button>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;