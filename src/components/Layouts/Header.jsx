/* eslint-disable react/prop-types */
import { Car } from 'lucide-react'
const Header = ({selectedCars, setShowComparison}) => {
  return (
    <>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-base lg:text-2xl font-bold text-gray-900">CarCompare</h1>
              </div>
              
              {selectedCars?.length > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="hidden md:block lg:text-sm text-gray-600">
                    {selectedCars?.length} car{selectedCars?.length > 1 ? 's' : ''} selected
                  </span>
                  <button
                    onClick={() => setShowComparison(true)}
                    className="px-2 py-1 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Compare ({selectedCars?.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
    </>
  )
}

export default Header