const app = require('./app');
require('./firebase/firebaseAdmin');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`🚀 EcoDrop AI Server running on http://localhost:${PORT}`);
  console.log(`📍 Department: GVMC Public Health & Solid Waste Management`);
  console.log(`🌿 City: Visakhapatnam, Andhra Pradesh`);
  console.log(`========================================================`);
});
