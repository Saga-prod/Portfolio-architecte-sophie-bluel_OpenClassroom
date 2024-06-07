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
        // buttonFiltres.classList.add(category.name);
        buttonFiltres.className = category.name;

        filtresDiv.appendChild(buttonFiltres);
    };
};

async function init() {
    let works = await fetchWorks();
    const categories = await fetchCategory();
    // console.log(works[0].category.id);
    // console.log(works[1].category.id);
    // console.log(works[2].category.id);
    // console.log(works[3].category.id);
    // console.log(works[4].category.id);
    // console.log(works[5].category.id);
    // console.log(works[6].category.id);

    generateWork(works);
    generateCategories(categories)
    const buttonObjects = document.querySelector(".Objets");
    objectsEventListener(buttonObjects, works);
    // buttonObjects.addEventListener('click', function(){
    //     let filteredWorks = works.filter(function(work) {
    //         // return work.category['name'] = ['Objets'];
    //         return work.id = 1;
    //     });
    //     document.querySelector('.gallery').innerHTML = "";
    //     generateWork(filteredWorks);
    //     console.log(filteredWorks);
    // });
};

function objectsEventListener(button, works) {
    button.addEventListener('click', function() {
        const filteredWorks = works.filter(function(work){
            return work.category.id = 2;
        })
        document.querySelector('.gallery').innerHTML = "";
        console.log(filteredWorks);
        generateWork(filteredWorks);
    })
}

init();