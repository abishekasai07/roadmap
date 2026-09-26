// ============================================
// SkillPath AI - API Layer
// ============================================

const API_BASE_URL =
    "http://localhost:5000/api";


// ============================================
// GET DEPARTMENTS
// ============================================

async function getDepartments() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/departments`
        );

        if (!response.ok) {
            throw new Error("Failed to load departments");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Department API unavailable. Using frontend data."
        );

        return [];

    }
}


// ============================================
// GET SKILLS
// ============================================

async function getSkills(departmentId) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/skills?departmentId=${departmentId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load skills");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Skills API unavailable. Using frontend data."
        );

        return [];

    }
}


// ============================================
// GET QUESTIONS
// ============================================

async function getQuestions(skillIds) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/assessment/questions`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    skillIds
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Assessment API unavailable. Using mock questions."
        );

        return [];

    }
}


// ============================================
// SUBMIT ASSESSMENT
// ============================================

async function submitAssessment(answers) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/assessment/submit`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    answers
                })
            }
        );

        if (!response.ok) {
            throw new Error("Assessment submission failed");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Assessment submission API unavailable."
        );

        return null;

    }
}


// ============================================
// GET ROLE ANALYSIS
// ============================================

async function getRoleAnalysis(
    learnerId,
    roleId
) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/analysis/${learnerId}/${roleId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load role analysis");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Role analysis API unavailable."
        );

        return null;

    }
}


// ============================================
// GET ROADMAP
// ============================================

async function getRoadmap(
    learnerId,
    roleId
) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/roadmap/${learnerId}/${roleId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load roadmap");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Roadmap API unavailable."
        );

        return null;

    }
}


// ============================================
// GET COMPANIES
// ============================================

async function getCompanies(roleId) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/companies/${roleId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load companies");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Company API unavailable."
        );

        return [];

    }
}


// ============================================
// UPDATE PROGRESS
// ============================================

async function updateProgress(progressData) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/progress`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(progressData)
            }
        );

        if (!response.ok) {
            throw new Error("Progress update failed");
        }

        return await response.json();

    } catch (error) {

        console.warn(
            "Progress API unavailable."
        );

        return null;

    }
}