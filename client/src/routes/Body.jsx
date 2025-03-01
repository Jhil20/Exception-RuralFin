import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@mui/material";

const Body = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Website</h1>
        <nav>
          <Button className="mr-4" variant="ghost">Home</Button>
          <Button className="mr-4" variant="ghost">About</Button>
          <Button className="mr-4" variant="ghost">Services</Button>
          <Button className="mr-4" variant="ghost">Contact</Button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Website</h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover amazing services and features with us!
          </p>
          <Button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md">
            Get Started
          </Button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p className="text-gray-700 mb-4">
              Learn more about our first amazing feature that can help you.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p className="text-gray-700 mb-4">
              Discover how this feature makes everything more efficient.
            </p>
            <Button variant="outline">Explore</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
            <p className="text-gray-700 mb-4">
              A feature designed to improve your experience significantly.
            </p>
            <Button variant="outline">Try Now</Button>
          </div>
        </section>
      </main>

      <footer className="bg-white p-4 text-center shadow">
        © 2025 My Website. All rights reserved.
      </footer>
    </div>
  );
};

export default Body;
