document.addEventListener("DOMContentLoaded", init);
const menuContainer = document.getElementById("burger-menu");
const orderContainer = document.getElementById("order-list");
const formContainer = document.getElementById("custom-burger");
let burgersArray = [];
let foundBurger = null;

function init() {
  fetchBurgers();

  menuContainer.addEventListener("click", e => {
    e.preventDefault();
    switch (e.target.dataset.action) {
      case "add":
        // find values
        foundBurger = burgersArray.find(
          burger => burger.id === parseInt(e.target.dataset.id)
        );
        // block to insert
        const orderItem = `
          <ul data-id=${e.target.dataset.id}>
            <li data-id=${e.target.dataset.id}>${foundBurger.name}</li>
          </ul>
          `;
        // insert
        orderContainer.insertAdjacentHTML("afterbegin", orderItem);
        break;
      default:
        break;
    }
    console.log(e.target);
  });

  formContainer.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e.target);

    let burger = {
      name: `${e.target.name.value}`,
      description: `${e.target.description.value}`,
      image: `${e.target.url.value}`
    };
    debugger;
    fetch("http://localhost:3000/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(burger)
    })
      .then(res => res.json())
      .then(res => fetchBurgers(res))
      .catch(console.log);
  });
}

function fetchBurgers() {
  fetch("http://localhost:3000/burgers")
    .then(resp => resp.json())
    .then(data => {
      burgersArray = data;
      data.forEach(function(e) {
        const card = `
           <div class="burger">
            <h3 class="burger_title">${e.name}</h3>
              <img src=${e.image}>
               <p class="burger_description">${e.description}</p>
            <button data-id=${e.id} class="button" data-action="add">Add to Order</button>
           </div>`;
        menuContainer.insertAdjacentHTML("afterbegin", card);
      });
    });
}
