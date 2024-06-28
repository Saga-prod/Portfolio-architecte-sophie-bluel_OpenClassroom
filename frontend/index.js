async function fetchWorks() {
    try {
        const response = await fetch(`http://localhost:5678/api/works`);
    
        if (response.ok) {
            console.log('Promise resolved and HTTP status is successful');
        } else {
            switch(response.status){
                case 404 :
                    throw new Error('404, Not found');
                    break;
                case 500 :
                    throw new Error('500, internal server error');
                    break;
                default :
                    throw new Error(response.status);
                    break;
            }
        }
        const works = await response.json();
        return works;
      } catch (error) {
        console.error('Fetch', error);
    };
};

async function fetchCategory() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
    
        if (response.ok) {
            console.log('Promise resolved and HTTP status is successful');
        } else {
            switch(response.status) {
                case 404 :
                    throw new Error('404, Not found');
                    break;
                case 500 :
                    throw new Error('500, internal server error');
                    break;
                default :
                    throw new Error(response.status);
                    break;
            }
        }
        const categories = await response.json();
        return categories;
    } catch(error) {
        console.error('fetch', error);
    };
};

function generateWork(works) {
    for ( let i = 0 ; i < works.length ; i++) {
        const article = works[i];
        document.querySelector(".gallery").innerHTML += 
        `<figure>
            <img src=${article.imageUrl}>
            <figcaption>${article.title}</figcaption>
        </figure
        `;
    };
};

// Création des boutons pour les categories
function generateCategories(categories) {
    const filtresDiv = document.querySelector(".filtres");
    const buttonAllWorks = document.createElement("button");
    buttonAllWorks.innerText = "Tous";
    buttonAllWorks.className = "allTheWorks";
    filtresDiv.appendChild(buttonAllWorks);

    for ( let i = 0 ; i < categories.length ; i++ ){
        const category = categories[i];
        const buttonFiltres = document.createElement("button");
        buttonFiltres.innerText = category.name;
        buttonFiltres.className = `category${category.id}`

        filtresDiv.appendChild(buttonFiltres);
    };
};

async function init() {
    const works = await fetchWorks();
    const categories = await fetchCategory();

    generateWork(works);
    generateCategories(categories) // On lui donne un argument
    const buttonAllWorks = document.querySelector(".allTheWorks"),
          buttonObjects = document.querySelector(".category1"),
          buttonFlats = document.querySelector(".category2"),
          buttonHandR = document.querySelector(".category3");
    allWorks(buttonAllWorks, works);
    objectsFilter(buttonObjects, works);
    flatsFilter(buttonFlats, works);
    HandRFilter(buttonHandR, works);
    updateViewWorks(works);
    deleteWork()
};

// Creation des filtres par catégories
function allWorks(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work) {
            return work;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function objectsFilter(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 1;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function flatsFilter(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 2;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function HandRFilter(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 3;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}


//Affichage du mode edition

function EditionMode() {
    const adminMode = document.querySelector(".admin-mode");
    const modifiedTitle = document.querySelector(".modified-title");

    adminMode.innerHTML = 
    `
        <nav class="editModeText">
           <p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>
        </nav>
    `;
    modifiedTitle.innerHTML = 
    `
        <h2>Mes Projets</h2>
        <a href="#" data-target="#updateModal" data-toggle="modal"><i 
        class="fa-regular fa-pen-to-square"></i>modifier</a>
    `;
};
document.addEventListener("DOMContentLoaded", () => {
    if (window.localStorage.getItem("token") != null) {
        EditionMode();
        const navLogin = document.getElementById("nav-login");
        const filtresDiv = document.querySelector(".filtres");

        navLogin.textContent = "logout";
        filtresDiv.style.display = "none";
        navLogin.addEventListener("click", (e) => {
            e.preventDefault();
            window.localStorage.clear();
            window.location.reload();
        })
    }
})

//Affichage des travaux dans la modale Update
function updateViewWorks(works) {
    const updateViewGallery = document.querySelector('.update-view');
    updateViewGallery.innerHTML = "";

    works.forEach((work) => {
        const figure = document.createElement("figure"),
              img = document.createElement("img"),
              span = document.createElement("span"),
              poubelle = document.createElement("i");

        poubelle.classList.add("fa-solid", "fa-trash-can");
        poubelle.id = work.id;
        img.src = work.imageUrl;
        img.alt = work.title;
        span.appendChild(poubelle);
        figure.appendChild(span);
        figure.appendChild(img);

        updateViewGallery.appendChild(figure);
    })
}

// Suppression des travaux
function deleteWork() {
    const trashs = document.querySelectorAll(".update-view .fa-trash-can");
    trashs.forEach((trash) => {
        trash.addEventListener("click", () => {
            const id = trash.id;
            console.log(id);
            let token = localStorage.getItem("token");
            const init = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            };
            fetch("http://localhost:5678/api/works/" + id, init)
            .then((response) => {
                if (!response.ok) {
                    console.log("impossible de supprimer !!");
                }
                if (response.ok) {
                    console.log("Le projet est été supprimé avec succès"); // Ne s'affiche pas ?????????
                    const works = fetchWorks();
                    console.log(works);
                    generateWork(works);
                    init();
                    closeModal();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
    });
}

init();