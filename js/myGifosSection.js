
const searchGifoFlex = document.querySelector('.search_gifos_flex');
const no_favorites = document.getElementById('misGifosMsj');

//APRENDER COMO CREAR EL DIV

const removeMy = (gifoRemoveMy) =>{
    const myGif = JSON.parse(localStorage.getItem('misGifosCreados')) || [];
    let myIndexRemove;
    myGif.map((gifRemove, i) =>{
        if (gifRemove.id === gifoRemoveMy) {
            myIndexRemove = i;
        }
    });
    myGif.splice(myIndexRemove, 1);
    localStorage.setItem('misGifosCreados', JSON.stringify(myGif));
}
const myGifosUrl = (gifoID) =>{
    const urlMyGifLocal = `${baseApi}${gifoID}?api_key=${apiSearch}`;
    let result = getIfoApi(urlMyGifLocal);
    result.then((resp)=>{
        createDomMyGif(resp);
    }).catch((e) => {
        alert("a ocurrido un error" + e);
    });
};
const getGifosID = ()=>{
    const myGif = JSON.parse(localStorage.getItem('misGifosCreados')) || [];
    myGif.map(elementosId =>{
        myGifosUrl(elementosId.data.id)
    });
}
getGifosID();
const createDomMyGif = (gif) =>{
    const myGif = JSON.parse(localStorage.getItem('misGifosCreados')) || [];
        if (myGif.length <= 0 && myGif !==  '') {
            no_favorites.classList.remove('none');
        }else{
            no_favorites.classList.add('none');
            const divContainerMyGifos = document.createElement('div');
            divContainerMyGifos.classList.add('gifos_trending');
            divContainerMyGifos.addEventListener('click', ()=>{
                if(screen.width < 1024){
                    maxMy(gif, divContainerMyGifos);
                };
            });
            divContainerMyGifos.style.backgroundImage = `url("${gif.data.images.original.url}")`;
    
            const divInfoMyGif = document.createElement('div');
            divInfoMyGif.classList.add('info_gif');
    
            const actionsUserMyGif = document.createElement('div');
            actionsUserMyGif.classList.add('actions_users');
    
            const trashMyGif = document.createElement('div');
            trashMyGif.classList.add('icon_trash', 'tamaño_actions_users');
            trashMyGif.addEventListener('click', () =>{
                removeMy(gif.data.id);
                searchGifoFlex.removeChild(divContainerMyGifos);
                if (searchGifoFlex.innerHTML === '') {
                    no_favorites.classList.remove('none');
                }else{
                    no_favorites.classList.add('none');
                }
            });
            actionsUserMyGif.appendChild(trashMyGif);
    
            const downloadMyGif = document.createElement('div');
            downloadMyGif.classList.add('icon_download', 'tamaño_actions_users');
            downloadMyGif.addEventListener('click', () =>{
                download(gif.data.images.original.url);
            });
            actionsUserMyGif.appendChild(downloadMyGif);
    
            const maxMyGif = document.createElement('div');
            maxMyGif.classList.add('icon_max', 'tamaño_actions_users');
            maxMyGif.addEventListener('click', () =>{
                maxMy(gif, divContainerMyGifos);
            });
            actionsUserMyGif.appendChild(maxMyGif);
            
            divInfoMyGif.appendChild(actionsUserMyGif);
    
            const containerTitleGifosMy = document.createElement('div');
            containerTitleGifosMy.classList.add('container_title_gifos_card');
    
            divContainerMyGifos.appendChild(divInfoMyGif);
            divContainerMyGifos.appendChild(containerTitleGifosMy);
            searchGifoFlex.appendChild(divContainerMyGifos);
        }
};
const maxMy = (items, divContainerMyGifos) =>{
    maxSection.classList.remove('none');
    //contenedor gifMax
    containerCarruselMax.innerHTML='';
    const divGifMax = document.createElement('div');
    divGifMax.classList.add('gifMax');
    //contenedor gifMax

    //imgGifMax
    const imgGifMax = document.createElement('div');
    imgGifMax.classList.add('imgGifMax');
    imgGifMax.style.backgroundImage = `url("${items.data.images.original.url}")`;
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
    const trashMyGifMax = document.createElement('div');
    trashMyGifMax.classList.add('icon_trash', 'tamaño_actions_users');
    trashMyGifMax.addEventListener('click', () =>{
        removeMy(items.data.id);
        searchGifoFlex.removeChild(divContainerMyGifos);
        if (searchGifoFlex.innerHTML === '') {
            no_favorites.classList.remove('none');
        }else{
            no_favorites.classList.add('none');
        }
    });
    actionsUser.appendChild(trashMyGifMax);
    //icono favorito

    //icono descarga
    const iconDownloadMax = document.createElement('div');
    iconDownloadMax.classList.add('icon_download_max', 'tamaño_actions_users');
    iconDownloadMax.addEventListener('click', () =>{
        download(items.data.images.original.url);
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
}
closeMaxGif.addEventListener('click', ()=>{
    maxSection.classList.add('none');
});
/* Function max */