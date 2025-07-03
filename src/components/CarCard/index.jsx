/* eslint-disable react/prop-types */
import { Car, Plus, Star, Users, X } from "lucide-react";
import { useState } from "react";

// Car Card Component
const CarCard = ({ car, onCompare, isSelected, onView }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            {!imageLoaded && (
              <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center">
                <Car className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => onCompare(car)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-blue-50'
              }`}
              aria-label={isSelected ? 'Remove from comparison' : 'Add to comparison'}
            >
              {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {car.brand} {car.model}
            </h3>
            <span className="text-sm text-gray-500">{car.year}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">{car.rating}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {car.reviews} reviews
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium text-gray-900">{car.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium text-gray-900">{car.weight.toLocaleString()} lbs</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">0-60 mph:</span>
              <span className="font-medium text-gray-900">{car.specs.acceleration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </div>
            <button
              onClick={() => onView(car)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CarCard;