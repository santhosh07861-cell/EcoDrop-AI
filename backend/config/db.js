const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Initial seed data for Visakhapatnam (GVMC) drop-off points
const SEED_DROPPOINTS = [
  {
    id: "dp_siripuram_12",
    dropPointId: "DP-GVMC-001",
    name: "Siripuram Smart E-Waste Hub",
    ward: "Ward 12 (Siripuram)",
    zone: "Zone 3 (Central Vizag)",
    address: "Opposite HSBC Building, Siripuram Circle, Visakhapatnam - 530003",
    lat: 17.7220,
    lng: 83.3150,
    operatingHours: "08:00 AM - 08:00 PM",
    contactPerson: "Field Officer M. Rajesh (GVMC)",
    acceptedTypes: ["Mobiles", "Laptops", "Batteries", "Chargers", "Small Appliances"],
    capacityStatus: "45% Full",
    capacityPercentage: 45,
    status: "Active",
    qrCodeData: "DP-GVMC-001|Siripuram Hub|Ward 12"
  },
  {
    id: "dp_rkbeach_14",
    dropPointId: "DP-GVMC-002",
    name: "RK Beach Promenade Drop Kiosk",
    ward: "Ward 14 (RK Beach)",
    zone: "Zone 3 (Central Vizag)",
    address: "Near Submarine Museum Promenade, Beach Road, Visakhapatnam - 530017",
    lat: 17.7125,
    lng: 83.3225,
    operatingHours: "06:00 AM - 09:00 PM",
    contactPerson: "Supervisor K. Srinivasa Rao",
    acceptedTypes: ["Mobiles", "Batteries", "Small Hardware", "Chargers"],
    capacityStatus: "70% Full",
    capacityPercentage: 70,
    status: "Active",
    qrCodeData: "DP-GVMC-002|RK Beach Kiosk|Ward 14"
  },
  {
    id: "dp_mvp_8",
    dropPointId: "DP-GVMC-003",
    name: "MVP Colony Sector-4 Recycling Station",
    ward: "Ward 8 (MVP Colony)",
    zone: "Zone 2 (North Vizag)",
    address: "Adjacent to Rythu Bazar, Sector 4, MVP Colony, Visakhapatnam - 530017",
    lat: 17.7440,
    lng: 83.3320,
    operatingHours: "07:30 AM - 07:30 PM",
    contactPerson: "Field Officer P. Lakshmi",
    acceptedTypes: ["All Household E-Waste", "Monitors", "TVs", "Batteries"],
    capacityStatus: "30% Full",
    capacityPercentage: 30,
    status: "Active",
    qrCodeData: "DP-GVMC-003|MVP Colony Station|Ward 8"
  },
  {
    id: "dp_gajuwaka_4",
    dropPointId: "DP-GVMC-004",
    name: "Gajuwaka Industrial Belt E-Waste Drop Center",
    ward: "Ward 65 (Gajuwaka)",
    zone: "Zone 4 (South Vizag)",
    address: "Near Gajuwaka Bus Depot Main Gate, Visakhapatnam - 530026",
    lat: 17.6900,
    lng: 83.2180,
    operatingHours: "08:00 AM - 06:00 PM",
    contactPerson: "GVMC Inspector T. Ramesh",
    acceptedTypes: ["Commercial & Industrial E-Waste", "PCBs", "Large Hardware"],
    capacityStatus: "82% Full (Alert)",
    capacityPercentage: 82,
    status: "Active",
    qrCodeData: "DP-GVMC-004|Gajuwaka Drop Center|Ward 65"
  },
  {
    id: "dp_pendurthi_5",
    dropPointId: "DP-GVMC-005",
    name: "Pendurthi Junction Smart E-Bin",
    ward: "Ward 92 (Pendurthi)",
    zone: "Zone 5 (West Vizag)",
    address: "GVMC Zonal Office Compound, Pendurthi Main Road, Visakhapatnam - 531173",
    lat: 17.7780,
    lng: 83.2120,
    operatingHours: "08:00 AM - 07:00 PM",
    contactPerson: "Field Officer S. Naidu",
    acceptedTypes: ["Mobiles", "Batteries", "Chargers", "Small IT Hardware"],
    capacityStatus: "20% Full",
    capacityPercentage: 20,
    status: "Active",
    qrCodeData: "DP-GVMC-005|Pendurthi Smart Bin|Ward 92"
  },
  {
    id: "dp_dwarakanagar_20",
    dropPointId: "DP-GVMC-006",
    name: "Dwaraka Nagar Commercial Hub Drop Point",
    ward: "Ward 20 (Dwaraka Nagar)",
    zone: "Zone 3 (Central Vizag)",
    address: "Near RTC Complex Road, 1st Lane, Dwaraka Nagar, Visakhapatnam - 530016",
    lat: 17.7280,
    lng: 83.3030,
    operatingHours: "09:00 AM - 08:30 PM",
    contactPerson: "GVMC Officer V. Anand",
    acceptedTypes: ["Laptops", "Mobiles", "Batteries", "Monitors"],
    capacityStatus: "55% Full",
    capacityPercentage: 55,
    status: "Active",
    qrCodeData: "DP-GVMC-006|Dwaraka Nagar Hub|Ward 20"
  }
];

const SEED_USERS = [
  {
    id: "usr_citizen_demo",
    userId: "USR-1001",
    name: "Ravi Teja",
    email: "citizen@gvmc.gov.in",
    passwordHash: "$2a$10$w6K6D5J4d.ZJp1X9n0H4gO0Z1r2s3t4u5v6w7x8y9z0a1b2c3d4e", // password: password123
    role: "citizen",
    phone: "+91 98765 43210",
    address: "Siripuram, Ward 12, Visakhapatnam",
    greenPoints: 340,
    totalSubmissions: 5,
    co2SavedKg: 14.2,
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_admin_demo",
    userId: "ADM-GVMC-99",
    employeeId: "GVMC-EMP-8842",
    name: "Dr. K. V. Satyanarayana (GVMC Health Officer)",
    email: "admin@gvmc.gov.in",
    passwordHash: "$2a$10$w6K6D5J4d.ZJp1X9n0H4gO0Z1r2s3t4u5v6w7x8y9z0a1b2c3d4e", // password: adminpassword
    role: "admin",
    department: "Public Health & Solid Waste Management",
    phone: "+91 891 2754321",
    createdAt: new Date().toISOString()
  }
];

const SEED_COLLECTIONS = [
  {
    id: "col_1",
    collectionId: "COL-2026-0891",
    userId: "usr_citizen_demo",
    userName: "Ravi Teja",
    dropPointId: "DP-GVMC-001",
    dropPointName: "Siripuram Smart E-Waste Hub",
    ward: "Ward 12 (Siripuram)",
    wasteCategory: "Mobile Phones & Chargers",
    estimatedWeight: "0.85 kg",
    confidence: "98.4%",
    greenPointsEarned: 50,
    photo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    location: "Siripuram Ward 12",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Verified & Collected"
  },
  {
    id: "col_2",
    collectionId: "COL-2026-0892",
    userId: "usr_citizen_demo",
    userName: "Ravi Teja",
    dropPointId: "DP-GVMC-003",
    dropPointName: "MVP Colony Sector-4 Recycling Station",
    ward: "Ward 8 (MVP Colony)",
    wasteCategory: "Old Laptop & Battery",
    estimatedWeight: "2.40 kg",
    confidence: "96.1%",
    greenPointsEarned: 120,
    photo: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80",
    location: "MVP Colony Sector 4",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    status: "Verified & Collected"
  },
  {
    id: "col_3",
    collectionId: "COL-2026-0893",
    userId: "usr_citizen_demo",
    userName: "Sujatha P.",
    dropPointId: "DP-GVMC-002",
    dropPointName: "RK Beach Promenade Drop Kiosk",
    ward: "Ward 14 (RK Beach)",
    wasteCategory: "Lithium Batteries",
    estimatedWeight: "0.50 kg",
    confidence: "99.0%",
    greenPointsEarned: 40,
    photo: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=400&q=80",
    location: "RK Beach Road",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "Pending Dispatch"
  }
];

const SEED_COMPLAINTS = [
  {
    id: "cmp_1",
    complaintId: "CMP-GVMC-101",
    userId: "usr_citizen_demo",
    userName: "Ravi Teja",
    type: "Overflowing Bin",
    description: "The Gajuwaka industrial bin is completely filled with discarded monitors and battery packs. Waste is spilling outside.",
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
    location: "Near Gajuwaka Bus Depot Main Gate, Ward 65",
    dropPointId: "DP-GVMC-004",
    status: "In Progress",
    assignedOfficer: "GVMC Inspector T. Ramesh",
    date: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "cmp_2",
    complaintId: "CMP-GVMC-102",
    userId: "usr_citizen_demo",
    userName: "Pravallika N.",
    type: "Unregistered E-Waste Dumping",
    description: "Unidentified vendor dumped several broken TV CRTs near Rythu Bazar open drain.",
    photo: "https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=400&q=80",
    location: "MVP Colony Ward 8",
    dropPointId: null,
    status: "Resolved",
    assignedOfficer: "Field Officer P. Lakshmi",
    date: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

const DB_FILE = path.join(__dirname, 'db_data.json');

class Store {
  constructor() {
    this.data = {
      users: SEED_USERS,
      droppoints: SEED_DROPPOINTS,
      collections: SEED_COLLECTIONS,
      complaints: SEED_COMPLAINTS
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        this.data = {
          users: parsed.users || SEED_USERS,
          droppoints: parsed.droppoints || SEED_DROPPOINTS,
          collections: parsed.collections || SEED_COLLECTIONS,
          complaints: parsed.complaints || SEED_COMPLAINTS
        };
      } else {
        this.save();
      }
    } catch (e) {
      console.warn("Using in-memory seed store:", e.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error("Failed to persist DB data:", e.message);
    }
  }

  // Generic methods
  findAll(collection) {
    return this.data[collection] || [];
  }

  findById(collection, id) {
    const list = this.findAll(collection);
    return list.find(item => item.id === id || item[collection.slice(0, -1) + 'Id'] === id);
  }

  create(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    const newItem = {
      id: item.id || uuidv4(),
      createdAt: new Date().toISOString(),
      ...item
    };
    this.data[collection].unshift(newItem);
    this.save();
    return newItem;
  }

  update(collection, id, updates) {
    const list = this.findAll(collection);
    const index = list.findIndex(item => item.id === id || item[collection.slice(0, -1) + 'Id'] === id);
    if (index !== -1) {
      this.data[collection][index] = { ...this.data[collection][index], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data[collection][index];
    }
    return null;
  }

  delete(collection, id) {
    const list = this.findAll(collection);
    const index = list.findIndex(item => item.id === id || item[collection.slice(0, -1) + 'Id'] === id);
    if (index !== -1) {
      const deleted = this.data[collection].splice(index, 1);
      this.save();
      return deleted[0];
    }
    return null;
  }
}

const dbStore = new Store();
module.exports = dbStore;
