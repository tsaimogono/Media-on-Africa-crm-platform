// app/page.jsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="white" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,133.3C672,128,768,160,864,176C960,192,1056,192,1152,192C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">EstateFlow</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            The real estate CRM built for South Africa. Track leads, manage clients, and close deals with confidence.
          </p>
          <div className="space-x-4">
            <a
              href="/login"
              className="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Why EstateFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="text-4xl mb-4">PropertyParams</div>
              <h3 className="text-xl font-semibold mb-2">Lead Management</h3>
              <p className="text-gray-600">Track every lead from first contact to closing.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Deal Pipeline</h3>
              <p className="text-gray-600">Visual Kanban board for sales stages.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Property Matching</h3>
              <p className="text-gray-600">Match buyers with listings in Gauteng, KZN, Western Cape.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="mb-6 text-gray-300">Join agents across South Africa.</p>
        <a
          href="/login"
          className="inline-block px-8 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}