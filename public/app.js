document.addEventListener("DOMContentLoaded", () => {

    // LOGIN
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document
                .getElementById("username")
                .value
                .trim();

            const password = document
                .getElementById("password")
                .value;

            if (!username) {
                alert("Please enter your name.");
                return;
            }

            if (!password) {
                alert("Please enter your password.");
                return;
            }

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

                if (!response.ok) {
                    alert(data.message);
                    return;
                }

                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userBalance", data.user.balance);

                window.location.href = "dashboard.html";

            } catch (error) {
                console.error(error);
                alert("Unable to connect to the server.");
            }
        });
    }


    // USER NAME
    const userName =
        localStorage.getItem("userName") || "User";

    document.querySelectorAll(".user-name").forEach(element => {
        element.textContent = userName;
    });


    // WELCOME MESSAGE
    const welcomeMessage =
        document.getElementById("welcomeMessage");

    if (welcomeMessage) {
        welcomeMessage.textContent =
            `Welcome ${userName}`;
    }


    // BALANCE
    const savedBalance =
        localStorage.getItem("userBalance") || "150000";

    const balance =
        Number(savedBalance);

    document.querySelectorAll(".account-balance").forEach(element => {
        element.textContent =
            `$${balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
    });


    // AVATAR
    const avatar =
        document.getElementById("userAvatar");

    if (avatar) {
        const initials = userName
            .split(" ")
            .map(name => name[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

        avatar.textContent = initials;
    }


    // LOGOUT
    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("userName");
            localStorage.removeItem("userBalance");

            window.location.href = "index.html";
        });
    }

    // ==============================
    // QUICK MENU
    // ==============================

    const menuButton =
        document.getElementById("menuButton");

    const quickMenu =
        document.getElementById("quickMenu");

    if (menuButton && quickMenu) {

        menuButton.addEventListener("click", (event) => {

            event.stopPropagation();

            quickMenu.classList.toggle("show");

        });

    }


    // ==============================
    // ACCOUNT SECTION
    // ==============================

    const accountSection =
        document.getElementById("accountSection");

    if (accountSection && quickMenu) {

        accountSection.addEventListener("click", () => {

            quickMenu.classList.toggle("show");

        });

    }


    // ==============================
    // CONTACT SUPPORT
    // ==============================

    const supportButton =
        document.getElementById("supportButton");

    const supportOverlay =
        document.getElementById("supportOverlay");

    if (supportButton && supportOverlay) {

        supportButton.addEventListener("click", () => {

            supportOverlay.classList.add("show");

            quickMenu.classList.remove("show");

        });

    }


    // ==============================
    // CLOSE SUPPORT
    // ==============================

    const closeSupport =
        document.getElementById("closeSupport");

    const supportCloseButton =
        document.getElementById("supportCloseButton");

    if (closeSupport && supportOverlay) {

        closeSupport.addEventListener("click", () => {

            supportOverlay.classList.remove("show");

        });

    }

    if (supportCloseButton && supportOverlay) {

        supportCloseButton.addEventListener("click", () => {

            supportOverlay.classList.remove("show");

        });

    }


    // ==============================
    // BIND CARD
    // ==============================

    const bindCardButton =
        document.getElementById("bindCardButton");

    if (bindCardButton) {

        bindCardButton.addEventListener("click", () => {

            quickMenu.classList.remove("show");

            const registration =
                document.querySelector(".registration-card");

            if (registration) {

                registration.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

       // ==========================================
// TOP RIGHT MENU
// ==========================================

const menuButton =
    document.getElementById("menuButton");

const topMenu =
    document.getElementById("topMenu");

if (menuButton && topMenu) {

    menuButton.addEventListener("click", (event) => {

        event.stopPropagation();

        topMenu.classList.toggle("show");

    });

}


// ==========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click", (event) => {

    if (
        topMenu &&
        !topMenu.contains(event.target) &&
        event.target !== menuButton
    ) {

        topMenu.classList.remove("show");

    }

});


// ==========================================
// CONTACT CUSTOMER SUPPORT
// ==========================================

const supportButton =
    document.getElementById("supportButton");

if (supportButton) {

    supportButton.addEventListener("click", () => {

        topMenu.classList.remove("show");

        alert(
            "Customer Support\n\n" +
            "Welcome to greendot bank Support.\n\n" +
            "Please use the support options provided by this application."
        );

    });

}


// ==========================================
// BIND CARD
// ==========================================

const bindCardButton =
    document.getElementById("bindCardButton");

if (bindCardButton) {

    bindCardButton.addEventListener("click", () => {

        topMenu.classList.remove("show");

        const cardRegistration =
            document.getElementById("cardRegistration");

        if (cardRegistration) {

            cardRegistration.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

} });

    }});