'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate( [
      { userId: 2, spotId: 1, review: 'Amazing loft, the views were incredible and the location was perfect for exploring the city.', stars: 5 },
      { userId: 3, spotId: 1, review: 'The loft was decent but a bit noisy at night due to downtown traffic.', stars: 3 },
      { userId: 4, spotId: 2, review: 'Lovely cottage, perfect for a relaxing weekend getaway. The garden was beautiful.', stars: 5 },
      { userId: 5, spotId: 2, review: 'The cottage was cozy but lacked some modern amenities.', stars: 3 },
      { userId: 6, spotId: 3, review: 'Beach House was absolutely perfect, right on the beach and very spacious.', stars: 5 },
      { userId: 7, spotId: 3, review: 'Great location, but the house could use some updates.', stars: 4 },
      { userId: 8, spotId: 4, review: 'The Parisian Apartment had a stunning view of the Eiffel Tower, highly recommended.', stars: 5 },
      { userId: 9, spotId: 4, review: 'Nice apartment but quite expensive for what it offered.', stars: 3 },
      { userId: 10, spotId: 5, review: 'Historic Flat in London was charming and full of character, loved the location.', stars: 5 },
      { userId: 3, spotId: 5, review: 'The flat was historic but lacked some basic modern comforts.', stars: 3 },
      { userId: 4, spotId: 6, review: 'Tokyo Skytree View apartment was very modern and had amazing views of the city.', stars: 5 },
      { userId: 5, spotId: 6, review: 'Great view but the apartment was smaller than expected.', stars: 4 },
      { userId: 6, spotId: 7, review: 'Harbour View Condo in Hong Kong was luxurious with breathtaking views.', stars: 5 },
      { userId: 7, spotId: 7, review: 'Nice condo but very pricey.', stars: 3 },
      { userId: 8, spotId: 8, review: 'The Central Park Penthouse was incredible, spacious, and had a great view of the park.', stars: 5 },
      { userId: 9, spotId: 8, review: 'Beautiful penthouse but a bit overpriced.', stars: 4 },
      { userId: 10, spotId: 9, review: 'Opera House View apartment was amazing, great for a vacation stay.', stars: 5 },
      { userId: 2, spotId: 9, review: 'Nice apartment, but the traffic noise was a bit too much at night.', stars: 3 },
      { userId: 3, spotId: 10, review: 'Kremlin Apartment was very unique, loved the historic views.', stars: 5 },
      { userId: 4, spotId: 10, review: 'Good location but the apartment itself was quite dated.', stars: 3 },
      { userId: 5, spotId: 11, review: 'Beachfront Apartment in Tel Aviv was perfect for a relaxing beach holiday.', stars: 5 },
      { userId: 6, spotId: 11, review: 'Great location but the apartment needed some maintenance.', stars: 4 },
      { userId: 7, spotId: 12, review: 'Cathedral View Flat in Milan was luxurious with an incredible view.', stars: 5 },
      { userId: 8, spotId: 12, review: 'Beautiful flat but quite noisy during the day.', stars: 3 },
      { userId: 9, spotId: 13, review: 'Spanish Villa was perfect for a family vacation, lots of space and great amenities.', stars: 5 },
      { userId: 10, spotId: 13, review: 'Nice villa but could use some updates.', stars: 4 },
      { userId: 2, spotId: 14, review: 'Luxury Ginza Apartment was amazing, very modern and centrally located.', stars: 5 },
      { userId: 3, spotId: 14, review: 'Great apartment but a bit too expensive for my taste.', stars: 4 },
      { userId: 4, spotId: 15, review: 'Bondi Beach House was great, very close to the beach and had a nice patio.', stars: 5 },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: [
        'Amazing loft, the views were incredible and the location was perfect for exploring the city.',
        'The loft was decent but a bit noisy at night due to downtown traffic.',
        'Lovely cottage, perfect for a relaxing weekend getaway. The garden was beautiful.',
        'The cottage was cozy but lacked some modern amenities.',
        'Beach House was absolutely perfect, right on the beach and very spacious.',
        'Great location, but the house could use some updates.',
        'The Parisian Apartment had a stunning view of the Eiffel Tower, highly recommended.',
        'Nice apartment but quite expensive for what it offered.',
        'Historic Flat in London was charming and full of character, loved the location.',
        'The flat was historic but lacked some basic modern comforts.',
        'Tokyo Skytree View apartment was very modern and had amazing views of the city.',
        'Great view but the apartment was smaller than expected.',
        'Harbour View Condo in Hong Kong was luxurious with breathtaking views.',
        'Nice condo but very pricey.',
        'The Central Park Penthouse was incredible, spacious, and had a great view of the park.',
        'Beautiful penthouse but a bit overpriced.',
        'Opera House View apartment was amazing, great for a vacation stay.',
        'Nice apartment, but the traffic noise was a bit too much at night.',
        'Kremlin Apartment was very unique, loved the historic views.',
        'Good location but the apartment itself was quite dated.',
        'Beachfront Apartment in Tel Aviv was perfect for a relaxing beach holiday.',
        'Great location but the apartment needed some maintenance.',
        'Cathedral View Flat in Milan was luxurious with an incredible view.',
        'Beautiful flat but quite noisy during the day.',
        'Spanish Villa was perfect for a family vacation, lots of space and great amenities.',
        'Nice villa but could use some updates.',
        'Luxury Ginza Apartment was amazing, very modern and centrally located.',
        'Great apartment but a bit too expensive for my taste.',
        'Bondi Beach House was great, very close to the beach and had a nice patio.'
      ] }
    }, {});
  }
};
