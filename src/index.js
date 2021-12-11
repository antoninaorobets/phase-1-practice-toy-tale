let addToy = false;





document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    document.querySelector(".add-toy-form").addEventListener("submit", postToy)

  });


  fetch(' http://localhost:3000/toys')
    .then((resp) => resp.json())
    .then((data) = renderToys)
});


function renderToys(data) {
  const divCollection = document.querySelector('div#toy-collection')
  data.forEach(element => {divCollection.appendChild(createCard(element))})
}

function createCard(element) {
  const divCard = document.createElement('div.card');

  const h2 = document.createElement('h2');
  h2.textContent = element.name
  divCard.appendChild(h2)

  const img = document.createElement('img');
  img.src = element.image
  img.className = "toy-avatar"
  divCard.appendChild(img)

  const p = document.createElement('p');
  p.textContent = element.likes + " likes"
  divCard.appendChild(p)

  const button = document.createElement('button');
  button.className = "like-btn"
  button.id = element.id
  button.textContent = "Like ❤️"
  button.addEventListener('click', addLike)
  divCard.appendChild(button)

  return divCard;
}

function postToy(event) {
  event.preventDefault()
  event.target.reset()
  
  const name = event.target.querySelectorAll('.input-text')[0].value;
  const url =event.target.querySelectorAll('.input-text')[1].value;

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${name}`,
      "image": `${url}`,
      "likes": 0
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {

      console.log(object);
    })
    .catch(function (error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
    });
}


function addLike(event) {
  event.preventDefault()
 

  const numLikes = parseInt(event.target.parentNode.querySelector('p').textContent.split(" ")[0]) + 1
  

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": numLikes,
    })
  }).then(function (response) {
    return response.json();
  })
    .then(function (object) {   
      event.target.parentNode.querySelector('p').textContent = object.likes + " likes"
    })


}