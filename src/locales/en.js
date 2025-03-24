export default {
  common: {
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    close: "Close",
    viewAll: "View All",
    location: "Select Location",
    symptoms: "Select Symptoms",
    pay: "Pay Now",
    all: "All",
    weekday: "Weekdays",
    year: "year(s)",
    month: "month(s)",
    day: "day(s)",
    perYear: "year",
    perMonth: "month",
    perDay: "day",
    units: {
      people: "patients", // Changed from "users"
      items: "items",
      points: "rating",
      pricePerMonth: "per month",
      monthCount: "month(s)",
      totalPrice: "total",
      sessions: "sessions",
      sessionCount: "session",
    },
    share: "Share",
    copyLink: "Copy Link",
  },
  navigation: {
    gym: {
      home: "Home",
      gyms: "Facilities",
      trainers: "Trainers",
      community: "Community",
      mypage: "MY",
    },
    medical: {
      home: "Home",
      hospitals: "Hospitals", // Changed from gyms: "Facilities"
      doctors: "Doctors", // Changed from trainers: "Trainers"
      community: "Community",
      mypage: "MY",
    },
    plastic: {
      home: "Home",
      hospitals: "Hospitals", // Changed from gyms: "Facilities"
      doctors: "Doctors", // Changed from trainers: "Trainers"
      community: "Community",
      mypage: "MY",
    },
  },
  serviceSelect: {
    title: "SuperHuman",
    name: "Service Selection",
    exercisePT: {
      title: "Monzym Coach (Exercise/PT)",
      description: "Customized fitness program with professional trainer",
    },
    onlineCare: {
      title: "Online Consultation",
      description: "Non-face-to-face professional medical service",
    },
    examination: {
      title: "Cosmetic Procedures/Plastic Surgery",
      description: "Professional examination service with doctors",
    },
    stats: {
      facilities: "Partner Facilities",
      average: "Average Rating",
      users: "Active Users",
      doctors: "Doctors",
      appointments: "Appointments",
      reviews: "Reviews",
      partneredHospitals: "Hospitals", //"Partner Hospitals",
      affiliatedHospitals: "Hospitals", //"Affiliated Hospitals",
    },
    recentFacilities: {
      title: "Popular Facilities",
      sportani: "Equinox Downtown LA",
      gooddoctors: "Cedars-Sinai Medical Center",
      raphael: "Beverly Hills Plastic Surgery",
      type: {
        gym: "Gym/PT",
        internal: "Internal Medicine",
        surgery: "Surgery",
      },
      ratings: "ratings",
    },
  },
  main: {
    gym: {
      title: "Monzym Coach (Exercise/PT)",
      stats: {
        users: "Active Members",
        facilities: "Partner Facilities",
        rating: "Average Rating",
      },
      sections: {
        recommendedGyms: "Recommended Facilities",
        popularTrainers: "Popular Trainers",
        popularPosts: "Popular Posts",
      },
    },
    medical: {
      title: "Online Consultation",
      stats: {
        users: "Patients", // Changed from "Active Members"
        facilities: "Partner Facilities",
        rating: "Average Rating",
      },
      sections: {
        recommendedHospitals: "Recommended Hospitals", // Changed from recommendedGyms
        popularDoctors: "Popular Doctors", // Changed from popularTrainers
        popularPosts: "Popular Posts",
      },
      symptomsTitle: "Symptoms",
      specialists: {
        digestive: "Gastroenterologist",
        respiratory: "Pulmonologist",
        eye: "Ophthalmologist",
        dental: "Dental Specialist",
        dermatology: "Dermatologist",
      },
    },
    plastic: {
      title: "Cosmetic Procedures/Plastic Surgery",
      stats: {
        users: "Patients", // Changed from "Active Members"
        affiliatedHospital: "Affiliated Hospital",
        rating: "Average Rating",
      },
      sections: {
        recommendedHospitals: "Recommended Hospitals", // Changed from recommendedGyms
        popularDoctors: "Popular Doctors", // Changed from popularTrainers
        popularPosts: "Popular Posts",
      },
      treatmentArea: "Treatment Area",
      specialists: {
        facial: "Facial Plastic Surgeon",
        eye: "Oculoplastic Surgeon",
        nose: "Rhinoplasty Specialist",
        breast: "Breast Surgery Specialist",
        body: "Body Contouring Specialist",
      },
    },
  },
  facility: {
    title: "Fitness Facilities",
    types: {
      gym: "Gym",
      pilates: "Pilates",
      jiujitsu: "Jiu-jitsu",
    },
    affiliatedFacilities: "Affiliated Fitness Facilities",
    affiliatedTrainers: "Affiliated Trainers",
    details: "Details",
    info: "Facility Information",
    location: "View Location",
    membership: {
      title: "Membership Fees",
      pilates: "Class Pass",
      jiujitsu: "Training Pass",
      pt: "Personal Training Pass",
    },
    amenities: {
      shower: "Shower Room",
      uniform: "Workout Clothes Rental",
      locker: "Personal Locker",
      parking: "Parking",
    },
    pricePerMonth: "per month",
    monthCount: "month(s)",
    totalPrice: "total",
    consultation: "Request Consultation",
    visitConsultation: "On-site Consultation",
    viewPrice: "View Prices",
    call: "Call",
    filters: {
      price: "By Price",
      distance: "By Distance",
      rating: "By Rating",
    },
    examples: {
      location1: "Equinox Downtown LA",
      location2: "Crunch Fitness Beverly Hills",
      address1: "835 S Flower St, Los Angeles",
      address2: "9100 Wilshire Blvd, Beverly Hills",
      name1: "Equinox Downtown LA",
      name2: "Core Power Pilates",
      name3: "Gracie Jiu-Jitsu",
    },
    branch: {
      number: "Branch",
    },
  },
  hospital: {
    medical: {
      title: "Hospitals List", // Changed from "Medical Facilities"
      types: {
        general: "General Hospital",
        internal: "Internal Medicine Center",
        surgical: "Surgical Center",
      },
      departments: {
        // Renamed from types
        generalMedicine: "Internal Medicine",
        pediatrics: "Pediatrics",
        surgery: "Surgery",
      },
      details: "Hospital Details", // Changed from "Details"
      info: "Facility Information",
      treatableDiseases: "Treatable Conditions", // Alternative: "Conditions We Treat"
      location: "View Location",
      medicalFeesGuide: "Medical Fees Guide", // Alternative: "Treatment Cost Information"
      amenities: {
        parking: "Parking available",
        wheelchair: "Wheelchair accessible",
        english: "English available",
        endoscopy: "Sleep endoscopy",
        latest: "Latest equipment",
        laser: "Laser treatment",
      },
      diseases: {
        digestive: {
          gastritis: "Gastritis",
          colitis: "Colitis",
          esophagitis: "Esophagitis",
          constipation: "Constipation",
          diarrhea: "Diarrhea",
        },
        respiratory: {
          bronchitis: "Bronchitis",
          pneumonia: "Pneumonia",
          asthma: "Asthma",
          sinusitis: "Sinusitis",
          rhinitis: "Rhinitis",
        },
        eye: {
          myopia: "Myopia",
          hyperopia: "Hyperopia",
          astigmatism: "Astigmatism",
          cataract: "Cataract",
          glaucoma: "Glaucoma",
        },
        dental: {
          cavity: "Dental Cavity",
          periodontitis: "Periodontitis",
          gingivitis: "Gingivitis",
          toothache: "Toothache",
          wisdomTooth: "Wisdom Tooth Issues",
        },
        dermatology: {
          acne: "Acne",
          atopy: "Atopic Dermatitis",
          eczema: "Eczema",
          freckles: "Freckles",
          spots: "Skin Spots",
        },
      },
      fees: {
        basicConsultation: "Basic Consultation Fee", // 공식 의료 용어
        note: "* Additional fees may apply for specific treatments",
      },
      feeGuide: {
        title: "Medical Fee Guide",
        subtitle: "Standard consultation and treatment fees",
        consultation: "Consultation Fee",
        treatment: "Treatment Fee",
        insurance: "Insurance Coverage Available",
        nonInsurance: "Non-insurance Items",
        visitFee: "Visit Fee",
        note: "* Fees may vary depending on individual conditions",
      },
      examination: {
        basic: "Basic examination",
        premium: "Premium examination",
        special: "Comprehensive examination",
        surgeryPrep: "Pre-surgery examination",
        laserTreatment: "Laser treatment",
        management: "Comprehensive management",
      },
      consultation: "Request Consultation",
      viewPrice: "View Prices",
      call: "Call",
      filters: {
        price: "By Price",
        distance: "By Distance",
        rating: "By Rating",
      },
      examples: {
        location1: "Cedars-Sinai Medical Center",
        location2: "UCLA Medical Center",
        address1: "Beverly Hills, Los Angeles",
        address2: "Westwood, Los Angeles",
        name1: "Cedars-Sinai",
        name2: "UCLA Health",
        // Digestive
        digestive: {
          location1: "Mayo Clinic Gastroenterology",
          location2: "Cleveland Clinic Digestive Disease Institute",
          address1: "Rochester, Minnesota",
          address2: "Cleveland, Ohio",
          name1: "Mayo Clinic",
          name2: "Cleveland Clinic",
        },
        // Respiratory
        respiratory: {
          location1: "National Jewish Health",
          location2: "Johns Hopkins Pulmonary Center",
          address1: "Denver, Colorado",
          address2: "Baltimore, Maryland",
          name1: "National Jewish",
          name2: "Johns Hopkins",
        },
        // Eye
        eye: {
          location1: "Wills Eye Hospital",
          location2: "Bascom Palmer Eye Institute",
          address1: "Philadelphia, Pennsylvania",
          address2: "Miami, Florida",
          name1: "Wills Eye",
          name2: "Bascom Palmer",
        },
        // Dental
        dental: {
          location1: "UCLA Dental Center",
          location2: "NYU College of Dentistry",
          address1: "Los Angeles, California",
          address2: "New York City, New York",
          name1: "UCLA Dental",
          name2: "NYU Dental",
        },
        // Dermatology
        dermatology: {
          location1: "Stanford Dermatology Clinic",
          location2: "Harvard Skin Disease Center",
          address1: "Palo Alto, California",
          address2: "Boston, Massachusetts",
          name1: "Stanford Dermatology",
          name2: "Harvard Skin Center",
        },
      },
      branch: {
        number: "Branch",
      },
      review: {
        author1: "Reviewer1",
        author2: "Reviewer2",
        reviewContent1:
          "The medical staff was friendly and the facilities were clean. The examination was thorough.",
        reviewContent2:
          "There was a bit of waiting time but overall satisfactory. The doctor's explanation was particularly detailed.",
      },
    },
    plastic: {
      title: "Hospitals List", // Changed from "Medical Facilities"
      types: {
        general: "General Hospital",
        plastic: "Plastic Surgery Clinic",
        aesthetic: "Aesthetic Center",
      },
      departments: {
        facialSurgery: "Facial Plastic Surgery",
        bodySurgery: "Body Contouring",
        reconstructive: "Reconstructive Surgery",
      },
      details: "Hospital Details", // Changed from "Details"
      info: "Facility Information",
      availableProcedures: "Available procedures",
      location: "View Location",
      seasonalEventPrice: "Seasonal Event Special",
      amenities: {
        parking: "Parking available",
        wheelchair: "Wheelchair accessible",
        english: "English available",
        operatingRoom: "Advanced operating suites",
        inpatientRoom: "Private recovery rooms",
        endoscopy: "Sleep endoscopy",
        latest: "Latest equipment",
        laser: "Laser treatment",
      },
      treatableSymptoms: {
        eye: {
          doubleEyelid: "Double eyelid surgery",
          eyeShape: "Eye shape correction",
          lateralCantho: "Lateral canthoplasty",
          lowerEyeFat: "Lower eye fat removal",
          ptosis: "Ptosis correction",
        },
        nose: {
          rhinoplasty: "Rhinoplasty",
          noseBridge: "Nose bridge augmentation",
          noseTip: "Nose tip correction",
          alarReduction: "Alar reduction",
          nostrilReshape: "Nostril reshaping",
        },
        facial: {
          vlineSurgery: "V-line surgery",
          cheekboneReduction: "Cheekbone reduction",
          jawlineContour: "Jawline contouring",
          facialFatGraft: "Facial fat grafting",
          dimpleplasty: "Dimpleplasty",
        },
        breast: {
          breastAug: "Breast augmentation",
          breastLift: "Breast lift",
          breastReduction: "Breast reduction",
          nippleCorrection: "Nipple correction",
          breastReconstruction: "Breast reconstruction",
        },
        body: {
          liposuction: "Liposuction",
          tummyTuck: "Abdominoplasty (tummy tuck)",
          buttLift: "Brazilian butt lift",
          bodyContour: "Body contouring",
          armLift: "Arm lift",
        },
        dermatology: {
          botox: "Botox injections",
          fillers: "Dermal fillers",
          laserResurfacing: "Laser skin resurfacing",
          chemicalPeels: "Chemical peels",
          threadLift: "Thread lifting",
        },
      },
      events: {
        // Eye related events
        eye1: {
          name: "Winter Double Eyelid Special",
          description: "Natural parallel double eyelid surgery",
        },
        eye2: {
          name: "Eye Shape Correction Package",
          description: "Eye shape correction + lateral canthoplasty",
        },
        eye3: {
          name: "Under-eye Fat Removal Promotion",
          description: "Under-eye fat removal + lifting",
        },

        // Nose related events
        nose1: {
          name: "Rhinoplasty Special",
          description: "Complete nose reshaping with natural results",
        },
        nose2: {
          name: "Nose Tip Refinement",
          description: "Precise nose tip correction for defined look",
        },
        nose3: {
          name: "Bridge Augmentation Package",
          description: "Enhanced nose bridge with profile balancing",
        },

        // Facial events
        face1: {
          name: "V-line Sculpting Event",
          description: "Jawline contouring for a slim facial profile",
        },
        face2: {
          name: "Facial Contouring Package",
          description: "Cheekbone reduction + jaw reshaping",
        },
        face3: {
          name: "Facial Fat Grafting Special",
          description: "Natural volume restoration for youthful appearance",
        },

        // Breast events
        breast1: {
          name: "Breast Augmentation Event",
          description: "Natural-looking enhancement with premium implants",
        },
        breast2: {
          name: "Breast Lift Special",
          description: "Reshape and rejuvenate without implants",
        },
        breast3: {
          name: "Comprehensive Breast Package",
          description: "Customized solution for shape and volume",
        },

        // Body events
        body1: {
          name: "Liposuction Promotion",
          description: "Targeted fat removal with body contouring",
        },
        body2: {
          name: "Tummy Tuck Special",
          description: "Abdominal reshaping for a flat stomach",
        },
        body3: {
          name: "Body Sculpting Package",
          description: "Multiple area treatment for balanced proportions",
        },
      },
      eventEndDate: "Event ends: ",
      examination: {
        basic: "Basic examination",
        premium: "Premium examination",
        special: "Comprehensive examination",
        surgeryPrep: "Pre-surgery examination",
        laserTreatment: "Laser treatment",
        management: "Comprehensive management",
      },
      consultation: "Request Consultation",
      viewPrice: "View Prices",
      call: "Call",
      filters: {
        price: "By Price",
        distance: "By Distance",
        rating: "By Rating",
      },
      examples: {
        location1: "Cedars-Sinai Medical Center",
        location2: "UCLA Medical Center",
        address1: "Beverly Hills, Los Angeles",
        address2: "Westwood, Los Angeles",
        name1: "Cedars-Sinai",
        name2: "UCLA Health",
        // Digestive
        digestive: {
          location1: "Mayo Clinic Gastroenterology",
          location2: "Cleveland Clinic Digestive Disease Institute",
          address1: "Rochester, Minnesota",
          address2: "Cleveland, Ohio",
          name1: "Mayo Clinic",
          name2: "Cleveland Clinic",
        },
        // Respiratory
        respiratory: {
          location1: "National Jewish Health",
          location2: "Johns Hopkins Pulmonary Center",
          address1: "Denver, Colorado",
          address2: "Baltimore, Maryland",
          name1: "National Jewish",
          name2: "Johns Hopkins",
        },
        // Eye
        eye: {
          location1: "Wills Eye Hospital",
          location2: "Bascom Palmer Eye Institute",
          address1: "Philadelphia, Pennsylvania",
          address2: "Miami, Florida",
          name1: "Wills Eye",
          name2: "Bascom Palmer",
        },
        // Dental
        dental: {
          location1: "UCLA Dental Center",
          location2: "NYU College of Dentistry",
          address1: "Los Angeles, California",
          address2: "New York City, New York",
          name1: "UCLA Dental",
          name2: "NYU Dental",
        },
        // Dermatology
        dermatology: {
          location1: "Stanford Dermatology Clinic",
          location2: "Harvard Skin Disease Center",
          address1: "Palo Alto, California",
          address2: "Boston, Massachusetts",
          name1: "Stanford Dermatology",
          name2: "Harvard Skin Center",
        },
      },
      branch: {
        number: "Branch",
      },
      review: {
        author1: "Reviewer1",
        author2: "Reviewer2",
        reviewContent1:
          "The medical staff was friendly and the facilities were clean. The examination was thorough.",
        reviewContent2:
          "There was a bit of waiting time but overall satisfactory. The doctor's explanation was particularly detailed.",
      },
    },
  },
  trainer: {
    title: "Trainers",
    detail: "Trainer Details",
    experience: "Experience",
    certifications: "Certifications",
    consultationTime: "Available Consultation Hours",
    lessonFees: "Lesson Fees",
    sessions: "sessions",
    sessionCount: "session",
    specialties: {
      weightLoss: "Weight Loss",
      bodybuilding: "Muscle Building",
      rehabilitation: "Rehabilitation",
      posture: "Posture Correction",
      diet: "Diet Management",
      jiujitsu: "Jiu-jitsu Basics",
      grappling: "Grappling",
    },
    filters: {
      experience: "By Experience",
      price: "By Price",
      rating: "By Rating",
    },
    examples: {
      name1: "Coach Smith",
      name2: "Coach Johnson",
      name3: "Coach Williams",
    },
  },
  doctor: {
    medical: {
      title: "Doctors",
      detail: "Doctor Details",
      experience: "Experience",
      certifications: "Certifications",
      education: "Education/Experience",
      consultationTimeTitle: "Consultation Hours",
      filters: {
        experience: "By Experience",
        price: "By Price",
        rating: "By Rating",
      },
      specialties: {
        internalMedicine: "Internal Medicine", // Changed from weightLoss
        surgery: "Surgery", // Changed from bodybuilding
        rehabilitation: "Rehabilitation",
        orthopedics: "Orthopedics", // Changed from posture
        nutrition: "Nutrition", // Changed from diet
        emergency: "Emergency Medicine", // Changed from jiujitsu
        generalPractice: "General Practice", // Changed from grappling
        // 소화기과 관련
        digestive1: "Gastroenterologist",
        digestive2: "Hepatologist",

        // 호흡기과 관련
        respiratory1: "Pulmonologist",
        respiratory2: "Respiratory Specialist",

        // 안과 관련
        eye1: "Ophthalmologist",
        eye2: "Optometrist",

        // 치과 관련
        dental1: "Dental Specialist",
        dental2: "Orthodontist",

        // 피부과 관련
        dermatology1: "Dermatologist",
        dermatology2: "Cosmetic Dermatologist",
      },

      examples: {
        // 소화기과
        name1: "Dr. Smith, Gastroenterology",
        // 호흡기과
        name2: "Dr. Johnson, Pulmonology",
        // 안과
        name3: "Dr. Williams, Ophthalmology",
        // 치과
        name4: "Dr. Brown, Dental Surgery",
        // 피부과
        name5: "Dr. Miller, Dermatology",
      },
      profiles: {
        digestive: {
          education1: "Seoul National University College of Medicine",
          education2: "Residency at Seoul National University Hospital",
          education3: "Fellowship at Harvard University, USA",
          certification1: "Board Certified Internal Medicine Specialist",
          certification2: "Board Certified Gastroenterology Specialist",
          certification3:
            "Korean Society of Gastrointestinal Endoscopy Certified Physician",
          consultationHours: "Weekdays 09:00-18:00, Saturday 09:00-13:00",
        },
        respiratory: {
          education1: "Yonsei University College of Medicine",
          education2: "Residency at Severance Hospital",
          education3: "Fellowship at Johns Hopkins University, USA",
          certification1: "Board Certified Internal Medicine Specialist",
          certification2: "Board Certified Pulmonology Specialist",
          certification3:
            "Korean Academy of Tuberculosis and Respiratory Diseases Certified Physician",
          consultationHours: "Weekdays 08:30-17:30, Saturday 09:00-12:00",
        },
        eye: {
          education1: "Korea University College of Medicine",
          education2: "Residency at Kim's Eye Hospital",
          education3: "Fellowship at Bascom Palmer Eye Institute, USA",
          certification1: "Board Certified Ophthalmology Specialist",
          certification2: "Korean Ophthalmological Society Certified Physician",
          certification3: "Laser Vision Correction Specialist",
          consultationHours: "Weekdays 09:30-18:30, Saturday 09:30-14:00",
        },
        dental: {
          education1: "Seoul National University School of Dentistry",
          education2: "Residency at Seoul National University Dental Hospital",
          education3:
            "Fellowship at New York University College of Dentistry, USA",
          certification1: "Board Certified Dental Specialist",
          certification2: "Korean Academy of Periodontology Certified Dentist",
          certification3: "Implant Dentistry Specialist",
          consultationHours: "Weekdays 10:00-19:00, Saturday 10:00-15:00",
        },
        dermatology: {
          education1: "Sungkyunkwan University School of Medicine",
          education2: "Residency at Samsung Medical Center",
          education3:
            "Fellowship at Stanford University School of Medicine, USA",
          certification1: "Board Certified Dermatology Specialist",
          certification2:
            "Korean Dermatological Association Certified Physician",
          certification3: "Cosmetic Dermatology Specialist",
          consultationHours: "Weekdays 09:00-18:00, Saturday 09:00-13:00",
        },
      },
    },
    plastic: {
      title: "Doctors",
      detail: "Doctor Details",
      experience: "Experience",
      certifications: "Certifications",
      education: "Education/Experience",
      consultationTimeTitle: "Consultation Hours",
      filters: {
        experience: "By Experience",
        price: "By Price",
        rating: "By Rating",
      },
      specialties: {
        // 얼굴 성형
        facialPlastic1: "Facial Plastic Surgeon",
        facialPlastic2: "Facial Contouring Specialist",

        // 코 성형
        rhinoplasty1: "Rhinoplasty Specialist",
        rhinoplasty2: "Nose Reshaping Expert",

        // 눈 성형
        eyePlastic1: "Oculoplastic Surgeon",
        eyePlastic2: "Eye Surgery Specialist",

        // 가슴 성형
        breastSurgery1: "Breast Augmentation Specialist",
        breastSurgery2: "Breast Reconstruction Surgeon",

        // 체형 성형
        bodyContouring1: "Body Contouring Specialist",
        bodyContouring2: "Body Reshaping Expert",

        // 지방 흡입
        liposuction1: "Liposuction Specialist",
        liposuction2: "Fat Removal Expert",
      },
      examples: {
        // 얼굴 성형
        name1: "Dr. Sarah Johnson",
        // 눈 성형
        name2: "Dr. Michael Chen",
        // 코 성형
        name3: "Dr. Elizabeth Miller",
        // 가슴 성형
        name4: "Dr. Robert Williams",
        // 체형 성형
        name5: "Dr. Jennifer Smith",
      },
      profiles: {
        facial: {
          education1: "Harvard Medical School",
          education2: "Residency at Massachusetts General Hospital",
          education3:
            "Fellowship at Johns Hopkins Facial Plastic Surgery Center",
          certification1: "Board Certified Plastic Surgeon",
          certification2:
            "American Board of Facial Plastic and Reconstructive Surgery",
          certification3: "Member of American Society of Plastic Surgeons",
          consultationHours: "Weekdays 09:00-18:00, Saturday 09:00-13:00",
        },
        eye: {
          education1: "Stanford University School of Medicine",
          education2: "Residency at UCLA Medical Center",
          education3: "Fellowship at Bascom Palmer Eye Institute",
          certification1: "Board Certified Oculoplastic Surgeon",
          certification2: "American Society of Ophthalmic Plastic Surgery",
          certification3: "Specialized in Asian Eyelid Surgery",
          consultationHours: "Weekdays 08:30-17:30, Saturday 09:00-12:00",
        },
        nose: {
          education1: "Yale School of Medicine",
          education2: "Residency at New York-Presbyterian Hospital",
          education3: "Fellowship at University of Chicago Rhinoplasty Center",
          certification1: "Board Certified Facial Plastic Surgeon",
          certification2:
            "American Academy of Facial Plastic and Reconstructive Surgery",
          certification3: "Specialized in Ethnic Rhinoplasty",
          consultationHours: "Weekdays 09:30-18:30, Saturday 09:30-14:00",
        },
        breast: {
          education1: "Northwestern University Feinberg School of Medicine",
          education2: "Residency at Cleveland Clinic",
          education3: "Fellowship at Memorial Sloan Kettering Cancer Center",
          certification1: "Board Certified Plastic Surgeon",
          certification2: "American Society of Plastic Surgeons",
          certification3:
            "Specialized in Breast Reconstruction and Augmentation",
          consultationHours: "Weekdays 10:00-19:00, Saturday 10:00-15:00",
        },
        body: {
          education1: "University of Pennsylvania School of Medicine",
          education2: "Residency at Mayo Clinic",
          education3: "Fellowship at Beverly Hills Body Contouring Institute",
          certification1: "Board Certified Plastic Surgeon",
          certification2: "American Society for Aesthetic Plastic Surgery",
          certification3: "Specialized in Advanced Liposuction Techniques",
          consultationHours: "Weekdays 09:00-18:00, Saturday 09:00-13:00",
        },
      },
    },
  },
  community: {
    gym: {
      top_title: "Community",
      writePost: "Write Post",
      editPost: "Edit Post",
      title: "Enter title (required)",
      content: "Enter content (required)",
      comments: "Comments",
      writeComment: "Write a comment",
      likes: "Likes",
      example: {
        title:
          "Successful Weight Loss Story of a Working Professional in Their 40s",
      },
      example2: {
        title: "Diet Management Tips from a Professional Personal Trainer",
      },
      example3: {
        title: "Looking for Personal Trainer Recommendations for Beginners",
        content:
          "Hello! I'm planning to start working out and want to try personal training. There are several gyms near where I live, but I'm not sure what criteria to use when choosing a personal trainer. Could experienced members please share their advice?",
        comment:
          "For beginners, I recommend finding a trainer who can thoroughly check and correct your basic form. While experience is important, you should also consider their teaching style!",
      },
      postDetail: {
        title: "Post Details",
        writer: "Writer",
        date: "Date",
        views: "Views",
        report: "Report",
        share: "Share",
      },
      commentDetail: {
        reply: "Reply",
        writeReply: "Write a reply",
        viewReplies: "View replies",
        hideReplies: "Hide replies",
      },
    },
    medical: {
      top_title: "Community",
      writePost: "Write Post",
      title: "Enter title (required)",
      content: "Enter content (required)",
      content_placeholder:
        "Please describe your symptoms or inquiries in detail. (Required)\n\nExample:\n- When did your symptoms begin?\n- What symptoms are you experiencing?\n- Are you taking any medications regularly?\n- Do you have any related underlying conditions?",
      comments: "Comments",
      writeComment: "Write a comment",
      category_selection: "Category Selection (Required)",
      likes: "Likes",
      example: {
        title: "I'm Experiencing Severe Sudden Dizziness",
      },
      example2: {
        title: "Gastritis Management Tips from a Medical Specialist",
      },
      example3: {
        title: "Persistent indigestion - which hospital should I visit?",
        content:
          "Hello! I've been experiencing indigestion after meals for the past 2 weeks and want to see a doctor. There are several internal medicine clinics in my area, but I'm not sure how to choose the right hospital and doctor. Would appreciate any advice on selection criteria, and I'd love to hear experiences from those who've had similar symptoms!",
        comment:
          "Since indigestion can have various causes, I recommend visiting a hospital with a gastroenterology specialist. A place with modern endoscopy equipment will help with accurate diagnosis!",
      },
      postDetail: {
        title: "Post Details",
        writer: "Writer",
        date: "Date",
        views: "Views",
        report: "Report",
        share: "Share",
      },
      categories: {
        medical_consultation: "Medical Consultation",
        hospital_review: "Hospital Review",
        medication_consultation: "Medication Advice",
        health_information: "Health Information",
        other_inquiries: "Other Inquiries",
      },
      guidelines: {
        title: "Guidelines for Creating Posts",
        point1: "Medical consultations should only be used for reference.",
        point2:
          "For accurate diagnosis, please consult with medical professionals.",
        point3: "Do not share personal information (contact details, etc.).",
        point4:
          "Defamatory or promotional posts may be removed by administrators.",
      },
    },
    plastic: {
      top_title: "Community",
      writePost: "Write Post",
      title: "Enter title (required)",
      content: "Enter content (required)",
      content_placeholder:
        "Please describe your symptoms or inquiries in detail. (Required)\n\nExample:\n- When did your symptoms begin?\n- What symptoms are you experiencing?\n- Are you taking any medications regularly?\n- Do you have any related underlying conditions?",
      comments: "Comments",
      writeComment: "Write a comment",
      category_selection: "Category Selection (Required)",
      likes: "Likes",
      example: {
        title: "Swelling after my rhinoplasty hasn't reduced after 2 weeks",
      },
      example2: {
        title:
          "A plastic surgeon's guide to caring for your skin after laser treatment",
      },
      example3: {
        title: "Which hospital is best for double eyelid surgery?",
        content:
          "Hello! I'm considering double eyelid surgery but there are several plastic surgery clinics in my area. Could you advise me on what criteria I should use to choose a hospital and doctor? I'd also like to hear experiences from those who have had this surgery!",
        comment:
          "For double eyelid surgery, the doctor's experience and technique are crucial, so I recommend a plastic surgeon with many procedure cases. It's best to find a place where the doctor suggests a design that suits your face shape during consultation!",
      },
      postDetail: {
        title: "Post Details",
        writer: "Writer",
        date: "Date",
        views: "Views",
        report: "Report",
        share: "Share",
      },
      categories: {
        procedure_consultation: "Procedure Consultation",
        clinic_review: "Plastic Surgery Clinic Reviews",
        aftercare_consultation: "Post-Surgery Care",
        beauty_information: "Beauty Information",
        other_inquiries: "Other Inquiries",
      },
      guidelines: {
        title: "Guidelines for Creating Posts",
        point1: "Medical consultations should only be used for reference.",
        point2:
          "For accurate diagnosis, please consult with medical professionals.",
        point3: "Do not share personal information (contact details, etc.).",
        point4:
          "Defamatory or promotional posts may be removed by administrators.",
      },
    },
  },
  booking: {
    gym: {
      title: "Visit Reservation",
      visit_date: "Visit Date",
      today: "Today",
      tomorrow: "Tomorrow",
      visit_reason: "Purpose of Visit",
      detailed_reason: "Please enter what you would like to discuss",
    },
    medical: {
      action: "Book",
      title: "Medical Appointment",
      button: "Book Now",
      treatment_date: "Appointment Date",
      today: "Today",
      tomorrow: "Tomorrow",
      id_number: "ID Number",
      symptoms_category: "Symptoms/Department",
      detailed_symptoms: "Please enter your symptoms in detail",
      example: "Example",
      example_1: "I fell while exercising and injured my ankle",
      example_2: "I have a sore throat, runny nose, and severe ear congestion",
      example_3: "I'd like to get a prescription for hair loss medication",
      attach_photo: "You can attach photos related to your symptoms",
    },
  },
  payment: {
    gym: {
      title: "Payment",
      product: "Product Details",
      method: "Payment Method",
      methods: {
        card: "Credit/Debit Card",
        transfer: "Bank Transfer",
        kakaopay: "KakaoPay",
      },
    },
    medical: {
      title: "Payment",
      reservation_info: "Reservation Information",
      method: "Payment Method",
      methods: {
        card: "Credit/Debit Card",
        transfer: "Bank Transfer",
        kakaopay: "KakaoPay",
      },
      consultation_deposit: "Medical Fee Deposit",
      fee_determination_notice:
        "The actual medical fee will be determined after examination.",
      deposit_deduction_notice:
        "The deposit will be deducted from the total medical fee.",
      reservation: {
        notice_title: "Reservation Notices",
        deposit_deduction: "The deposit will be deducted from the medical fee.",
        cancellation_policy:
          "Reservations can be canceled up to 24 hours before the appointment.",
        same_day_cancellation:
          "The deposit is non-refundable for same-day cancellations or no-shows.",
        actual_fee_notice:
          "The actual medical fee will be determined after examination.",
      },
    },
    plastic: {
      title: "Payment",
      product: "Product Details",
      method: "Payment Method",
      methods: {
        card: "Credit/Debit Card",
        transfer: "Bank Transfer",
        kakaopay: "KakaoPay",
      },
      payer: {
        title: "Payer Information",
        name: "Name",
        namePlaceholder: "Enter payer's name",
        phoneNumber: "Mobile Number",
        phonePlaceholder: "Enter without hyphens",
      },
      reservation: {
        notice_title: "Payment Guidelines",
        deposit_deduction:
          "Deposit will be deducted from the procedure/surgery fee.",
        cancellation_policy:
          "Reservations can be canceled up to 24 hours before consultation.",
        same_day_cancellation:
          "Same-day cancellations/no-shows will not receive a deposit refund.",
        actual_fee_notice:
          "Additional procedure or surgery fees will be determined after consultation.",
      },
    },
  },
  consultation: {
    gym: {
      title: "Request Consultation",
      name: {
        label: "Name",
        placeholder: "Enter the name for consultation",
      },
      time: {
        label: "Preferred Time",
        placeholder: "e.g., Weekdays after 2PM, Weekend mornings",
      },
      content: {
        label: "Consultation Details",
        placeholder: "Please describe what you'd like to discuss",
      },
      submit: "Submit Request",
    },
    medical: {
      title: "Request Consultation",
      name: {
        label: "Name",
        placeholder: "Enter the name for consultation",
      },
      time: {
        label: "Preferred Time",
        placeholder: "e.g., Weekdays after 2PM, Weekend mornings",
      },
      content: {
        label: "Consultation Details",
        placeholder: "Please describe what you'd like to discuss",
      },
      submit: "Submit Request",
    },
    plastic: {
      title: "Request Consultation",
      name: {
        label: "Name",
        placeholder: "Enter the name for consultation",
      },
      time: {
        label: "Preferred Time",
        placeholder: "e.g., Weekdays after 2PM, Weekend mornings",
      },
      content: {
        label: "Consultation Details",
        placeholder: "Please describe what you'd like to discuss",
      },
      submit: "Submit Request",
    },
  },
  mypage: {
    gym: {
      title: "MY",
      profile: {
        edit: "Edit Profile",
      },
      menu: {
        membership: "My Memberships",
        payments: "Payment History",
        reservations: "Reservations",
        notice: "Notices",
        faq: "FAQ",
        inquiry: "1:1 Inquiry",
      },
      logout: "Logout",
    },
    medical: {
      title: "MY",
      profile: {
        edit: "Edit Profile",
      },
      menu: {
        treatmentManagement: "Treatment Management",
        appointmentHistory: "Appointment History",
        medicalRecords: "Medical Records",
        prescriptionManagement: "Prescription Management",
        healthCheckupResults: "Health Checkup Results",

        paymentManagement: "Payment Management",
        paymentDetails: "Payment Details",
        medicalCertificates: "Medical Certificates",
        medicalReports: "Medical Reports",

        settings: "Settings",
        alarmSettings: "Notification Settings",
        personalInfoSettings: "Personal Information Settings",
        termsOfUse: "Terms of Use",
        privacyPolicy: "Privacy Policy",
        frequentlyAskedQuestions: "Frequently Asked Questions",
        customerService: "Customer Service",
      },
      logout: "Logout",
    },
    plastic: {
      title: "MY",
      profile: {
        edit: "Edit Profile",
      },
      menu: {
        // Appointment Management
        appointmentManagement: "Appointment Management",
        pendingAppointments: "Pending Appointments",
        pastAppointments: "Past Appointments",
        latestAppointmentHistory: "Cancelled Appointments",

        // Review Management
        reviewManagement: "Review Management",
        availableReviews: "Available Reviews",
        writtenReviews: "Written Reviews",

        settings: "Settings",
        alarmSettings: "Notification Settings",
        personalInfoSettings: "Personal Information Settings",
        termsOfUse: "Terms of Use",
        privacyPolicy: "Privacy Policy",
        frequentlyAskedQuestions: "Frequently Asked Questions",
        customerService: "Customer Service",
      },
      logout: "Logout",
    },
  },
  review: {
    gym: {
      title: "Reviews",
      detail: "Review Details",
      writeReview: "Write a review",
      placeholder: "Please enter your review.",
      validation: "Please enter both rating and content.",
      example_1: {
        content:
          "It was a truly satisfying experience. The trainer provided detailed guidance and created a well-structured workout plan. I achieved better results than my initial goals during the three months. The facility was clean and comfortable, perfect for working out. I particularly appreciated the clean shower rooms, and all the exercise equipment was well-maintained.",
      },
      example_2: {
        content:
          "The facility is incredibly clean and great! It's a perfect environment for working out.",
      },
      example_3: {
        content:
          "Even beginners can use the facility comfortably. The trainers are very friendly and helpful.",
      },
      example_4: {
        content:
          "The trainer provided very detailed guidance and created an excellent workout plan.",
      },
      example_5: {
        content:
          "Over three months, I achieved better results than my initial goals.",
      },
    },
    medical: {
      title: "Reviews",
      detail: "Review Details",
      writeReview: "Write a review",
      placeholder: "Please enter your review.",
      validation: "Please enter both rating and content.",
      example_1: {
        content:
          "The explanation was very detailed and easy to understand. I was reassured by the kind explanation about the treatment process and prognosis.",
      },
      example_2: {
        content:
          "I could feel their professional knowledge, and they kindly answered all my questions. My symptoms improved significantly thanks to their thorough examination.",
      },
    },
    plastic: {
      title: "Reviews",
      detail: "Review Details",
      writeReview: "Write a review",
      placeholder: "Please enter your review.",
      validation: "Please enter both rating and content.",
      example_1: {
        content:
          "The explanation was very detailed and easy to understand. I was reassured by the kind explanation about the treatment process and prognosis.",
      },
      example_2: {
        content:
          "I could feel their professional knowledge, and they kindly answered all my questions. My symptoms improved significantly thanks to their thorough examination.",
      },
    },
  },
  report: {
    title: "Report",
    header: "Please select a reason for reporting",
    target: "Report target",
    details: "Additional details (optional)",
    submit: "Submit Report",
    options: {
      inappropriate: "Inappropriate content",
      spam: "Spam",
      offensive: "Offensive language",
      fake: "False information",
      other: "Other",
    },
    confirm: {
      title: "Report",
      message: "Are you sure you want to report this content?",
      yes: "Report",
      no: "Cancel",
    },
  },
  delete: {
    confirm: {
      title: "Delete Confirmation",
      message: "Are you sure you want to delete?",
      no: "Cancel",
      yes: "Delete",
    },
  },
  search: {
    placeholder: "Enter search term",
    union_placeholder: "Enter facility/trainer name",
  },
};
