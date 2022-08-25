
/* Funcionalidad de Menú hamburguesa */
const menuBurguer = document.getElementById('menu_burger');
const menuBurguerClose = document.getElementById('menu_burger_close');
const navBar = document.getElementById('navBar');
const funcionalidadMenuOpen = () => {
    menuBurguer.classList.add('none');
    menuBurguerClose.classList.remove('none');
    navBar.classList.remove('nav_none');
};
const funcionalidadMenuClose = () =>{
    menuBurguer.classList.remove('none');
    menuBurguerClose.classList.add('none');
    navBar.classList.add('nav_none');
}
menuBurguer.addEventListener('click', funcionalidadMenuOpen);
menuBurguerClose.addEventListener('click', funcionalidadMenuClose);
/* Funcionalidad de Menú hamburguesa */

/* Carrusel trending */
const fila = document.querySelector('.container_trending_gifos_flex');
const arrowLef = document.getElementById('arrow-lef');
const arrowRight = document.getElementById('arrow-right');
arrowRight.addEventListener('click', ()=>{
    fila.scrollLeft += fila.offsetWidth;
});
arrowLef.addEventListener('click', ()=>{
    fila.scrollLeft -= fila.offsetWidth;
});
/* Carrusel trending */

/* Favoritos */
const addToFavorite = (gifosAdd) =>{
    const favoriteSection = JSON.parse(localStorage.getItem('gif')) || [];
    favoriteSection.push(gifosAdd);
    localStorage.setItem('gif', JSON.stringify(favoriteSection));
    createDomFavorite();
}
const removerGifToFavoriteTrending = (gifoID) => {
    const favoriteSection = JSON.parse(localStorage.getItem('gif')) || [];
    let favoriteIndex;
    favoriteSection.forEach((gifoInfo, index) => {
        if (gifoInfo.id === gifoID) {
            favoriteIndex = index;
        }
    });
    favoriteSection.splice(favoriteIndex, 1);
    localStorage.setItem('gif', JSON.stringify(favoriteSection));
    createDomFavorite();
};
/* Favoritos */
let checkFavorite = (gifoID) =>{
    let favorite = false;
    const favoriteSection = JSON.parse(localStorage.getItem('gif')) || [];
    for (let gifo = 0; gifo < favoriteSection.length; gifo++) {
        if (favoriteSection[gifo].id === gifoID) {  
            favorite = true;
        };
    };
    return favorite;
}
/* Function create Dom */

const createDom = (data, containerMain, index) =>{
    const gifosTrending = document.createElement('div');
    gifosTrending.classList.add('gifos_trending');
    gifosTrending.addEventListener('click', ()=>{
        if(screen.width <= 1024){
            max(data);
        };
    });
    gifosTrending.style.backgroundImage = `url("${data.images.original.url}")`;
    const infoGif = document.createElement('div');
    infoGif.classList.add('info_gif');
    const actionsUser = document.createElement('div');
    actionsUser.classList.add('actions_users');
    const iconFav = document.createElement('div');
    iconFav.classList.add('icon_fav', 'tamaño_actions_users');
    const favoriteSection = JSON.parse(localStorage.getItem('gif')) || [];
    favoriteSection.map(elemento =>{
        if (elemento.id === data.id) {
            iconFav.classList.remove('icon_fav');
            iconFav.classList.add('icon_fav_remove');
        };
    });
    iconFav.addEventListener('click', (e) =>{
        if (checkFavorite(data.id) === false) {
            e.currentTarget.classList.remove('icon_fav');
            e.currentTarget.classList.add('icon_fav_remove');
            addToFavorite(data);
        }else{
            e.currentTarget.classList.remove('icon_fav_remove');
            e.currentTarget.classList.add('icon_fav');
            removerGifToFavoriteTrending(data.id);
        };
    });
    actionsUser.appendChild(iconFav);

    const iconDownload = document.createElement('div');
    iconDownload.classList.add('icon_download', 'tamaño_actions_users');
        iconDownload.addEventListener('click', () =>{
            download(data.images.original.url, data.username);
        });
    actionsUser.appendChild(iconDownload);

    const iconMax = document.createElement('div');
    iconMax.classList.add('icon_max', 'tamaño_actions_users');
    iconMax.addEventListener('click', ()=>{
        max(data, iconFav);
    });
    actionsUser.appendChild(iconMax);

    const titleCardContainer = document.createElement('div');
    titleCardContainer.classList.add('container_title_gifos_card');

    const pGifosUser = document.createElement('p');
    pGifosUser.classList.add('p_gifos_card');
    pGifosUser.textContent = data.username;
    
    titleCardContainer.appendChild(pGifosUser);

    const titleGifosCard = document.createElement('p');
    titleGifosCard.classList.add('title_gifos_card');
    titleGifosCard.textContent = data.title;

    titleCardContainer.appendChild(titleGifosCard);


    infoGif.appendChild(actionsUser);
    infoGif.appendChild (titleCardContainer);

    gifosTrending.appendChild(infoGif);
    containerMain.appendChild(gifosTrending);
};
/* Function create Dom */
/* Function max */
const maxSection = document.getElementById('maxSection');
const containerCarruselMax = document.querySelector('.container_gif_max_title_actions');
const closeMaxGif = document.querySelector('.close_max_gif');
const max = (items, iconFav) =>{
    maxSection.classList.remove('none');
    //contenedor gifMax
    containerCarruselMax.innerHTML='';
    const divGifMax = document.createElement('div');
    divGifMax.classList.add('gifMax');
    //contenedor gifMax

    //imgGifMax
    const imgGifMax = document.createElement('div');
    imgGifMax.classList.add('imgGifMax');
    imgGifMax.style.backgroundImage = `url("${items.images.original.url}")`;
    divGifMax.appendChild(imgGifMax);
    //imgGifMax

    //contenedor titulos y acciones
    const containerTitleAndAction = document.createElement('div');
    containerTitleAndAction.classList.add('container_title_max_actions_user');
    //contenedor titulos y acciones

    //contenedor de acciones
    const actionsUser = document.createElement('div');
    actionsUser.classList.add('actions_users_mobile');
    //contenedor de acciones

    //icono favorito
    const iconFavMax = document.createElement('div');
    iconFavMax.classList.add('icon_fav_max', 'tamaño_actions_users');
    const favoriteSection = JSON.parse(localStorage.getItem('gif')) || [];
    favoriteSection.map(elemento =>{
        if (elemento.id === items.id) {
            iconFavMax.classList.remove('icon_fav_max');
            iconFavMax.classList.add('icon_fav_max_active');
        };
    });
    iconFavMax.addEventListener('click', (e)=>{
        
        if (checkFavorite(items.id) === false) {
            e.currentTarget.classList.remove('icon_fav_max');
            e.currentTarget.classList.add('icon_fav_max_active');
            if(screen.width > 1024){
                iconFav.classList.remove('icon_fav');
                iconFav.classList.add('icon_fav_remove');
            };
            addToFavorite(items);
        }else{
            e.currentTarget.classList.remove('icon_fav_max_active');
            e.currentTarget.classList.add('icon_fav_max');
            if (screen.width > 1024) {
                iconFav.classList.add('icon_fav');
                iconFav.classList.remove('icon_fav_remove');
            }
            removerGifToFavoriteTrending(items.id);
            createDomFavorite();
        }
    });
    actionsUser.appendChild(iconFavMax);
    //icono favorito

    //icono descarga
    const iconDownloadMax = document.createElement('div');
    iconDownloadMax.classList.add('icon_download_max', 'tamaño_actions_users');
    iconDownloadMax.addEventListener('click', () =>{
        download(items.images.original.url);
    });
    actionsUser.appendChild(iconDownloadMax);
    //icono descarga

    containerTitleAndAction.appendChild(actionsUser);

    //contenedor titulos y usuario
    const containerTitleAndUser = document.createElement('div');
    containerTitleAndUser.classList.add('container_title_gifos_card_max');
    //contenedor titulos y usuario

    //usuario
    const pGifosMax = document.createElement('p');
    pGifosMax.classList.add('p_gifos_card_max');
    pGifosMax.textContent = items.username;
    containerTitleAndUser.appendChild(pGifosMax);
    //usuario

    //titulo del gif
    const titleGifosMax = document.createElement('p');
    titleGifosMax.classList.add('title_gifos_card_max');
    titleGifosMax.textContent = items.title;
    containerTitleAndUser.appendChild(titleGifosMax);
    //titulo del gif
    containerTitleAndAction.appendChild(containerTitleAndUser);
    divGifMax.appendChild(containerTitleAndAction);
    containerCarruselMax.appendChild(divGifMax);
};
closeMaxGif.addEventListener('click', ()=>{
    maxSection.classList.add('none');
});
/* Function max */

/* API Trending */
const trendingDom = () =>{
    let url = `${baseApi}trending?api_key=${apiSearch}&limit=25&rating=g`;
    let result = getIfoApi(url);
    result.then((resp)=>{
        resp.data.map((item, i) => createDomTrending(item, i));
    }).catch((e) =>{
        alert("a ocurrido un error" + e);
    });
};
const createDomTrending = (datos, i) =>{
    const containerTrending = document.getElementById('containerTrending');
    createDom(datos, containerTrending, i);
};
trendingDom();
/* API Trending */

//Download
const toDataURL = (url) => {
    return fetch(url).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
};
const download =  async (gifDownload, name) => {
        const a = document.createElement("a");
        a.href = await toDataURL(gifDownload);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
}
//Download