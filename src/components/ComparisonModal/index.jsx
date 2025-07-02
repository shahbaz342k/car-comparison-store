/* eslint-disable react/prop-types */

import { Star, X } from "lucide-react";

// Comparison Modal Component
const ComparisonModal = ({ cars, onClose }) => {
    if (cars.length === 0) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Car Comparison</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <div key={car.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{car.brand} {car.model}</h3>
                  <div className="text-xl font-bold text-blue-600 mb-4">
                    ${car.price.toLocaleString()}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        {car.rating}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span>{car.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span>{car.weight.toLocaleString()} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Range:</span>
                      <span>{car.specs.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">0-60 mph:</span>
                      <span>{car.specs.acceleration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Speed:</span>
                      <span>{car.specs.topSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seating:</span>
                      <span>{car.specs.seating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drivetrain:</span>
                      <span>{car.specs.drivetrain}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ComparisonModal;