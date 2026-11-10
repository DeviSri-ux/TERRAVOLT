const express = require('express');
const router = express.Router();
const axios = require('axios');

// Vehicle emission coefficients (TERRAVOLT 1.0 demo values)
const VEHICLE_COEFFICIENTS = {
  'petrol_bike': 0.15,
  'diesel_suv': 0.25,
  'electric_scooter': 0.00
};

router.post('/calculate', async (req, res) => {
  const { start, end, vehicle = 'petrol_bike' } = req.body;
  try {
    // Using OSRM demo server
    const url = 'http://router.project-osrm.org/route/v1/driving/' + start.lng + ',' + start.lat + ';' + end.lng + ',' + end.lat;
    const response = await axios.get(url, {
      params: { overview: 'full', geometries: 'geojson' }
    });
    
    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const distanceKm = route.distance / 1000;
      const coefficient = VEHICLE_COEFFICIENTS[vehicle] || 0.15;
      const emissionsG = distanceKm * coefficient * 1000;
      
      res.json({
        routes: [{
          distance: distanceKm,
          geometry: route.geometry,
          duration: route.duration / 60,
          emissions: emissionsG,
          vehicle: vehicle,
          recommended: true
        }],
        demo: true
      });
    } else {
      res.status(404).json({ msg: 'Route not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Error calculating route', demo: true });
  }
});

module.exports = router;
