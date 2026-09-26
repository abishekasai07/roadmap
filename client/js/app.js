// ============================================
// SkillPath AI - Global Application State
// ============================================

// User
const currentUser = {
    id: null,
    name: "",
    departmentId: null,
    departmentName: ""
};


// Department
let selectedDepartmentId = null;
let selectedDepartmentName = "";


// Skills
let selectedSkillIds = [];
let learnerSkills = [];


// Role
let selectedRoleId = null;
let selectedRoleName = "";


// Assessment
let assessmentQuestions = [];
let currentQuestionIndex = 0;
let assessmentAnswers = [];
let assessmentConfidence = 0;


// Assessment result
let assessmentResult = {
    status: "",
    confidence: 0,
    skillLevels: []
};


// Role analysis
let roleAnalysis = {
    readinessScore: 0,
    gaps: [],
    prioritySkills: [],
    completedSkills: []
};


// Roadmap
let roadmapData = {
    targetRoleId: null,
    targetRoleName: "",
    totalDays: 0,
    dailyTechnicalHours: 4,
    dailyCommunicationHours: 1,
    dailyAptitudeHours: 1,
    milestones: [],
    days: []
};


// Progress
let userProgress = {
    completedDays: 0,
    totalDays: 0,
    completedMilestones: 0,
    totalMilestones: 0
};


// ============================================
// PROFICIENCY
// ============================================

const proficiencyLabels = [
    "No experience",
    "Beginner",
    "Basic",
    "Intermediate",
    "Advanced",
    "Job-ready"
];


// ============================================
// SESSION STORAGE
// ============================================

function saveState() {

    sessionStorage.setItem(
        "selectedDepartmentId",
        selectedDepartmentId
    );

    sessionStorage.setItem(
        "selectedDepartmentName",
        selectedDepartmentName
    );

    sessionStorage.setItem(
        "learnerSkills",
        JSON.stringify(learnerSkills)
    );

    sessionStorage.setItem(
        "selectedSkillIds",
        JSON.stringify(selectedSkillIds)
    );

    sessionStorage.setItem(
        "selectedRoleId",
        selectedRoleId
    );

    sessionStorage.setItem(
        "selectedRoleName",
        selectedRoleName
    );

    sessionStorage.setItem(
        "assessmentResult",
        JSON.stringify(assessmentResult)
    );
}


function loadState() {

    selectedDepartmentId =
        sessionStorage.getItem("selectedDepartmentId");

    selectedDepartmentName =
        sessionStorage.getItem("selectedDepartmentName") || "";


    try {

        learnerSkills = JSON.parse(
            sessionStorage.getItem("learnerSkills") || "[]"
        );

    } catch {

        learnerSkills = [];

    }


    try {

        selectedSkillIds = JSON.parse(
            sessionStorage.getItem("selectedSkillIds") || "[]"
        );

    } catch {

        selectedSkillIds = [];

    }


    selectedRoleId =
        sessionStorage.getItem("selectedRoleId");

    selectedRoleName =
        sessionStorage.getItem("selectedRoleName") || "";


    try {

        assessmentResult = JSON.parse(
            sessionStorage.getItem("assessmentResult") ||
            '{"status":"","confidence":0,"skillLevels":[]}');

    } catch {

        assessmentResult = {
            status: "",
            confidence: 0,
            skillLevels: []
        };

    }
}


// ============================================
// TOAST
// ============================================

function showToast(message, type = "info") {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toast.style.borderLeft =
        type === "success"
            ? "4px solid #159570"
            : type === "error"
                ? "4px solid #d94b4b"
                : "4px solid #635bff";

    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 2500);
}


// ============================================
// INITIAL LOAD
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadState();

    }
);