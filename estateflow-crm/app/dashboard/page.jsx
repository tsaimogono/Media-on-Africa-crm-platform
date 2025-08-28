// app/dashboard/page.jsx
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

// This is a Server Component – do NOT add 'use client'

export default function DashboardPage() {
  // Redirect based on user role
  if (currentUser.role === 'admin') {
    redirect('/admin/dashboard');
  }

  if (currentUser.role === 'agent') {
    redirect('/agent/dashboard');
  }

  if (currentUser.role === 'client') {
    // In a real app, you'd get the client ID from authentication
    const clientId = 'client-1'; // Mock for now
    redirect(`/client/${clientId}/dashboard`);
  }

  // If no valid role, redirect to login
  redirect('/login');
}