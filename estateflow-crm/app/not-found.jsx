// app/not-found.jsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
      >
        Go Back Home
      </a>
    </div>
  );
}