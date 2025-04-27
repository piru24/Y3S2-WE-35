import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Foodie</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#menu" className="text-gray-600 hover:text-gray-800">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-800">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?food')" }}>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold">Delicious Food Delivered To You</h2>
            <p className="mt-4 text-lg">Order your favorite meals from the comfort of your home</p>
            <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Order Now
            </button>
          </div>
        </section>

        <section id="menu" className="container mx-auto px-4 py-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/300x200/?pizza" alt="Pizza" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold">Pizza</h4>
                <p className="text-gray-600 mt-2">Cheesy and delicious pizza with fresh toppings.</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Order Now
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/300x200/?burger" alt="Burger" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold">Burger</h4>
                <p className="text-gray-600 mt-2">Juicy burgers with fresh ingredients.</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Order Now
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/300x200/?pasta" alt="Pasta" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold">Pasta</h4>
                <p className="text-gray-600 mt-2">Creamy and flavorful pasta dishes.</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-200 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">About Us</h3>
            <p className="text-gray-600">
              At Foodie, we are passionate about delivering the best food experience to our customers. Our chefs use the freshest ingredients to prepare delicious meals that you'll love.
            </p>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Contact Us</h3>
          <form className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                Message
              </label>
              <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Foodie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;