import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDEjic6-86vewLpDdCM8VFDQNn58aMrL4Q",
  authDomain: "device-streaming-ccc13d80.firebaseapp.com",
  projectId: "device-streaming-ccc13d80",
  storageBucket: "device-streaming-ccc13d80.firebasestorage.app",
  messagingSenderId: "678212147617",
  appId: "1:678212147617:web:6d3dda19d073c015c213e0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DROPPOINTS = [
  {
    id: "dp_siripuram_12",
    binId: "DP-GVMC-001",
    name: "Siripuram Smart E-Waste Hub",
    location: "Opposite HSBC Building, Siripuram Circle, Ward 12, Visakhapatnam",
    lat: 17.7220,
    lng: 83.3150,
    qrCodeData: "DP-GVMC-001|Siripuram Hub|Ward 12",
    photoUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    capacityStatus: "45% Full",
    capacityPercentage: 45,
    status: "Active"
  },
  {
    id: "dp_rkbeach_14",
    binId: "DP-GVMC-002",
    name: "RK Beach Promenade Drop Kiosk",
    location: "Near Submarine Museum Promenade, Beach Road, Ward 14, Visakhapatnam",
    lat: 17.7125,
    lng: 83.3225,
    qrCodeData: "DP-GVMC-002|RK Beach Kiosk|Ward 14",
    photoUrl: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=600&q=80",
    capacityStatus: "70% Full",
    capacityPercentage: 70,
    status: "Active"
  },
  {
    id: "dp_mvp_8",
    binId: "DP-GVMC-003",
    name: "MVP Colony Sector-4 Recycling Station",
    location: "Adjacent to Rythu Bazar, Sector 4, Ward 8, Visakhapatnam",
    lat: 17.7440,
    lng: 83.3320,
    qrCodeData: "DP-GVMC-003|MVP Colony Station|Ward 8",
    photoUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    capacityStatus: "30% Full",
    capacityPercentage: 30,
    status: "Active"
  },
  {
    id: "dp_gajuwaka_4",
    binId: "DP-GVMC-004",
    name: "Gajuwaka Industrial Belt Drop Center",
    location: "Near Gajuwaka Bus Depot Main Gate, Ward 65, Visakhapatnam",
    lat: 17.6900,
    lng: 83.2180,
    qrCodeData: "DP-GVMC-004|Gajuwaka Drop Center|Ward 65",
    photoUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    capacityStatus: "82% Full (Alert)",
    capacityPercentage: 82,
    status: "Active"
  }
];

const COMPLAINTS = [
  {
    id: "cmp_1",
    complaintId: "CMP-GVMC-101",
    userName: "Ravi Teja",
    type: "Overflowing Bin",
    description: "The Gajuwaka industrial bin is completely filled with discarded monitors and battery packs. Waste is spilling outside.",
    photoUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
    location: "Near Gajuwaka Bus Depot Main Gate, Ward 65",
    lat: 17.6900,
    lng: 83.2180,
    dropPointId: "DP-GVMC-004",
    status: "Pending",
    assignedOfficer: "GVMC Inspector T. Ramesh",
    createdAt: new Date().toISOString()
  },
  {
    id: "cmp_2",
    complaintId: "CMP-GVMC-102",
    userName: "Pravallika N.",
    type: "Unregistered E-Waste Dumping",
    description: "Unidentified vendor dumped several broken TV CRTs near Rythu Bazar open drain.",
    photoUrl: "https://images.unsplash.com/photo-1604186837056-8e7c286756f2?auto=format&fit=crop&w=400&q=80",
    location: "MVP Colony Ward 8",
    lat: 17.7440,
    lng: 83.3320,
    dropPointId: null,
    status: "Pending",
    assignedOfficer: "Field Officer P. Lakshmi",
    createdAt: new Date().toISOString()
  }
];

async function runSeed() {
  console.log("Pushing Photos, Locations, QR Codes & Complaints to Firestore...");
  for (const item of DROPPOINTS) {
    await setDoc(doc(db, 'droppoints', item.id), item, { merge: true });
    console.log(`✓ Stored Drop Point & QR: ${item.name}`);
  }

  for (const item of COMPLAINTS) {
    await setDoc(doc(db, 'complaints', item.id), item, { merge: true });
    console.log(`✓ Stored Complaint: ${item.complaintId}`);
  }
  console.log("SUCCESS! All data pushed to Firebase Firestore!");
  process.exit(0);
}

runSeed().catch(err => {
  console.error("Error pushing data:", err.message);
  process.exit(1);
});
