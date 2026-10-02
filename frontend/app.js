const API_URL = "https://campus-lost-and-found-app-1.onrender.com/api";

let allItems = [];

async function register() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        document.getElementById("registerMessage").textContent =
            data.message;

    } catch (error) {
        console.error(error);

        document.getElementById("registerMessage").textContent =
            "Server connection failed";
    }
}


async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            document.getElementById("loginMessage").textContent =
                "Login successful!";

            await loadItems();

        } else {

            document.getElementById("loginMessage").textContent =
                data.message;
        }

    } catch (error) {

        console.error(error);

        document.getElementById("loginMessage").textContent =
            "Server connection failed";
    }
}


document.getElementById("itemForm").addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {

            document.getElementById("itemMessage").textContent =
                "Please login first.";

            return;
        }

        const formData = new FormData();

        formData.append(
            "title",
            document.getElementById("title").value.trim()
        );

        formData.append(
            "description",
            document.getElementById("description").value.trim()
        );

        formData.append(
            "type",
            document.getElementById("type").value
        );

        formData.append(
            "category",
            document.getElementById("category").value
        );

        formData.append(
            "location",
            document.getElementById("location").value.trim()
        );

        formData.append(
            "date",
            document.getElementById("date").value
        );

        const imageFile =
            document.getElementById("image").files[0];

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {

            const response = await fetch(`${API_URL}/items`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            document.getElementById("itemMessage").textContent =
                data.message;

            if (data.success) {

                document.getElementById("itemForm").reset();

                await loadItems();
            }

        } catch (error) {

            console.error(error);

            document.getElementById("itemMessage").textContent =
                "Unable to post item.";
        }
    }
);


async function loadItems() {

    try {

        const response = await fetch(`${API_URL}/items`);

        const data = await response.json();

        if (data.success) {

            allItems = data.items;

            filterItems();
        }

    } catch (error) {

        console.error(error);

        document.getElementById("itemsContainer").innerHTML =
            "<p>Unable to load items.</p>";
    }
}


function displayItems(items) {

    const container =
        document.getElementById("itemsContainer");

    if (items.length === 0) {

        container.innerHTML =
            "<p>No matching lost or found items available.</p>";

        return;
    }

    const currentUser =
        JSON.parse(localStorage.getItem("user") || "null");


    container.innerHTML = items.map(item => {

        const imageHTML = item.image

            ? `
                <img
                    src="${item.image}"
                    class="item-image"
                    alt="${item.title}"
                    loading="lazy"
                >
              `

            : `
                <div class="no-image">
                    No Image
                </div>
              `;


        let actionButtons = "";


        if (
            currentUser &&
            item.status === "active" &&
            item.postedBy?._id !== currentUser.id
        ) {

            actionButtons += `
                <button
                    class="claim-btn"
                    onclick="claimItem('${item._id}')">
                    Claim Item
                </button>
            `;
        }


        if (
            currentUser &&
            item.status === "active" &&
            item.postedBy?._id === currentUser.id
        ) {

            actionButtons += `
                <button
                    class="return-btn"
                    onclick="returnItem('${item._id}')">
                    Mark as Returned
                </button>
            `;
        }


        return `
            <div class="item-card">

                ${imageHTML}

                <span class="badge ${item.type}">
                    ${item.type.toUpperCase()}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${item.category}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${item.location}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${new Date(item.date).toLocaleDateString()}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${item.status}
                </p>

                <p>
                    <strong>Posted by:</strong>
                    ${item.postedBy?.name || "Student"}
                </p>

                ${
                    item.claimedBy
                        ? `
                            <p>
                                <strong>Claimed by:</strong>
                                ${item.claimedBy.name || "Student"}
                            </p>
                          `
                        : ""
                }

                <div class="item-actions">

                    <button
                        class="details-btn"
                        onclick="viewItem('${item._id}')">
                        View Details
                    </button>

                    ${actionButtons}

                </div>

            </div>
        `;

    }).join("");
}


function viewItem(itemId) {

    window.location.href =
        `item.html?id=${itemId}`;
}


async function claimItem(itemId) {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/items/${itemId}/claim`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            await loadItems();
        }

    } catch (error) {

        console.error(error);

        alert("Unable to claim item.");
    }
}


async function returnItem(itemId) {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/items/${itemId}/return`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            await loadItems();
        }

    } catch (error) {

        console.error(error);

        alert("Unable to mark item as returned.");
    }
}


function filterItems() {

    const searchElement =
        document.getElementById("search");

    const typeElement =
        document.getElementById("typeFilter");

    const categoryElement =
        document.getElementById("categoryFilter");

    const statusElement =
        document.getElementById("statusFilter");


    const search =
        searchElement
            ? searchElement.value.toLowerCase().trim()
            : "";

    const type =
        typeElement
            ? typeElement.value
            : "";

    const category =
        categoryElement
            ? categoryElement.value
            : "";

    const status =
        statusElement
            ? statusElement.value
            : "";


    const filtered = allItems.filter(item => {

        const title =
            (item.title || "").toLowerCase();

        const description =
            (item.description || "").toLowerCase();

        const itemCategory =
            (item.category || "").toLowerCase();

        const location =
            (item.location || "").toLowerCase();

        const itemType =
            (item.type || "").toLowerCase();

        const itemStatus =
            (item.status || "").toLowerCase();


        const matchesSearch =
            !search ||
            title.includes(search) ||
            description.includes(search) ||
            itemCategory.includes(search) ||
            location.includes(search);


        const matchesType =
            !type ||
            itemType === type.toLowerCase();


        const matchesCategory =
            !category ||
            item.category === category;


        const matchesStatus =
            !status ||
            itemStatus === status.toLowerCase();


        return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesStatus
        );

    });


    displayItems(filtered);
}


function clearFilters() {

    const search =
        document.getElementById("search");

    const type =
        document.getElementById("typeFilter");

    const category =
        document.getElementById("categoryFilter");

    const status =
        document.getElementById("statusFilter");


    if (search) search.value = "";

    if (type) type.value = "";

    if (category) category.value = "";

    if (status) status.value = "";


    displayItems(allItems);
}


function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged out successfully");

    location.reload();
}

// ================= GPS LOCATION =================

function getCurrentLocation() {

    const locationInput =
        document.getElementById("location");

    const locationMessage =
        document.getElementById("locationMessage");

    if (!navigator.geolocation) {

        locationMessage.textContent =
            "GPS is not supported by this browser.";

        return;
    }

    locationMessage.textContent =
        "Getting your current location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            locationInput.value =
                `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;

            locationMessage.textContent =
                "GPS location added successfully.";

        },

        function(error) {

            console.error(error);

            locationMessage.textContent =
                "Unable to get GPS location. Please allow location permission.";

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}
loadItems();