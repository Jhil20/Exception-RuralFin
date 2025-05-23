import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, CheckCircle, AlertTriangle, Users, Wallet } from 'lucide-react';

const NearbyAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const nearbyAgents = [
    {
      id: "AG12346",
      name: "Vikram Gupta",
      distance: 1.2,
      address: "245 Market Road, Rajpur Village",
      availableLiquidity: 12000,
      transactionsToday: 8,
      rating: 4.8,
      activeUsers: 42,
      status: "online",
      phone: "9876543211",
      coordinates: { lat: 19.9995, lng: 73.7918 }
    },
    {
      id: "AG12347",
      name: "Meera Patel",
      distance: 1.8,
      address: "78 Station Road, Rajpur Village",
      availableLiquidity: 8500,
      transactionsToday: 5,
      rating: 4.5,
      activeUsers: 35,
      status: "online",
      phone: "9876543212",
      coordinates: { lat: 19.9955, lng: 73.7878 }
    },
    {
      id: "AG12348",
      name: "Rahul Sharma",
      distance: 2.4,
      address: "36 Temple Street, Rajpur Village",
      availableLiquidity: 15000,
      transactionsToday: 10,
      rating: 4.9,
      activeUsers: 50,
      status: "online",
      phone: "9876543213",
      coordinates: { lat: 20.0015, lng: 73.7938 }
    },
    {
      id: "AG12349",
      name: "Sunita Desai",
      distance: 3.1,
      address: "92 School Road, Rajpur Village",
      availableLiquidity: 7000,
      transactionsToday: 4,
      rating: 4.3,
      activeUsers: 28,
      status: "offline",
      phone: "9876543214",
      coordinates: { lat: 19.9935, lng: 73.7858 }
    },
    {
      id: "AG12350",
      name: "Prakash Joshi",
      distance: 3.5,
      address: "124 Gandhi Road, Rajpur Village",
      availableLiquidity: 10000,
      transactionsToday: 7,
      rating: 4.6,
      activeUsers: 38,
      status: "online",
      phone: "9876543215",
      coordinates: { lat: 20.0035, lng: 73.7958 }
    },
  ];

  return (
    <div className="space-y-6">
      {/* ... same JSX content as above ... */}
    </div>
  );
};

export default NearbyAgents;
