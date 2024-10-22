
const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const selectedChannelId = parseInt(localStorage.getItem("selectedChannel"))
const language = 'pt';
const devicesType = 'webos';
function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}
function formatDuration(duration) {

    const durationEvent = (duration / 60); 
  
    const total = durationEvent.toFixed(0);
  
    return total;
  
}


function formatDescriptionLength(description) {
    const formatedDescription = description.length <= 250 ? description : description.substring(0, 250) + "...";

    return formatedDescription;
}

function formatDate(date) {
    const dataCriada = new Date(date.toString());
    const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);

    return formatedDate;
}

function getHour(date) {
    const dataCriada = new Date(date.toString());
    let options = {
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Sao_Paulo",
    };
    
    //console.log("o que tem no datacriada", new Intl.DateTimeFormat("en-US", options).format(dataCriada))
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(dataCriada);

    return formatedDate;
}
const timeGet = new Date();
const hours = timeGet.getHours();
const minutes = timeGet.getMinutes();
const seconds = timeGet.getSeconds();
const currentYear = timeGet.getFullYear();
const today = timeGet.getDate();
const currentMonth = timeGet.getMonth() + 1; 
const timezone = timeGet.getTime();

let getMonthFormated = (adicionaZero(timeGet.getMonth()+1).toString() );
let getDayFormated = (adicionaZero(timeGet.getDate().toString()) );
let getHourFormated = (adicionaZero(timeGet.getHours().toString()) );
let getMinutesFormated = (adicionaZero(timeGet.getMinutes().toString()) );
let getSecondsFormated = (adicionaZero(timeGet.getSeconds().toString()) );


function formatDate(date) {
    const dataCriada = new Date(date.toString());
    const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);

    return formatedDate;
}

function getHour(date) {
    const dataCriada = new Date(date.toString());
    let options = {
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Sao_Paulo",
    };
    
    //console.log("o que tem no datacriada", new Intl.DateTimeFormat("en-US", options).format(dataCriada))
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(dataCriada);

    return formatedDate;
}



async function getRecordingsAndMyList() {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();

    const getRecordingsByProfileV2 = await axios.post('https://hospitality.youcast.tv.br/getRecordingsByProfileV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
            }).then(async function (response) {
                if(response.data.status == 1){
                    console.log("o recordings", response.data)
                    var myRecordings = response.data.response.map(e => e)

                    //await showMyRecordings(response.data);
                    const getMyListFull = await axios.post('https://hospitality.youcast.tv.br/getMyListFull', {
                        authorization: 'Bearer ' + auth,
                        includeData: true,
                        profileId: profile,
                        language: language,
                        devicesType: devicesType,
                    }).then(async function (response) {
                        if(response.data.status == 1){
                            console.log("o my list", response.data)

                            var myList = response.data
                            load1 = true;
                            if(load1 == true ) {
                                //showMyList(response.data);
                                showOptionsButton(myRecordings, myList)
                                loaded.style.display = "none";

                                //showChannelEventsToday(data1, data3, data2)
                            }
                            //console.log("o retorno", response.data.response.filter(e => e.start.includes(stringDateToFilter2)))
                            //showChannelEvents(response.data.response)
                            //console.log("o getChannelCategories", response.data.response);
                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                    //console.log("o retorno", response.data.response.filter(e => e.start.includes(stringDateToFilter2)))
                    //showChannelEvents(response.data.response)
                    //console.log("o getChannelCategories", response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

}

getRecordingsAndMyList();
showFocusedEvent();

function showLoading() {
    document.getElementById("loadingContent").innerHTML = 
    `
    <div class="loaderContent">
        <div class="loader">
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__ball"></div>      
        </div>

        <div><h3>Carregando...</h3></div>
    </div>
    `
}

function storageContent() {
    if(event.keyCode === 13) {
        switch (event.target.dataset.type) {
    
            case "Recording":
                console.log("foi a tv");
                console.log("foi a tv", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", "TV")
                var timestmp = Date.parse(event.target.dataset.start) / 1000
                localStorage.setItem("startAt", timestmp)
    
                console.log("o timestm", timestmp)
                window.location.href = '/pages/info-selected-content/selectedcontent.html'
                break;
    
            case "TV":
                console.log("foi a tv");
                console.log("foi a tv", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", "TV")
                var timestmp = Date.parse(event.target.dataset.start) / 1000
                localStorage.setItem("startAt", timestmp)
    
                console.log("o timestm", timestmp)
                window.location.href = '/pages/info-selected-content/selectedcontent.html'
                break;
    
            case "VOD":
                console.log("foi o vod", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.id)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                window.location.href = '/pages/info-selected-content/selectedcontent.html'
                break;
    
            case "Category":
                console.log("foi o category", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.id)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                window.location.href = '/pages/info-selected-content/selectedcontent.html'
                break;
        }
    }
}

function showFocusedEvent() {

    if(event == undefined) {
        document.getElementById("focusedChannel").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage2">
                            <div class="focusedShowLogo" style="background-image: url(${"../../images/logo-accorinvest-branco.png"})"></div>
                        </div>

                        <div class="focusedLogoName"><h2></h2></div>
                    </div>

                    <div class="focusedDetailsContainer">
                        <div class="focusedShowDescription">
                        <h3>Assista seus programas favoritos agora mesmo!</h3>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
        `

        document.getElementById("focusedChannelImage").innerHTML =
        `
        <div class="focusedChannelEventImage focusedImageInfo"
        style="
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${"../../images/bgd_channels.png"})
        "
        >
        
        </div>
        `

    }else if(event.target.dataset != undefined){
        const eventDetails = event.target.dataset
        console.log("oq tem no evento", eventDetails)
        const dataCriada = new Date(eventDetails.start);
        localStorage.setItem("selectedChannel", event.target.dataset.channelid)

        document.getElementById("focusedChannel").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage">
                        ${eventDetails.type === "VOD"
                        ?
                        `
                        <div class="focusedLogoName2" ><h2>${eventDetails.type}</h2></div>
                        `
                        :
                        `
                        <div class="focusedShowLogo" style="background-image: url(${eventDetails.logo})"></div>
                        `
                    }
                        </div>

                        ${eventDetails.channelsname != "undefined"
                        ?
                        `
                        <div class="focusedLogoName"><h2>${eventDetails.channelsname}</h2></div>
                        `
                        :
                        ``
                        }
                    </div>

                    <div class="focusedDetailsContainer">
                        <div class="focusedShowGenresAndDuration">
                            <h6>Gênero: ${eventDetails.genres}</h6>
                            <h6>|</h6>
                            ${eventDetails.episode !== "null" ? `<h6>${eventDetails.episode}</h6>` : ''}
                            ${eventDetails.episode !== "null" ? `<h6>|</h6>` : ''}

                            ${eventDetails.start != "undefined"
                            ?
                            `
                            <div class="focusedInfoStart">
                            <img src="../../images/clock.png" class="clock"></img>
                            <h6>${eventDetails.start}</h6>
                            </div>
                            `
                            :
                            ``
                        }
                        </div>

                        <div class="focusedShowDescription">
                            <div class="focusedFlexContainer">
                            <h3>Para você: ${eventDetails.title}</h3>
                            <div class="${eventDetails.rating != "null" ? "focusedCardRating" : "focusedNone"}
                                ${eventDetails.rating < 10 ? "bannerRatingL" : ''} 
                                ${eventDetails.rating == 10 ? "bannerRating10" : ''} 
                                ${eventDetails.rating == 12 ? "bannerRating12" : ''} 
                                ${eventDetails.rating == 13 ? "bannerRating12" : ''} 
                                ${eventDetails.rating == 14 ? "bannerRating14" : ''} 
                                ${eventDetails.rating == 16 ? "bannerRating16" : ''} 
                                ${eventDetails.rating == 18 ? "bannerRating18" : ''}
                            "><h3>${eventDetails.rating == 0 ? "L" : eventDetails.rating}</h3>
                            </div>
                            </div>

                            <h4>${formatDescriptionLength(eventDetails.description)}</h4>
                        </div>

                        <div class="focusedShowGenresAndDuration">
                        <h6>Duração: ${formatDuration(eventDetails.duration)}m</h6>
                        </div>
                    </div>
                </div>
            
            </div>



            <div class="${eventDetails.imagewidescreen == "null" ? "emphasisCard" : "focusedNone"}"

            style="
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.imagewidescreen == "null" ? eventDetails.image : ""})
            "
            >
            
            </div>

        </div>
        ` 

        document.getElementById("focusedChannelImage").innerHTML =
        `
        <div class="focusedChannelImageColor">
        
        </div>
        <div class="focusedChannelEventImage focusedImageInfo"
        style="
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.imagewidescreen !== "null" ? eventDetails.imagewidescreen : eventDetails.image});
        ${eventDetails.imagewidescreen == "null" ? "filter: blur(200px)" : ""}
        "
        >
        
        </div>

        `

    }


}


//------ funções para definir se é agendado -------------//
function futureEventMonth(start) {
    const dataCriada = new Date(start);
    const eventMonth = (adicionaZero(dataCriada.getMonth()+1).toString() );
    
    
    return eventMonth
}

function futureEventDay(start) {
    const dataCriada = new Date(start);
    const eventDay = (adicionaZero(dataCriada.getDate().toString()) );
    
    
    return eventDay
}

function futureEventHour(start) {
    const dataCriada = new Date(start);
    const eventHours = (adicionaZero(dataCriada.getHours().toString()) );


    return eventHours
}

function futureEventMinutes(start) {
    const dataCriada = new Date(start);
    const eventMinutes = (adicionaZero(dataCriada.getMinutes().toString()) );


    return eventMinutes
}

function futureEventSeconds(start) {
    const dataCriada = new Date(start);
    const eventSeconds = (adicionaZero(dataCriada.getSeconds().toString()) );

    return eventSeconds
}

function validateFutureEvent(start) {

    var futureMonth = parseInt(futureEventMonth(start));
    var futureDay = parseInt(futureEventDay(start));
    var futureHour = parseInt(futureEventHour(start));
    var futureMinute = parseInt(futureEventMinutes(start));

    if(futureMonth > parseInt(getMonthFormated)) {

        return true
    } else if(futureMonth == parseInt(getMonthFormated) && futureDay > parseInt(getDayFormated)) {
        return true
    } else if(futureMonth == parseInt(getMonthFormated) && 
              futureDay == parseInt(getDayFormated) && 
              futureHour > parseInt(getHourFormated)) {
                return true;
    } else if(futureMonth == parseInt(getMonthFormated) && 
              futureDay == parseInt(getDayFormated) && 
              futureHour == parseInt(getHourFormated) &&
              futureMinute > parseInt(getMinutesFormated)
              ) {
                return true
    } else {
        return false;
    }


}
//-----------------------------------------------------//


async function showOptionsButton(myRecordings, myList) {


    
    document.getElementById("channelEvents").innerHTML =
    `
            <div class="recordingsEventsContainer">
                <div class="recordingEventInfoContainer">
                    <div class="recordingInfoTitle selected">

                        <button 
                        id="btn"
                        class="selectedCategoryCard"
                        onfocus=""
                        onclick=""
                        data-type="Gravacao"
                        ><h3>Gravações</h3></button>

                        <button 
                        id="btn2"
                        class="selectedCategoryCard"
                        onfocus=""
                        onclick=""
                        data-type="Minha-Lista"
                        ><h3>Minha Lista</h3></button>


                    </div>

                    
                    <div id="contentShow" class="channelInfoList selected">

                    </div>
                </div>
            </div>
    `
    const btn = document.getElementById('btn');
    const btn2 = document.getElementById('btn2');


    //my recording
    btn.addEventListener('focus', event => {

        if(event.target.dataset.type === "Gravacao"){
            document.getElementById("contentShow").innerHTML =
            `
                <div class="channelInfoList selected" id="scrolling">
                    ${myRecordings.length > 0 ?
                        myRecordings.map((card, idx) => {


                            return card.data.map((recording, idx) => {
                                const newRecordingList = {
                                    recordingListId: card.id,
                                    recordingTitle: card.title,
                                    actors: recording.actors,
                                    categories_id: recording.categories_id,
                                    categories_name: recording.categories_name,
                                    channels_forced_pin: recording.channels_forced_pin,
                                    channels_id: recording.channels_id,
                                    channels_logo: recording.channels_logo,
                                    channels_name: recording.channels_name,
                                    description: recording.description,
                                    directors: recording.directors,
                                    duration: recording.duration,
                                    end: recording.end,
                                    episode: recording.episode,
                                    episode_number: recording.episode_number,
                                    expiration: recording.expiration,
                                    external_id: recording.external_id,
                                    follow: recording. follow,
                                    genres: recording.genres,
                                    id: recording.id,
                                    image: recording.image,
                                    image_height: recording.image_height,
                                    image_widescreen: recording.image_widescreen,
                                    image_widescreen_height: recording.image_widescreen_height,
                                    image_widescreen_width: recording.image_widescreen_width,
                                    image_width: recording.image_width,
                                    imdb_id: recording.imdb_id,
                                    imdb_rating: recording.imdb_rating,
                                    locked: recording.locked,
                                    name_image: recording.name_image,
                                    name_image_height: recording.name_image_height,
                                    name_image_width: recording.name_image_width,
                                    order: recording.order,
                                    origin: recording.origin,
                                    playable: recording.playable,
                                    preferred_offset: recording.preferred_offset,
                                    rating: recording.rating,
                                    released: recording.released,
                                    reminder: recording.reminder,
                                    removable: recording.removable,
                                    score: recording.score,
                                    season_number: recording.season_number,
                                    start: recording.start,
                                    subtitle: recording.subtitle,
                                    title: recording.title,
                                    type: recording.type,
                                    youtube_id: recording.youtube_id

                                }
                                //console.log("qual valor de idx", idx)
                                return(`
                                <div class="cardsChannelInfo">
                                <button
                                id="${"focustest" + idx}"
                                class="selectedCategoryCard"
                                onfocus="showFocusedEvent()"
                                onKeyDown="storageContent()"
                                onclick="storageContent()"
                                data-id=" ${newRecordingList.id}"
                                data-duration="${newRecordingList.duration}"
                                data-type="${newRecordingList.type}"
                                data-genres="${newRecordingList.genres}"
                                data-channelId="${newRecordingList.channels_id}"
                                data-channelsName=${newRecordingList.channels_name}
                                data-start="${newRecordingList.start}"
                                data-title="${newRecordingList.title}"
                                data-description="${newRecordingList.description}"
                                data-rating="${newRecordingList.rating}"
                                data-end="${newRecordingList.end}"
                                data-logo="${newRecordingList.channels_logo}"
                                data-imageWidescreen="${newRecordingList.image_widescreen}"
                                data-image="${newRecordingList.image}"
                                data-episode="${newRecordingList.episode}"
                                data-subtitle="${newRecordingList.subtitle}"
                                style="
                                background-image: url(${newRecordingList.image}); 
                                background-size: cover; 
                                background-repeat: no-repeat;
                                background-position: top center;
                                object-fit: cover
                                ">

                                ${
                                    newRecordingList.start != undefined && newRecordingList.start != "undefined"
                                    ?
                                        validateFutureEvent(newRecordingList.start) === true ? 
                                        `
                                        <div class="futureEvent">
                                            <h3>Agendado</h3>
                                        </div>
                                        `
                                        : "" 
                                    :
                                    ""
                                }


                                <div class="${newRecordingList.recordingTitle === "Agendados" ? "channelInfoListDetailsContainer" : "channelInfoListDetailsContainer2"}">
                                    <div class="channelInfoDetailDate">
                                        <img src="../../images/clock.png" class="clock"></img>
                                        <h6>${getHour(newRecordingList.start)}</h6>
                                    </div>


                                    <div class="channelInfoDetailRate bannerRating
                                    ${newRecordingList.rating < 10 ? "bannerRatingL" : ''} 
                                    ${newRecordingList.rating == 10 ? "bannerRating10" : ''} 
                                    ${newRecordingList.rating == 12 ? "bannerRating12" : ''} 
                                    ${newRecordingList.rating == 14 ? "bannerRating14" : ''} 
                                    ${newRecordingList.rating == 16 ? "bannerRating16" : ''} 
                                    ${newRecordingList.rating == 18 ? "bannerRating18" : ''} 
                                    "><h3>${newRecordingList.rating == 0 ? "L" : newRecordingList.rating}</h3>
                                    
                                    </div>
                                
                                </div>

                                
                                </button></div>
                                `)
                                
                            })



                    })
                    :
                    `<div class="noEventsAvailableContainer">
                        <h2>Nenhuma gravação disponível</h2>
                    </div>`
                
                    }
                    <div class="marginToScrolling"> </div>

                </div>            
            `

        }

    });

    //my full list
    btn2.addEventListener('focus', event => {      
      if(event.target.dataset.type === "Minha-Lista"){

        console.log("show my list", myList)
        document.getElementById("contentShow").innerHTML =
        `
        <div class="channelInfoList selected" id="scrolling">
            ${myList.response.length > 0 ?
                myList.response.map((list, idx) => {
                    return(`
                    <div class="cardsChannelInfo">
                    <button
                    class="selectedCategoryCard"
                    onfocus="showFocusedEvent()"
                    onKeyDown="storageContent()"
                    onclick="storageContent()"
                    data-id=" ${list.id}"
                    data-duration="${list.duration}"
                    data-type="${list.type}"
                    data-genres="${list.genres}"
                    data-channelId="${list.channels_id}"
                    data-channelsName=${list.channels_name}
                    data-start="${list.start}"
                    data-title="${list.title}"
                    data-description="${list.description}"
                    data-rating="${list.rating}"
                    data-end="${list.end}"
                    data-logo="${list.channels_logo}"
                    data-imageWidescreen="${list.image_widescreen}"
                    data-image="${list.image}"
                    data-episode="${list.episode}"
                    data-subtitle="${list.subtitle}"

                    style="
                    background-image: url(${list.image}); 
                    background-size: cover; 
                    background-repeat: no-repeat;
                    background-position: top center;
                    object-fit: cover
                    ">

                    ${
                        list.start != undefined && list.start != "undefined"
                        ?
                            validateFutureEvent(list.start) === true ? 
                            `
                            <div class="futureEvent">
                                <h3>Agendado</h3>
                            </div>
                            `
                            : "" 
                        :
                        ""
                    }


                    <div class="${
                        list.start != undefined && list.start != "undefined"
                        ?
                            validateFutureEvent(list.start) === true 
                            ? 
                            "channelInfoListDetailsContainer"
                            : 
                            "channelInfoListDetailsContainer2" 
                        :
                        "channelInfoListDetailsContainer2"}">
                        
                    ${list.start != undefined 
                        ? 
                        `
                        <div class="channelInfoDetailDate">
                        <img src="../../images/clock.png" class="clock"></img>
                        <h6>${getHour(list.start)}</h6>
                        </div>
                        ` 
                        : 
                        ""}



                        <div class="channelInfoDetailRate bannerRating
                        ${list.rating < 10 ? "bannerRatingL" : ''} 
                        ${list.rating == 10 ? "bannerRating10" : ''} 
                        ${list.rating == 12 ? "bannerRating12" : ''} 
                        ${list.rating == 14 ? "bannerRating14" : ''} 
                        ${list.rating == 16 ? "bannerRating16" : ''} 
                        ${list.rating == 18 ? "bannerRating18" : ''} 
                        "><h3>${list.rating == 0 ? "L" : list.rating}</h3>
                        
                        </div>
                    
                    </div>

                    
                    </button></div>
                    `)



            })
            :
            `<div class="noEventsAvailableContainer">
                <h2>Não há nenhum conteúdo salvo na lista.</h2>
            </div>`
        
            }
            <div class="marginToScrolling"></div>

        </div>               `



    }

    });


}


showOptionsButton();
