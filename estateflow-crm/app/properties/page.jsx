// app/properties/page.jsx
'use client';

import { useState } from 'react';
import { useLeads } from '@/lib/useLeads';

// Mock property data
const properties = [
  {
    id: 'prop-1',
    title: 'Luxury Condo in Downtown Miami',
    type: 'condo',
    price: 650000,
    location: 'Miami, FL',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: 'https://source.unsplash.com/random/800x600/?condo',
    status: 'available',
    description: 'Stunning 2-bed condo with ocean views, modern kitchen, and rooftop pool.',
    leadIds: ['lead-1'], // Linked to Sarah Johnson
  },
  {
    id: 'prop-2',
    title: 'Spacious Single-Family Home',
    type: 'single-family',
    price: 890000,
    location: 'Austin, TX',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: 'https://source.unsplash.com/random/800x600/?house',
    status: 'under-contract',
    description: 'Beautiful family home with large backyard, updated kitchen, and garage.',
    leadIds: ['lead-2'],
  },
  {
    id: 'prop-3',
    title: 'Modern Townhouse in Brooklyn',
    type: 'townhouse',
    price: 720000,
    location: 'Brooklyn, NY',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/random/800x600/?townhouse',
    status: 'available',
    description: 'Contemporary townhouse with rooftop deck and smart home features.',
    leadIds: [],
  },
  {
    id: 'prop-4',
    title: 'Investment Land Parcel',
    type: 'land',
    price: 450000,
    location: 'Phoenix, AZ',
    bedrooms: 0,
    bathrooms: 0,
    sqft: 5000,
    image: 'https://source.unsplash.com/random/800x600/?land',
    status: 'available',
    description: 'Prime land for development, zoned commercial-residential.',
    leadIds: [],
  },
];

export default function PropertiesPage() {
  const { leads } = useLeads();

  // Filters
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    priceRange: '',
  });

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    const matchesType = !filters.type || prop.type === filters.type;
    const matchesLocation = !filters.location || prop.location.toLowerCase().includes(filters.location.toLowerCase());
    
    let matchesPrice = true;
    if (filters.priceRange) {
      const [min, max] = {
        'under-500k': [0, 500000],
        '500k-700k': [500000, 700000],
        '700k-1m': [700000, 1000000],
        'over-1m': [1000000, Infinity],
      }[filters.priceRange];
      matchesPrice = prop.price >= min && prop.price <= max;
    }

    return matchesType && matchesLocation && matchesPrice;
  });

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Property Listings</h1>
        <span className="text-sm text-gray-500">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Types</option>
            <option value="condo">Condo</option>
            <option value="single-family">Single-Family</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
            <option value="multi-family">Multi-Family</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Miami"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any Price</option>
            <option value="under-500k">Under $500K</option>
            <option value="500k-700k">$500K – $700K</option>
            <option value="700k-1m">$700K – $1M</option>
            <option value="over-1m">Over $1M</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setFilters({ type: '', location: '', priceRange: '' })}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No properties match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => {
            // Find linked leads
            const linkedLeads = leads.filter(l => prop.leadIds.includes(l.id));

            return (
              <div key={prop.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{prop.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        prop.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {prop.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">{prop.location}</p>
                  <p className="text-sm text-gray-500">
                    {prop.bedrooms} bed • {prop.bathrooms} bath • {prop.sqft} sqft
                  </p>

                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">{prop.description}</p>

                  <div className="mt-4">
                    <p className="text-xl font-bold text-indigo-600">{formatPrice(prop.price)}</p>
                  </div>

                  {/* Linked Leads */}
                  {linkedLeads.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 uppercase font-medium">Linked to:</p>
                      <ul className="mt-1 space-y-1">
                        {linkedLeads.map((lead) => (
                          <li key={lead.id}>
                            <a href={`/leads/${lead.id}`} className="text-indigo-600 hover:underline text-sm">
                              {lead.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <a
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}