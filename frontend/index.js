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
    const addingModalselect = document.getElementById("categorie");
    buttonAllWorks.innerText = "Tous";
    buttonAllWorks.className = "allTheWorks";
    filtresDiv.appendChild(buttonAllWorks);

    for ( let i = 0 ; i < categories.length ; i++ ){
        const category = categories[i];
        // Category display button
        const buttonFiltres = document.createElement("button");
        buttonFiltres.innerText = category.name;
        buttonFiltres.className = `category${category.id}`
        filtresDiv.appendChild(buttonFiltres);
        // Category display select
        const newOption = new Option(`${category.name}`,`${category.id}`);
        addingModalselect.options[addingModalselect.options.length] = newOption;
        addingModalselect.addEventListener('change', (e) => {
            console.log(e.target.value);
        })
    };
};

// const formElement = document.querySelector("form");
// const formData = new FormData(formElement);
// console.log(formElement);
// console.log(formData);

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
async function deleteWork() {
    const trashs = document.querySelectorAll(".update-view .fa-trash-can");
    trashs.forEach((trash) => {
        trash.addEventListener("click", async () => {
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
            try {
                const response = await fetch("http://localhost:5678/api/works/" + id, init)
                if (!response.ok) {
                    console.log("impossible de supprimer !!");
                }
                if (response.ok) {
                    console.log("Le projet est été supprimé avec succès");
                    const works = await fetchWorks();
                    console.log(works);
                    document.querySelector('.update-view').innerHTML = "";
                    document.querySelector(".gallery").innerHTML = "";
                    generateWork(works);
                    updateViewWorks(works);
                    closeModal();
                }
            }
            catch(error) {
                console.log(error);
            };
        });
    });
}

// Fermeture de la modale
const modaleGlobale = document.querySelector(".modale");
const closeModal = function () {
    modaleGlobale.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
    // IMG
    const fileInput = document.getElementById("avatar");
    const pictureFileContent = document.querySelector(".photo-file");
    // FORM
    const form = document.querySelector("#addingModal form");
    const title = document.getElementById("titre");
    const category = document.getElementById("categorie");
    const errorMessage = document.querySelector(".erreur");
    const formValidationButton = document.getElementById("btn-valider");

    function displayImg() {
        const image = this.files[0];
        console.log(image);
        if (image.size < 4 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgUrl = reader.result;
                console.log(imgUrl);
                const img = document.createElement("img");
                img.src = imgUrl;
                pictureFileContent.appendChild(img);
              };
            reader.readAsDataURL(image);
        } else {
            console.log("Size of the picture is too big");
        }
    }

    fileInput.addEventListener("change", displayImg);

    // FORM VALIDATION
    form.addEventListener("input", function () {
        if (title.value !== "" && category.value !== "" && fileInput.value !== "") {
          formValidationButton.disabled = false;
          formValidationButton.classList.add("btnValid");
          errorMessage.textContent = "";
        } else {
          errorMessage.textContent =
            "Veuillez remplir tous les champs du formulaire.";
          formValidationButton.classList.remove("btnValid");
          formValidationButton.disabled = true;
        }
    });

    // ENVOI DES DONNEES
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", category.value);
        formData.append("image", fileInput.files[0]);
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: formData,
            })
            .then(function(response) {
                if (response.ok) {
                    fetchWorks();
                    const myPicture = pictureFileContent.querySelector("img");
                    myPicture.remove();
                    formValidationButton.classList.remove("btnValid");
                    formValidationButton.disabled = true;
                    form.reset();
                    closeModal();
                    document.querySelector('.gallery').innerHTML = "";
                    init();
                } else {
                    console.log("Ajout projet failed");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    );
})

init();