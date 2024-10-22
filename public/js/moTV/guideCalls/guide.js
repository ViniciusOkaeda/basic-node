// Tamanho máximo da programação dos canais 11910, tamanho do margin maximo 392

//filtrar o ao vivo por data de início e de fim
const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const selectedChannelId = parseInt(localStorage.getItem("selectedChannel"))
const language = 'pt';
const devicesType = 'webos';

let arrayOfHours = [
    { hour: "00:00" },
    { hour: "00:30" },
    { hour: "01:00" },
    { hour: "01:30" },
    { hour: "02:00" },
    { hour: "02:30" },
    { hour: "03:00" },
    { hour: "03:30" },
    { hour: "04:00" },
    { hour: "04:30" },
    { hour: "05:00" },
    { hour: "05:30" },
    { hour: "06:00" },
    { hour: "06:30" },
    { hour: "07:00" },
    { hour: "07:30" },
    { hour: "08:00" },
    { hour: "08:30" },
    { hour: "09:00" },
    { hour: "09:30" },
    { hour: "10:00" },
    { hour: "10:30" },
    { hour: "11:00" },
    { hour: "11:30" },
    { hour: "12:00" },
    { hour: "12:30" },
    { hour: "13:00" },
    { hour: "13:30" },
    { hour: "14:00" },
    { hour: "14:30" },
    { hour: "15:00" },
    { hour: "15:30" },
    { hour: "16:00" },
    { hour: "16:30" },
    { hour: "17:00" },
    { hour: "17:30" },
    { hour: "18:00" },
    { hour: "18:30" },
    { hour: "19:00" },
    { hour: "19:30" },
    { hour: "20:00" },
    { hour: "20:30" },
    { hour: "21:00" },
    { hour: "21:30" },
    { hour: "22:00" },
    { hour: "22:30" },
    { hour: "23:00" },
    { hour: "23:30" },
    { hour: "00:00" }
];

function adicionaZero(numero) {
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

let getMonthFormated = (adicionaZero(timeGet.getMonth() + 1).toString());
let getDayFormated = (adicionaZero(timeGet.getDate().toString()));
let getHourFormated = (adicionaZero(timeGet.getHours().toString()));
let getMinutesFormated = (adicionaZero(timeGet.getMinutes().toString()));
let getSecondsFormated = (adicionaZero(timeGet.getSeconds().toString()));



let getAnotherDay = adicionaZero(parseInt(getDayFormated) - 2)
let getAnotherDay1 = adicionaZero(parseInt(getDayFormated) - 1)
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
//console.log("dia formatado", stringDateToFilterX);
//console.log("dia formatado2", getAnotherDay);
//console.log("dia formatado3", finalAnotherDay);

const fullDate = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + getHourFormated + ":" + getMinutesFormated + ":" + getSecondsFormated
const fullDate2 = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + hours
const fullDate3 = currentYear + "-" + getMonthFormated + "-" + getDayFormated
const fullDate4 = currentYear + "-" + getMonthFormated + "-" + finalAnotherDay + "T" + infoCompleteHour
const stringDate = fullDate.toString();
const stringDate2 = fullDate4.toString();

//console.log ("o fullDate", fullDate)
//console.log ("o fullDate2", fullDate2)
//console.log("o fullDate", stringDate2)

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

    //console.log("o options", dataCriada)
    //console.log("o que tem no datacriada", new Intl.DateTimeFormat("en-US", options).format(dataCriada))
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(dataCriada);



    return formatedDate;
}

async function getEventHour(date) {
    const dataC = new Date(date);
    //console.log("aaaa", dataC.getHours())
    //const hr2 = dataC.getHours()
    //const hora = ("0" + dataC.getHours()).slice(-2); // Obter a hora com zero à esquerda se necessário
    //console.log("a hr", hora)
    //const intHora = parseInt(hr2)

    return dataC;

}

async function getEventMinute(date) {
    const dataC = new Date(date.toString());
    const hora = ("0" + dataC.getHours()).slice(-2); // Obter a hora com zero à esquerda se necessário

    //console.log("vejamos")

    return hora;

}

function showAvailableDays() {

}

async function getSubscribedChannels() {

    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();
    if (localStorage.getItem("catId") == null) {
        localStorage.setItem("catId", "null")
    }



    async function getSubscribedAndLockedChannels() {
        await axios.post('https://hospitality.youcast.tv.br/getSubscribedAndLockedChannels', {
            authorization: 'Bearer ' + auth,
            includeData: true,
            profileId: profile,
            language: language,
            devicesType: devicesType,
        }).then(function (response) {
            if (response.data.status == 1) {
                var allChannelsId = response.data.response.map(e => e.channels_id);
                var allChannelsDetail = response.data.response;


                //console.log("os canais são", response.data.response.map( e => e.channels_id) )

                function dividirArrayEmGrupos(arrayOriginal, tamanhoGrupo) {
                    const grupos = [];
                    for (let i = 0; i < arrayOriginal.length; i += tamanhoGrupo) {
                        grupos.push(arrayOriginal.slice(i, i + tamanhoGrupo));
                    }
                    return grupos;
                }

                const arrayOriginal = Array.from({ length: 50 }, (_, i) => i + 1);
                const grupos = dividirArrayEmGrupos(response.data.response.map(e => e.channels_id), 15);

                //console.log("Array Original:", arrayOriginal);
                //console.log("Grupos de 10 elementos:", grupos);


                async function getUpdateEpgEventsV2() {
                    await axios.post('https://hospitality.youcast.tv.br/getEpgUpdatedEventsV2Resumed', {
                        authorization: 'Bearer ' + auth,
                        includeData: true,
                        profileId: profile,
                        language: language,
                        devicesType: devicesType,
                        liveOnly: true,
                        channels: allChannelsId,
                        timestamp: 0,
                        from: stringDate2,
                        to: stringDate,
                        channels: grupos
                    }).then(async function (response) {

                        if (response.status == 200) {

                            var allEpgChannelsDetail = response.data

                            var data1 = await response.data.filter(e => e.start.includes(stringDateToFilterX) || e.end.includes(stringDateToFilterX))
                            var data2 = await response.data.filter(e => e.start.includes(stringDateToFilter) || e.end.includes(stringDateToFilter))
                            var data3 = await response.data.filter(e => e.start.includes(stringDateToFilter2) || e.end.includes(stringDateToFilter2))
                            console.log("et", getHourFormated)

                            const liveNow = filtrarDatasMenores(data1, stringDate)

                           // console.log("vejamos", liveNow)

                            var load1 = true;
                            if (load1 == true) {
                                loaded.style.display = "none";
                                showGuideChannels(allChannelsDetail, liveNow, data1, data2, data3)

                                //filterAllChannels(allChannels, updateEpgEvents, response.data.response);
                            }
                            //console.log("o que temos222222222222222222", response.data)




                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                }
                getUpdateEpgEventsV2()


            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })
    }
    getSubscribedAndLockedChannels();
}

showAvailableDays()
getSubscribedChannels();

async function showChannelInfo() {

        document.getElementById("focusedChannel").innerHTML =
            `
        <div class="channelInfoContainerDetail">
            <div class="channelInfoGuideDetail">
                <div class="channelInfoGuideTitle">
                <h2>${event.target.dataset.title}</h2>
                </div>
    
                <div class="channelInfoGuideMoreDetail">
                    <div class="">
                    </div>
                    <img src="${event.target.dataset.logo}"></img>
    
                    <div class="channelInfoGuideStart">
                        <img src="../../images/clock.png" class="clock"></img>
                        <h6>${formatDate(event.target.dataset.start)}</h6>
                    </div>
    
                    <h6>|</h6>
                    <div class="channelInfoGuideDuration">
                    <h6>Duração: ${formatDuration(event.target.dataset.duration)}m</h6>
                    </div>
                    <h6>|</h6>
    
    
                    <div class="channelInfoGuideRate bannerRating
                    ${event.target.dataset.rating < 10 ? "bannerRatingL" : ''} 
                    ${event.target.dataset.rating == 10 ? "bannerRating10" : ''} 
                    ${event.target.dataset.rating == 12 ? "bannerRating12" : ''} 
                    ${event.target.dataset.rating == 14 ? "bannerRating14" : ''} 
                    ${event.target.dataset.rating == 16 ? "bannerRating16" : ''} 
                    ${event.target.dataset.rating == 18 ? "bannerRating18" : ''} 
                    "><h3>${event.target.dataset.rating == 0 ? "L" : event.target.dataset.rating}</h3>
                    </div>
    
    
                </div>
    
    
                <div class="channelInfoGuideDescription">
                <h4>${formatDescriptionLength(event.target.dataset.description)}</h4>
    
                </div>
            </div>
    
    
            <div class="channelInfoGuideImage" 
            style="background-image: radial-gradient(circle, rgba(29,32,31,0) 0%, rgba(29,32,31, 1) 85%, rgba(29,32,31,1) 100%), url(${event.target.dataset.imagewidescreen == "null" ? event.target.dataset.image : event.target.dataset.imagewidescreen}); background-size: cover; object-fit: contain">
            </div>
        </div>
        `

}

showChannelInfo();
async function showGuideChannels(allChannelsDetail, liveNow, eventToday, eventYesterday, eventAnotherDay) {

    
    //console.log("o q temos", allChannelsDetail)

    document.getElementById("availableDays").innerHTML =
        `
        <div class="channelEventsTodayContainer">
            <div class="channelEventInfoContainer">
                <div class="channelInfoTitle">
                        <div class="channelInfoContainer selected">
                        
                        <button
                        id="btn1"
                        data-type="Today"
                        class="selectedCategoryCard"
                        >
                        <h4>Hoje - ${getDayFormated + "/" + getMonthFormated}</h4>
                        
                        </button>
                        <button
                        id="btn"
                        data-type="Live"
                        class="selectedCategoryCard"
                        >
                        <h4>Ao Vivo</h4>
                        
                        </button>

                            <button
                            id="btn2"
                            data-type="LastDay"
                            class="selectedCategoryCard"
                            >
                            <h4>Ontem - ${getAnotherDay1 + "/" + getMonthFormated}</h4>
                            
                            </button>

                            <button
                            id="btn3"
                            data-type="AnotherDay"
                            class="selectedCategoryCard"
                            >
                            <h4>${getAnotherDay + "/" + getMonthFormated}</h4>
                            
                            </button>
                        
                        </div>
                    </div>

                </div>

            </div>
    `

    const btn = document.getElementById('btn');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');



    btn.addEventListener('focus', event => {

        //console.log("dados2", event.view.getUpdateEpgEventsV2())   
        if (event.target.dataset.type === "Live") {

            //console.log("o evento", eventToday.map(e => getEventHour(e.start) < getHourFormated))


            //console.log("na live está", liveNow)

            document.getElementById("allChannels").innerHTML =
            `
        <div class="table-wrapper">
<div class="table">
<div class="header">
  <div class="cell guideFirstInfo"><h4>Hoje</h4></div> <!-- Espaço em branco para a célula superior esquerda -->
  <div class="cell guideInfoHour"><h4>Programação ao vivo</h4></div>
  
  <!-- Adicione mais colunas se necessário -->
</div>
<div class="data selected">
    ${allChannelsDetail.map((e, idx) => {
        //console.log("vamos ver os chanel")
        return(`
        <div class="data-row selectedGuideChannel">
            <div class="cell guideFirstInfo">
            <img src="${e.channels_logo}"></img>
            </div>

            ${liveNow.filter(today => today.channels_id === e.channels_id).map((guide, idx) => {
                return(`
                <button class="selectedGuideCard cellButton"
                onfocus="showChannelInfo()"
                onclick=""
                data-id=" ${guide.id}"
                data-duration="${guide.duration}"
                data-type="${guide.type}"
                data-genres="${guide.genres}"
                data-channelId="${guide.channels_id}"
                data-start="${guide.start}"
                data-title="${guide.title}"
                data-rating="${guide.rating}"
                data-description="${guide.description}"
                data-end="${guide.end}"
                data-logo="${guide.channels_logo}"
                data-imageWidescreen="${guide.image_widescreen}"
                data-image="${guide.image}"
                data-episode="${guide.episode}"
                data-subtitle="${guide.subtitle}"
                data-live="${false}"
                
                >
                    <div class="cellButtonDiv" style="width: ${formatDuration(guide.duration * 8)}px">${guide.title}</div>
                </button>
                `)

            })}
        </div>
        `)
    })}
  
  <!-- Adicione mais linhas se necessário -->
</div>
</div>
</div>
        `

        }

    });
    btn1.addEventListener('focus', event => {
        if (event.target.dataset.type === "Today") {

            console.log("o que temos pr hoje", eventToday)
            document.getElementById("allChannels").innerHTML =
                `
            <div class="table-wrapper">
  <div class="table">
    <div class="header">
      <div class="cell guideFirstInfo"></div> <!-- Espaço em branco para a célula superior esquerda -->
      
      ${arrayOfHours.map((e, idx) => {

        return (`
        <div class="cell guideInfoHour"><h4>${e.hour}</h4></div>
        `)
        })}
      
      <!-- Adicione mais colunas se necessário -->
    </div>
    <div class="data selected">
        ${allChannelsDetail.map((e, idx) => {
            console.log("vamos ver os chanel")
            return(`
            <div class="data-row selectedGuideChannel">
                <div class="cell guideFirstInfo">
                <img src="${e.channels_logo}"></img>
                </div>

                ${eventToday.filter(today => today.channels_id === e.channels_id).map((guide, idx) => {
                    //console.log("vejamos", guide)
                    return(`
                    <button class="selectedGuideCard cellButton"
                    onfocus="showChannelInfo()"
                    onKeyDown=""
                    onclick=""
                    data-id=" ${guide.id}"
                    data-duration="${guide.duration}"
                    data-type="${guide.type}"
                    data-genres="${guide.genres}"
                    data-channelId="${guide.channels_id}"
                    data-start="${guide.start}"
                    data-title="${guide.title}"
                    data-rating="${guide.rating}"
                    data-description="${guide.description}"
                    data-end="${guide.end}"
                    data-logo="${guide.channels_logo}"
                    data-imageWidescreen="${guide.image_widescreen}"
                    data-image="${guide.image}"
                    data-episode="${guide.episode}"
                    data-subtitle="${guide.subtitle}"
                    data-live="${false}"
                    
                    >
                        <div class="cellButtonDiv" style="width: ${formatDuration(guide.duration * 8)}px">${guide.title}</div>
                    </button>
                    `)

                })}
            </div>
            `)
        })}
      
      <!-- Adicione mais linhas se necessário -->
    </div>
  </div>
</div>
            `

        }

    });
    btn2.addEventListener('focus', event => {
        if (event.target.dataset.type === "LastDay") {

            document.getElementById("allChannels").innerHTML =
                `
            <div class="table-wrapper">
  <div class="table">
    <div class="header">
      <div class="cell guideFirstInfo"></div> <!-- Espaço em branco para a célula superior esquerda -->
      
      ${arrayOfHours.map((e, idx) => {

        return (`
        <div class="cell guideInfoHour"><h4>${e.hour}</h4></div>
        `)
        })}
      
      <!-- Adicione mais colunas se necessário -->
    </div>
    <div class="data selected">
        ${allChannelsDetail.map((e, idx) => {
            console.log("vamos ver os chanel")
            return(`
            <div class="data-row selectedGuideChannel">
                <div class="cell guideFirstInfo">
                <img src="${e.channels_logo}"></img>
                </div>

                ${eventYesterday.filter(today => today.channels_id === e.channels_id).map((guide, idx) => {
                    //console.log("vejamos", guide)
                    return(`
                    <button class="selectedGuideCard cellButton"
                    onfocus="showChannelInfo()"
                    onKeyDown=""
                    onclick=""
                    data-id=" ${guide.id}"
                    data-duration="${guide.duration}"
                    data-type="${guide.type}"
                    data-genres="${guide.genres}"
                    data-channelId="${guide.channels_id}"
                    data-start="${guide.start}"
                    data-title="${guide.title}"
                    data-rating="${guide.rating}"
                    data-description="${guide.description}"
                    data-end="${guide.end}"
                    data-logo="${guide.channels_logo}"
                    data-imageWidescreen="${guide.image_widescreen}"
                    data-image="${guide.image}"
                    data-episode="${guide.episode}"
                    data-subtitle="${guide.subtitle}"
                    data-live="${false}"
                    
                    >
                        <div class="cellButtonDiv" style="width: ${formatDuration(guide.duration * 8)}px">${guide.title}</div>
                    </button>
                    `)

                })}
            </div>
            `)
        })}
      
      <!-- Adicione mais linhas se necessário -->
    </div>
  </div>
</div>
            `



        }

    });
    btn3.addEventListener('focus', event => {
        if (event.target.dataset.type === "AnotherDay") {

            document.getElementById("allChannels").innerHTML =
                `
            <div class="table-wrapper">
  <div class="table">
    <div class="header">
      <div class="cell guideFirstInfo"></div> <!-- Espaço em branco para a célula superior esquerda -->
      
      ${arrayOfHours.map((e, idx) => {

        return (`
        <div class="cell guideInfoHour"><h4>${e.hour}</h4></div>
        `)
        })}
      
      <!-- Adicione mais colunas se necessário -->
    </div>
    <div class="data selected">
        ${allChannelsDetail.map((e, idx) => {
            console.log("vamos ver os chanel")
            return(`
            <div class="data-row selectedGuideChannel">
                <div class="cell guideFirstInfo">
                <img src="${e.channels_logo}"></img>
                </div>

                ${eventAnotherDay.filter(today => today.channels_id === e.channels_id).map((guide, idx) => {
                    //console.log("vejamos", guide)
                    return(`
                    <button class="selectedGuideCard cellButton"
                    onfocus="showChannelInfo()"
                    onKeyDown=""
                    onclick=""
                    data-id=" ${guide.id}"
                    data-duration="${guide.duration}"
                    data-type="${guide.type}"
                    data-genres="${guide.genres}"
                    data-channelId="${guide.channels_id}"
                    data-start="${guide.start}"
                    data-title="${guide.title}"
                    data-rating="${guide.rating}"
                    data-description="${guide.description}"
                    data-end="${guide.end}"
                    data-logo="${guide.channels_logo}"
                    data-imageWidescreen="${guide.image_widescreen}"
                    data-image="${guide.image}"
                    data-episode="${guide.episode}"
                    data-subtitle="${guide.subtitle}"
                    data-live="${false}"
                    
                    >
                        <div class="cellButtonDiv" style="width: ${formatDuration(guide.duration * 8)}px">${guide.title}</div>
                    </button>
                    `)

                })}
            </div>
            `)
        })}
      
      <!-- Adicione mais linhas se necessário -->
    </div>
  </div>
</div>
            `

        }

    });









}

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


function filtrarDatasMenores(arrayDeDatas, dataLimite) {
    // Convertendo a data limite para objeto Date
    var dataAgora = new Date(dataLimite);

    // Filtrando o array de datas
    var datasMenores = arrayDeDatas.filter(function(data) {
        var dataInicioEvento = new Date(data.start);
        var dataFimEvento = new Date(data.end);

        if(dataInicioEvento < dataAgora && dataFimEvento >= dataAgora)
        return dataInicioEvento < dataAgora;
    });

    return datasMenores;
}
