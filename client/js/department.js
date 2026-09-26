// ============================================
// Department Selection
// ============================================

const departments = [

    {
        id: 1,
        name: "Computer Science & Engineering",
        short: "CSE"
    },

    {
        id: 2,
        name: "Information Technology",
        short: "IT"
    },

    {
        id: 3,
        name: "Artificial Intelligence & Data Science",
        short: "AI & DS"
    },

    {
        id: 4,
        name: "Electronics & Communication Engineering",
        short: "ECE"
    },

    {
        id: 5,
        name: "Electrical & Electronics Engineering",
        short: "EEE"
    },

    {
        id: 6,
        name: "VLSI / Microelectronics",
        short: "VLSI"
    },

    {
        id: 7,
        name: "Mechanical Engineering",
        short: "MECH"
    },

    {
        id: 8,
        name: "Mechatronics Engineering",
        short: "Mechatronics"
    },

    {
        id: 9,
        name: "Robotics & Automation",
        short: "Robotics"
    },

    {
        id: 10,
        name: "Biomedical Engineering",
        short: "Biomedical"
    },

    {
        id: 11,
        name: "Aerospace Engineering",
        short: "Aerospace"
    },

    {
        id: 12,
        name: "Computer Science",
        short: "CS"
    }

];


// ============================================
// DOM
// ============================================

const departmentGrid =
    document.getElementById("departmentGrid");

const continueBtn =
    document.getElementById("continueBtn");


// ============================================
// RENDER DEPARTMENTS
// ============================================

function renderDepartments() {

    if (!departmentGrid) return;

    departmentGrid.innerHTML = "";


    departments.forEach(
        department => {

            const card =
                document.createElement("div");

            card.className =
                "department-card";


            card.dataset.departmentId =
                department.id;

            card.dataset.departmentName =
                department.name;


            card.innerHTML = `

                <h3>
                    ${department.name}
                </h3>

                <p>
                    ${department.short}
                </p>

            `;


            card.addEventListener(
                "click",
                () => selectDepartment(
                    department,
                    card
                )
            );


            departmentGrid.appendChild(card);

        }
    );
}


// ============================================
// SELECT DEPARTMENT
// ============================================

function selectDepartment(
    department,
    card
) {

    document
        .querySelectorAll(".department-card")
        .forEach(item => {

            item.classList.remove("selected");

        });


    card.classList.add("selected");


    selectedDepartmentId =
        department.id;

    selectedDepartmentName =
        department.name;


    sessionStorage.setItem(
        "selectedDepartmentId",
        department.id
    );


    sessionStorage.setItem(
        "selectedDepartmentName",
        department.name
    );


    if (continueBtn) {

        continueBtn.disabled = false;

    }

}


// ============================================
// CONTINUE
// ============================================

if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        () => {

            if (!selectedDepartmentId) {

                showToast(
                    "Please select a department first.",
                    "error"
                );

                return;

            }


            window.location.href =
                "skills.html";

        }
    );

}


// ============================================
// INIT
// ============================================

renderDepartments();