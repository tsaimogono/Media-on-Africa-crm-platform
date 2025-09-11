// app/dashboard/page.jsx
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  if (!currentUser.role) {
    redirect('/login');
  }

  if (currentUser.role === 'admin') {
    redirect('/admin/dashboard');
  } else if (currentUser.role === 'agent') {
    redirect('/agent/dashboard');
  } else if (currentUser.role === 'client') {
    redirect(`/client/client-1/dashboard`);
  } else {
    redirect('/login');
  }

  return null;
}