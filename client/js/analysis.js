// ============================================
// SkillPath AI - Career Analysis
// ============================================


// ============================================
// ROLE DATA
// ============================================

const roles = [

    {
        id: 1,
        name: "Firmware Engineer",
        score: 62,

        gaps: [
            "Microcontrollers",
            "RTOS",
            "Embedded C"
        ]
    },


    {
        id: 2,
        name: "Embedded Systems Engineer",
        score: 58,

        gaps: [
            "Microcontrollers",
            "UART",
            "RTOS"
        ]
    },


    {
        id: 3,
        name: "IoT Engineer",
        score: 71,

        gaps: [
            "Protocols",
            "Cloud",
            "Embedded C"
        ]
    },


    {
        id: 4,
        name: "VLSI Design Engineer",
        score: 28,

        gaps: [
            "Verilog",
            "Digital Design",
            "RTL"
        ]
    },


    {
        id: 5,
        name: "Software Engineer",
        score: 49,

        gaps: [
            "DSA",
            "System Design",
            "Git"
        ]
    },


    {
        id: 6,
        name: "AI / ML Engineer",
        score: 24,

        gaps: [
            "Python",
            "Statistics",
            "Machine Learning"
        ]
    }

];


// ============================================
// GAP DATA
// ============================================

const gaps = [

    {
        skillId: 8,

        skillName:
            "Microcontrollers",

        currentLevel: 1,

        requiredLevel: 5,

        gap: 4,

        importance: 5,

        priorityScore: 20,

        priorityLevel: "HIGH",

        prerequisites: [
            "C",
            "Digital Electronics"
        ]
    },


    {
        skillId: 7,

        skillName:
            "Embedded C",

        currentLevel: 2,

        requiredLevel: 4,

        gap: 2,

        importance: 5,

        priorityScore: 10,

        priorityLevel: "HIGH",

        prerequisites: [
            "C",
            "Pointers"
        ]
    },


    {
        skillId: 14,

        skillName:
            "RTOS",

        currentLevel: 0,

        requiredLevel: 3,

        gap: 3,

        importance: 4,

        priorityScore: 12,

        priorityLevel: "HIGH",

        prerequisites: [
            "Embedded C",
            "Microcontrollers"
        ]
    },


    {
        skillId: 10,

        skillName:
            "UART",

        currentLevel: 3,

        requiredLevel: 3,

        gap: 0,

        importance: 3,

        priorityScore: 0,

        priorityLevel: "MET",

        prerequisites: [
            "Digital Electronics"
        ]
    },


    {
        skillId: 5,

        skillName:
            "Git",

        currentLevel: 3,

        requiredLevel: 3,

        gap: 0,

        importance: 2,

        priorityScore: 0,

        priorityLevel: "MET",

        prerequisites: []

    }

];


// ============================================
// COMPANIES
// ============================================

const companies = [

    "NVIDIA",
    "Intel",
    "Qualcomm",
    "Texas Instruments",
    "NXP",
    "STMicroelectronics",
    "Bosch",
    "Renesas",
    "Samsung",
    "AMD"

];


// ============================================
// DOM
// ============================================

const roleGrid =
    document.getElementById(
        "roleGrid"
    );

const gapTable =
    document.getElementById(
        "gapTable"
    );

const prioritySkills =
    document.getElementById(
        "prioritySkills"
    );

const companyGrid =
    document.getElementById(
        "companyGrid"
    );


// ============================================
// RENDER ROLES
// ============================================

function renderRoles() {

    if (!roleGrid) return;


    roleGrid.innerHTML = "";


    roles.forEach(
        (role, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "role-card" +
                (
                    index === 0
                        ? " selected"
                        : ""
                );


            card.dataset.roleId =
                role.id;


            card.innerHTML = `

                <span class="badge ${
                    index === 0
                        ? "badge-success"
                        : "badge-warning"
                }">

                    ${
                        index === 0
                            ? "CURRENT MATCH"
                            : "POTENTIAL"
                    }

                </span>


                <h3>
                    ${role.name}
                </h3>


                <div class="readiness">
                    ${role.score}%
                </div>


                <small>
                    Current Readiness
                </small>


                <div class="gap-list">

                    Top gaps:

                    <br>

                    ${role.gaps.join(" · ")}

                </div>


                <button
                    class="btn ${
                        index === 0
                            ? "btn-primary"
                            : "btn-secondary"
                    }"
                >
                    Analyze Role
                </button>

            `;


            card
                .querySelector("button")
                .addEventListener(
                    "click",
                    () =>
                        selectRole(
                            role.id,
                            card
                        )
                );


            roleGrid.appendChild(card);

        }
    );

}


// ============================================
// SELECT ROLE
// ============================================

function selectRole(
    roleId,
    card
) {

    const role =
        roles.find(
            item =>
                item.id === roleId
        );


    if (!role) return;


    selectedRoleId =
        role.id;


    selectedRoleName =
        role.name;


    sessionStorage.setItem(
        "selectedRoleId",
        role.id
    );


    sessionStorage.setItem(
        "selectedRoleName",
        role.name
    );


    document
        .querySelectorAll(".role-card")
        .forEach(
            item =>
                item.classList.remove(
                    "selected"
                )
        );


    card.classList.add(
        "selected"
    );


    const selectedRoleNameElement =
        document.getElementById(
            "selectedRoleName"
        );


    if (selectedRoleNameElement) {

        selectedRoleNameElement.textContent =
            role.name;

    }


    renderGapTable();

}


// ============================================
// GAP TABLE
// ============================================

function renderGapTable() {

    if (!gapTable) return;


    gapTable.innerHTML = "";


    gaps.forEach(
        gap => {

            const row =
                document.createElement(
                    "tr"
                );


            row.style.cursor =
                "pointer";


            row.innerHTML = `

                <td>

                    <strong>
                        ${gap.skillName}
                    </strong>

                </td>


                <td>
                    ${gap.currentLevel}/5
                </td>


                <td>
                    ${gap.requiredLevel}/5
                </td>


                <td>
                    ${gap.gap}
                </td>


                <td>

                    <span class="badge ${
                        gap.gap === 0
                            ? "badge-success"
                            : gap.priorityLevel === "HIGH"
                                ? "badge-danger"
                                : "badge-warning"
                    }">

                        ${
                            gap.gap === 0
                                ? "MET"
                                : gap.priorityLevel
                        }

                    </span>

                </td>

            `;


            row.addEventListener(
                "click",
                () =>
                    showGap(
                        gap.skillId
                    )
            );


            gapTable.appendChild(
                row
            );

        }
    );

}


// ============================================
// PRIORITY SKILLS
// ============================================

function renderPrioritySkills() {

    if (!prioritySkills) return;


    const priorityData =
        gaps
            .filter(
                gap =>
                    gap.gap > 0
            )
            .sort(
                (a, b) =>
                    b.priorityScore -
                    a.priorityScore
            );


    prioritySkills.innerHTML =
        "";


    priorityData.forEach(
        (gap, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "priority-item";


            item.innerHTML = `

                <strong>
                    ${String(
                        index + 1
                    ).padStart(2, "0")}
                    ·
                    ${gap.skillName}
                </strong>


                <small>
                    Gap: ${gap.gap}
                    ·
                    Importance: ${gap.importance}/5
                    ·
                    Priority Score:
                    ${gap.priorityScore}
                </small>


                <br>


                <span class="badge badge-danger">
                    ${gap.priorityLevel}
                </span>

            `;


            prioritySkills.appendChild(
                item
            );

        }
    );

}


// ============================================
// SHOW GAP DETAILS
// ============================================

function showGap(skillId) {

    const gap =
        gaps.find(
            item =>
                item.skillId === skillId
        );


    if (!gap) return;


    const skill =
        document.getElementById(
            "detailSkill"
        );


    const current =
        document.getElementById(
            "detailCurrent"
        );


    const required =
        document.getElementById(
            "detailRequired"
        );


    const gapValue =
        document.getElementById(
            "detailGap"
        );


    const importance =
        document.getElementById(
            "detailImportance"
        );


    const reason =
        document.getElementById(
            "detailReason"
        );


    if (skill)
        skill.textContent =
            gap.skillName;


    if (current)
        current.textContent =
            `${gap.currentLevel}/5`;


    if (required)
        required.textContent =
            `${gap.requiredLevel}/5`;


    if (gapValue)
        gapValue.textContent =
            gap.gap;


    if (importance)
        importance.textContent =
            gap.priorityLevel;


    if (reason) {

        if (gap.gap === 0) {

            reason.textContent =
                "This competency already meets the selected role requirement.";

        } else {

            reason.textContent =
                `This skill has a gap of ${gap.gap} levels, `
                +
                `importance ${gap.importance}/5, `
                +
                `and dependency impact on other skills.`;

        }

    }

}


// ============================================
// WHAT-IF SIMULATOR
// ============================================

const simulateButton =
    document.getElementById(
        "simulateBtn"
    );


if (simulateButton) {

    simulateButton.addEventListener(
        "click",
        runSimulation
    );

}


function runSimulation() {

    const skill =
        document.getElementById(
            "simSkill"
        ).value;


    const newLevel =
        Number(
            document.getElementById(
                "simLevel"
            ).value
        );


    const result =
        document.getElementById(
            "simulationResult"
        );


    const currentGap =
        gaps.find(
            item =>
                item.skillName === skill
        );


    const currentLevel =
        currentGap
            ? currentGap.currentLevel
            : 1;


    const beforeReadiness =
        52;


    const improvement =
        Math.max(
            0,
            newLevel -
            currentLevel
        );


    const increase =
        improvement * 4.5;


    const afterReadiness =
        Math.min(
            100,
            beforeReadiness +
            increase
        );


    result.classList.remove(
        "hidden"
    );


    result.innerHTML = `

        <div>

            <strong>
                ${skill}
            </strong>

        </div>


        <p>

            Before readiness:
            <strong>
                ${beforeReadiness}%
            </strong>

            →

            After:
            <strong>
                ${afterReadiness.toFixed(0)}%
            </strong>

        </p>


        <strong>
            Improvement:
            +${(
                afterReadiness -
                beforeReadiness
            ).toFixed(0)}%
        </strong>

    `;

}


// ============================================
// COMPANY CARDS
// ============================================

function renderCompanies() {

    if (!companyGrid) return;


    companyGrid.innerHTML = "";


    companies.forEach(
        company => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "company";


            card.textContent =
                company;


            companyGrid.appendChild(
                card
            );

        }
    );

}


// ============================================
// INIT
// ============================================

renderRoles();

renderGapTable();

renderPrioritySkills();

renderCompanies();


// Default first gap
showGap(8);