// ==========================================
// SPORTS DAY - CALLBACK PROJECT
// ==========================================


// ------------------------------------------
// DOM ELEMENTS
// ------------------------------------------

const startBtn = document.getElementById("startBtn");

const statusText = document.getElementById("statusText");
const statusIcon = document.getElementById("statusIcon");

const redScore = document.getElementById("redScore");
const blueScore = document.getElementById("blueScore");
const greenScore = document.getElementById("greenScore");
const yellowScore = document.getElementById("yellowScore");


// ------------------------------------------
// UPDATE SCOREBOARD
// ------------------------------------------

function updateScoreboard(scores) {

    redScore.textContent = scores.red;
    blueScore.textContent = scores.blue;
    greenScore.textContent = scores.green;
    yellowScore.textContent = scores.yellow;
}


// ------------------------------------------
// UPDATE STATUS
// ------------------------------------------

function updateStatus(icon, message) {

    statusIcon.textContent = icon;
    statusText.textContent = message;
}


// ------------------------------------------
// 1. OPENING CEREMONY
// ------------------------------------------

function OpeningCeremony(callback) {

    console.log("🏟️ Sports Day is about to begin!");

    updateStatus(
        "🏟️",
        "Opening Ceremony is starting..."
    );

    let count = 3;

    const countdown = setInterval(() => {

        console.log(`⏳ Starting in ${count}...`);

        updateStatus(
            "⏳",
            `Sports Day starting in ${count}...`
        );

        count--;

        if (count < 0) {

            clearInterval(countdown);

            console.log("🎉 Let the Sports Day begin!");

            // Initialize score object
            const scores = {
                red: 0,
                blue: 0,
                green: 0,
                yellow: 0
            };

            console.log("Initial Scores:", scores);

            updateScoreboard(scores);

            updateStatus(
                "🏃",
                "100M Race is starting..."
            );

            // Callback
            callback(scores);
        }

    }, 1000);
}


// ------------------------------------------
// 2. 100M RACE
// ------------------------------------------

function Race100M(scores, callback) {

    console.log("\n🏃 100M Race starting...");

    updateStatus(
        "🏃",
        "100M Race in progress..."
    );

    setTimeout(() => {

        // Random race times
        const times = {

            red: Math.random() * 5 + 10,

            blue: Math.random() * 5 + 10,

            green: Math.random() * 5 + 10,

            yellow: Math.random() * 5 + 10
        };


        console.log(
            "🏁 Race Times:",
            times
        );


        // Find fastest team
        const winner = Object.keys(times).reduce(
            (a, b) =>
                times[a] < times[b] ? a : b
        );


        // Save previous score
        const previousScore = scores[winner];


        // Award 50 points
        scores[winner] += 50;


        console.log(
            `🥇 ${winner.toUpperCase()} won the 100M race!`
        );

        console.log(
            "Previous Score:",
            previousScore
        );

        console.log(
            "Updated Score:",
            scores[winner]
        );

        console.log(
            "Current Scores:",
            scores
        );


        // Update UI
        updateScoreboard(scores);

        updateStatus(
            "🦘",
            `${winner.toUpperCase()} won the 100M Race! Long Jump starting...`
        );


        // Callback
        callback(scores);

    }, 3000);
}


// ------------------------------------------
// 3. LONG JUMP
// ------------------------------------------

function LongJump(scores, callback) {

    console.log("\n🦘 Long Jump starting...");

    updateStatus(
        "🦘",
        "Long Jump is in progress..."
    );


    setTimeout(() => {

        const colors = [
            "red",
            "blue",
            "green",
            "yellow"
        ];


        // Randomly select color
        const randomIndex =
            Math.floor(
                Math.random() * colors.length
            );


        const winner =
            colors[randomIndex];


        // Save previous score
        const previousScore =
            scores[winner];


        // Award 150 points
        scores[winner] += 150;


        console.log(
            `🎯 ${winner.toUpperCase()} won the Long Jump!`
        );


        console.log(
            "Previous Score:",
            previousScore
        );


        console.log(
            "Updated Score:",
            scores[winner]
        );


        console.log(
            "Current Scores:",
            scores
        );


        // Update UI
        updateScoreboard(scores);


        updateStatus(
            "🏆",
            `${winner.toUpperCase()} won the Long Jump!`
        );


        // Callback
        callback(scores);

    }, 2000);
}


// ------------------------------------------
// 4. HIGH JUMP
// ------------------------------------------

function HighJump(scores, callback) {

    console.log("\n🏆 High Jump starting...");

    updateStatus(
        "🏆",
        "High Jump is starting..."
    );


    setTimeout(() => {

        let color = prompt(
            "Enter the color that won the High Jump:\n\n" +
            "red\n" +
            "blue\n" +
            "green\n" +
            "yellow"
        );


        // No input
        if (
            color === null ||
            color.trim() === ""
        ) {

            console.log(
                "⚠️ No color entered."
            );

            updateStatus(
                "⚠️",
                "No High Jump winner entered."
            );

            callback(scores);

            return;
        }


        // Convert to lowercase
        color =
            color.trim().toLowerCase();


        const validColors = [
            "red",
            "blue",
            "green",
            "yellow"
        ];


        // Invalid input
        if (
            !validColors.includes(color)
        ) {

            console.log(
                "❌ Invalid color entered."
            );

            updateStatus(
                "❌",
                "Invalid color. No points awarded."
            );

            callback(scores);

            return;
        }


        // Previous score
        const previousScore =
            scores[color];


        // Award 100 points
        scores[color] += 100;


        console.log(
            `🥇 ${color.toUpperCase()} won the High Jump!`
        );


        console.log(
            "Previous Score:",
            previousScore
        );


        console.log(
            "Updated Score:",
            scores[color]
        );


        console.log(
            "Current Scores:",
            scores
        );


        // Update UI
        updateScoreboard(scores);


        updateStatus(
            "🎉",
            `${color.toUpperCase()} won the High Jump!`
        );


        // Callback
        callback(scores);

    }, 1000);
}


// ------------------------------------------
// 5. AWARD CEREMONY
// ------------------------------------------

function AwardCeremony(scores) {

    console.log(
        "\n================================"
    );

    console.log(
        "🏆 AWARD CEREMONY 🏆"
    );

    console.log(
        "================================"
    );


    console.log(
        "📊 FINAL SCORES:"
    );


    console.table(scores);


    // Convert object to array
    const ranking =
        Object.entries(scores)
            .sort(
                (a, b) => b[1] - a[1]
            );


    console.log("\n🏅 WINNERS:");


    // First place
    console.log(
        `🥇 1st Place: ${ranking[0][0].toUpperCase()} - ${ranking[0][1]} points`
    );


    // Second place
    console.log(
        `🥈 2nd Place: ${ranking[1][0].toUpperCase()} - ${ranking[1][1]} points`
    );


    // Third place
    console.log(
        `🥉 3rd Place: ${ranking[2][0].toUpperCase()} - ${ranking[2][1]} points`
    );


    // Fourth place
    console.log(
        `4️⃣ 4th Place: ${ranking[3][0].toUpperCase()} - ${ranking[3][1]} points`
    );


    // Display winner
    updateStatus(
        "🏆",
        `🏆 ${ranking[0][0].toUpperCase()} Team is the Champion!`
    );


    console.log(
        "\n🎉 Congratulations to all participants!"
    );
}


// ------------------------------------------
// START BUTTON
// ------------------------------------------

startBtn.addEventListener(
    "click",
    () => {

        // Prevent multiple clicks
        startBtn.disabled = true;

        startBtn.textContent =
            "🏃 Sports Day Running...";


        // Callback chain
        OpeningCeremony((scores) => {

            Race100M(scores, (scores) => {

                LongJump(scores, (scores) => {

                    HighJump(scores, (scores) => {

                        AwardCeremony(scores);

                        // Restore button
                        startBtn.disabled = false;

                        startBtn.textContent =
                            "🏆 Sports Day Completed";

                    });

                });

            });

        });

    }
);