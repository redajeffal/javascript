var MonApp = (function () {
    // Zone privée
    let _pageActive = 1;
    let _nbProduitsParPage = 12;


    let App = {
        /** 
         * Afficher les produits, doit être appelée à chaque changement de configuration du catalogue (changement page, changement du nombre de produit, etc)
         * @return void
         **/
        Afficher: function () {
            //console.log(nbProduitsParPage);
            console.log(_pageActive);
            let listeProduit = document.querySelector(".listeProduit");
            //for(let i=0; i< this.getNombreProduit(); i++){
            listeProduit.innerHTML = "";
            let indexDebut = (_pageActive - 1) * _nbProduitsParPage;
            let indexFin = _pageActive * _nbProduitsParPage;

            let tabProduits = produits.slice(indexDebut, indexFin);

            tabProduits.forEach(function (unProduit) {
                var chaineHTML = '<article class="produit">' +
                    '<header class="nom">' + unProduit.nom + '</header>' +
                    '<section class="image"> <img src="' + unProduit.image + '">' +
                    '</section>' +
                    '<section class="description">' + unProduit.description + '</section>' +
                    '<section class="prix"> <span class="prix-valeur">' + unProduit.prix.valeur + '</span> <span class="prix-unite">' + unProduit.prix.unite + '</span> </section>' +
                    '<section class="categorie">' + unProduit.categorie + '</section>' +
                    '<button class="btnAjouter" data-id="' + unProduit.id + '">ajouter au panier</button>' +
                    '</article>';


                listeProduit.innerHTML += chaineHTML;
            })
            //console.log(i);

            // Générer le pager !
            let pager = document.querySelector(".pager ul");
            pager.innerHTML = "";

            let nbPages = Math.ceil(this.getNombreProduit() / _nbProduitsParPage);
            if (_pageActive > 1) {
                pager.innerHTML += '<li data-page="' + (_pageActive - 1) + '" class="prec">Prec</li>'
            }
            for (let i = 0; i < nbPages; i++) {

                pager.innerHTML += '<li data-page="' + (i + 1) + '" class="' + ((i + 1) == _pageActive ? "actif" : "") + '">' + (i + 1) + '</li>';
            }

            if (_pageActive < nbPages) {
                pager.innerHTML += '<li data-page="' + (_pageActive + 1) + '" class="suiv">Suiv</li>';
            }

        },
        /**
         * Détermine quelle page est afichée. 
         * @param {int} le numéro de page qui doit être activée
         * @return void
         **/
        ChangerPage: function (numPage) {
            _pageActive = parseInt(numPage);
            this.Afficher();
            this.AjouterProduit
        },
        /**
         * Permet de savoir combien il y a de produit dans le catalogue complet. 
         * @return {int} Nombre de produit complet
         **/
        getNombreProduit: function () {
            return produits.length; // Produits est globale et dans le fichier data/produit.js

        },
        /**
         * Permet de changer le nombre de produit affiché par page.
         * @param {int} Nombre de produit à afficher dans une page
         * @return void
         **/
        setNombreParPage: function (nbParPage) {
            _nbProduitsParPage = parseInt(nbParPage);
            _pageActive = 1;

            if (_nbProduitsParPage > this.getNombreProduit()) {
                _nbProduitsParPage = this.getNombreProduit();
            } else if (_nbProduitsParPage == 0) {
                _nbProduitsParPage = this.getNombreProduit();
            }

            this.Afficher();
        },

        /**
         * Permet de changer le mode d'affichage (grille ou liste).
         * @param {string}
         * @return void
         **/
        setModeAffichage: function (mode) {
            let catalogue = document.querySelector(".catalogue");

            if (mode == "liste") {
                catalogue.classList.add("liste");
                catalogue.classList.remove("grille");
            } else if (mode == "grille") {
                catalogue.classList.add("grille");
                catalogue.classList.remove("liste");
            }

        },
        /** 
         * recois l id de l article selectionneret l envoie a la fonction getInfoProduit 
         * @return void
         **/
        AjouterProduit: function (id) {
            //ici j envoie l id de l article a la fonction getInfoProduit 
            this.getInfoProduit(id);



        },
        /** 
         * permet de vider le panier au click su le boutton vider le panier 
         * @return void
         **/
        ViderPanier: function () {
            //ici j appel la fonction viderpanier qui vide le panier d achat  
            Panier.Vider();
            //ici je cible l endroit ou je met le nombre d articles selectionner
            let nombreArticle = document.querySelector(".nombreArticle");
            //je met la valeur de la fonction getNombreItem dans une variable
            let testred = Panier.getNombreItem();
            //ici j insere la variable dans du html qui contient le nombre d item dans le tableau(0) apres avoir vider le panier
            nombreArticle.innerHTML = testred;
        },
        /** 
         *appelle la fonction afficher dans panier 
         * @return void
         **/
        AfficherPanier: function () {
            //j appel la fonction afficher qui m affiche le panier d achat
            Panier.Afficher();

        },
        /** 
         * recois l id de l article evoyer par la fonction Ajouterproduit et boucle dans le tableau produit pour trouver l article en question 
         * @return objet
         **/
        getInfoProduit: function (id) {
            // ici je met les articles (data) dans une variable
            let tabProduits = produits;
            //ici je boucle dans mon tableau d articles
            tabProduits.forEach(function (unProduit) {
                //ici je verifier si il ya un article dans mon tableau qui a le meme id qu un article dans mon tableau 
                if (unProduit.id == id) {
                    // ici j envoie l article trouver a ma fonction ajouter
                    Panier.Ajouter(unProduit)
                }

            })



        },

    };


    return App;
})();

let Panier = (function () {
    let _items = [];
    return {
        /** 
         *permet de cree les element html du panier et les afficher 
         * @return void
         **/
        Dessiner: function () {
            // Manipulation du DOM
            // Création du Panier en HTML
            // Boucler dans les items du panier pour afficher chaque chose

            //ici je cible l endroit ou j insere mes articles selectionner
            let panier = document.querySelector(".produitPanier");
            // ici je declare une variable chaine vide
            let chaine = "";
            // ici je declare une variable infoprix a 0
            let infoprix = 0;
            // je cible la balise ou j insere le prix totl des achats dans mon panier
            let prixtotal = document.querySelector(".total");
            //ici je cible le premier enfants de ma balise qui a la classe total
            prixtotal = prixtotal.firstElementChild;
            //je boucle dans mon tableau qui contient les articles dans mon panier d achat
            _items.forEach(function (unProduit) {
                //j a dittionne les prix des achats dans mon panier
                infoprix += unProduit.prix.valeur;
                // je met selectionner dans ma variable chaine(avec concatenation)
                chaine += '<article class="monproduit" data-id=' + unProduit.id + '>' +
                    '<header class="nom" >' + unProduit.nom + '</header>' +
                    '<section class="image_panier"> <img src="' + unProduit.image + '">' +
                    '</section><section>' + unProduit.prix.valeur + ' ' + unProduit.prix.unite + '</section></article>';
            })
            //ici j insere mon prix total dans html pour l afficher
            prixtotal.innerHTML = "Prix total :" + infoprix.toFixed(2) + '$';
            //ici j insere mes articles acheter dans html pour l afficher
            panier.innerHTML = chaine;
        },
        /** 
         * permet d afficher le panier d achat
         * @return void
         **/
        Afficher: function () {
            document.querySelector(".contenuPanier").style.display = "";
            //ici j appel ma fonction dessiner lors de l affichage de mon panier pour afficher les articles dans le panier
            this.Dessiner();

        },
        /** 
         * permet de fermer le panier d achat 
         * @return void
         **/
        Fermer: function () {
            document.querySelector(".contenuPanier").style.display = "none";
        },
        /** 
         * permet de vider le panier d achat
         * @return void
         **/
        Vider: function () {
            _items = [];
            let nombreArticle = document.querySelector(".nombreArticle");

            //ici j appel ma fonction afficher apres avoir vider mon panier , afin de vider le panier
            nombreArticle.innerHTML = 0;
            this.Afficher();
        },
        /** 
         * recois l objet (article selectionner ) et le met dans un tableau
         * @return void
         **/
        Ajouter: function (item) {
            //ici j initialise une variable verif a false qui va me permettre de verifier si l article selectionner est dans le tableau ou non pour ne pas l inserer une deuxieme fois.
            let verif = false;
            //ici je boucle dans mon tableau qui contient mes articles selectionner
            _items.forEach(function (element) {
                // ici je verifie si je recois un article qui est deja dans mon tableau
                if (item == element) {
                    //quand je recois un article qui est deja dans mon tableau , ma variable verif devient true
                    verif = true;
                }
            })
            //ici je verifie si ma variable verif est false
            if (!verif) {
                //si ma variable est false, ce qui veux dire que l article envoyer n est pas dans le tableau, je l insere a mon tablesu
                _items.push(item);
            }

            let nombreArticle = document.querySelector(".nombreArticle");
            let testred = Panier.getNombreItem();

            nombreArticle.innerHTML ="(" + testred + ")";
        },
        /** 
         * permet de compter le nombre d article dans le tableau(la longueur du tableau) 
         * @return void
         **/
        getNombreItem: function () {
            return _items.length;

        },
    }
})()
