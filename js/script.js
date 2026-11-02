document.addEventListener("DOMContentLoaded", function () {
    // Animations d'apparition au défilement (désactivées si l'utilisateur préfère moins d'animations).
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
        revealItems.forEach(function (item) { revealObserver.observe(item); });
    } else {
        revealItems.forEach(function (item) { item.classList.add("is-visible"); });
    }

    const modal = document.getElementById("contactModal");
    const openButtons = document.querySelectorAll("[data-open-contact]");

    if (modal) {
        const closeButtons = modal.querySelectorAll("[data-close-contact]");
        const firstField = modal.querySelector('input[name="nom"]');

        function openContactModal() {
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("contact-modal-open");
            window.setTimeout(function () {
                if (firstField) firstField.focus();
            }, 50);
        }

        function closeContactModal() {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("contact-modal-open");
        }

        openButtons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                openContactModal();
            });
        });

        closeButtons.forEach(function (button) {
            button.addEventListener("click", closeContactModal);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
                closeContactModal();
            }
        });

        // Focus trap simple pour garder la navigation clavier dans la fenêtre.
        modal.addEventListener("keydown", function (event) {
            if (event.key !== "Tab" || !modal.classList.contains("is-open")) return;
            const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    const form = document.getElementById("contactRequestForm");
    if (!form) return;

    const submitButton = form.querySelector(".contact-submit");
    const status = document.getElementById("contactFormStatus");
    const timestamp = document.getElementById("contactFormTimestamp");
    if (timestamp) timestamp.value = String(Date.now());

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const honey = form.querySelector('[name="_honey"]');
        if (honey && honey.value.trim() !== "") return;

        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "ENVOI EN COURS...";
        status.textContent = "";
        status.className = "contact-form-status";

        const payload = Object.fromEntries(new FormData(form).entries());
        payload.rappel = document.getElementById("clientCallback").checked ? "Oui" : "Non";
        payload._replyto = payload.email || "";

        try {
            const response = await fetch("https://formsubmit.co/ajax/djalilyaker1@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            let result = {};
            try {
                result = await response.json();
            } catch (parseError) {
                throw new Error("Le service de messagerie a renvoyé une réponse inattendue.");
            }

            if (!response.ok || result.success === false || result.success === "false") {
                throw new Error(result.message || "L'envoi de la demande a échoué.");
            }

            status.textContent = "Votre demande a bien été envoyée. Merci pour votre confiance !";
            status.classList.add("is-success");
            form.reset();
            if (timestamp) timestamp.value = String(Date.now());
        } catch (error) {
            console.error("Erreur d'envoi du formulaire :", error);
            status.textContent = "Impossible d'envoyer votre demande pour le moment. Veuillez réessayer ou nous contacter par téléphone.";
            status.classList.add("is-error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});
