try {
    const response = await fetch(`http://localhost:5678/api/works`);
    let works = await response.json();
    // console.log(works[1]);

    if (response.ok) {
        console.log('Promise resolved and HTTP status is successful');
        generateWork(works);
        const buttonObjects = document.querySelector(".Objets");
        console.log(buttonObjects)
        buttonObjects.addEventListener('click', function() {
            const filteredWorks = works.filter(function(work) {
                return work.category.name = "Objets"
            })
            console.log(filteredWorks);
            document.querySelector("gallery").innerHTML = "";
            generateWork(filteredWorks);
        })
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
  } catch (error) {
    console.error('Fetch', error);
    // Output e.g.: "Fetch Error: 404, Not found"
}

function generateWork(works) {
    for ( let i = 0 ; i < works.length ; i++) {
        const article = works[i];
        const galleryDiv = document.querySelector(".gallery");
        const figureCreation = document.createElement("figure");
        const imgCreation = document.createElement("img");
        imgCreation.src = article.imageUrl;
        const figCaptionCreation = document.createElement("figcation");
        figCaptionCreation.innerText = article.title;

        galleryDiv.appendChild(figureCreation);
        figureCreation.appendChild(imgCreation);
        figureCreation.appendChild(figCaptionCreation);
    }
}

try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    // console.log(categories[1]);

    if (response.ok) {
        console.log('Promise resolved and HTTP status is successful');
        generateCategories(categories)
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
} catch(error) {
    console.error('fetch', error);
}

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
    }
}

// const buttonObjects = document.querySelector(".Objets");
// buttonObjects.addEventListener("click", function() {
//     const filteredWorks = works.filter(function(work) {
//         return work.category.name = "Objets"
//     })
//     console.log(filteredWorks);
//     generateWork(filteredWorks);
// })