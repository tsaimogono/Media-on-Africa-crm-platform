// app/properties/page.jsx
'use client';

import { useState } from 'react';
import { leads } from '@/lib/data';
import { properties } from '@/lib/properties';

export default function PropertiesPage() {
 // 🔒 Access Control: Only admin and agent can view properties
  if (!['admin', 'agent'].includes(currentUser.role)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to view property listings.</p>
        <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

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
        'under-1m': [0, 1_000_000],
        '1m-2m': [1_000_000, 2_000_000],
        '2m-5m': [2_000_000, 5_000_000],
        'over-5m': [5_000_000, Infinity],
      }[filters.priceRange];
      matchesPrice = prop.price >= min && prop.price <= max;
    }

    return matchesType && matchesLocation && matchesPrice;
  });

  // Format price in ZAR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
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
            <option value="apartment">Apartment</option>
            <option value="single-family">House</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Cape Town"
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
            <option value="under-1m">Under R1M</option>
            <option value="1m-2m">R1M – R2M</option>
            <option value="2m-5m">R2M – R5M</option>
            <option value="over-5m">Over R5M</option>
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
            // Find linked lead
            const linkedLead = leads.find(l => l.id === prop.leadId);

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
                    {prop.bedrooms} bed • {prop.bathrooms} bath • {prop.size} m²
                  </p>

                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">{prop.description}</p>

                  <div className="mt-4">
                    <p className="text-xl font-bold text-indigo-600">{formatPrice(prop.price)}</p>
                  </div>

                  {/* Linked Lead */}
                  {linkedLead && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 uppercase font-medium">Linked to:</p>
                      <a
                        href={`/leads/${linkedLead.id}`}
                        className="text-indigo-600 hover:underline text-sm font-medium"
                      >
                        {linkedLead.name}
                      </a>
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