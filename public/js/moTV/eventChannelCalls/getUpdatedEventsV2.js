
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

let getAnotherDay = adicionaZero(parseInt(getDayFormated) -2)
let getAnotherDay1 = adicionaZero(parseInt(getDayFormated) -1)
let finalAnotherDay = getAnotherDay.toString();
let finalAnotherDay1 = getAnotherDay1.toString();
let infoCompleteHour = "00:00:00"

const fullDateX = currentYear + "-" + getMonthFormated + "-" + getDayFormated 
const fullDate5 = currentYear + "-" + getMonthFormated + "-" + finalAnotherDay;
const fullDate6 = currentYear + "-" + getMonthFormated + "-" + finalAnotherDay1;
const stringDateToFilterX = fullDateX.toString();
const stringDateToFilter = fullDate5.toString();
const stringDateToFilter2 = fullDate6.toString();

//console.log("mes formatado", getMonthFormated);
console.log("dia formatado", stringDateToFilterX);
console.log("dia formatado2", getAnotherDay);
console.log("dia formatado3", finalAnotherDay);

const fullDate = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + getHourFormated + ":" + getMinutesFormated + ":" + getSecondsFormated
const fullDate2 = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + hours 
const fullDate3 = currentYear + "-" + getMonthFormated + "-" + getDayFormated
const fullDate4 = currentYear + "-" + getMonthFormated + "-" + finalAnotherDay + "T" + infoCompleteHour
const stringDate = fullDate.toString();
const stringDate2 = fullDate4.toString();

//console.log ("o fullDate", fullDate)
//console.log ("o fullDate2", fullDate2)
console.log ("o fullDate", stringDate2)

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

async function getUpdateEpgEventsV2() {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();

    const getUpdateEpgEventsV2 = await axios.post('https://hospitality.youcast.tv.br/getChannelEvents', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                timestamp: 0,
                from: stringDate2,
                to: stringDate,
                channels: [selectedChannelId]
            }).then(async function (response) {
                if(response.data.status == 1){
                    load1 = true;
                    if(load1 == true ) {
                        loaded.style.display = "none";
                        let data1 = response.data.response.filter(e => e.start.includes(stringDateToFilterX))
                        let data2 = response.data.response.filter(e => e.start.includes(stringDateToFilter))

                        let data3 = response.data.response.filter(e => e.start.includes(stringDateToFilter2))

                        await showChannelEventsToday(data1, data3, data2)
                    }
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

}



getUpdateEpgEventsV2();
showFocusedChannel();

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
        localStorage.setItem("idContent", event.target.dataset.channelid)
        localStorage.setItem("event", event.target.dataset.id)
        localStorage.setItem("type", event.target.dataset.type)
        if(event.target.dataset.live === true) {
            localStorage.setItem("startAt", "undefined")
    
        } else {
            var timestmp = Date.parse(event.target.dataset.start) / 1000
            localStorage.setItem("startAt", timestmp)
    
        }
        window.location.href = '/pages/player/player.html'

    }

}

function showFocusedChannel() {

    if(event == undefined) {
        document.getElementById("focusedChannel").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage2">
                            <div class="focusedShowLogo" style="background-image: url(${localStorage.getItem("channels_logo")})"></div>
                        </div>

                        <div class="focusedLogoName"><h2>${localStorage.getItem("channels_name")}</h2></div>
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
        console.log("o eventDetails", eventDetails)
        const dataCriada = new Date(eventDetails.start);
        console.log("a dataCriada", dataCriada)
        //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);
        //console.log("data formatada", formatedDate)
        localStorage.setItem("selectedChannel", event.target.dataset.channelid)

        document.getElementById("focusedChannel").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage">
                            <div class="focusedShowLogo" style="background-image: url(${localStorage.getItem("channels_logo")})"></div>
                        </div>

                        <div class="focusedLogoName"><h2>${localStorage.getItem("channels_name")}</h2></div>
                    </div>

                    <div class="focusedDetailsContainer">
                        <div class="focusedShowGenresAndDuration">
                            <h6>Gênero: ${eventDetails.genres}</h6>
                            <h6>|</h6>
                            ${eventDetails.episode !== "null" ? `<h6>${eventDetails.episode}</h6>` : ''}
                            ${eventDetails.episode !== "null" ? `<h6>|</h6>` : ''}

                            <div class="focusedInfoStart">
                            <img src="../../images/clock.png" class="clock"></img>
                            <h6>${eventDetails.start}</h6>
                            </div>
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



function showChannelEventsToday(eventToday, eventYesterday, eventAnotherDay) {
    console.log("o array é ", eventToday)
    document.getElementById("channelEvents").innerHTML =
    `
            <div class="channelEventsTodayContainer">
                <div class="channelEventInfoContainer">
                    <div class="channelInfoTitle">
                        <div class="channelInfoContainer selected">
                            <button
                            id="btn"
                            data-type="Live"
                            class="selectedCategoryCard"
                            >
                            <h3>Ao Vivo</h3>
                            
                            </button>

                            <button
                            id="btn1"
                            data-type="Today"
                            class="selectedCategoryCard"
                            >
                            <h3>Hoje - ${getDayFormated + "/" + getMonthFormated}</h3>
                            
                            </button>

                            <button
                            id="btn2"
                            data-type="LastDay"
                            class="selectedCategoryCard"
                            >
                            <h3>Ontem - ${getAnotherDay1 + "/" + getMonthFormated}</h3>
                            
                            </button>

                            <button
                            id="btn3"
                            data-type="AnotherDay"
                            class="selectedCategoryCard"
                            >
                            <h3>${getAnotherDay + "/" + getMonthFormated}</h3>
                            
                            </button>
                        
                        </div>
                    </div>

                    <div id="contentShow" class="channelInfoList selected">

                </div>

            </div>
    `



    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    
    const btn = document.getElementById('btn');
    btn.addEventListener('focus', event => {   
        //console.log("dados2", event.view.getUpdateEpgEventsV2())   
        if(event.target.dataset.type === "Live"){
          var watchingNow =  eventToday.slice(-1)[0]
          console.log("na live está", watchingNow)
          //console.log("show my list", myList)

          document.getElementById("contentShow").innerHTML =
          `
          <div class="channelInfoList selected">
            <div class="cardsChannelInfo">
                <button
                    class="selectedCategoryCard"
                    
                    onfocus="showFocusedChannel()"
                    onKeyDown="storageContent()"
                    onclick="storageContent()"
                    data-id=" ${watchingNow.id}"
                    data-duration="${watchingNow.duration}"
                    data-type="${watchingNow.type}"
                    data-genres="${watchingNow.genres}"
                    data-channelId="${watchingNow.channels_id}"
                    data-start="${watchingNow.start}"
                    data-title="${watchingNow.title}"
                    data-description="${watchingNow.description}"
                    data-rating="${watchingNow.rating}"
                    data-end="${watchingNow.end}"
                    data-logo="${watchingNow.channels_logo}"
                    data-imageWidescreen="${watchingNow.image_widescreen}"
                    data-image="${watchingNow.image}"
                    data-episode="${watchingNow.episode}"
                    data-subtitle="${watchingNow.subtitle}"
                    data-live="${true}"

                    style="
                    background-image: url(${watchingNow.image}); 
                    background-size: cover; 
                    background-repeat: no-repeat;
                    background-position: top center;
                    object-fit: cover
                    "
                    >

                    <div class="channelInfoListDetailsContainer">
                    <div class="channelInfoDetailDate">
                        <img src="../../images/clock.png" class="clock"></img>
                        <h6>${getHour(watchingNow.start)}</h6>
                    </div>


                    <div class="channelInfoDetailRate bannerRating
                    ${watchingNow.rating < 10 ? "bannerRatingL" : ''} 
                    ${watchingNow.rating == 10 ? "bannerRating10" : ''} 
                    ${watchingNow.rating == 12 ? "bannerRating12" : ''} 
                    ${watchingNow.rating == 14 ? "bannerRating14" : ''} 
                    ${watchingNow.rating == 16 ? "bannerRating16" : ''} 
                    ${watchingNow.rating == 18 ? "bannerRating18" : ''} 
                    "><h3>${watchingNow.rating == 0 ? "L" : watchingNow.rating}</h3>
                    
                    </div>
                
                </div>
                </button>
            </div>



            <div class="marginToScrolling"></div>
        </div>              
          
        `




    





  
        console.log("data", event.view)

  
      }
  
    });

    btn1.addEventListener('focus', event => {      
        if(event.target.dataset.type === "Today"){
  
          //console.log("show my list", myList)
          document.getElementById("contentShow").innerHTML =
          `
          <div class="channelInfoList selected">
          ${eventToday.map((card, idx) => {
            //console.log("o event", eventToday)
            return(`
                <div class="cardsChannelInfo">
                    <button
                    class="selectedCategoryCard"
                    onfocus="showFocusedChannel()"
                    onKeyDown="storageContent()"
                    onclick="storageContent()"
                    data-id=" ${card.id}"
                    data-duration="${card.duration}"
                    data-type="${card.type}"
                    data-genres="${card.genres}"
                    data-channelId="${card.channels_id}"
                    data-start="${card.start}"
                    data-title="${card.title}"
                    data-description="${card.description}"
                    data-rating="${card.rating}"
                    data-end="${card.end}"
                    data-logo="${card.channels_logo}"
                    data-imageWidescreen="${card.image_widescreen}"
                    data-image="${card.image}"
                    data-episode="${card.episode}"
                    data-subtitle="${card.subtitle}"
                    data-live="${false}"


                    style="
                    background-image: url(${card.image}); 
                    background-size: cover; 
                    background-repeat: no-repeat;
                    background-position: top center;
                    object-fit: cover
                    ">

                    <div class="channelInfoListDetailsContainer">
                        <div class="channelInfoDetailDate">
                            <img src="../../images/clock.png" class="clock"></img>
                            <h6>${getHour(card.start)}</h6>
                        </div>


                        <div class="channelInfoDetailRate bannerRating
                        ${card.rating < 10 ? "bannerRatingL" : ''} 
                        ${card.rating == 10 ? "bannerRating10" : ''} 
                        ${card.rating == 12 ? "bannerRating12" : ''} 
                        ${card.rating == 14 ? "bannerRating14" : ''} 
                        ${card.rating == 16 ? "bannerRating16" : ''} 
                        ${card.rating == 18 ? "bannerRating18" : ''} 
                        "><h3>${card.rating == 0 ? "L" : card.rating}</h3>
                        
                        </div>
                    
                    </div>
                    
                    </button>
                </div>
            
            `)
        })}

            <div class="marginToScrolling"></div>
        </div>              
          
        `
  
  
  
      }
  
    });
    btn2.addEventListener('focus', event => {      
        if(event.target.dataset.type === "LastDay"){
  
          //console.log("show my list", myList)
          document.getElementById("contentShow").innerHTML =
          `
          <div class="channelInfoList selected">
            ${eventYesterday.map((card, idx) => {

                return(`
                    <div class="cardsChannelInfo">
                        <button
                        class="selectedCategoryCard"
                        onfocus="showFocusedChannel()"
                        onKeyDown="storageContent()"
                        onclick="storageContent()"
                        data-id=" ${card.id}"
                        data-duration="${card.duration}"
                        data-type="${card.type}"
                        data-genres="${card.genres}"
                        data-channelId="${card.channels_id}"
                        data-start="${card.start}"
                        data-title="${card.title}"
                        data-description="${card.description}"
                        data-rating="${card.rating}"
                        data-end="${card.end}"
                        data-logo="${card.channels_logo}"
                        data-imageWidescreen="${card.image_widescreen}"
                        data-image="${card.image}"
                        data-episode="${card.episode}"
                        data-subtitle="${card.subtitle}"
                        data-live="${false}"

                        style="
                        background-image: url(${card.image}); 
                        background-size: cover; 
                        background-repeat: no-repeat;
                        background-position: top center;
                        object-fit: cover
                        ">

                        <div class="channelInfoListDetailsContainer">
                            <div class="channelInfoDetailDate">
                                <img src="../../images/clock.png" class="clock"></img>
                                <h6>${getHour(card.start)}</h6>
                            </div>


                            <div class="channelInfoDetailRate bannerRating
                            ${card.rating < 10 ? "bannerRatingL" : ''} 
                            ${card.rating == 10 ? "bannerRating10" : ''} 
                            ${card.rating == 12 ? "bannerRating12" : ''} 
                            ${card.rating == 14 ? "bannerRating14" : ''} 
                            ${card.rating == 16 ? "bannerRating16" : ''} 
                            ${card.rating == 18 ? "bannerRating18" : ''} 
                            "><h3>${card.rating == 0 ? "L" : card.rating}</h3>
                            
                            </div>
                        
                        </div>
                        
                        </button>
                    </div>
                
                `)
            })}

            <div class="marginToScrolling"></div>
        </div>              
          
        `
  
  
  
      }
  
    });
    btn3.addEventListener('focus', event => {      
        if(event.target.dataset.type === "AnotherDay"){
  
          //console.log("show my list", myList)
          document.getElementById("contentShow").innerHTML =
          `
          <div class="channelInfoList selected">
            ${eventAnotherDay.map((card, idx) => {

                return(`
                    <div class="cardsChannelInfo">
                        <button
                        class="selectedCategoryCard"
                        onfocus="showFocusedChannel()"
                        onKeyDown="storageContent()"
                        onclick="storageContent()"
                        data-id=" ${card.id}"
                        data-duration="${card.duration}"
                        data-type="${card.type}"
                        data-genres="${card.genres}"
                        data-channelId="${card.channels_id}"
                        data-start="${card.start}"
                        data-title="${card.title}"
                        data-description="${card.description}"
                        data-rating="${card.rating}"
                        data-end="${card.end}"
                        data-logo="${card.channels_logo}"
                        data-imageWidescreen="${card.image_widescreen}"
                        data-image="${card.image}"
                        data-episode="${card.episode}"
                        data-subtitle="${card.subtitle}"
                        data-live="${false}"

                        style="
                        background-image: url(${card.image}); 
                        background-size: cover; 
                        background-repeat: no-repeat;
                        background-position: top center;
                        object-fit: cover
                        ">

                        <div class="channelInfoListDetailsContainer">
                            <div class="channelInfoDetailDate">
                                <img src="../../images/clock.png" class="clock"></img>
                                <h6>${getHour(card.start)}</h6>
                            </div>


                            <div class="channelInfoDetailRate bannerRating
                            ${card.rating < 10 ? "bannerRatingL" : ''} 
                            ${card.rating == 10 ? "bannerRating10" : ''} 
                            ${card.rating == 12 ? "bannerRating12" : ''} 
                            ${card.rating == 14 ? "bannerRating14" : ''} 
                            ${card.rating == 16 ? "bannerRating16" : ''} 
                            ${card.rating == 18 ? "bannerRating18" : ''} 
                            "><h3>${card.rating == 0 ? "L" : card.rating}</h3>
                            
                            </div>
                        
                        </div>
                        
                        </button>
                    </div>
                
                `)
            })}
            <div class="marginToScrolling"></div>
        </div>              
          
        `
  
  
  
      }
  
    });




}
