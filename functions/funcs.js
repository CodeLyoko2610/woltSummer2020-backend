//Import modules
const config = require('config');

module.exports = {
  calcDistance: (lon1, lat1, lon2, lat2, restaurant) => {
    //Destruct restaurant
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
    let d = 6371 * c;

    if (d <= 3) {
      return {
        d,
        name
      };
    } else {
      return null
    }
    // console.log('p: ' + p + ' ' + typeof p);
    // console.log('dLon: ' + dLon + ' ' + typeof dLon);
    // console.log('dLat: ' + dLat + ' ' + typeof dLat);
    // console.log('a: ' + a + ' ' + typeof a);
    // console.log('c: ' + c + ' ' + typeof c);
    // console.log('d: ' + d + ' ' + typeof d);
  },

  calcDistance1: (lat, lon) => {
    console.log(lat);
    console.log(lon);
    console.log(config.get('R'));
  }
};

//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula