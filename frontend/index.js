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
    let works = await fetchWorks();
    const categories = await fetchCategory();

    generateWork(works);
    generateCategories(categories)
    // const allTheButton = document.querySelectorAll("div.filtres button");
    const buttonAllWorks = document.querySelector(".allTheWorks");
    const buttonObjects = document.querySelector(".category1");
    const buttonFlats = document.querySelector(".category2");
    const buttonHandR = document.querySelector(".category3");
    allWorksEventListener(buttonAllWorks, works);
    objectsEventListener(buttonObjects, works);
    flatsEventListener(buttonFlats, works);
    HandREventListener(buttonHandR, works);
};

function allWorksEventListener(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work) {
            return work;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function objectsEventListener(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 1;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function flatsEventListener(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 2;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

function HandREventListener(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id === 3;
        })
        document.querySelector('.gallery').innerHTML = "";
        generateWork(filteredWorks);
    })
}

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
        <a href="#" data-target="#modale1" data-toggle="modal"><i 
        class="fa-regular fa-pen-to-square"></i>modifier</a>
    `;
};

// function EditionMode() {
//     const portfolio = document.getElementById("portfolio");
//     const portfolioTitle = document.getElementById("portfolio-title");
//     const editElement = document.createElement(`
//         <a href="#" data-target="#modale1" data-toggle="modal">
//             <i class="fa-regular fa-pen-to-square"></i>
//             modifier
//         </a>    
//     `);
//     portfolio.insertBefore(editElement, portfolioTitle.nextSibling);
// }

// Changement login/logout. Retrait des filtres.

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

init();