// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
  </div>
);

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Basic header skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Loading spinner */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <LoadingSpinner />
          <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
            Loading users...
          </p>
        </div>
      </div>
    </div>
  );
} 