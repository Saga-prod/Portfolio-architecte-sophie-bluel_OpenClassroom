function generateCategories(categories) {
    try {
        const response = fetch('http://localhost:5678/api/categories');
        const categories = response.json();
        console.log(categories[1]);
    
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