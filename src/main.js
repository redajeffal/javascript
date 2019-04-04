window.addEventListener("load", function () {
    // Afficher les produits
    MonApp.Afficher();
    // je met mes articles(data) dans la variable TableauProduits
    TableauProduits = produits;
    //je cible mes bouttons ajouter au panier
    let bntAjouter = document.querySelectorAll(".btnAjouter");
    //je boucle dans mes bouttons ajouter au panier qui sont sur la premiere page
    bntAjouter.forEach(function (unP) {
        unP.addEventListener("click", function () {
            //quand je click sur mon boutton ajouter au panier, je vais chercher don data-id
            let id = unP.dataset;
            console.log(id);
            //je boucle dans mon tableau de produit
            TableauProduits.forEach(function (unProd) {
                //je verifiesi j ai un produit qui a le meme id que le data id du produit selectionner(mes data-id ont le meme id que les produits)
                if (id.id == unProd.id) {
                    //si ils ont le meme id ,j envoie l id du produit a ma fonction AjouterProduit
                    MonApp.AjouterProduit(unProd.id);
                }
            })

        })

    })
    var pager = document.querySelector(".pager");
    pager.addEventListener("click", function (evt) {
        console.log(evt.target, evt.currentTarget);
        let page = evt.target.dataset.page;
        console.log(page);
        MonApp.ChangerPage(page);
        //quand je change de page je vais chercher mes bouttons ajouter au panier
        let bntAjouter = document.querySelectorAll(".btnAjouter");
        //je boucle a travers mes bouttons ajouter au panier
        bntAjouter.forEach(function (unP) {
            //j ajoute une action(click)a chaque boutton
            unP.addEventListener("click", function () {
                //je recupere le date-id de chaque bouttons que je click dessu
                let id = unP.dataset;
                //ici je boucle a travers mes article(data)
                TableauProduits.forEach(function (unProd) {
                    //je teste si il ya un article dans mon data qui a le meme id que le data id du boutton
                    if (id.id == unProd.id) {
                        //j envoie l id de l article qui a le meme data id a ma fonction ajouter produit
                        MonApp.AjouterProduit(unProd.id);
                    }
                })


            })

        })


    })


    document.querySelector("[name='mode']").addEventListener("change", function (evt) {
        MonApp.setModeAffichage(evt.currentTarget.value);
        //quand je change de mode d affichage je vais chercher mes bouttons ajouter au panier
        let bntAjouter = document.querySelectorAll(".btnAjouter");
        //je boucle a travers mes bouttons ajouter au panier
        bntAjouter.forEach(function (unP) {
            //j ajoute une action(click)a chaque boutton
            unP.addEventListener("click", function () {
                //je recupere le date-id de chaque bouttons que je click dessu
                let id = unP.dataset;
                //ici je boucle a travers mes article(data)
                TableauProduits.forEach(function (unProd) {
                    //je teste si il ya un article dans mon data qui a le meme id que le data id du boutton
                    if (id.id == unProd.id) {
                        //j envoie l id de l article qui a le meme data id a ma fonction ajouter produit
                        MonApp.AjouterProduit(unProd.id);
                    }
                })

            })

        })

    })
    document.querySelector("[name='nombreParPage']").addEventListener("change", function (evt) {
        MonApp.setNombreParPage(evt.currentTarget.value);
        //quand je change de nombre de pages je vais chercher mes bouttons ajouter au panier
        let bntAjouter = document.querySelectorAll(".btnAjouter");
        //je boucle a travers mes bouttons ajouter au panier
        bntAjouter.forEach(function (unP) {
            //j ajoute une action(click)a chaque boutton
            unP.addEventListener("click", function () {
                //je recupere le date-id de chaque bouttons que je click dessu
                let id = unP.dataset;
                //ici je boucle a travers mes article(data)
                TableauProduits.forEach(function (unProd) {
                    //je teste si il ya un article dans mon data qui a le meme id que le data id du boutton
                    if (id.id == unProd.id) {
                        //j envoie l id de l article qui a le meme data id a ma fonction ajouter produit
                        MonApp.AjouterProduit(unProd.id);
                    }
                })
            })
        })
    })
    Panier.Fermer();
    //je cible mon boutton afficher panier
    let btnAffiche = document.querySelector(".btnAffiche");
    //je met une action(click)sur mon boutton afficher panier
    btnAffiche.addEventListener("click", function () {
        //j appel la fonction afficher panier apres avoir clicker sur le boutton afficher panier
        MonApp.AfficherPanier();
    });
    //je cible le X qui permet de fermer le panier
    let btnfermeture = document.querySelector(".fermeture");
    //j ajoute une action(click)sur X pour fermer le panier
    btnfermeture.addEventListener("click", function () {
        //j appel la fonction fermer panier apres avoir clicker sur le X qui permet de fermer le panier
        Panier.Fermer();
    });
    //je cible le boutton vider le panier
    let vider = document.querySelector(".vider");
    //je met une action(click)sur mon boutton vider le panier
    vider.addEventListener("click", function () {
        //j appel la fonction viderpanier apres avoir clicker sur mon boutton viderpanier pour vider mon panier
        MonApp.ViderPanier();
    })
})
