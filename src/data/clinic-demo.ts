export interface ClinicTreatment {
  id: string;
  name: string;
  category: "General" | "Cosmetic" | "Surgical" | "Orthodontics";
  tagline: string;
  priceRange: string;
  duration: string;
  sittings: string;
  painLevel: "Completely Pain-Free" | "Mild Sensitivity" | "Local Anesthesia";
  overview: string;
  included: string[];
  recommendedFor: string;
}

export interface ClinicDoctor {
  name: string;
  role: string;
  degrees: string;
  experience: string;
  registrationNumber: string;
  specialization: string;
  bio: string;
  schedule: string;
}

export interface ClinicCase {
  id: string;
  patientInitials: string;
  age: string;
  treatmentName: string;
  duration: string;
  sittings: string;
  problem: string;
  clinicalSolution: string;
  outcome: string;
}

export interface ClinicReview {
  id: string;
  author: string;
  treatment: string;
  date: string;
  rating: number;
  comment: string;
  verifiedPatient: boolean;
}

export interface ClinicFaq {
  question: string;
  answer: string;
}

export const clinicData = {
  name: "Aura Dental & Facial Aesthetics",
  tagline: "Specialist-Led Dental Implants, Clear Aligners & Gentle Family Dentistry",
  phone: "+91 91234 56789",
  whatsappNumber: "+919123456789",
  email: "care@auradental.demo",
  address: "Plot 42, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
  landmark: "Directly opposite Croma · 2 mins from Peddamma Gudi Metro Station",
  valetParking: "Complimentary Valet Parking Available for Patients",
  workingHours: {
    weekdays: "Monday – Saturday: 9:30 AM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 2:00 PM (Emergency & Scheduled Only)",
  },
  emergencyHotline: "+91 91234 56780 (24/7 Dental Trauma & Acute Toothache Line)",
  googleStats: {
    rating: "4.9",
    totalReviews: 318,
    label: "Google Maps Verified Patient Reviews",
  },
  amenities: [
    "Hospital-Grade Class-B Autoclave 100% Sterilization",
    "Computerized Low-Radiation 3D CBCT Digital Imaging",
    "Painless Computerized Wand Local Anesthesia",
    "0% Interest EMI Facility via Bajaj Finserv & Credit Cards",
    "Dedicated Private Treatment Operatories",
  ],
};

export const clinicTreatments: ClinicTreatment[] = [
  {
    id: "clear-aligners",
    name: "Custom Clear Aligners",
    category: "Orthodontics",
    tagline: "Virtually invisible, removable aligners designed with 3D digital planning",
    priceRange: "₹45,000 – ₹1,10,000",
    duration: "4 to 9 Months Total",
    sittings: "1 Initial 3D Scan + Bi-Monthly Review",
    painLevel: "Completely Pain-Free",
    overview:
      "Straighten crooked, spaced, or crowded teeth without metal brackets or painful wires. We use high-precision 3D intraoral digital scanners so you can see your final smile simulation before starting.",
    included: [
      "3D Digital Intraoral Scan & Smile Simulation",
      "All custom-molded aligner tray sets",
      "Post-treatment transparent retainers included",
      "0% No-Cost EMI options starting ₹3,999/month",
    ],
    recommendedFor: "Adults, working professionals, and students seeking discreet teeth straightening.",
  },
  {
    id: "single-sitting-rct",
    name: "Single-Sitting Rotary Root Canal",
    category: "General",
    tagline: "Save your natural tooth painlessly in a single 45-minute visit",
    priceRange: "₹4,500 – ₹7,200",
    duration: "45 Minutes",
    sittings: "Single Sitting (90% of cases)",
    painLevel: "Completely Pain-Free",
    overview:
      "Gone are the days of multiple painful appointments. Using digital apex locators, rotary titanium files, and laser disinfection, we relieve acute nerve pain and preserve your natural tooth root in one comfortable visit.",
    included: [
      "Digital RVG diagnostic X-ray",
      "Computerized localized anesthesia",
      "Endodontic laser canal disinfection",
      "Temporary medicated core buildup",
    ],
    recommendedFor: "Severe toothache, deep decay reaching the nerve, or cracked teeth sensitive to hot/cold.",
  },
  {
    id: "dental-implants",
    name: "3D-Guided Titanium Dental Implants",
    category: "Surgical",
    tagline: "Permanent, rock-solid tooth replacement with Swiss & German titanium fixtures",
    priceRange: "₹24,000 – ₹38,000 per tooth",
    duration: "30 Mins Procedure",
    sittings: "2 Phases (Placement + Final Crown)",
    painLevel: "Local Anesthesia",
    overview:
      "A permanent replacement for missing or extracted teeth that looks, bites, and feels just like a natural tooth. Placed with 3D computer-guided surgical stents for microscopic precision and rapid healing.",
    included: [
      "3D CBCT Bone Density Evaluation",
      "Medical-Grade Titanium Implant Fixture",
      "Custom CAD/CAM Zirconia ceramic crown",
      "Lifetime implant manufacturer warranty certificate",
    ],
    recommendedFor: "Patients missing single or multiple teeth, unable to chew comfortably, or wanting to replace removable dentures.",
  },
  {
    id: "laser-whitening",
    name: "In-Office Laser Teeth Whitening",
    category: "Cosmetic",
    tagline: "Lift stubborn stains and brighten your smile up to 5 shades in 45 minutes",
    priceRange: "₹7,500 flat fee",
    duration: "45 Minutes",
    sittings: "Single Sitting",
    painLevel: "Mild Sensitivity",
    overview:
      "Safe, enamel-friendly dental whitening activated by cool laser light. Removes coffee, tea, smoking, and age-related discoloration without weakening your tooth enamel or damaging gums.",
    included: [
      "Pre-whitening ultrasonic cleaning & polish",
      "Gum protection barrier application",
      "Triple-cycle laser activation session",
      "Anti-sensitivity remineralizing fluoride polish",
    ],
    recommendedFor: "Weddings, interviews, social events, or anyone looking to refresh stained teeth quickly.",
  },
  {
    id: "ceramic-veneers",
    name: "Ultra-Thin E-Max Ceramic Veneers",
    category: "Cosmetic",
    tagline: "Handcrafted porcelain laminates that reshape and brighten front teeth",
    priceRange: "₹9,500 – ₹14,000 per tooth",
    duration: "2 Sittings across 5 Days",
    sittings: "2 Sittings",
    painLevel: "Completely Pain-Free",
    overview:
      "Wafer-thin ceramic shells individually crafted by dental ceramists to close stubborn gaps, correct chipped edges, or mask intrinsic tetracycline stains with natural optical translucency.",
    included: [
      "Digital smile design trial mockup",
      "Minimal 0.3mm preparation (maximum enamel preservation)",
      "Temporary trial veneers while lab crafts finals",
      "10-Year fracture warranty card",
    ],
    recommendedFor: "Chipped front teeth, stubborn dark stains resistant to bleach, or uneven tooth shapes.",
  },
  {
    id: "wisdom-teeth",
    name: "Painless Wisdom Tooth Extraction",
    category: "Surgical",
    tagline: "Minimally invasive removal of impacted or painful wisdom teeth",
    priceRange: "₹4,000 – ₹6,500",
    duration: "30 to 40 Minutes",
    sittings: "Single Sitting",
    painLevel: "Local Anesthesia",
    overview:
      "Performed by our on-staff Maxillofacial Surgeon using piezosurgery bone cutting. Minimizes post-op swelling and ensures rapid 3-day recovery so you can resume work quickly.",
    included: [
      "Surgical diagnostic X-ray",
      "Piezosurgical atraumatic extraction",
      "Collagen bone plug & dissolvable sutures",
      "Complete post-op medication & recovery kit",
    ],
    recommendedFor: "Jaw pain, swelling behind the back molars, food trapping, or crooked wisdom tooth emergence.",
  },
];

export const clinicDoctors: ClinicDoctor[] = [
  {
    name: "Dr. Radhika Varma",
    role: "Chief Dental Surgeon & Implantologist",
    degrees: "BDS, MDS (Prosthodontics & Oral Implantology)",
    experience: "14 Years Clinical Experience",
    registrationNumber: "TS-DCI-4819",
    specialization: "Full Mouth Rehabilitation, 3D Guided Implants, Clear Aligners",
    bio: "Trained at Rajiv Gandhi University of Health Sciences with fellowship credentials from the International Congress of Oral Implantologists (ICOI). Formerly Senior Consultant at Apollo Health City, Hyderabad.",
    schedule: "Monday – Saturday: 10:00 AM – 7:30 PM",
  },
  {
    name: "Dr. Arvind Rao",
    role: "Consultant Oral & Maxillofacial Surgeon",
    degrees: "BDS, MDS, FIBMS (Maxillofacial Surgery)",
    experience: "11 Years Clinical Experience",
    registrationNumber: "TS-DCI-5291",
    specialization: "Atraumatic Wisdom Tooth Surgery, Bone Grafting & Facial Trauma",
    bio: "Specializes in pain-free surgical tooth extractions, sinus lifts, and facial aesthetics. Known across Hyderabad for his gentle, calming approach with anxious patients and needle-phobic individuals.",
    schedule: "Monday, Wednesday, Friday, Saturday: 2:00 PM – 8:30 PM",
  },
  {
    name: "Dr. Sneha Reddy",
    role: "Cosmetic & Pediatric Dental Specialist",
    degrees: "BDS, Fellowship in Aesthetic Dentistry (Germany)",
    experience: "8 Years Clinical Experience",
    registrationNumber: "TS-DCI-7104",
    specialization: "E-Max Veneers, Laser Teeth Whitening, Child Dental Care",
    bio: "Passionate about conservative cosmetic restorations and making children look forward to dental visits with zero fear. Certified in laser dentistry and computerized painless injection delivery.",
    schedule: "Tuesday, Thursday, Saturday: 9:30 AM – 5:30 PM",
  },
];

export const clinicCases: ClinicCase[] = [
  {
    id: "case-aligners",
    patientInitials: "R. M.",
    age: "27 Years",
    treatmentName: "Clear Aligner Gap Closure",
    duration: "6 Months Total",
    sittings: "4 Check-in Visits",
    problem: "6mm midline gap between upper front teeth; self-conscious when smiling in office meetings.",
    clinicalSolution: "Digital 3D intraoral scan, 18 customized clear aligner trays, zero teeth extracted.",
    outcome: "Complete gap closure and natural bite alignment without metal braces.",
  },
  {
    id: "case-rct-crown",
    patientInitials: "S. K.",
    age: "42 Years",
    treatmentName: "Emergency Single-Sitting Root Canal + Zirconia Crown",
    duration: "2 Visits",
    sittings: "Sitting 1: 45 Mins · Sitting 2: Crown Fit",
    problem: "Acute nighttime throbbing toothache from deep molar cavity; unable to chew on right side for 3 weeks.",
    clinicalSolution: "Single-sitting rotary endodontics with laser canal disinfection and digital CAD/CAM crown scan.",
    outcome: "Complete pain relief within 3 hours. Normal chewing restored on full-strength zirconia crown.",
  },
  {
    id: "case-implant",
    patientInitials: "V. N.",
    age: "54 Years",
    treatmentName: "Immediate Guided Lower Molar Implant",
    duration: "3 Months Healing",
    sittings: "2 Sittings",
    problem: "Missing first molar lost to fracture; neighboring teeth had begun tilting into the gap.",
    clinicalSolution: "3D CBCT guided titanium implant placement with immediate temporary crown.",
    outcome: "Firm, permanent bite restored with natural gum contour. Lifetime warranty certificate issued.",
  },
];

export const clinicReviews: ClinicReview[] = [
  {
    id: "rev-1",
    author: "Kavitha Raman",
    treatment: "Clear Aligners",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "I was terrified of getting adult braces at 31. Dr. Radhika explained the entire 3D simulation on screen before I paid a single rupee. Finished my 6-month clear aligners last month and my smile looks unbelievable. The 0% EMI made it very manageable.",
    verifiedPatient: true,
  },
  {
    id: "rev-2",
    author: "Prasad Chavali",
    treatment: "Single-Sitting Root Canal",
    date: "1 month ago",
    rating: 5,
    comment:
      "Came in on a Tuesday with unbearable toothache. Dr. Arvind did the root canal in literally 40 minutes and I felt zero pain, not even the injection pinch. Transparent billing, no surprise x-ray charges at reception. Highly recommend.",
    verifiedPatient: true,
  },
  {
    id: "rev-3",
    author: "Ananya Deshmukh",
    treatment: "Wisdom Tooth Extraction",
    date: "6 weeks ago",
    rating: 5,
    comment:
      "Had two impacted lower wisdom teeth removed together. I was shaking with anxiety before walking in, but the team put on music and walked me through each step. Was back to regular eating in 3 days. Cleanest clinic in Jubilee Hills.",
    verifiedPatient: true,
  },
  {
    id: "rev-4",
    author: "Siddharth Verma",
    treatment: "Laser Teeth Whitening",
    date: "2 months ago",
    rating: 5,
    comment:
      "Did the 45-minute laser whitening before my sister’s wedding. Took coffee stains right off my front teeth. Gentle, thorough, and gave me clear sensitivity gel to take home.",
    verifiedPatient: true,
  },
];

export const clinicFaqs: ClinicFaq[] = [
  {
    question: "Do modern root canals hurt?",
    answer:
      "No. With modern computerized local anesthesia and rotary titanium files, a root canal feels no different than getting a simple routine filling. Most patients feel immediate relief from their toothache during the first 15 minutes of the procedure.",
  },
  {
    question: "How do 0% Interest EMI plans work for Aligners and Implants?",
    answer:
      "We partner with major banks and Bajaj Finserv to provide 0% interest monthly installments across 6, 9, or 12 months. Approval is processed at reception in under 10 minutes with zero hidden administrative charges.",
  },
  {
    question: "How much does a dental consultation cost?",
    answer:
      "A comprehensive consultation with digital X-rays and full treatment planning is ₹600. If you decide to proceed with treatment on the same day, your consultation fee is fully adjusted against your treatment bill.",
  },
  {
    question: "Can I get treatment on the same day if I have acute toothache?",
    answer:
      "Yes. We reserve daily emergency priority slots between 10:00 AM and 7:00 PM specifically for acute pain relief, broken teeth, or lost restorations. Call our emergency desk directly at +91 91234 56789.",
  },
  {
    question: "Do you accept corporate dental health insurance?",
    answer:
      "We provide standardized GST medical receipts and clinical treatment summary documents accepted by all major private and corporate health insurance providers for dental reimbursement claims.",
  },
];

