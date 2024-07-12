window.onload = () => {
    // On récupère les bouttons d'ouverture de modale
    const btnOuvertureModal = document.querySelectorAll("[data-toggle=modal]");
  
    for (let button of btnOuvertureModal) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
  
            //On recupère la data-target(celle quand click dessus)
            const target = this.dataset.target;
            // console.log(target);
  
            //On recupère la bonne modale celle quand on clique dessus
            let modal = document.querySelector(target);
            // console.log(modal);
  
            const updateModal = document.getElementById("updateModal");
            // console.log(updateModal);
            const addingModal = document.getElementById("addingModal");
            const modaleGlobale = document.querySelector(".modale");

            modaleGlobale.style.display = "flex";
            if (modal === updateModal) {
                addingModal.style.display = "none";
                updateModal.style.display = "block";
            }
            if (modal === addingModal) {
                addingModal.style.display = "block";
                updateModal.style.display = "none";
            }

            const modaleClose = document.querySelectorAll("[data-dismiss=dialog");
            for (let close of modaleClose) {
                close.addEventListener("click", () => {
                    closeModal();
                });
            }
            //On recupère le bouton de retour en arrière
            const retourEnArriere = document.getElementById("retourEnArriere");
            retourEnArriere.addEventListener("click", () => {
                updateModal.style.display = "block";
                addingModal.style.display = "none";
            });
  
  
            // la fonction de fermeture de modale
            const closeModal = function () {
                modaleGlobale.style.display = "none";
            };
  
            //on gère la fermeture lors du clic sur la zone grise
            modaleGlobale.addEventListener("click", function () {
                closeModal();
            });

            for (let i = 0; i < modaleGlobale.children.length; i++) {
                modaleGlobale.children[i].addEventListener("click", function (e) {
                    e.stopPropagation();
                });
            }
  
            window.addEventListener("keydown", function (e) {
              // Permet de fermer la modale avec la touche "echap"
                if (e.key === "Escape" || e.key === "Esc") {
                    closeModal(e);
                }
            });
        });
    }
};