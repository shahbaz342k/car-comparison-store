/* eslint-disable react/prop-types */
import { Award, Shield, Star, X, Zap } from "lucide-react";

// Car Detail Modal Component
const CarDetailModal = ({ car, onClose }) => {
    if (!car) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="relative">
            <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-xl">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                <p className="text-gray-600 mt-1">{car.year} • {car.type}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">${car.price.toLocaleString()}</div>
                <div className="flex items-center justify-end mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{car.rating}</span>
                  <span className="ml-2 text-gray-500">({car.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Range/Fuel Economy:</span>
                    <span className="font-medium">{car.specs.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">0-60 mph:</span>
                    <span className="font-medium">{car.specs.acceleration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Speed:</span>
                    <span className="font-medium">{car.specs.topSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Drivetrain:</span>
                    <span className="font-medium">{car.specs.drivetrain}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{car.weight.toLocaleString()} lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seating Capacity:</span>
                    <span className="font-medium">{car.specs.seating} passengers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Body Type:</span>
                    <span className="font-medium">{car.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model Year:</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Key Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {car.features.map((feature, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-center text-sm font-medium"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CarDetailModal;