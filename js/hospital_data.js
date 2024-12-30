// Hospital Database
const HospitalDB = {
    // Original Data
    ORIGINAL_PATIENTS: [
        {
            "patientId": "P101",
            "name": "Sarah Williams",
            "age": 45,
            "bloodGroup": "A+",
            "admissionDate": "2024-01-15",
            "status": "Admitted",
            "assignedDoctor": "DOC001",
            "ward": {
                "number": "W101",
                "type": "General",
                "floor": 1,
                "bedNumber": "B1"
            },
            "diagnosis": ["Diabetes", "Hypertension"],
            "medications": ["Insulin", "Lisinopril"],
            "insuranceActive": true,
            "lastCheckup": "2024-12-20"
        },
        {
            "patientId": "P102",
            "name": "John Brown",
            "age": 28,
            "bloodGroup": "O+",
            "admissionDate": "2024-12-01",
            "status": "Discharged",
            "assignedDoctor": "DOC002",
            "ward": {
                "number": "W102",
                "type": "Emergency",
                "floor": 1,
                "bedNumber": "B5"
            },
            "diagnosis": ["Fracture"],
            "medications": ["Painkillers"],
            "insuranceActive": true,
            "lastCheckup": "2024-12-15"
        },
        {
            "patientId": "P103",
            "name": "Emily Davis",
            "age": 62,
            "bloodGroup": "B-",
            "admissionDate": "2024-12-10",
            "status": "Admitted",
            "assignedDoctor": "DOC001",
            "ward": {
                "number": "W103",
                "type": "ICU",
                "floor": 2,
                "bedNumber": "B2"
            },
            "diagnosis": ["Pneumonia", "COPD"],
            "medications": ["Antibiotics", "Bronchodilators"],
            "insuranceActive": true,
            "lastCheckup": "2024-12-25"
        },
        {
            "patientId": "P104",
            "name": "Michael Chen",
            "age": 35,
            "bloodGroup": "AB+",
            "admissionDate": "2024-11-20",
            "status": "Discharged",
            "assignedDoctor": "DOC003",
            "ward": {
                "number": "W101",
                "type": "General",
                "floor": 1,
                "bedNumber": "B3"
            },
            "diagnosis": ["Appendicitis"],
            "medications": ["Antibiotics"],
            "insuranceActive": false,
            "lastCheckup": "2024-12-01"
        },
        {
            "patientId": "P105",
            "name": "Linda Martinez",
            "age": 55,
            "bloodGroup": "A-",
            "admissionDate": "2024-12-20",
            "status": "Admitted",
            "assignedDoctor": "DOC004",
            "ward": {
                "number": "W104",
                "type": "Cardiac",
                "floor": 3,
                "bedNumber": "B1"
            },
            "diagnosis": ["Cardiac Arrhythmia"],
            "medications": ["Beta Blockers"],
            "insuranceActive": true,
            "lastCheckup": "2024-12-26"
        }
    ],

    ORIGINAL_DOCTORS: [
        {
            "doctorId": "DOC001",
            "name": "Dr. James Wilson",
            "specialization": "Endocrinology",
            "department": "Internal Medicine",
            "qualification": "MD",
            "experience": 15,
            "schedule": {
                "days": ["Monday", "Wednesday", "Friday"],
                "shift": "Morning",
                "consultingRoom": "R101"
            },
            "currentPatients": ["P101", "P103"],
            "expertise": ["Diabetes", "Thyroid Disorders"],
            "joinDate": "2010-06-15",
            "isAvailable": true
        },
        {
            "doctorId": "DOC002",
            "name": "Dr. Maria Garcia",
            "specialization": "Orthopedics",
            "department": "Surgery",
            "qualification": "MS",
            "experience": 10,
            "schedule": {
                "days": ["Monday", "Tuesday", "Thursday"],
                "shift": "Evening",
                "consultingRoom": "R102"
            },
            "currentPatients": [],
            "expertise": ["Joint Replacement", "Sports Injuries"],
            "joinDate": "2015-08-20",
            "isAvailable": true
        },
        {
            "doctorId": "DOC003",
            "name": "Dr. Robert Lee",
            "specialization": "General Surgery",
            "department": "Surgery",
            "qualification": "MS",
            "experience": 12,
            "schedule": {
                "days": ["Tuesday", "Wednesday", "Friday"],
                "shift": "Morning",
                "consultingRoom": "R103"
            },
            "currentPatients": [],
            "expertise": ["Laparoscopy", "Appendectomy"],
            "joinDate": "2012-03-10",
            "isAvailable": false
        },
        {
            "doctorId": "DOC004",
            "name": "Dr. Sarah Palmer",
            "specialization": "Cardiology",
            "department": "Cardiology",
            "qualification": "DM",
            "experience": 20,
            "schedule": {
                "days": ["Monday", "Thursday", "Friday"],
                "shift": "Morning",
                "consultingRoom": "R104"
            },
            "currentPatients": ["P105"],
            "expertise": ["Heart Failure", "Arrhythmia"],
            "joinDate": "2005-11-30",
            "isAvailable": true
        },
        {
            "doctorId": "DOC005",
            "name": "Dr. David Kim",
            "specialization": "Pulmonology",
            "department": "Internal Medicine",
            "qualification": "MD",
            "experience": 8,
            "schedule": {
                "days": ["Wednesday", "Thursday", "Friday"],
                "shift": "Evening",
                "consultingRoom": "R105"
            },
            "currentPatients": [],
            "expertise": ["COPD", "Asthma"],
            "joinDate": "2018-07-15",
            "isAvailable": true
        }
    ],

    // Find Queries
    ALL_QUERIES: [
        {
            id: 1,
            title: "Find All Admitted Patients",
            description: "Lists all patients who are currently admitted in the hospital",
            query: "db.patients.find({ status: 'Admitted' })",
            execute: (data) => data.patients.filter(p => p.status === "Admitted")
        },
        {
            id: 2,
            title: "Find Experienced Doctors",
            description: "Lists doctors who have more than 10 years of experience",
            query: "db.doctors.find({ experience: { $gt: 10 } })",
            execute: (data) => data.doctors.filter(d => d.experience > 10)
        },
        {
            id: 3,
            title: "Find Diabetic Patients",
            description: "Shows all patients who have diabetes in their diagnosis",
            query: "db.patients.find({ diagnosis: 'Diabetes' })",
            execute: (data) => data.patients.filter(p => p.diagnosis.includes("Diabetes"))
        },
        {
            id: 4,
            title: "Find Morning Shift Doctors",
            description: "Lists all doctors who work in the morning shift",
            query: "db.doctors.find({ 'schedule.shift': 'Morning' })",
            execute: (data) => data.doctors.filter(d => d.schedule.shift === "Morning")
        },
        {
            id: 5,
            title: "Find ICU Patients",
            description: "Shows all patients currently in the ICU ward",
            query: "db.patients.find({ 'ward.type': 'ICU' })",
            execute: (data) => data.patients.filter(p => p.ward.type === "ICU")
        },
        {
            id: 6,
            title: "Find Monday Doctors",
            description: "Shows all doctors who have Monday in their schedule",
            query: "db.doctors.find({ 'schedule.days': 'Monday' })",
            execute: (data) => data.doctors.filter(d => d.schedule.days.includes("Monday"))
        },
        {
            id: 7,
            title: "Find Ward W101 Patients",
            description: "Lists all patients in Ward W101",
            query: "db.patients.find({ 'ward.number': 'W101' })",
            execute: (data) => data.patients.filter(p => p.ward.number === "W101")
        },
        {
            id: 8,
            title: "Find COPD & Asthma Specialists",
            description: "Shows doctors who specialize in both COPD and Asthma",
            query: "db.doctors.find({ expertise: { $all: ['COPD', 'Asthma'] } })",
            execute: (data) => data.doctors.filter(d => 
                d.expertise.includes("COPD") && d.expertise.includes("Asthma"))
        },
        {
            id: 9,
            title: "Find Multiple Diagnosis Patients",
            description: "Shows patients who have multiple diagnoses",
            query: "db.patients.find({ $expr: { $gt: [{ $size: '$diagnosis' }, 1] } })",
            execute: (data) => data.patients.filter(p => p.diagnosis.length > 1)
        },
        {
            id: 10,
            title: "Find Internal Medicine Doctors",
            description: "Lists all doctors in the Internal Medicine department",
            query: "db.doctors.find({ department: 'Internal Medicine' })",
            execute: (data) => data.doctors.filter(d => d.department === "Internal Medicine")
        }
    ],

    // Update Operations
    UPDATE_OPERATIONS: [
        {
            id: 11,
            title: "Add New Medication",
            description: "Adds Metformin to Sarah Williams's medication list",
            query: "db.patients.updateOne({ patientId: 'P101' }, { $push: { medications: 'Metformin' } })",
            execute: (data) => {
                const patient = data.patients.find(p => p.patientId === "P101");
                if (patient && !patient.medications.includes("Metformin")) {
                    patient.medications.push("Metformin");
                }
                return { acknowledged: true, modifiedCount: 1 };
            }
        },
        {
            id: 12,
            title: "Update Consulting Room",
            description: "Updates Dr. James Wilson's consulting room to R201",
            query: "db.doctors.updateOne({ doctorId: 'DOC001' }, { $set: { 'schedule.consultingRoom': 'R201' } })",
            execute: (data) => {
                const doctor = data.doctors.find(d => d.doctorId === "DOC001");
                if (doctor) {
                    doctor.schedule.consultingRoom = "R201";
                }
                return { acknowledged: true, modifiedCount: 1 };
            }
        },
        {
            id: 13,
            title: "Update Patient Status",
            description: "Changes Sarah Williams's status to discharged",
            query: "db.patients.updateOne({ patientId: 'P101' }, { $set: { status: 'Discharged' } })",
            execute: (data) => {
                const patient = data.patients.find(p => p.patientId === "P101");
                if (patient) {
                    patient.status = "Discharged";
                }
                return { acknowledged: true, modifiedCount: 1 };
            }
        },
        {
            id: 14,
            title: "Mark Doctor Unavailable",
            description: "Updates Dr. James Wilson's availability status to unavailable",
            query: "db.doctors.updateOne({ doctorId: 'DOC001' }, { $set: { isAvailable: false } })",
            execute: (data) => {
                const doctor = data.doctors.find(d => d.doctorId === "DOC001");
                if (doctor) {
                    doctor.isAvailable = false;
                }
                return { acknowledged: true, modifiedCount: 1 };
            }
        }
    ],

    // Delete Operations
    DELETE_OPERATIONS: [
        {
            id: 15,
            title: "Remove Discharged Patients",
            description: "Removes all patients with 'Discharged' status from the database",
            query: "db.patients.deleteMany({ status: 'Discharged' })",
            execute: (data) => {
                const initialLength = data.patients.length;
                data.patients = data.patients.filter(p => p.status !== "Discharged");
                return { acknowledged: true, deletedCount: initialLength - data.patients.length };
            }
        },
        {
            id: 16,
            title: "Delete Inactive Insurance Patients",
            description: "Removes all patients who have inactive insurance",
            query: "db.patients.deleteMany({ insuranceActive: false })",
            execute: (data) => {
                const initialLength = data.patients.length;
                data.patients = data.patients.filter(p => p.insuranceActive);
                return { acknowledged: true, deletedCount: initialLength - data.patients.length };
            }
        },
        {
            id: 17,
            title: "Remove Specific Medication",
            description: "Removes Insulin from Sarah Williams's medication list",
            query: "db.patients.updateOne({ patientId: 'P101' }, { $pull: { medications: 'Insulin' } })",
            execute: (data) => {
                const patient = data.patients.find(p => p.patientId === "P101");
                if (patient) {
                    patient.medications = patient.medications.filter(m => m !== "Insulin");
                }
                return { acknowledged: true, modifiedCount: 1 };
            }
        }
    ]
};

// Export for browser
if (typeof window !== 'undefined') {
    window.HospitalDB = HospitalDB;
} 