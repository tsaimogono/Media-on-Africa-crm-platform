
// app/leads/new/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { useLeads } from '@/lib/useLeads';
import { agents } from '@/lib/agents'; // ✅ Import agents

// ✅ Add assignedTo validation
const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  type: z.enum(['buyer', 'seller', 'investor']),
  propertyType: z.string().min(1, 'Property type is required'),
  budget: z.string().min(1, 'Budget is required'),
  location: z.string().min(1, 'Location is required'),
  source: z.string().min(1, 'Source is required'),
  assignedTo: z.string().min(1, 'Please assign this lead to an agent'), // ✅ Required
});

export default function AddLeadPage() {
  const router = useRouter();
  const { addLead } = useLeads();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: { 
      type: 'buyer', 
      source: 'website',
      assignedTo: 'Alex Morgan' // ✅ Default to existing agent
    },
  });

  const onSubmit = (data) => {
    const newLead = {
      id: uuidv4(),
      ...data,
      stage: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      notes: [],
      tasks: [],
    };
    addLead(newLead);
    reset();
    router.push('/leads');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Lead</h1>
        <p className="text-gray-600">Fill in the details to create a new lead.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Type & Property Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lead Type</label>
            <select {...register('type')} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <input
              type="text"
              {...register('propertyType')}
              placeholder="e.g. condo"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>}
          </div>
        </div>

        {/* Budget & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget</label>
            <input
              type="text"
              {...register('budget')}
              placeholder="e.g. R600k-800k"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              {...register('location')}
              placeholder="e.g. Cape Town, WC"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
          </div>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Source</label>
          <select {...register('source')} className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="website">Website</option>
            <option value="zillow">Zillow</option>
            <option value="referral">Referral</option>
            <option value="open-house">Open House</option>
            <option value="social-media">Social Media</option>
          </select>
          {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source.message}</p>}
        </div>

        {/* Assign to Agent */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Assign to Agent</label>
          <select
            {...register('assignedTo')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.name}>
                {agent.name} ({agent.location})
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="mt-1 text-sm text-red-600">{errors.assignedTo.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-md text-sm font-medium transition"
          >
            {isSubmitting ? 'Saving...' : 'Save Lead'}
          </button>
        </div>
      </form>
    </div>
  );
}