const bodyEl = document.querySelector("body");
const containerU = document.querySelector(".uncompleted");
const containerC = document.querySelector(".completed");
const btnL = document.querySelector(".btnLeft");
const btnR = document.querySelector(".btnRight");

const createCard = (title, completed, parent) => {
  const cardEl = document.createElement("div");
  cardEl.className = "app";
  const titleEl = document.createElement("h3");
  titleEl.textContent = title;
  const statusEl = document.createElement("span");
  statusEl.textContent = completed;
  cardEl.append(titleEl, statusEl);
  parent.appendChild(cardEl);
};

const appointments = [];
for (let i = 1; i <= 30; i++) {
  appointments.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
}

let request = appointments.map((url) => {
  return fetch(url).then((res) => res.json());
});

Promise.all(request).then((res) =>
  res?.map((appointment) => {
    if (!appointment) {
      console.log("Error: Appointment doesn't exist");
      return null;
    }

    return (
      createCard(
        appointment.title[0].toUpperCase() + appointment.title.slice(1),
        appointment.completed === "false",
        containerU
      ),
      createCard(
        appointment.title[0].toUpperCase() + appointment.title.slice(1),
        appointment.completed === "true",
        containerC
      )
    );
  })
);

btnL.addEventListener("click", function () {
  containerU.style.display = "none";
});

btnR.addEventListener("click", function () {
  containerU.style.display = "block";
  containerC.style.display = "block";
});
