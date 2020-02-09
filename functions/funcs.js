//Import modules
const config = require('config');

module.exports = {
  checkArrHasValues: (arr) => {
    if (arr.length > 0) return true;
    return false;
  },

  calcDistance: (lon1, lat1, lon2, lat2, restaurant) => {
    //Destruct restaurant for short view
    let {
      name
    } = restaurant;

    //Using Haversinne Formula
    let p = Math.PI / 180;
    let dLon = p * (lon2 - lon1);
    let dLat = p * (lat2 - lat1);

    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(p * lat1) * Math.cos(p * lat2) * Math.pow(Math.sin(dLon / 2), 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = config.get('R') * c;

    return {
      d,
      restaurant
    };
  },

  sortResults: raw => {
    let sorted = raw.filter(item => item.d <= 3).sort((a, b) => a.d - b.d);

    return sorted;
  }
};