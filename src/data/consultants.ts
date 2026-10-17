export type Consultant = {
  id: string;
  name: string;
  title: string;
  city: string;
  languages: string[];
  fee: number;
  experience: number;
  license: string;
  availability: string[];
  focus: string[];
  bio: string;
  initials: string;
};

// Demo data for the prototype — sorted high to low fee when displayed.
export const consultants: Consultant[] = [
  { id: "1", name: "Dr. Ananya Krishnan", title: "Senior Clinical Psychologist", city: "Chennai", languages: ["Tamil", "English"], fee: 3500, experience: 15, license: "RCI A-21345", availability: ["Mon", "Wed", "Sat"], focus: ["Anxiety", "Depression"], bio: "Specialises in CBT for anxiety and mood disorders with 15 years of hospital practice.", initials: "AK" },
  { id: "2", name: "Dr. Rohan Mehta", title: "Clinical Psychologist", city: "Mumbai", languages: ["Hindi", "Marathi", "English"], fee: 3000, experience: 12, license: "RCI A-18872", availability: ["Tue", "Thu", "Fri"], focus: ["Trauma", "PTSD"], bio: "Trauma-informed therapist trained in EMDR, helping adults rebuild safety and calm.", initials: "RM" },
  { id: "3", name: "Dr. Priya Nair", title: "Clinical Psychologist", city: "Kochi", languages: ["Malayalam", "English"], fee: 2500, experience: 10, license: "RCI A-16590", availability: ["Mon", "Tue", "Sat"], focus: ["Relationships", "Couples"], bio: "Works with couples and families on communication, conflict and emotional healing.", initials: "PN" },
  { id: "4", name: "Dr. Arjun Reddy", title: "Clinical Psychologist", city: "Hyderabad", languages: ["Telugu", "Hindi", "English"], fee: 2200, experience: 9, license: "RCI A-15012", availability: ["Wed", "Thu", "Sun"], focus: ["Addiction", "Stress"], bio: "Helps young professionals manage burnout, stress and substance dependence.", initials: "AR" },
  { id: "5", name: "Dr. Kavya Iyer", title: "Child & Adolescent Psychologist", city: "Bengaluru", languages: ["Kannada", "Tamil", "English"], fee: 1800, experience: 8, license: "RCI A-14321", availability: ["Mon", "Fri", "Sat"], focus: ["ADHD", "Teen issues"], bio: "Supports children and teens with focus, behaviour and exam-related anxiety.", initials: "KI" },
  { id: "6", name: "Dr. Sneha Banerjee", title: "Clinical Psychologist", city: "Kolkata", languages: ["Bengali", "Hindi", "English"], fee: 1500, experience: 7, license: "RCI A-13007", availability: ["Tue", "Wed", "Sat"], focus: ["Grief", "Self-esteem"], bio: "Gentle, compassionate approach to grief, loss and building self-worth.", initials: "SB" },
  { id: "7", name: "Dr. Vikram Singh", title: "Clinical Psychologist", city: "Delhi", languages: ["Hindi", "Punjabi", "English"], fee: 1200, experience: 6, license: "RCI A-12456", availability: ["Thu", "Fri", "Sun"], focus: ["OCD", "Anxiety"], bio: "Uses exposure therapy and mindfulness for OCD and intrusive thoughts.", initials: "VS" },
  { id: "8", name: "Ms. Divya Rajan", title: "Associate Clinical Psychologist", city: "Coimbatore", languages: ["Tamil", "English"], fee: 800, experience: 4, license: "RCI A-10988", availability: ["Mon", "Wed", "Fri"], focus: ["Stress", "Sleep"], bio: "Affordable first sessions focused on stress, sleep and daily wellbeing.", initials: "DR" },
];

export const cities = Array.from(new Set(consultants.map((c) => c.city))).sort();

export const travelPackages = [
  { name: "Local", range: "Within 25 km", mode: "Cab pick-up & drop", price: 600 },
  { name: "Regional", range: "25 – 150 km", mode: "AC bus / cab", price: 2500 },
  { name: "State-wide", range: "150 – 500 km", mode: "Train (3AC) + cab", price: 5500 },
  { name: "Inter-state", range: "500 km +", mode: "Flight + stay (1 night)", price: 12000 },
];

export const foodPackages = [
  { name: "Veg Wellness", desc: "South & North Indian veg meals, fresh juices", perDay: 450 },
  { name: "Non-Veg Comfort", desc: "Chicken, fish & egg meals, balanced diet", perDay: 650 },
  { name: "Satvik Detox", desc: "Light, low-oil, mindful-eating menu", perDay: 550 },
];
