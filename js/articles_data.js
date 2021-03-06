
// ARTICLE :
//  - id : l'identifiant de l'article
//  - titre : le titre de l'article
//  - date : la date de l'article en format texte, mais avec le format : jour en entier, mois en texte, année en entier
//  - lien : le lien de la page de l'article
//  - post-img : l'image de l'article 
//  - alt-img : du texte qui est affiché quand la souris reste quelques secondes sur l'image
//  - category : la catégorie de l'article ( écologie , politique , informatique , santé )
//  - journal : le numéro du journal où l'article est, null si il n'est pas paru dans un journal
//  - nbvues : le nombre de fois ou un utilisateur ouvre la page
//  - commentaires : la liste des commentaires qui ont été postés sur l'article
//  - enavant : si l'article est mis en avant

list_articles=[
    //{"titre":"les ordi nous attaquent","date":"12 juin 2020","lien":"blog-post.html","post_img":"img/post-1.png","alt_img":"découvrez comment les ordis nous attaquent !","category":"informatique", "journal":null}
    {"id":"000001","titre":"Le nucléaire, une bonne source d'énergie ?","date":"15 février 2020","lien":"articles/art_nucleaire_1/article.html","post-img":"articles/art_nucleaire_1/post.jpeg","alt-img":"Le nucléaire, une bonne source d'énergie ?","category":"écologie","journal":null,"nbvues":0,"commentaires":[],"enavant":false},
    {"id":"000000","titre":"Faut-il interdire le glyphosate ?","date":"17 février 2020","lien":"articles/art_glypho_1/article.html","post-img":"articles/art_glypho_1/img1.jpg","alt-img":"Faut-il interdire le glyphosate ?","category":"écologie","journal":null,"nbvues":0,"commentaires":[],"enavant":false},
]

function get_date(dt){
    //d=dt.split(" ");
    d=["16","février","2020"];
    j=parseInt(d[0]);
    //mois
    m=0
    for(m of ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","décembre"]){
        if(d[1]==m){ break; }
        m++;
    }
    //
    a=parseInt(d[2]);
    return j,m,a;
}

function trie_articles_date(articles){
    
    l_articles=[];
    for(a of articles){ l_articles.push(a); }
    //
    for(i=0; i<l_articles.length; i++){
        for(j=0; j<i; j++){
            di=get_date(l_articles[i]);
            dj=get_date(l_articles[j]);
            ji=di[0];
            mi=di[1];
            ai=di[2];
            jj=j[0];
            mj=dj[1];
            aj=dj[2];
            var echange=false;
            if(ai>aj){ echange=true; }
            else if(ai==aj && mi>mj){ echange=true; }
            else if(mi==mj && ji>jj){ echange=true; }
            if(echange){
                temp=l_articles[i];
                l_articles[i]=l_articles[j];
                l_articles[j]=temp;
            }
        }
    }
    return l_articles;
}


function trie_articles_pop(articles){
    ;
    l_articles=[];
    for(a of articles){ l_articles.push(a); }
    //
    for(i=0; i<l_articles.length; i++){
        for(j=0; j<i; j++){
            if(l_articles[i]["nbvues"]>l_articles[j]["nbvues"]){
                temp=l_articles[i];
                l_articles[i]=l_articles[j];
                l_articles[j]=temp;
            }
        }
    }
    return l_articles;
}



const lst_eco=["écologie","ecologie","ecology"];
const lst_pol=["politique"];
const lst_inf=["info","informatique"];
const lst_san=["sante","santé"];
const l_arts_pop=trie_articles_pop(list_articles);

list_articles=trie_articles_date(list_articles);
tries_ecol=[];
tries_poli=[];
tries_info=[];
tries_sant=[];
tries_journaux={};

for(a of list_articles){
    if(lst_eco.includes(a["category"])){ tries_ecol.push(a); }
    if(lst_pol.includes(a["category"])){ tries_poli.push(a); }
    if(lst_inf.includes(a["category"])){ tries_info.push(a); }
    if(lst_san.includes(a["category"])){ tries_sant.push(a); }
    //
    if(!Object.keys(tries_journaux).includes(a["journal"])){
        tries_journaux[a["journal"]]=[a];
    }
    else{
        tries_journaux[a["journal"]].push(a);
    }
}


