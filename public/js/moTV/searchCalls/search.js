let lastSearch = localStorage.getItem("lastSearch")
const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const language = 'pt';
const devicesType = 'webos';


function formatDuration(duration) {

    const durationEvent = (duration / 60); 
  
    const total = durationEvent.toFixed(0);
  
    return total;
  
}

function formatDescriptionLength(description) {
    const formatedDescription = description.length <= 250 ? description : description.substring(0, 250) + "...";

    return formatedDescription;
}


async function searchPopularEvents() {

    var loaded = document.getElementById("loadingContent");
    var load1 = false;
    var type = "Popular"
    showLoading();
    async function getPopularSearches() {
        await axios.post('https://hospitality.youcast.tv.br/getPopularSearches', {
        authorization: 'Bearer ' + auth,
        profileId: profile,
        language: language,
        devicesType: devicesType,
    }).then(function (response) {
        if(response.data.status == 1){
            load1 = true;
            if(load1 == true ) {
                loaded.style.display = "none";
            }
            if(lastSearch == "" || lastSearch == "null" || lastSearch == null || lastSearch == undefined || lastSearch == "undefined") {
                showEvents(type, response)

            } 

            //console.log("o getFavoriteChannels", response.data.response);
            //filterAllChannels(allChannels, updateEpgEvents, response.data.response);

        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    } 
    getPopularSearches();




    //showLoading();


/* 
    async function getSubscribedAndLockedChannels() {
        await axios.post('https://hospitality.youcast.tv.br/getSubscribedAndLockedChannels', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
    }).then(function (response) {
        if(response.data.status == 1){
            var allChannels = response.data.response;

            async function getUpdateEpgEventsV2() {
                await axios.post('https://hospitality.youcast.tv.br/getEpgUpdatedEventsV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                timestamp: 0,
                from: stringDate,
                to: stringDate
            }).then(function (response) {
                if(response.data.status == 1){
                    var updateEpgEvents = response.data.response
                    //console.log("o getEpgInfo", updateEpgEvents)

                    async function getFavoriteChannels() {
                        await axios.post('https://hospitality.youcast.tv.br/getFavoriteChannels', {
                        authorization: 'Bearer ' + auth,
                        includeData: true,
                        profileId: profile,
                        language: language,
                        devicesType: devicesType,
                        timestamp: 0
                    }).then(function (response) {
                        if(response.data.status == 1){
                            load1 = true;
                            if(load1 == true ) {
                                loaded.style.display = "none";
                            }
                            //console.log("o getFavoriteChannels", response.data.response);
                            filterAllChannels(allChannels, updateEpgEvents, response.data.response);
        
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

*/

}

function showTextAndKeyboard() {
    document.getElementById("textAndKeyboardAndEvent").innerHTML = 
    `
    <div class="generalContainer">
        <div class="textAndKeyboardContainer">
            <div class="textArea">
                <textarea>${lastSearch}</textarea>
            </div>

            <div class="keyboard selected">
                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">A</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">B</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">C</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">D</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">E</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">F</button>
                </div>

                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">G</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">H</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">I</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">J</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">K</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">L</button>
                </div>
                
                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">M</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">N</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">O</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">P</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">Q</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">R</button>
                </div>


                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">S</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">T</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">U</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">V</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">W</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">X</button>
                </div>

                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">Y</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">Z</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">1</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">2</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">3</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">4</button>
                </div>

                <div class="row selectedMenuKeyboard">
                <button class="btn buttonStyle selectedMenuKeyboardItem">5</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">6</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">7</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">8</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">9</button>
                <button class="btn buttonStyle selectedMenuKeyboardItem">0</button>
                </div>

                <div class="row selectedMenuKeyboard">
                <button class="space buttonStyle selectedMenuKeyboardItem">
                <image class="keyboardImage" src="../../images/space.png"></image>

                </button>
                <button class="delete buttonStyle selectedMenuKeyboardItem">
                <image class="keyboardImage" src="../../images/delete.png"></image>

                </button>
                </div>

                <div class="row selectedMenuKeyboard">
                <button class="btnClear clear buttonStyle selectedMenuKeyboardItem">Limpar Tudo</button>
                </div>

            
            </div>
        </div>

        <div id="showSearch"></div>
        <div id="showSearched"></div>
    </div>
    `

    const buttons = document.querySelectorAll('.btn')
    const textarea = document.querySelector('textarea')
    
    const delete_btn = document.querySelector('.delete')
    const space_btn = document.querySelector('.space')
    
    let chars = []
    if(lastSearch !== "" || lastSearch !== "null" || lastSearch !== null || lastSearch !== undefined || lastSearch !== "undefined") {
        textarea.value = lastSearch
        chars = textarea.value.split('')
        if(lastSearch) {
            searchEvents();
        }
    } else {
        searchPopularEvents();
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            textarea.value += btn.innerText
            chars = textarea.value.split('')
            localStorage.setItem("lastSearch", textarea.value)
            searchEvents();

        })


    })

    delete_btn.addEventListener('click', () => {
        chars.pop()
        textarea.value = chars.join('')
        console.log("o que tem no textarea.value do delete", textarea.value)
        localStorage.setItem("lastSearch", textarea.value)
        searchEvents();
        if(lastSearch == "") {
            searchPopularEvents();
        }

    })
    
    space_btn.addEventListener('click', () => {
        chars.push(' ')
        textarea.value = chars.join('')
        localStorage.setItem("lastSearch", textarea.value)
        searchEvents();
        if(lastSearch == "") {
            searchPopularEvents();
        }

    })

    console.log("valores", textarea.value)


    
}
showTextAndKeyboard();

async function searchEvents() {
    var type = "Search"
    var event = localStorage.getItem("lastSearch")

    if(event !== "") {
        async function searchContent() {
            await axios.post('https://hospitality.youcast.tv.br/searchContent', {
            authorization: 'Bearer ' + auth,
            search: event,
            profileId: profile,
            language: language,
            devicesType: devicesType,
        }).then(function (response) {
            if(response.data.status == 1){

                showEvents(type, response)
                //console.log("o getFavoriteChannels", response.data.response);
                //filterAllChannels(allChannels, updateEpgEvents, response.data.response);

            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })
        } 
        searchContent();
    }


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
    
            case "Channel":
                console.log("foi a tv");
                console.log("foi a tv", event.target.dataset);
                localStorage.setItem("selectedChannel", event.target.dataset.id)
                localStorage.setItem("channels_logo", event.target.dataset.channels_logo)
                localStorage.setItem("channels_name", event.target.dataset.channels_name)
        
    
                console.log("o timestm", timestmp)
                window.location.href = '/pages/selected-channel/selectedchannel.html'
                break;
            case "TV":
                console.log("foi a tv");
                console.log("foi a tv", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.channels_id)
                localStorage.setItem("selectedChannel", event.target.dataset.channels_id)
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
function showDetailsEvent() {
    if(event.target.dataset != undefined){
        const eventDetails = event.target.dataset
        console.log("o eventDetails", eventDetails)

        document.getElementById("focusedSearchDetail").innerHTML =
        `
        <div class="searchDetailContainer">
            <div class="searchHeaderContent">
                <div class="${eventDetails.channels_logo !== "undefined" ? "initialInfoLogo" : "focusedNone"}">
                    <img src="${eventDetails.channels_logo}" class="infoChannelLogo"></img>
                </div>

                <div class="${eventDetails.channels_name !== "undefined" ? "infoPopular" : "focusedNone"}">
                    <h3>Para Você: ${eventDetails.channels_name}</h3>
                </div>

                <div class="${eventDetails.channels_name == "undefined" ? "infoPopular" : "focusedNone"}">
                    <h3>Para Você: ${eventDetails.title}</h3>
                </div>

                <div class="infoRating
                    ${eventDetails.rating < 10 ? "bannerRatingL" : ''} 
                    ${eventDetails.rating == 10 ? "bannerRating10" : ''} 
                    ${eventDetails.rating == 12 ? "bannerRating12" : ''} 
                    ${eventDetails.rating == 13 ? "bannerRating12" : ''} 
                    ${eventDetails.rating == 14 ? "bannerRating14" : ''} 
                    ${eventDetails.rating == 16 ? "bannerRating16" : ''} 
                    ${eventDetails.rating == 18 ? "bannerRating18" : ''}
                ">
                    <h3>${eventDetails.rating == 0 ? "L" : eventDetails.rating}</h3>
                </div>
            </div>

            <div class="searchDescriptionContent">
            <div class="focusedShowDescription">
                <h4>${eventDetails.description == "" || eventDetails.description == "null" || eventDetails.description == "undefined" ? "Descrição não informada." :  formatDescriptionLength(eventDetails.description)}</h4>
            </div>
            </div>

            <div class="searchMoreContent">
                <div class="infoPopular">
                <h4>Categoria: ${eventDetails.genre}</h4>
                </div>

                <div class="${eventDetails.season_and_ep == "undefined" ? "infoPopular" : "focusedNone"}">
                <h4>${eventDetails.season_and_ep}</h4>
                </div>


                <div class="infoPopular">
                <h4>Duração: ${formatDuration(eventDetails.duration)}m</h4>
                </div>


            </div>
        </div>
        `


        document.getElementById("focusedSearchImage").innerHTML =
        `
        <div class="focusedImageColor">
        
        </div>
        <div class="focusedEventImage focusedImageInfo"
        style="
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.image_widescreen !== "null" ? eventDetails.image_widescreen : eventDetails.image});
        ${eventDetails.image_widescreen == "null" ? "filter: blur(200px)" : ""}
        "
        >
        
        </div>

        `
    }
}

function showEvents(type, event) {

    if(type === "Popular"){
        console.log("o event", event)
        document.getElementById("showSearch").innerHTML =
        `
            <div class="showEventsContainer">
                <div class="eventsHeader">
                    <h2>Buscas Populares</h2>
                </div>
                <div id="focusedSearchDetail" class="eventsFocused"></div>

                <div class="eventsShowPopular selectedPopularSearches ${console.log("o target", event.target !== undefined ? event.target : "")}">
                    ${event.data.response.map((item, index) => {

                        return(`
                            <div class="popularContainer">
                                <button class="popularButtonShow selectedPopularSearchCard"
                                onKeyDown="showDetailsEvent()"
                                onclick="showDetailsEvent()"
                                onfocus="showDetailsEvent()"
                                data-id="${item.id}"
                                data-image="${item.image}"
                                data-channels_logo="${item.channels_logo}"
                                data-channels_name="${item.channels_name}"
                                data-image_width="${item.image_width}"
                                data-image_height="${item.image_height}"
                                data-image_widescreen="${item.image_widescreen}"
                                data-image_widescreen_width="${item.image_widescreen_width}"
                                data-image_widescreen_height="${item.image_widescreen_height}"
                                data-title="${item.title}"
                                data-subtitle="${item.subtitle}"
                                data-description="${item.description}"
                                data-duration="${item.duration}"
                                data-season_and_ep="${item.episode}"
                                data-type="${item.type}"
                                data-rating="${item.rating}"
                                data-genre="${item.genres}"
                                >
                                    <div class="popularImageShow" style="background-image: url(${item.image})"></div>
                                </button>
                            </div>
                        `)
                    })}
                </div>
            </div>
        `
    }else if(type === "Search") {
        document.getElementById("showSearch").innerHTML =
        `
            <div class="showEventsContainer">
                <div class="eventsHeader">
                    <h2>Resultados Encontrados:</h2>
                </div>
                <div id="focusedSearchDetail" class="eventsFocused"></div>

                <div class="channelInfoList">
                    ${event.data.response.map((ev, idx) => {

                        return(`
                            <div class="searchInfoContainer">
                                <div class="searchInfoTitle">
                                    <h2>${ev.title}</h2>
                                </div>
                
                                <div class="searchInfoList selectedSearched">
                                    ${ev.data.map((item, idx) => {
                                        //console.log("tem oq no evento", ev.title)
                                        //console.log("tem oq no item", item)
                                        return(`
                                            <div class="${ev.title == "TV" ? "searchInfo1" : "searchInfo2"}">
                                                <button
                                                class="selectedSearchCard"
                                                onfocus="showDetailsEvent()"
                                                onKeyDown="storageContent()"
                                                onclick="storageContent()"
                                                data-id="${item.id}"
                                                data-image="${item.image}"
                                                data-channels_logo="${item.channels_logo}"
                                                data-channels_id="${item.channels_id}"
                                                data-channels_name="${item.channels_name}"
                                                data-image_width="${item.image_width}"
                                                data-image_height="${item.image_height}"
                                                data-image_widescreen="${item.image_widescreen}"
                                                data-image_widescreen_width="${item.image_widescreen_width}"
                                                data-image_widescreen_height="${item.image_widescreen_height}"
                                                data-title="${item.title}"
                                                data-subtitle="${item.subtitle}"
                                                data-description="${item.description}"
                                                data-duration="${item.duration}"
                                                data-start="${item.start}"
                                                data-season_and_ep="${item.episode}"
                                                data-type="${item.type}"
                                                data-rating="${item.rating}"
                                                data-genre="${item.genres}"
            
                                                style="
                                                height: ${ev.title === "Canais" ? "150px" : ""};
                                                background-color: ${ev.title === "Canais" ? "rgba(43, 43, 43, 0.7)" : ""};
                                                background-image: url(${item.image}); 
                                                background-size: ${ev.title == "Canais" ? "150px" : "cover"}; 
                                                background-repeat: no-repeat;
                                                background-position: ${ev.title == "Canais" ? "center" : "top center"};
                                                object-fit: ${ev.title == "Canais" ? "contain" : "cover"}
                                                ">
                                                
                                                </button>
                                            </div>
                                        
                                        `)
                                    })}

                                    <div class="marginToScrolling6"></div>
                                </div>
                
                
                
                            </div>

                        `)
                    })}
                
                    <div class="marginToScrolling3"></div>
                </div>



            </div>
        `
    }
}
showEvents();

searchPopularEvents();

