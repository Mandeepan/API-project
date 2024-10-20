'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      { ownerId: 1, address: '123 Elm St', city: 'Chicago', state: 'Illinois', country: 'United States', lat: 41.878113, lng: -87.629799, name: 'Downtown Castle', price: 300000.00, description: 'Beautiful loft in the heart of downtown Chicago.' },
  { ownerId: 2, address: '456 Maple Ave', city: 'Austin', state: 'Texas', country: 'United States', lat: 30.267153, lng: -97.743057, name: 'Cozy House', price: 200000.00, description: 'A cozy house with a lovely garden.' },
  { ownerId: 3, address: '789 Pine Rd', city: 'Miami', state: 'Florida', country: 'United States', lat: 25.761680, lng: -80.191790, name: 'Beach House', price: 750000.00, description: 'A beautiful house right on the beach.' },
  { ownerId: 4, address: '10 Rue de Rivoli', city: 'Paris', state: 'Île-de-France', country: 'France', lat: 48.856613, lng: 2.352222, name: 'Parisian Apartment', price: 1200000.00, description: 'A charming apartment with a view of the Eiffel Tower.' },
  { ownerId: 5, address: '221B Baker St', city: 'London', state: 'England', country: 'United Kingdom', lat: 51.523767, lng: -0.158555, name: 'Historic Flat', price: 950000.00, description: 'A historic flat located in central London.' },
  { ownerId: 6, address: '1 Chome-1-2 Oshiage', city: 'Tokyo', state: 'Tokyo', country: 'Japan', lat: 35.710063, lng: 139.8107, name: 'Tokyo Skytree View', price: 850000.00, description: 'A modern apartment with a view of the Tokyo Skytree.' },
  { ownerId: 7, address: 'Victoria Harbour', city: 'Hong Kong', state: 'Hong Kong', country: 'Hong Kong', lat: 22.28552, lng: 114.15769, name: 'Harbour View Condo', price: 1200000.00, description: 'A luxurious condo with a view of Victoria Harbour.' },
  { ownerId: 8, address: '5th Ave', city: 'New York', state: 'New York', country: 'United States', lat: 40.7831, lng: -73.9712, name: 'Central Park Penthouse', price: 2000000.00, description: 'A penthouse overlooking Central Park.' },
  { ownerId: 9, address: '7 Macquarie St', city: 'Sydney', state: 'New South Wales', country: 'Australia', lat: -33.8688, lng: 151.2093, name: 'Opera House View', price: 1800000.00, description: 'An apartment with a view of the Sydney Opera House.' },
  { ownerId: 10, address: 'Red Square', city: 'Moscow', state: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176, name: 'Kremlin House', price: 1300000.00, description: 'An house near Red Square with historic views.' },
  { ownerId: 1, address: '678 Tel Aviv St', city: 'Tel Aviv', state: 'Tel Aviv District', country: 'Israel', lat: 32.0853, lng: 34.7818, name: 'Beachfront Apartment', price: 900000.00, description: 'A beachfront apartment in Tel Aviv.' },
  { ownerId: 2, address: 'Piazza del Duomo', city: 'Milan', state: 'Lombardy', country: 'Italy', lat: 45.4642, lng: 9.1900, name: 'Green Flat', price: 1400000.00, description: 'A luxurious flat with a view of the Milan Cathedral.' },
  { ownerId: 3, address: 'Plaza de España', city: 'Seville', state: 'Andalusia', country: 'Spain', lat: 37.3772, lng: -5.9869, name: 'Spanish Villa', price: 1100000.00, description: 'A traditional Spanish villa near Plaza de España.' },
  { ownerId: 4, address: 'Ginza', city: 'Tokyo', state: 'Tokyo', country: 'Japan', lat: 35.6717, lng: 139.765, name: 'Luxury Ginza Apartment', price: 1600000.00, description: 'A luxury apartment in the Ginza district.' },
  { ownerId: 5, address: 'Bondi Beach', city: 'Sydney', state: 'New South Wales', country: 'Australia', lat: -33.8915, lng: 151.2767, name: 'Bondi Beach House', price: 950000.00, description: 'A beach house near Bondi Beach.' },
  { ownerId: 6, address: '10 Nevsky Ave', city: 'St Petersburg', state: 'Russia', country: 'Russia', lat: 59.9343, lng: 30.3351, name: 'St Petersburg Loft', price: 850000.00, description: 'A loft in the cultural heart of St Petersburg.' },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Downtown Loft',
        'Cozy Cottage',
        'Beach House',
        'Parisian Apartment',
        'Historic Flat',
        'Tokyo Skytree View',
        'Harbour View Condo',
        'Central Park Penthouse',
        'Opera House View',
        'Kremlin Apartment',
        'Beachfront Apartment',
        'Cathedral View Flat',
        'Spanish Villa',
        'Luxury Ginza Apartment',
        'Bondi Beach House',
        'St Petersburg Loft'
      ] }
    }, {});
  }
};
