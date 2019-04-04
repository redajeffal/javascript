var MonApp  = (function(){
    // Zone privée
    let _pageActive =4;
    let _nbProduitsParPage = 12;
    let _nbProduits;
    let _catalogue;
    let _nbPages;
    
    let App = {
            /** 
            * Afficher les produits, doit être appelée à chaque changement de configuration du _catalogue (changement page, changement du nombre de produit, etc)
            * @return void
            **/
			Afficher : function(){
                if(!_nbProduits){
                    _nbProduits = this.getNombreProduit();
                }
                
                if(!_catalogue){
                    _catalogue = document.querySelector(".listeProduit");
                }
                if(!_pageActive){
                   _pageActive = 1;
                }
                if(!_nbProduitsParPage){
                  _nbProduitsParPage = 12;
                }
                if(!_nbPages){
                    _nbPages = Math.ceil(_nbProduits/_nbProduitsParPage);
                }
                
                let lesProduits = produits.slice((_pageActive-1)*_nbProduitsParPage,_pageActive *_nbProduitsParPage );
                if(lesProduits.length == 0){
                    _catalogue.innerHTML = 'Aucun produit trouvé';
                }
                else{
                    _catalogue.innerHTML = '';
                    lesProduits.forEach(function(unProduit){
                        var chaineHTML = '<article class="produit">'+
                                            '<header class="nom">'+ unProduit.nom +'</header>'+
                                            '<section class="image"> <img src="'+ unProduit.image +'"></section>'+
                                            '<section class="description">'+ unProduit.description +'</section>'+
                                            '<section class="prix"> <span class="prix-valeur">'+ unProduit.prix.valeur +'</span> <span class="prix-unite">'+ unProduit.prix.unite +'</span> </section>'+
                                            '<section class="categorie">'+ unProduit.categorie +'</section>'+
                                        '</article>';


                        _catalogue.innerHTML += chaineHTML;    
                    });    
                }
                
                
                var htmlPager = '';
                if(_pageActive > 1){
                    htmlPager += "<li class='prec' data-page='"+ (_pageActive-1) +"'>Prec</li>"
                }
                for(let i=1; i<=_nbPages ;i++){
                    htmlPager += '<li data-page="' + i +'" class="' + (_pageActive == i ? 'actif' : '') +'">'+ i +'</li>'
                }
                if(_pageActive < _nbPages){
                    htmlPager += "<li class='suiv' data-page='"+ (_pageActive+1) +"'>Suivant</li>"
                }
                document.querySelector(".pager ul").innerHTML = htmlPager;
                // Générer le pager !
                
            },
            /**
            * Détermine quelle page est afichée. 
            * @param {int} le numéro de page qui doit être activée
            * @return void
            **/
			ChangerPage : function(numPage){
                
               _pageActive = parseInt(numPage);                
                this.Afficher();
            },
            /**
            * Permet de savoir combien il y a de produit dans le _catalogue complet. 
            * @return {int} Nombre de produit complet
            **/
			getNombreProduit : function(){
                return produits.length; // Produits est globale et dans le fichier data/produit.js
                
            },
            /**
            * Permet de changer le nombre de produit affiché par page.
            * @param {int} Nombre de produit à afficher dans une page
            * @return void
            **/
			setNombreParPage : function(nbParPage){
                
                if(nbParPage != _nbProduitsParPage){
                    if(nbParPage == 0){
                        _nbProduitsParPage = _nbProduits;
                    }
                    else{
                        _nbProduitsParPage = nbParPage;    
                    }
                    
                    _nbPages = Math.ceil(_nbProduits/_nbProduitsParPage);
                    _pageActive = 1;
                    this.Afficher();
                }
                
            },
            
            /**
            * Permet de changer le mode d'affichage (grille ou liste).
            * @param {string}
            * @return void
            **/
			setModeAffichage : function(mode){
                let domCatalogue = document.querySelector(".catalogue");
                if(mode == "liste"){
                    domCatalogue.classList.remove("grille");    
                    domCatalogue.classList.add("liste");
                }
                else if(mode == "grille"){
                    domCatalogue.classList.remove("liste");
                    domCatalogue.classList.add("grille");    
                }
                
            }
    };

    return App;
})();







