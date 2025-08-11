// app/leads/[id]/page.jsx
import { leads } from '@/lib/data';
import Link from 'next/link';
import { format } from 'date-fns';

export default function LeadDetailPage({ params }) {
  const lead = leads.find(l => l.id === params.id);

  if (!lead) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Lead Not Found</h2>
          <Link href="/leads" className="text-indigo-600 hover:underline mt-2 inline-block">
            ← Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{lead.name}</h1>
          <p className="text-gray-600">{lead.email} · {lead.phone}</p>
        </div>
        <Link href="/leads" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          ← Back to Leads
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
          <p className="mt-1 text-lg font-semibold capitalize">{lead.propertyType}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Budget</h3>
          <p className="mt-1 text-lg font-semibold">{lead.budget}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Location</h3>
          <p className="mt-1 text-lg font-semibold">{lead.location}</p>
        </div>
      </div>

      {/* Stage, Source, Assigned To */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-500">Stage</label>
          <select
            defaultValue={lead.stage}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
            <option value="converted">Converted</option>
          </select>
        </div>
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-500">Source</label>
          <p className="mt-1 px-4 py-2 bg-gray-100 rounded-lg text-gray-800 capitalize">
            {lead.source}
          </p>
        </div>
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-500">Assigned To</label>
          <p className="mt-1 px-4 py-2 bg-gray-100 rounded-lg text-gray-800">
            {lead.assignedTo}
          </p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Activity</h2>

        <div className="space-y-6">
          {/* Notes */}
          {lead.notes.length > 0 ? (
            lead.notes.map((note) => (
              <div key={note.id} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                  {note.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Note • {format(new Date(), 'MMM d, yyyy')} • {note.author}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No notes yet.</p>
          )}

          {/* Add Note Form */}
          <div className="border-t pt-4 mt-4">
            <form>
              <textarea
                placeholder="Add a note about this lead..."
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
        {lead.tasks.length > 0 ? (
          <ul className="space-y-3">
            {lead.tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className={`ml-3 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500">Due {task.due}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No tasks assigned.</p>
        )}
        <div className="mt-4">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}