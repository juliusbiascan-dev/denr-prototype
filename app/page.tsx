import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PageContainer scrollable={true}>
      <div className="h-screen w-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img src="/logo.jpg" alt="DENR Logo" className="h-8 w-8" />
                <h1 className="text-xl font-bold text-green-700 dark:text-green-500">DENR Equipment</h1>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              DENR Equipment
              <span className="block text-green-600 dark:text-green-500 mt-2">Management System</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline your equipment tracking, maintenance, and management with our comprehensive
              digital solution designed for the Department of Environment and Natural Resources.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transform transition-transform hover:scale-105"
                asChild
              >
                <a href="/dashboard">Get Started</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950 transform transition-transform hover:scale-105"
                asChild
              >
                <a href="/auth/login">Sign In</a>
              </Button>
            </div>

            {/* Quick Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Equipment Tracking</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Monitor and track all equipment in real-time</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Maintenance</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Schedule and track maintenance activities</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">QR Integration</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Scan QR codes for instant access</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Documentation</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Store and manage equipment documents</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Analytics</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Data-driven insights and reports</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">User Management</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Control access and permissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Department of Environment and Natural Resources - Equipment Management System
            </p>
          </div>
        </footer>
      </div>

    </PageContainer>
  );
}
