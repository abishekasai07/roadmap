// ============================================
// SkillPath AI - Skills Page
// ============================================


const skills = [

    {
        id: 1,
        name: "C",
        category: "Programming"
    },

    {
        id: 2,
        name: "C++",
        category: "Programming"
    },

    {
        id: 3,
        name: "Python",
        category: "Programming"
    },

    {
        id: 4,
        name: "Data Structures",
        category: "DSA"
    },

    {
        id: 5,
        name: "Git",
        category: "Tools"
    },

    {
        id: 6,
        name: "Digital Electronics",
        category: "Electronics"
    },

    {
        id: 7,
        name: "Embedded C",
        category: "Embedded"
    },

    {
        id: 8,
        name: "Microcontrollers",
        category: "Embedded"
    },

    {
        id: 9,
        name: "ESP32",
        category: "Embedded"
    },

    {
        id: 10,
        name: "UART",
        category: "Communication"
    },

    {
        id: 11,
        name: "SPI",
        category: "Communication"
    },

    {
        id: 12,
        name: "I2C",
        category: "Communication"
    },

    {
        id: 13,
        name: "PCB Design",
        category: "Electronics"
    },

    {
        id: 14,
        name: "RTOS",
        category: "Embedded"
    },

    {
        id: 15,
        name: "Linux",
        category: "Tools"
    },

    {
        id: 16,
        name: "Verilog",
        category: "Electronics"
    },

    {
        id: 17,
        name: "SQL",
        category: "Database"
    },

    {
        id: 18,
        name: "Machine Learning",
        category: "AI/ML"
    },

    {
        id: 19,
        name: "HTML & CSS",
        category: "Web"
    },

    {
        id: 20,
        name: "JavaScript",
        category: "Web"
    },

    {
        id: 21,
        name: "Cloud Computing",
        category: "Cloud"
    },

    {
        id: 22,
        name: "Cybersecurity Basics",
        category: "Cybersecurity"
    },

    {
        id: 23,
        name: "Problem Solving",
        category: "Other"
    },

    {
        id: 24,
        name: "Technical Communication",
        category: "Communication"
    }

];


// ============================================
// DOM
// ============================================

const skillGrid =
    document.getElementById("skillGrid");

const skillSearchInput =
    document.getElementById("skillSearchInput");

const categoryFilters =
    document.getElementById("categoryFilters");

const selectedSkillsContainer =
    document.getElementById("selectedSkills");

const selectedCount =
    document.getElementById("selectedCount");

const skillModal =
    document.getElementById("skillModal");

const modalSkillName =
    document.getElementById("modalSkillName");

const proficiencyOptions =
    document.getElementById("proficiencyOptions");

const evidenceInput =
    document.getElementById("evidenceInput");


// ============================================
// CURRENT MODAL STATE
// ============================================

let currentSkill = null;

let selectedProficiency = 0;

let activeCategory = "All";


// ============================================
// DEPARTMENT
// ============================================

const departmentName =
    sessionStorage.getItem(
        "selectedDepartmentName"
    );


const selectedDepartment =
    document.getElementById(
        "selectedDepartment"
    );


if (selectedDepartment && departmentName) {

    selectedDepartment.textContent =
        departmentName;

}


// ============================================
// CATEGORY FILTERS
// ============================================

const categories = [
    "All",
    "Programming",
    "DSA",
    "Web",
    "Database",
    "Embedded",
    "Electronics",
    "AI/ML",
    "Cloud",
    "Cybersecurity",
    "Tools",
    "Communication",
    "Other"
];


function renderCategories() {

    if (!categoryFilters) return;

    categoryFilters.innerHTML = "";


    categories.forEach(
        category => {

            const button =
                document.createElement("button");


            button.className =
                "filter" +
                (
                    category === "All"
                        ? " active"
                        : ""
                );


            button.textContent =
                category;


            button.addEventListener(
                "click",
                () => {

                    activeCategory =
                        category;


                    document
                        .querySelectorAll(".filter")
                        .forEach(
                            filter =>
                                filter.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    renderSkills();

                }
            );


            categoryFilters.appendChild(
                button
            );

        }
    );
}


// ============================================
// RENDER SKILLS
// ============================================

function renderSkills() {

    if (!skillGrid) return;


    const searchTerm =
        skillSearchInput
            ? skillSearchInput.value
                .trim()
                .toLowerCase()
            : "";


    skillGrid.innerHTML = "";


    const filteredSkills =
        skills.filter(skill => {

            const categoryMatch =
                activeCategory === "All" ||
                skill.category === activeCategory;


            const searchMatch =
                skill.name
                    .toLowerCase()
                    .includes(searchTerm);


            return categoryMatch &&
                   searchMatch;

        });


    if (!filteredSkills.length) {

        skillGrid.innerHTML = `
            <div class="card">
                <h3>No skills found</h3>
                <p class="muted">
                    Try another search.
                </p>
            </div>
        `;

        return;

    }


    filteredSkills.forEach(
        skill => {

            const card =
                document.createElement("div");


            card.className =
                "skill-card";


            card.dataset.skillId =
                skill.id;


            card.dataset.skillName =
                skill.name;


            card.dataset.skillCategory =
                skill.category;


            const alreadySelected =
                learnerSkills.some(
                    item =>
                        item.skillId === skill.id
                );


            card.innerHTML = `

                <small>
                    ${skill.category}
                </small>

                <h3>
                    ${skill.name}
                </h3>

                <span class="muted">
                    ${
                        alreadySelected
                            ? "✓ Added"
                            : "Click to add"
                    }
                </span>

            `;


            card.addEventListener(
                "click",
                () => openSkillModal(skill)
            );


            skillGrid.appendChild(card);

        }
    );

}


// ============================================
// OPEN MODAL
// ============================================

function openSkillModal(skill) {

    currentSkill = skill;


    const existing =
        learnerSkills.find(
            item =>
                item.skillId === skill.id
        );


    selectedProficiency =
        existing
            ? existing.proficiency
            : 0;


    modalSkillName.textContent =
        skill.name;


    evidenceInput.value =
        existing
            ? existing.evidence
            : "";


    renderProficiency();


    skillModal.classList.remove(
        "hidden"
    );

}


// ============================================
// PROFICIENCY
// ============================================

function renderProficiency() {

    proficiencyOptions.innerHTML = "";


    proficiencyLabels.forEach(
        (label, index) => {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "level-btn" +
                (
                    selectedProficiency === index
                        ? " selected"
                        : ""
                );


            button.innerHTML = `
                <strong>${index}</strong>
                <br>
                ${label}
            `;


            button.addEventListener(
                "click",
                () => {

                    selectedProficiency =
                        index;

                    renderProficiency();

                }
            );


            proficiencyOptions.appendChild(
                button
            );

        }
    );

}


// ============================================
// CLOSE MODAL
// ============================================

function closeSkillModal() {

    skillModal.classList.add(
        "hidden"
    );

    currentSkill = null;

}


document
    .getElementById("modalClose")
    ?.addEventListener(
        "click",
        closeSkillModal
    );


document
    .getElementById("cancelModal")
    ?.addEventListener(
        "click",
        closeSkillModal
    );


// ============================================
// ADD / UPDATE SKILL
// ============================================

document
    .getElementById("addSkillBtn")
    ?.addEventListener(
        "click",
        () => {

            if (!currentSkill) return;


            const skillData = {

                skillId:
                    currentSkill.id,

                skillName:
                    currentSkill.name,

                category:
                    currentSkill.category,

                proficiency:
                    selectedProficiency,

                evidence:
                    evidenceInput.value.trim(),

                verified:
                    false

            };


            const existingIndex =
                learnerSkills.findIndex(
                    item =>
                        item.skillId ===
                        currentSkill.id
                );


            if (existingIndex >= 0) {

                learnerSkills[
                    existingIndex
                ] = skillData;

            } else {

                learnerSkills.push(
                    skillData
                );

            }


            selectedSkillIds =
                learnerSkills.map(
                    skill =>
                        skill.skillId
                );


            saveState();


            renderSelectedSkills();

            renderSkills();


            closeSkillModal();


            showToast(
                "Skill added. Complete the assessment to verify it.",
                "success"
            );

        }
    );


// ============================================
// SELECTED SKILLS
// ============================================

function renderSelectedSkills() {

    if (!selectedSkillsContainer)
        return;


    selectedCount.textContent =
        learnerSkills.length;


    selectedSkillsContainer.innerHTML = "";


    if (!learnerSkills.length) {

        selectedSkillsContainer.innerHTML = `
            <p class="muted">
                No skills selected yet.
            </p>
        `;

        return;

    }


    learnerSkills.forEach(
        skill => {

            const row =
                document.createElement("div");


            row.className =
                "selected-item";


            row.innerHTML = `

                <span>

                    <strong>
                        ${skill.skillName}
                    </strong>

                    <br>

                    <small>

                        ${
                            proficiencyLabels[
                                skill.proficiency
                            ]
                        }

                        ·

                        ${
                            skill.verified
                                ? "✓ Verified"
                                : "⚠ Not verified"
                        }

                    </small>

                </span>


                <button
                    type="button"
                    class="remove-skill"
                >
                    Remove
                </button>

            `;


            row
                .querySelector(
                    ".remove-skill"
                )
                .addEventListener(
                    "click",
                    () => removeSkill(
                        skill.skillId
                    )
                );


            selectedSkillsContainer
                .appendChild(row);

        }
    );

}


// ============================================
// REMOVE
// ============================================

function removeSkill(skillId) {

    learnerSkills =
        learnerSkills.filter(
            skill =>
                skill.skillId !==
                skillId
        );


    selectedSkillIds =
        learnerSkills.map(
            skill =>
                skill.skillId
        );


    saveState();


    renderSelectedSkills();

    renderSkills();


    showToast(
        "Skill removed."
    );

}


// ============================================
// SEARCH
// ============================================

if (skillSearchInput) {

    skillSearchInput.addEventListener(
        "input",
        renderSkills
    );

}


// ============================================
// CONTINUE TO ASSESSMENT
// ============================================

document
    .getElementById("assessmentBtn")
    ?.addEventListener(
        "click",
        () => {

            if (!learnerSkills.length) {

                showToast(
                    "Select at least one skill first.",
                    "error"
                );

                return;

            }


            saveState();


            window.location.href =
                "assessment.html";

        }
    );


// ============================================
// INITIALIZE
// ============================================

renderCategories();

renderSkills();

renderSelectedSkills();