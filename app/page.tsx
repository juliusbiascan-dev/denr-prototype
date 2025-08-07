import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700">DENR Equipment</h1>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            DENR Equipment
            <span className="block text-green-600">Management System</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your equipment tracking, maintenance, and management with our comprehensive
            digital solution designed for the Department of Environment and Natural Resources.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/dashboard">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/auth/login">Sign In</a>
            </Button>
          </div>

          {/* Quick Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-sm font-semibold text-gray-800">Equipment Tracking</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="text-sm font-semibold text-gray-800">Maintenance</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="text-sm font-semibold text-gray-800">QR Integration</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-sm font-semibold text-gray-800">Documentation</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-sm font-semibold text-gray-800">Analytics</h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="text-sm font-semibold text-gray-800">User Management</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            Department of Environment and Natural Resources - Equipment Prototype
          </p>
        </div>
      </footer>
    </div>
  );
}
