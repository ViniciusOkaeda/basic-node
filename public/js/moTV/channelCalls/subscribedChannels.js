

const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
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
const seconds = timeGet.getMinutes();
const currentYear = timeGet.getFullYear();
const today = timeGet.getDate();
const currentMonth = timeGet.getMonth() + 1; 
const timezone = timeGet.getTime();

let getMonthFormated = (adicionaZero(timeGet.getMonth()+1).toString() );
let getDayFormated = (adicionaZero(timeGet.getDate().toString()) );
let getHourFormated = (adicionaZero(timeGet.getHours().toString()));
let getMinutesFormated = (adicionaZero(timeGet.getMinutes().toString()));
let getSecondsFormated = (adicionaZero(timeGet.getSeconds().toString()));
//console.log("mes formatado", getMonthFormated);
//console.log("dia formatado", getDayFormated);

const fullDate = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + getHourFormated + ":" + getMinutesFormated + ":" + getSecondsFormated
const fullDate2 = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + hours 
const fullDate3 = currentYear + "-" + getMonthFormated + "-" + getDayFormated
const stringDate = fullDate.toString();

console.log ("o fullDate", fullDate)
console.log ("o fullDate2", fullDate2)
console.log ("o fullDate3", fullDate3)

function formatDate(date) {
    const dataCriada = new Date(date.toString());
    const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);

    return formatedDate;
}

function showChannelEvents() {

    if(event.keyCode === 13) {
        window.location.href = '/pages/selected-channel/selectedchannel.html'

    }
    //localStorage.setItem("channels_logo", event.target.dataset.channels_logo)
    //localStorage.setItem("channels_name", event.target.dataset.channels_name)
    
}

async function getSubscribedChannels() {

    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();
    if(localStorage.getItem("catId") == null) {
        localStorage.setItem("catId", "null")
    }



    async function getSubscribedAndLockedChannels() {
        await axios.post('https://hospitality.youcast.tv.br/getSubscribedAndLockedChannels', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
    }).then(async function (response) {
        if(response.data.status == 1){
            var allChannels = await response.data.response;

            async function getUpdateEpgEventsV2() {
                await axios.post('https://hospitality.youcast.tv.br/getEpgUpdatedEventsV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                liveOnly: true,
                timestamp: 0,
                from: stringDate,
                to: stringDate
            }).then(async function (response) {
                if(response.status == 200){

                    var updateEpgEvents = await response.data

                    //console.log("o getEpgInfo", updateEpgEvents.data)

                    async function getFavoriteChannels() {
                        await axios.post('https://hospitality.youcast.tv.br/getFavoriteChannels', {
                        authorization: 'Bearer ' + auth,
                        includeData: true,
                        profileId: profile,
                        language: language,
                        devicesType: devicesType,
                        timestamp: 0
                    }).then(async function (response) {
                        if(response.data.status == 1){
                            load1 = true;
                            if(load1 == true ) {
                                loaded.style.display = "none";
                                filterAllChannels(allChannels, updateEpgEvents, await response.data.response);
                            }
                            //console.log("o getFavoriteChannels", response.data.response);
        
                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                    } 
                    getFavoriteChannels();
        
                    //console.log("o getUpdateEpgEventsV2", response.data.response);

                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })
            }
            getUpdateEpgEventsV2() 

            //console.log("o getSubscribedAndLockedChannels", allChannels)

        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    }
    getSubscribedAndLockedChannels(); 





    const getChannelCategories = await axios.post('https://hospitality.youcast.tv.br/getChannelCategories', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
        timestamp: 0
    }).then(function (response) {
        if(response.data.status == 1){
            
            showChannelCategories(response.data.response)
            //console.log("o getChannelCategories", response.data.response);
        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })

}

getSubscribedChannels();


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

function showFocusedChannel() {

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

                        <div class="focusedLogoName"></div>
                    </div>

                    <div class="focusedDetailsContainer">
                        <div class="focusedShowDescription">
                        <h3>Assista seus canais favoritos agora mesmo!</h3>
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
        console.log("o length da imagem wide é", eventDetails.channels_image_widescreen.length)
        //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(eventDetails.channels_start).toISOString()
        //console.log("formatou", formatedDate)
        //console.log("formatou", eventDetails.channels_start.toLocaleDateString('pt-BR'))
        //console.log("tem epg2", event.target.dataset)
        const dataCriada = new Date(eventDetails.channels_start);
        console.log("a dataCriada", dataCriada)
        //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);
        //console.log("data formatada", formatedDate)
        localStorage.setItem("selectedChannel", event.target.dataset.channels_id)
        localStorage.setItem("channels_logo", event.target.dataset.channels_logo)
        localStorage.setItem("channels_name", event.target.dataset.channels_name)

        document.getElementById("focusedChannel").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage">
                            <div class="focusedShowLogo" style="background-image: url(${eventDetails.channels_logo})"></div>
                        </div>

                        <div class="focusedLogoName"><h2>${eventDetails.channels_name}</h2></div>
                    </div>

                    <div class="focusedDetailsContainer">
                        <div class="focusedShowGenresAndDuration">
                            <h6>Gênero: ${eventDetails.channels_genre}</h6>
                            <h6>|</h6>
                            ${eventDetails.channels_season_and_ep !== "null" ? `<h6>${eventDetails.channels_season_and_ep}</h6>` : ''}
                            ${eventDetails.channels_season_and_ep !== "null" ? `<h6>|</h6>` : ''}

                            <div class="focusedInfoStart">
                            <img src="../../images/clock.png" class="clock"></img>
                            <h6>${formatDate(eventDetails.channels_start)}</h6>
                            </div>
                        </div>

                        <div class="focusedShowDescription">
                            <h3>Hoje: ${eventDetails.channels_title}</h3>
                            <h4>${formatDescriptionLength(eventDetails.channels_description)}</h4>
                        </div>

                        <div class="focusedShowGenresAndDuration">
                        <h6>Duração: ${formatDuration(eventDetails.channels_duration)}m</h6>
                        </div>
                    </div>
                </div>
            
            </div>



            <div class="${eventDetails.channels_image_widescreen == "null" ? "emphasisCard" : "focusedNone"}"

            style="
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.channels_image_widescreen == "null" ? eventDetails.channels_image : ""})
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
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.channels_image_widescreen !== "null" ? eventDetails.channels_image_widescreen : eventDetails.channels_image});
        ${eventDetails.channels_image_widescreen == "null" ? "filter: blur(200px)" : ""}
        "
        >
        
        </div>

        `

    }


}
showFocusedChannel();



function showChannelCategories(channelCategories) {
    document.getElementById("channelCategories").innerHTML = 
    `
    <div class="channelCategoriesContent selected">
        <button 
        id="ts1"
        data-category-id="null"
        data-category-name="Todos" 
        onKeyDown="selectCategory()" 
        onfocus="" 
        class="
        ${localStorage.getItem("categoryTvName") == "Todos"? "selectedContent" : "channelButton"}
         selectedCategoryCard">Todos</button>

        <button 
        id="ts2"
        data-category-id="4294967294" 
        data-category-name="Favoritos"
        onKeyDown="selectCategory()" 
        onfocus="" 
        class="
        ${localStorage.getItem("categoryTvName") == "Favoritos"? "selectedContent" : "channelButton"}
         selectedCategoryCard">Favoritos</button>
        <span class="Bar">|</span>
        ${channelCategories.filter(e => e.channels_categories_name != "Favoritos").map((e, idx) => {

            return(`
            <button
            id="ts${idx + 3}" 
            data-category-id="${e.channels_categories_id}" 
            data-category-name="${e.channels_categories_name}"
            data-category-length="${idx + 3}"
            onKeyDown="selectCategory()" 
            onfocus="" 
            class="
            ${localStorage.getItem("categoryTvName") == e.channels_categories_name ? "selectedContent" : "channelButton"}
                 
                selectedCategoryCard
                ">${e.channels_categories_name}</button>
            
            `);
        })}
    </div>
    
    `

    console.log("temos evento?", event)



    const btn = document.getElementById('ts' +[3]);

    btn.addEventListener('focus', event => {

        console.log("ocorreu algo")
    })

}

function selectCategory() {

    if(event.keyCode === 13) {
        if(event.target.dataset.categoryId == null) {
            localStorage.setItem("catId", "null");
        }else if(event.target.dataset.categoryId != null) {
            localStorage.setItem("catId", event.target.dataset.categoryId)
            localStorage.setItem("categoryTvName", event.target.dataset.categoryName)
            getSubscribedChannels();
        }
    }

}

function filterAllChannels(subscribedChannels, epgEvents, favoriteChannels) {
const category = localStorage.getItem("catId");
    if(category == "null"){
        console.log("o resultado1", subscribedChannels);
        showChannels(subscribedChannels, epgEvents);

    }else if (category != "null" && category != "4294967294"){
        //console.log("o teste", subscribedChannels.filter(e => e.channels_categories.filter(e => e == 5) == 5 ) )
        const filteredChannels = subscribedChannels.filter(e => e.channels_categories.filter(e => e == parseInt(category)) == parseInt(category) );
        console.log("o resultado2", filteredChannels);
        showChannels(filteredChannels, epgEvents)

    }else if (category == "4294967294") {
        const filteredFavoriteChannels = subscribedChannels.filter(id => favoriteChannels.map(e => e).includes(id.channels_id))
        console.log("o resultado3", filteredFavoriteChannels)
        showChannels(filteredFavoriteChannels, epgEvents);
    }
}



async function showChannels(channels, epgEvents) {

    if(event) {
       // console.log("tem evento do category", event.target.dataset)
    }
//console.log("os canais são", channels)
//console.log("meus canais sao", channels)
const filteredChannels = channels;
const filteredEpg = await epgEvents
//console.log("o testes", testes.map(e => e))



document.getElementById("allChannels").innerHTML = 
`
<div class="allChannelsContainer">

<div class="allChannelsContent selected">
${filteredChannels.map((item, idx) => {
    //console.log("o item", item)    

            //console.log("o que tem no testes", epgEvents.filter(e => e.content.channels_id === item.channels_id))

            //console.log("datenow", dateNow.getTime())
            //fullDate
            //console.log("o date1", date1)
            //const obj = epgEvents.filter(e => e.start.includes(fullDate2) ? e.start.includes(fullDate2) : e.start.includes(fullDate3));
            //const obj2 = epgEvents.filter(e => testDate(e.start) === dateGetTimeNow ? e : testDate(e.start) < dateGetTimeNow ? e : "");
            //console.log("resultado obj2", obj2)
            //${console.log("vejamos o teste", epgEvents.filter(e => e.channels_id == item.channels_id )[epgEvents.filter(e => e.channels_id == item.channels_id ).length -1] )}
            console.log("meu epg", epgEvents)
            
            return(`
            <div class="channelContainer">
            ${
            
            filteredEpg.filter(e => e.content.channels_id === item.channels_id).map(e => {
                return(
                    `
                    <button class="channelButtonShow selectedCategoryCard"
                    onKeyDown="showChannelEvents()"
                    onclick="showChannelEvents()"
                    onfocus="showFocusedChannel()"
                    data-channels_id="${item.channels_id}"
                    data-channels_name="${item.channels_name}"
                    data-channels_logo="${item.channels_logo}"
                    data-channels_description="${e.content.description}"
                    data-channels_title="${e.content.title}"
                    data-channels_subtitle="${e.content.subtitle}"
                    data-channels_start="${e.content.start}"
                    data-channels_end="${e.content.end}"
                    data-channels_image="${e.content.image}"
                    data-channels_image_widescreen="${e.content.image_widescreen}"
                    data-channels_genre="${e.content.genres}"
                    data-channels_duration="${e.content.duration}"
                    data-channels_season_and_ep="${e.content.episode}"
                    >
                        <div class="channelImageShow" style="background-image: url(${item.channels_logo})"></div>
                    </button>
                    `
                )
            })
                }
            </div>
            `)
        })}

        <div class="marginToScrolling4"></div>
    </div>


</div>
`


}


