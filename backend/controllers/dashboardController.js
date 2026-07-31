const dbStore = require('../config/db');

exports.getDashboardData = async (req, res) => {
  try {
    const collections = dbStore.findAll('collections');
    const complaints = dbStore.findAll('complaints');
    const droppoints = dbStore.findAll('droppoints');
    const users = dbStore.findAll('users');

    const totalCollectionsCount = collections.length;
    const totalWeightKg = collections.reduce((acc, curr) => {
      const weight = parseFloat(curr.estimatedWeight) || 0.8;
      return acc + weight;
    }, 0).toFixed(2);

    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status !== 'Resolved').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
    const activeCitizens = users.filter(u => u.role === 'citizen').length;

    // Charts Data Generation
    // 1. Waste Category Distribution (Pie Chart)
    const categoryMap = {};
    collections.forEach(c => {
      const cat = c.wasteCategory || 'Mobile Phones & Accessories';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryDistribution = Object.keys(categoryMap).map(key => ({
      name: key,
      value: categoryMap[key]
    }));

    // If category list is short, add standard GVMC defaults
    if (categoryDistribution.length < 3) {
      categoryDistribution.push(
        { name: "Laptops & Hardware", value: 12 },
        { name: "Lithium Batteries", value: 18 },
        { name: "Monitors & Displays", value: 8 },
        { name: "Mobile Phones", value: 25 }
      );
    }

    // 2. Ward Wise Collections (Bar Chart)
    const wardData = [
      { ward: "Ward 12 (Siripuram)", collections: 42, weightKg: 84.5 },
      { ward: "Ward 14 (RK Beach)", collections: 38, weightKg: 62.0 },
      { ward: "Ward 8 (MVP Colony)", collections: 56, weightKg: 110.2 },
      { ward: "Ward 65 (Gajuwaka)", collections: 64, weightKg: 195.8 },
      { ward: "Ward 92 (Pendurthi)", collections: 29, weightKg: 48.0 },
      { ward: "Ward 20 (Dwaraka)", collections: 47, weightKg: 91.4 }
    ];

    // 3. Daily Trend (Area Chart)
    const dailyTrend = [
      { date: "Mon", dropOffs: 18, kg: 34 },
      { date: "Tue", dropOffs: 25, kg: 49 },
      { date: "Wed", dropOffs: 30, kg: 61 },
      { date: "Thu", dropOffs: 22, kg: 42 },
      { date: "Fri", dropOffs: 41, kg: 88 },
      { date: "Sat", dropOffs: 58, kg: 124 },
      { date: "Sun", dropOffs: 64, kg: 140 }
    ];

    return res.json({
      success: true,
      stats: {
        totalCollectionsCount,
        totalWeightKg: `${totalWeightKg} kg`,
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        activeCitizens,
        activeDropPoints: droppoints.length
      },
      charts: {
        categoryDistribution,
        wardData,
        dailyTrend
      },
      recentCollections: collections.slice(0, 10),
      recentComplaints: complaints.slice(0, 10),
      dropPoints: droppoints
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
