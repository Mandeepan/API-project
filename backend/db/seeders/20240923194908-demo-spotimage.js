'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate( [
      {
        spotId: 1,
        url: 'https://media.cntraveler.com/photos/613aabab7084bd911b309b44/16:9/w_2991,h_1682,c_limit/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cf42c4dc.rocketcdn.me/wp-content/uploads/2023/08/Oliver-Mansion-2.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.ytimg.com/vi/vlv52xSooD0/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.floridadesign.com/wp-content/uploads/sites/137/2020/03/Choeff_Rodriguez_FD30-1A.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.floridadesign.com/wp-content/uploads/sites/137/2021/07/Venetian-Islands-home-photo-by-Paul-Stoppi-designed-byDunagan-Diverio_MHD17-2G.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.squarespace-cdn.com/content/v1/54b30f27e4b07e1bade0f312/1428317526726-Q7LBI1GEG6A3VQE7EM0G/image-asset.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://st.hzcdn.com/simgs/pictures/soggiorni/classic-mansion-in-paris-spazio-progetto-img~3a51dab50bb4d74e_4-0126-1-6be2749.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?url=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fqf55hfmz1g194vekc5j4v6ema5i215&w=3840&q=75&option=N&permitphotoenlargement=false&fallbackimageurl=https%3A%2F%2Fwww.sothebysrealty.com%2Fassets%2Fimages%2Fcommon%2Fnophoto%2Flisting.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/london/places/fenton-house-and-garden/library/exterior-view-fenton-house-garden-london-1083414.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://londonhousechicago.com/assets/uploads/general/Interior/LondonHouse%20Chicago%20Welcoming%20Entrance.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.houseandgarden.co.uk/photos/6673fbe18d71c33fd9523373/16:9/w_2560,h_1440,c_limit/H28_London_Warehouse_Lounge_01_L.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/736x/ec/fe/bc/ecfebc4cfe0d0c62a375c248325bd647.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://www.kurashinity.com/en/column/img/traditional-japanese-houses/column_traditional-japanese-houses_02.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://findingtimetowrite.wordpress.com/wp-content/uploads/2022/12/ffjapanwondertravelblog.jpg?w=400',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFJVXWkmETDo/v0/-1x-1.webp',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt4467de10ac73eb6a/61810c7da61df875c345994a/US_HongKong_HK_Header.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iuz.11VRRK8c/v0/-1x-1.webp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://mlshkd6fvbce.i.optimole.com/cb:i5I2.12f4b/w:372/h:248/q:mauto/dpr:2.6/sm:0/ig:avif/id:218aeb62b57b5394d44c9f9dd236ca3d/https://homesoftherich.net/Screen-Shot-2023-09-05-at-2.04.39-PM.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://www.realestate.com.au/news-image/w_1280,h_720/v1660198270/news-lifestyle-content-assets/wp-content/production/capi_7ed6766cd88387194047c5837bf1c23a_4cd7def9837a4edb4593785f1a9945e2.jpeg?_i=AA',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://moscowestates.com/wp-content/uploads/2022/10/1-5.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://explanders.com/wp-content/uploads/2023/05/Crazy-House_Hayarkon-181_Tel-Aviv_Israel_8-e1684570428515-1024x717.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://img.freepik.com/premium-photo/milan-italy-10-april-2019-houses-with-garden-terrace_646135-164.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/568928893.jpg?k=9f21b4f303a10e05716f4f40fba6d6b87d7581f35851587ece22622252b67668&o=&hp=1',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt04a773e95baae068/61c17d47e5a70e7d5276be5e/US_Seville_ES_Header.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://pix8.agoda.net/hotelImages/232/2324690/2324690_17081313030055356747.jpg?ca=6&ce=1&s=1024x768',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://t4.ftcdn.net/jpg/03/84/95/39/360_F_384953971_jFbTPaB32Fc66V7S3eguowrEvU90ILsr.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://joshdotoligroup.com/wp-content/uploads/2023/07/How-to-Buy-a-Beach-House.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/170000293.jpg?k=e3387a71da5de457637f275b591faf05cf3f59aede569a2ecea889f9804d4765&o=&hp=1',
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://media.cntraveler.com/photos/613aabab7084bd911b309b44/16:9/w_2991,h_1682,c_limit/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg',
        'https://cf42c4dc.rocketcdn.me/wp-content/uploads/2023/08/Oliver-Mansion-2.jpg',
        'https://i.ytimg.com/vi/vlv52xSooD0/maxresdefault.jpg',
        'https://cdn.floridadesign.com/wp-content/uploads/sites/137/2020/03/Choeff_Rodriguez_FD30-1A.jpg',
        'https://cdn.floridadesign.com/wp-content/uploads/sites/137/2021/07/Venetian-Islands-home-photo-by-Paul-Stoppi-designed-byDunagan-Diverio_MHD17-2G.jpg',
        'https://images.squarespace-cdn.com/content/v1/54b30f27e4b07e1bade0f312/1428317526726-Q7LBI1GEG6A3VQE7EM0G/image-asset.jpeg',
        'https://st.hzcdn.com/simgs/pictures/soggiorni/classic-mansion-in-paris-spazio-progetto-img~3a51dab50bb4d74e_4-0126-1-6be2749.jpg',
        'https://i.pinimg.com/736x/ec/fe/bc/ecfebc4cfe0d0c62a375c248325bd647.jpg',
        'https://www.kurashinity.com/en/column/img/traditional-japanese-houses/column_traditional-japanese-houses_02.jpg',
        'https://findingtimetowrite.wordpress.com/wp-content/uploads/2022/12/ffjapanwondertravelblog.jpg?w=400',
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFJVXWkmETDo/v0/-1x-1.webp',
        'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt4467de10ac73eb6a/61810c7da61df875c345994a/US_HongKong_HK_Header.jpg',
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iuz.11VRRK8c/v0/-1x-1.webp',
        'https://mlshkd6fvbce.i.optimole.com/cb:i5I2.12f4b/w:372/h:248/q:mauto/dpr:2.6/sm:0/ig:avif/id:218aeb62b57b5394d44c9f9dd236ca3d/https://homesoftherich.net/Screen-Shot-2023-09-05-at-2.04.39-PM.png',
        'https://www.realestate.com.au/news-image/w_1280,h_720/v1660198270/news-lifestyle-content-assets/wp-content/production/capi_7ed6766cd88387194047c5837bf1c23a_4cd7def9837a4edb4593785f1a9945e2.jpeg?_i=AA',
        'https://moscowestates.com/wp-content/uploads/2022/10/1-5.jpg',
        'https://explanders.com/wp-content/uploads/2023/05/Crazy-House_Hayarkon-181_Tel-Aviv_Israel_8-e1684570428515-1024x717.jpg',
        'https://img.freepik.com/premium-photo/milan-italy-10-april-2019-houses-with-garden-terrace_646135-164.jpg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/568928893.jpg?k=9f21b4f303a10e05716f4f40fba6d6b87d7581f35851587ece22622252b67668&o=&hp=1',
        'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt04a773e95baae068/61c17d47e5a70e7d5276be5e/US_Seville_ES_Header.jpg',
        'https://pix8.agoda.net/hotelImages/232/2324690/2324690_17081313030055356747.jpg?ca=6&ce=1&s=1024x768',
        'https://t4.ftcdn.net/jpg/03/84/95/39/360_F_384953971_jFbTPaB32Fc66V7S3eguowrEvU90ILsr.jpg',
        'https://joshdotoligroup.com/wp-content/uploads/2023/07/How-to-Buy-a-Beach-House.jpeg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/170000293.jpg?k=e3387a71da5de457637f275b591faf05cf3f59aede569a2ecea889f9804d4765&o=&hp=1',
        'https://img-v2.gtsstatic.net/reno/imagereader.aspx?url=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fqf55hfmz1g194vekc5j4v6ema5i215&w=3840&q=75&option=N&permitphotoenlargement=false&fallbackimageurl=https%3A%2F%2Fwww.sothebysrealty.com%2Fassets%2Fimages%2Fcommon%2Fnophoto%2Flisting.jpg',
  'https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/london/places/fenton-house-and-garden/library/exterior-view-fenton-house-garden-london-1083414.jpg',
  'https://londonhousechicago.com/assets/uploads/general/Interior/LondonHouse%20Chicago%20Welcoming%20Entrance.jpg',
  'https://media.houseandgarden.co.uk/photos/6673fbe18d71c33fd9523373/16:9/w_2560,h_1440,c_limit/H28_London_Warehouse_Lounge_01_L.jpg'
      ] }
    }, {});
  }
};
