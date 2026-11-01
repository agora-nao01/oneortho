
const API = "https://conscious-roommates-exclusively-manufacturer.trycloudflare.com/api/pick";

const number = document.getElementById("number");
const status = document.getElementById("status");
const responses = document.getElementById("responses");
const button = document.getElementById("request");

async function request() {
    button.disabled = true;
    number.textContent = "...";
    status.textContent = "Requesting...";

    try {
        const response = await fetch(API, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("API error: " + response.status);
        }

        const data = await response.json();

        if (data.response !== 1 && data.response !== 2) {
            throw new Error("Invalid response");
        }

        number.textContent = data.response;
        status.textContent = "Response received!";

        const item = document.createElement("div");
        item.className = "response";
        item.textContent = "Response: " + data.response;

        responses.prepend(item);

    } catch (error) {
        number.textContent = "?";
        status.textContent = "Connection failed";
        console.error(error);

    } finally {
        button.disabled = false;
    }
}

button.addEventListener("click", request);

// Automatic request on page load
request();
