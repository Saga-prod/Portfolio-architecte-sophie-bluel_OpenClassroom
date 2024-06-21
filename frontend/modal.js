window.onload = () => {
    // On récupère les bouttons d'ouverture de modale
    const btnOuvertureModal = document.querySelectorAll("[data-toggle=modal]");
  
    for (let button of btnOuvertureModal) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
  
        //On recupère la data-target(celle quand click dessus)
        const target = this.dataset.target;
        console.log(target);
  
        //On recupère la  bonne modale celle quand on clique dessus
        let modal = document.querySelector(target);
        console.log(modal);
  
        const modale1 = document.getElementById("modale1");
        console.log(modale1);
        const modale2 = document.getElementById("modale2");
        const modaleGlobale = document.querySelector(".modale");

        modaleGlobale.style.display = "flex";
        if (modal === modale1) {
        modale2.style.display = "none";
        modale1.style.display = "block";
        }
        if (modal === modale2) {
        modale2.style.display = "block";
        modale1.style.display = "none";
        }
  
        // la fonction de fermeture de modale
        const closeModal = function () {
          modaleGlobale.style.display = "none";
        };
  
        //on gère la fermeture lors du clic sur la zone grise
        modaleGlobale.addEventListener("click", function () {
          closeModal();
        });
  
        window.addEventListener("keydown", function (e) {
          //-1-On clic sur la touche "echap" du clavier pour fermer la modale
          if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e);
          }
        });
      });
    }
  };