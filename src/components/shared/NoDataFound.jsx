/* eslint-disable react/prop-types */
import { Car } from 'lucide-react'
const NoDataFound = ({titleMsg = 'No cars found', suggetionMsg = 'Try adjusting your search or filter criteria',resetFilters}) => {
  return (
    <div className="text-center py-12">
        <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{titleMsg}</h3>
        <p className="text-gray-600 mb-6">{suggetionMsg}</p>
        <button
            onClick={() => resetFilters()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
            Reset Filters
        </button>
    </div>
  )
}

export default NoDataFound;