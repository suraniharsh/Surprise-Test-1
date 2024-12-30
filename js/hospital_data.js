// Original Data Sets
const ORIGINAL_PATIENTS = [
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
];

const ORIGINAL_DOCTORS = [
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
];

// All available queries
const ALL_QUERIES = [
    {
        id: 1,
        title: "Find all patients currently admitted",
        query: "db.patients.find({ status: 'Admitted' })",
        description: "Lists all patients who are currently admitted in the hospital",
        execute: (data) => data.patients.filter(p => p.status === "Admitted")
    },
    {
        id: 2,
        title: "Find doctors with more than 10 years of experience",
        query: "db.doctors.find({ experience: { $gt: 10 } })",
        description: "Lists doctors who have more than 10 years of experience",
        execute: (data) => data.doctors.filter(d => d.experience > 10)
    },
    {
        id: 3,
        title: "List all patients with diabetes",
        query: "db.patients.find({ diagnosis: 'Diabetes' })",
        description: "Shows all patients who have diabetes in their diagnosis",
        execute: (data) => data.patients.filter(p => p.diagnosis.includes("Diabetes"))
    },
    {
        id: 4,
        title: "Find doctors available in the morning shift",
        query: "db.doctors.find({ 'schedule.shift': 'Morning' })",
        description: "Lists all doctors who work in the morning shift",
        execute: (data) => data.doctors.filter(d => d.schedule.shift === "Morning")
    },
    {
        id: 5,
        title: "Find patients in the ICU ward",
        query: "db.patients.find({ 'ward.type': 'ICU' })",
        description: "Shows all patients currently in the ICU ward",
        execute: (data) => data.patients.filter(p => p.ward.type === "ICU")
    },
    {
        id: 6,
        title: "List doctors who work on Monday",
        query: "db.doctors.find({ 'schedule.days': 'Monday' })",
        description: "Shows all doctors who have Monday in their schedule",
        execute: (data) => data.doctors.filter(d => d.schedule.days.includes("Monday"))
    },
    {
        id: 7,
        title: "Find patients in Ward W101",
        query: "db.patients.find({ 'ward.number': 'W101' })",
        description: "Lists all patients in Ward W101",
        execute: (data) => data.patients.filter(p => p.ward.number === "W101")
    },
    {
        id: 8,
        title: "Find doctors who are specialists in both COPD and Asthma",
        query: "db.doctors.find({ expertise: { $all: ['COPD', 'Asthma'] } })",
        description: "Shows doctors who specialize in both COPD and Asthma",
        execute: (data) => data.doctors.filter(d => 
            d.expertise.includes("COPD") && d.expertise.includes("Asthma"))
    },
    {
        id: 9,
        title: "List patients with more than one diagnosis",
        query: "db.patients.find({ $expr: { $gt: [{ $size: '$diagnosis' }, 1] } })",
        description: "Shows patients who have multiple diagnoses",
        execute: (data) => data.patients.filter(p => p.diagnosis.length > 1)
    },
    {
        id: 10,
        title: "Find doctors in the Internal Medicine department",
        query: "db.doctors.find({ department: 'Internal Medicine' })",
        description: "Lists all doctors in the Internal Medicine department",
        execute: (data) => data.doctors.filter(d => d.department === "Internal Medicine")
    }
];

// Update operations
const UPDATE_OPERATIONS = [
    {
        id: 11,
        title: "Add a new medication for a specific patient",
        query: "db.patients.updateOne({ patientId: 'P101' }, { $push: { medications: 'Metformin' } })",
        description: "Adds a new medication to a patient's medication list",
        execute: (data) => {
            const patient = data.patients.find(p => p.patientId === "P101");
            if (patient && !patient.medications.includes("Metformin")) {
                patient.medications.push("Metformin");
            }
            return patient;
        }
    },
    {
        id: 12,
        title: "Update a doctor's consulting room",
        query: "db.doctors.updateOne({ doctorId: 'DOC001' }, { $set: { 'schedule.consultingRoom': 'R201' } })",
        description: "Updates the consulting room for a specific doctor",
        execute: (data) => {
            const doctor = data.doctors.find(d => d.doctorId === "DOC001");
            if (doctor) {
                doctor.schedule.consultingRoom = "R201";
            }
            return doctor;
        }
    },
    {
        id: 13,
        title: "Change a patient's status to discharged",
        query: "db.patients.updateOne({ patientId: 'P101' }, { $set: { status: 'Discharged' } })",
        description: "Updates a patient's status to discharged",
        execute: (data) => {
            const patient = data.patients.find(p => p.patientId === "P101");
            if (patient) {
                patient.status = "Discharged";
            }
            return patient;
        }
    },
    {
        id: 14,
        title: "Mark a doctor as unavailable",
        query: "db.doctors.updateOne({ doctorId: 'DOC001' }, { $set: { isAvailable: false } })",
        description: "Updates a doctor's availability status to unavailable",
        execute: (data) => {
            const doctor = data.doctors.find(d => d.doctorId === "DOC001");
            if (doctor) {
                doctor.isAvailable = false;
            }
            return doctor;
        }
    },
    {
        id: 15,
        title: "Remove specific medication from a patient's list",
        query: "db.patients.updateOne({ patientId: 'P101' }, { $pull: { medications: 'Insulin' } })",
        description: "Removes a specific medication from a patient's medication list",
        execute: (data) => {
            const patient = data.patients.find(p => p.patientId === "P101");
            if (patient) {
                patient.medications = patient.medications.filter(m => m !== "Insulin");
            }
            return patient;
        }
    }
];

// Delete operations
const DELETE_OPERATIONS = [
    {
        id: 16,
        title: "Remove all discharged patients",
        query: "db.patients.deleteMany({ status: 'Discharged' })",
        description: "Removes all patients with 'Discharged' status from the database",
        execute: (data) => {
            const initialLength = data.patients.length;
            data.patients = data.patients.filter(p => p.status !== "Discharged");
            return { deletedCount: initialLength - data.patients.length };
        }
    },
    {
        id: 17,
        title: "Delete patients with inactive insurance",
        query: "db.patients.deleteMany({ insuranceActive: false })",
        description: "Removes all patients who have inactive insurance",
        execute: (data) => {
            const initialLength = data.patients.length;
            data.patients = data.patients.filter(p => p.insuranceActive);
            return { deletedCount: initialLength - data.patients.length };
        }
    }
];

// Export all data and functions
window.HospitalDB = {
    ORIGINAL_PATIENTS,
    ORIGINAL_DOCTORS,
    ALL_QUERIES,
    UPDATE_OPERATIONS,
    DELETE_OPERATIONS
}; 