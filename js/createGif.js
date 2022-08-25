
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
/* Cronómetro */
let cronometro;
let contadorS = 0;
let contadorM = 0;
const s = document.getElementById('segundos');
const m = document.getElementById('minutos');
const timeRecord = () =>{
    cronometro = setInterval(() => {
        if (contadorS == 60) {
            contadorS = 0;
            contadorM++;
            m.innerHTML = contadorM;
        }
        if (contadorM = 0) {
            contadorM = 0;
        }
        s.innerHTML = contadorS;
        contadorS++;
    }, 1000);

}
const stopTime = () =>{
        clearInterval(cronometro);
}
/* Cronómetro */

/* Create Gifo */
const start = document.getElementById('start');
const record = document.getElementById('record');
const finish = document.getElementById('finish');
const upload = document.getElementById('upload');
const video = document.getElementById('videoCreate');
const containerTitleCrea = document.querySelector('.container_title_crea');
const titleCreateGifo = document.getElementById('titleCreateGifo');
const pCreateGifo = document.getElementById('pCreateGifo');
const pasoUno = document.getElementById('pasoUno');
const pasoDos = document.getElementById('pasoDos');
const pasoTres = document.getElementById('pasoTres');
const timming = document.querySelector('.timming');
const repeat = document.getElementById('repeat');
const bgBlue = document.querySelector('.bg_blue');
const cargandoIcon = document.querySelector('.cargandoIcon');
const pSubir = document.querySelector('.pSubir');
const subidoIcon = document.querySelector('.subidoIcon');
const pSubirExito = document.querySelector('.exito');
const iconCompartir = document.querySelector('.icon_compartir');
const iconDownload = document.querySelector('.icon_download');
const gifoGrabado = document.getElementById('gifoGrabado');

let recorder;
let form = new FormData();

const getStreamAndRecord = () => {
    titleCreateGifo.innerHTML =  `<h1 id="titleCreateGifo">¿Nos das acceso a tu cámara?</h1>`;
    pCreateGifo.innerHTML = `<P id="pCreateGifo">El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.</P>`;
    pasoUno.classList.add('paso_paso_checked');
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 360,
            height: 240
        }
    })
    .then(function (stream) {
        start.classList.add('none');
        record.classList.remove('none');
        containerTitleCrea.classList.add('none');
        pasoUno.classList.remove('paso_paso_checked');
        pasoDos.classList.add('paso_paso_checked');
        timming.classList.remove('none');
        video.srcObject = stream;
        video.play();

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('started')
            },
        });
    });
};
start.addEventListener('click', () =>{
    getStreamAndRecord();
});

const myGifosUrl = (gifoID) =>{
    const urlMyGifLocal = `${baseApi}${gifoID}?api_key=${apiSearch}`;
    let result = getIfoApi(urlMyGifLocal);
    result.then((resp)=>{
        download(resp.data.images.original.url);
    }).catch((e) => {
        alert("a ocurrido un error" + e);
    });
};

const uploadGifo = () =>{
    fetch(`${uploadGif}gifs?api_key=${apiSearch}`,{
        method: 'POST',
        body: form,
    })
    .then(resp => resp.json())
    .then(gifos => {
        const myGif = JSON.parse(localStorage.getItem('misGifosCreados')) || [];
        myGif.push(gifos);
        localStorage.setItem('misGifosCreados', JSON.stringify(myGif));
        cargandoIcon.classList.add('none');
        pSubir.classList.add('none');
        subidoIcon.classList.remove('none');
        pSubirExito.classList.remove('none');
        const gifosForShare = gifos.data.id;
        setInterval(() => {
            subidoIcon.classList.add('none');
            pSubirExito.classList.add('none');
            iconCompartir.classList.remove('none');
            iconCompartir.addEventListener('click', () =>{
                window.open(`https://media.giphy.com/media/${gifosForShare}/giphy.gif_blank`); 
            });
            iconDownload.classList.remove('none');
            iconDownload.addEventListener('click', ()=>{
                myGifosUrl(gifosForShare);
            });
        }, 2000);

    }).catch(e => console.log(e));
};
record.addEventListener('click', () =>{
    record.classList.add('none');
    finish.classList.remove('none');
    recorder.startRecording();
    timeRecord();
});
finish.addEventListener('click', () =>{
    stopTime();
    repeat.classList.remove('none');
    timming.classList.add('none');
    finish.classList.add('none');
    upload.classList.remove('none');
    recorder.stopRecording(() => {
        video.classList.add('none');
        gifoGrabado.classList.remove('none');
        let blob = recorder.getBlob();
        gifoGrabado.src = URL.createObjectURL(blob);
        form.append("file", recorder.getBlob(), "myGifo.gif");
        console.log(form.get('file'))
    });
});
repeat.addEventListener('click', () =>{
    repeat.classList.add('none');
    video.classList.remove('none');
    gifoGrabado.classList.add('none');
    upload.classList.add('none');
    bgBlue.classList.add('none');
    pasoTres.classList.remove('paso_paso_checked');
    m.innerHTML = 0;
    s.innerHTML = 0;
    getStreamAndRecord();

});
upload.addEventListener('click', ()=>{
    pasoDos.classList.remove('paso_paso_checked');
    pasoTres.classList.add('paso_paso_checked');
    bgBlue.classList.remove('none');
    uploadGifo();
});
/* Create Gifo */
const toDataURL = (url) => {
    return fetch(url).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
}
const download =  async (gifDownload, name) => {
        const a = document.createElement("a");
        a.href = await toDataURL(gifDownload);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
}
