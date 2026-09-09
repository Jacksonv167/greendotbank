/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("loginMessage");

        message.textContent = "Signing in...";

        try {

            const response = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const data = await response.json();

            if (data.success) {

                // Store only demo session information
                sessionStorage.setItem(
                    "demoLoggedIn",
                    "true"
                );

                window.location.href = "/dashboard.html";

            } else {

                message.textContent = data.message;
                message.style.color = "red";

            }

        } catch (error) {

            message.textContent =
                "Unable to connect to the demo server.";

            message.style.color = "red";

        }

    });

}


/* =========================
   DASHBOARD
========================= */

const menuItems =
    document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const page =
            item.getAttribute("data-page");

        showPage(page);

    });

});


function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active-page");

    });


    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    menuItems.forEach(function(item) {

        item.classList.remove("active");

        if (
            item.getAttribute("data-page")
            === pageName
        ) {

            item.classList.add("active");

        }

    });


    const title =
        document.getElementById("pageTitle");

    if (title) {

        const titles = {

            dashboard: "Dashboard",

            account: "Account",

            transfers: "Transfers",

            "deposit-checks":
                "Deposit Checks",

            "bill-pay":
                "Bill Pay",

            "mobile-deposit":
                "Mobile Deposit",

            statements:
                "Statements",

            support:
                "Support"
        };

        title.textContent =
            titles[pageName] || "Dashboard";

    }


    // Close mobile sidebar
    const sidebar =
        document.getElementById("sidebar");

    if (sidebar) {

        sidebar.classList.remove("open");

    }

}


/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

if (menuButton) {

    menuButton.addEventListener("click", function() {

        const sidebar =
            document.getElementById("sidebar");

        sidebar.classList.toggle("open");

    });

}


/* =========================
   LOGOUT
========================= */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        sessionStorage.removeItem(
            "demoLoggedIn"
        );

        window.location.href = "/";

    });

}


/* =========================
   LOAD TRANSACTIONS
========================= */

async function loadTransactions() {

    const container =
        document.getElementById("transactions");

    if (!container) return;

    try {

        const response =
            await fetch("/api/transactions");

        const transactions =
            await response.json();

        container.innerHTML = "";

        transactions.forEach(function(transaction) {

            const row =
                document.createElement("div");

            row.className = "transaction";

            const amount =
                transaction.amount >= 0
                    ? `+$${transaction.amount.toFixed(2)}`
                    : `-$${Math.abs(transaction.amount).toFixed(2)}`;

            row.innerHTML = `
                <div>
                    <strong>
                        ${transaction.description}
                    </strong>

                    <small>
                        ${transaction.date}
                    </small>
                </div>

                <strong>
                    ${amount}
                </strong>
            `;

            container.appendChild(row);

        });

    } catch (error) {

        container.textContent =
            "Unable to load demo transactions.";

    }

}

loadTransactions();


/* =========================
   DEMO ACTION
========================= */

function demoAction(action) {

    alert(
        action +
        " is available in this demonstration."
    );

}