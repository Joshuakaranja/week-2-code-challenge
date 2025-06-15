const form = document.getElementById("guest-form");
const input = document.getElementById("names");
const rsvp = document.getElementById("rsvp");

let guestList = [];

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = input.value.trim();

  if (name === "") {
    alert("Please enter a name!");
    return;
  }

  if (guestList.length >= 10) {
    alert("Guest list is full. Only 10 allowed.");
    return;
  }

  // Add new guest as object
  const guest = {
    name: name,
    attending: rsvp.checked
  };

  guestList.push(guest);
  input.value = "";
  rsvp.checked = false;

  displayGuests();
});

function displayGuests() {
  let list = document.getElementById("guest-list");

  // If list doesn’t exist, create it
  if (!list) {
    list = document.createElement("ul");
    list.id = "guest-list";
    form.appendChild(list);
  }

  // Clear existing items
  list.innerHTML = "";

  guestList.forEach((guest, index) => {
    const li = document.createElement("li");

    // Display guest name and status
    const statusText = guest.attending ? "✅ Attending" : "❌ Not Attending";
    li.textContent = `${guest.name} - ${statusText} `;

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle RSVP";
    toggleBtn.style.marginLeft = "10px";
    toggleBtn.addEventListener("click", function() {
      guest.attending = !guest.attending;
      displayGuests(); // Refresh list
    });

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "5px";
    removeBtn.addEventListener("click", function() {
      guestList.splice(index, 1);
      displayGuests(); // Refresh list
    });

    li.appendChild(toggleBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}
