// ============================================
// SkillPath AI - Roadmap
// ============================================


// ============================================
// ROADMAP DATA
// ============================================

const roadmapData = {

    targetRoleId: 1,

    targetRoleName:
        "Firmware Engineer",

    totalDays: 90,

    dailyTechnicalHours: 4,

    dailyCommunicationHours: 1,

    dailyAptitudeHours: 1,

    milestones: [],

    days: []

};


// ============================================
// ROADMAP PHASES
// ============================================

const phases = [

    {
        id: 1,

        name:
            "Foundation",

        range:
            "Day 1–15",

        topics: [
            "C Fundamentals",
            "Variables & Data Types",
            "Loops & Conditions",
            "Functions",
            "Pointers"
        ]
    },


    {
        id: 2,

        name:
            "Embedded Programming",

        range:
            "Day 16–35",

        topics: [
            "Embedded C",
            "Memory",
            "Microcontroller Architecture",
            "GPIO",
            "Timers"
        ]
    },


    {
        id: 3,

        name:
            "Communication Protocols",

        range:
            "Day 36–55",

        topics: [
            "UART",
            "SPI",
            "I2C",
            "CAN",
            "Sensor Interfacing"
        ]
    },


    {
        id: 4,

        name:
            "Advanced Embedded",

        range:
            "Day 56–75",

        topics: [
            "Interrupts",
            "Timers",
            "RTOS",
            "Task Scheduling",
            "Debugging"
        ]
    },


    {
        id: 5,

        name:
            "Projects & Interview",

        range:
            "Day 76–90",

        topics: [
            "Embedded Project",
            "Git & GitHub",
            "Resume Project",
            "Technical Presentation",
            "Interview Preparation"
        ]
    }

];


// ============================================
// DOM
// ============================================

const roadmapTimeline =
    document.getElementById(
        "roadmapTimeline"
    );


// ============================================
// RENDER ROADMAP
// ============================================

function renderRoadmap() {

    if (!roadmapTimeline)
        return;


    roadmapTimeline.innerHTML = "";


    phases.forEach(
        (phase, phaseIndex) => {

            const milestone =
                document.createElement(
                    "section"
                );


            milestone.className =
                "milestone card";


            const isFirstPhase =
                phaseIndex === 0;


            milestone.innerHTML = `

                <div class="milestone-header">

                    <div>

                        <span class="eyebrow">
                            PHASE ${
                                phaseIndex + 1
                            }
                        </span>

                        <h2>
                            ${phase.name}
                        </h2>

                        <small class="muted">
                            ${phase.range}
                        </small>

                    </div>


                    <span class="badge ${
                        isFirstPhase
                            ? "badge-success"
                            : "badge-warning"
                    }">

                        ${
                            isFirstPhase
                                ? "IN PROGRESS"
                                : "UPCOMING"
                        }

                    </span>

                </div>


                <div
                    class="day-grid"
                >

                    ${
                        phase.topics
                            .map(
                                (
                                    topic,
                                    topicIndex
                                ) => {

                                    const dayNumber =
                                        (
                                            phaseIndex
                                            * 15
                                        )
                                        +
                                        topicIndex
                                        +
                                        1;


                                    const completed =
                                        dayNumber === 1;


                                    return `

                                        <div
                                            class="day-card ${
                                                completed
                                                    ? "completed"
                                                    : ""
                                            }"
                                        >

                                            <strong>
                                                Day ${dayNumber}
                                            </strong>


                                            <div class="activity">
                                                Technical ·
                                                ${topic}
                                            </div>


                                            <div class="activity">
                                                Communication ·
                                                Explain the concept
                                            </div>


                                            <div class="activity">
                                                Aptitude ·
                                                10 practice problems
                                            </div>


                                            <button
                                                class="btn btn-secondary day-complete-btn"
                                                ${
                                                    completed
                                                        ? "disabled"
                                                        : ""
                                                }
                                            >

                                                ${
                                                    completed
                                                        ? "✓ Completed"
                                                        : "Mark Day Complete"
                                                }

                                            </button>

                                        </div>

                                    `;

                                }
                            )
                            .join("")
                    }

                </div>

            `;


            roadmapTimeline.appendChild(
                milestone
            );

        }
    );


    attachDayButtons();

}


// ============================================
// DAY COMPLETION
// ============================================

function attachDayButtons() {

    document
        .querySelectorAll(
            ".day-complete-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const card =
                            button.closest(
                                ".day-card"
                            );


                        card.classList.add(
                            "completed"
                        );


                        button.disabled =
                            true;


                        button.textContent =
                            "✓ Completed";


                        showToast(
                            "Day completed! Keep going 🔥",
                            "success"
                        );

                    }
                );

            }
        );

}


// ============================================
// INIT
// ============================================

renderRoadmap();