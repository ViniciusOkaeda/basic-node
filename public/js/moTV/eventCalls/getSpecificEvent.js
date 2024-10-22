const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const type = localStorage.getItem("type");
const events = localStorage.getItem("event");
const content = localStorage.getItem("idContent");
const language = 'pt';
const devicesType = 'webos';
async function getSpecificEvent() {

    switch (type) {
        case "TV":
            console.log("foi tv")
            const getSpecificEventRequestTV = await axios.post('https://hospitality.youcast.tv.br/getUpdatedEventsV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                ids: [parseInt(events)],
                timestamp: 0
            }).then(function (response) {
                console.log("o response", response)
                if (response.data.status == 1) {
                    console.log("o getUpdatedEventsV2", response.data.response);
                    showEventInitial(response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            const getRecomendationEventRequestTV = await axios.post('https://hospitality.youcast.tv.br/getEventRecommendationRows', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                id: parseInt(events),
                type: type
            }).then(function (response) {
                console.log("o response", response)
                if (response.data.status == 1) {
                    console.log("o EventRecomendations", response.data.response);
                    showEventRecomendations(response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            break;
        case "VOD":

            const getSpecificEventRequestVod = await axios.post('https://hospitality.youcast.tv.br/getDataV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                vodsId: parseInt(events),
                timestamp: 0
            }).then(function (response) {
                console.log("o response getSpecificEventRequestVod", response)
                if (response.data.status == 1) {
                    console.log("o getDataV2", response.data.response);
                    showEventInitial([response.data.response]);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            const getRecomendationEventRequestVod = await axios.post('https://hospitality.youcast.tv.br/getEventRecommendationRows', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                id: parseInt(events),
                type: type
            }).then(function (response) {
                console.log("o response getRecomendationEventRequestVod", response)
                if (response.data.status == 1) {
                    console.log("o EventRecomendations", response.data.response);
                    showEventRecomendations(response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })
            break;
        case "Category":

            const getSpecificEventRequestCategory = await axios.post('https://hospitality.youcast.tv.br/getCategory', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                categoriesId: parseInt(events),
                timestamp: 0
            }).then(function (response) {
                console.log("o response", response)
                if (response.data.status == 1) {
                    console.log("o getUpdatedEventsV2", response.data.response);
                    showCategoryEventInitial([response.data.response.category]);
                    showEventRecomendations(response.data.response.rows)
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            const getRecomendationEventRequestCategory = await axios.post('https://hospitality.youcast.tv.br/getEventRecommendationRows', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                id: parseInt(events),
                type: type
            }).then(function (response) {
                console.log("o response", response)
                if (response.data.status == 1) {
                    console.log("o EventRecomendations", response.data.response);
                    showEventRecomendations(response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })
            break;

    }





}
getSpecificEvent();

function formatDuration(duration) {

    const durationEvent = (duration / 60);

    const total = durationEvent.toFixed(0);

    return total;

}

function formatDate(date) {
    const dataCriada = new Date(date.toString());
    const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);

    return formatedDate;
}

function formatDescriptionLength(description) {
    const formatedDescription = description.length <= 250 ? description : description.substring(0, 250) + "...";

    return formatedDescription;
}

function checkDate(arrayDate) {

    let newDate = new Date(arrayDate)

    let newGetTimeDate = newDate.getTime()

    //console.log("o newdate", newDate)
    return newGetTimeDate
}

async function getMyListAndRecordings() {


    switch (type) {
        case "TV":
            console.log("foi tv")
            const getSpecificEventRequestTV = await axios.post('https://hospitality.youcast.tv.br/getUpdatedEventsV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                ids: [parseInt(events)],
                timestamp: 0
            }).then(async function (response) {
                if (response.data.status == 1) {
                    let dataSpecificEvent = response.data.response

                    const getRecordingsByProfileV2 = await axios.post('https://hospitality.youcast.tv.br/getRecordingsByProfileV2', {
                        authorization: 'Bearer ' + auth,
                        includeData: true,
                        profileId: profile,
                        language: language,
                        devicesType: devicesType,
                    }).then(async function (response) {
                        if(response.data.status == 1){
                            var myRecordings = response.data.response.map(e => e)
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
                                    

                                    showMyListAndRecordingBtn(dataSpecificEvent, "TV", myRecordings, myList)
        
                                }
                            }).catch(function (response) {
                                console.log("o response de erro", response)
                            })
                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            break;
        case "VOD":

            const getSpecificEventRequestVod = await axios.post('https://hospitality.youcast.tv.br/getDataV2', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                vodsId: parseInt(events),
                timestamp: 0
            }).then(async function (response) {
                //console.log("o response getSpecificEventRequestVod", response)
                if (response.data.status == 1) {
                    let dataSpecificEvent = response.data.response

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

                            var myRecordings = [""]
                            

                            showMyListAndRecordingBtn(dataSpecificEvent, "VOD", myRecordings, myList)

                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            break;
        case "Category":

            const getSpecificEventRequestCategory = await axios.post('https://hospitality.youcast.tv.br/getCategory', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                categoriesId: parseInt(events),
                timestamp: 0
            }).then(async function (response) {
                console.log("o response", response)
                if (response.data.status == 1) {
                    let dataSpecificEvent = response.data.response

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

                            var myRecordings = [""]
                            

                            showMyListAndRecordingBtn(dataSpecificEvent, "Category", myRecordings, myList)

                        }
                    }).catch(function (response) {
                        console.log("o response de erro", response)
                    })
                    //showCategoryEventInitial([response.data.response.category]);
                    //showEventRecomendations(response.data.response.rows)
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })

            break;

    }





}
getMyListAndRecordings();

async function removeFromMyList() {

    if(event.keyCode === 13) {
        const removeFromMyList = await axios.post('https://hospitality.youcast.tv.br/removeFromMyList', {
            authorization: 'Bearer ' + auth,
            includeData: true,
            profileId: profile,
            language: language,
            type: event.target.dataset.type,
            id: parseInt(event.target.dataset.id),
            devicesType: devicesType,
        }).then(async function (response) {
            if(response.data.status == 1){
                getMyListAndRecordings();
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })

    }

    

}
async function addToMyList() {

    if(event.keyCode === 13) {
        const addToMyList = await axios.post('https://hospitality.youcast.tv.br/addToMyList', {
            authorization: 'Bearer ' + auth,
            includeData: true,
            profileId: profile,
            language: language,
            type: event.target.dataset.type,
            id: parseInt(event.target.dataset.id),
            devicesType: devicesType,
        }).then(async function (response) {
            if(response.data.status == 1){
                getMyListAndRecordings();
    
    
    
    
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })

    }




}
async function removeRecording() {

    if(event.keyCode === 13) {
        const removeFromMyList = await axios.post('https://hospitality.youcast.tv.br/removeRecording', {
            authorization: 'Bearer ' + auth,
            includeData: true,
            profileId: profile,
            language: language,
            epgEventsId: parseInt(event),
            devicesType: devicesType,
        }).then(async function (response) {
            if(response.data.status == 1){
                getMyListAndRecordings();
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })

    }
    

}
async function addRecordingV2() {
        console.log("o evento está aqui", event.target.dataset)
    if(event.keyCode === 13){
        const addToMyList = await axios.post('https://hospitality.youcast.tv.br/addRecordingV2', {
            authorization: 'Bearer ' + auth,
            includeData: true,
            profileId: profile,
            language: language,
            epgEventsId: parseInt(event.target.dataset.id),
            devicesType: devicesType,
        }).then(async function (response) {
            if(response.data.status == 1){
                getMyListAndRecordings();
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })

    }
}

function showMyListAndRecordingBtn(dataSpecificEvent, type ,myRecordings, myList) {


    if(type === "TV"){
        var watchingNow =  dataSpecificEvent.slice(-1)[0]
        var savedInMyList = watchingNow.id
        
        var haveInList = myList.response.map(e => e.id)
        var boolSavedOrNot = haveInList.includes(savedInMyList)
        console.log("o watchingNow", watchingNow)
        console.log("o myRecordings", myRecordings)
        
        if(myRecordings.length > 0) {
            
            var myRecordingsSlice1 =  myRecordings.slice(-1)[0]
            var myRecordingsSlice2 =  myRecordingsSlice1.data.map(e => e.id)
            console.log("o evento", myRecordingsSlice1.data.map(e => e.id))
            var haveInRecordings = myRecordingsSlice2
        } else {
            var myRecordingsSlice1 =  myRecordings
            var haveInRecordings = myRecordingsSlice1
        }
        
        //console.log("o que tem no mylist", haveInList)

        var boolSavedOrNotRec = haveInRecordings.includes(savedInMyList)
        //console.log("o que tem no mylist", haveInList.includes(savedInMyList))
        //console.log("o que tem no saved", savedInMyList)
    
    
            document.getElementById("myListButton").innerHTML = `
                <div class="infoButtonMyList">
                <button 
                onKeyDown="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
                onclick="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
                data-type="${watchingNow.type}" 
                data-id="${watchingNow.id}" 
                class="selectedCategoryCard">${boolSavedOrNot === true ? "REMOVER DA MINHA LISTA" : "ADICIONAR PARA MINHA LISTA"}</button>
                
                </div>
    
            `
            document.getElementById("myRecordingButton").innerHTML = `
                <div class="infoButtonMyList">
                <button 
                onKeyDown="${boolSavedOrNotRec === true ? "removeRecording()" : "addRecordingV2()"}"
                onclick="${boolSavedOrNotRec === true ? "removeRecording()" : "addRecordingV2()"}"
                data-id="${watchingNow.id}" 
                data-type="${watchingNow.type}" 
                class="selectedCategoryCard">${boolSavedOrNotRec === true ? "REMOVER DAS GRAVAÇÕES" : "GRAVAR"}
                </button>
                </div>
    
            `


    }

    if(type === "VOD" || type === "Category"){

        var watchingNow =  dataSpecificEvent
        var savedInMyList = watchingNow.id
        
        var haveInList = myList.response.map(e => e.id)
        var boolSavedOrNot = haveInList.includes(savedInMyList)

        document.getElementById("myListButton").innerHTML = `
        <div class="infoButtonMyList">
        <button 
        onKeyDown="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
        onclick="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
        data-type="${watchingNow.type}" 
        data-id="${watchingNow.id}" 
        class="selectedCategoryCard">${boolSavedOrNot === true ? "REMOVER DA MINHA LISTA" : "ADICIONAR PARA MINHA LISTA"}</button>
        
        </div>

    `
    }

}



function showEventInitial(response) {
    let dateNow = new Date()
    let dateGetTimeNow = dateNow.getTime()
    document.getElementById("myInitialInfo").innerHTML =
        `
    ${response.map((e, idx) => {
            /* */
            console.log("o type é", e.type)
            return (`
            <div class="initial" >
                <div class="initialImageBackground" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 90%), url(${e.image_widescreen == null ? e.image : e.image_widescreen})"></div>
                <div class="initialInfoContent">
                    <div class="initialInfo">


                        <div class="initialInfoTitle">
                            <div class="infoTitle">
                                <h1>${e.title}</h1>
                            </div>

                            <div class="${e.episode !== null ? "infoTitle" : "focusedNone"}">
                                <h2>${e.episode}</h2>
                            </div>

                            <div class="infoRating
                            ${e.rating < 10 ? "bannerRatingL" : ''} 
                            ${e.rating == 10 ? "bannerRating10" : ''} 
                            ${e.rating == 12 ? "bannerRating12" : ''} 
                            ${e.rating == 13 ? "bannerRating12" : ''} 
                            ${e.rating == 14 ? "bannerRating14" : ''} 
                            ${e.rating == 16 ? "bannerRating16" : ''} 
                            ${e.rating == 18 ? "bannerRating18" : ''}
                            ">
                                <h2>${e.rating == 0 ? "L" : e.rating}</h2>

                            </div>
                        </div>


                        <div class="initialInfoDetails">
                            <div class="${e.channels_logo !== undefined ? "initialInfoLogo" : "focusedNone"}">
                                <img src="${e.channels_logo}" class="infoChannelLogo"></img>
                            </div>

                            <div class="initialInfoTime">
                                <h4>Duração: ${formatDuration(e.duration)}m</h4>
                            </div>

                            <div class="initialInfoGenres">
                            <h4>Categoria: ${e.genres}</h4>
                            </div>

                            <div class="${e.start !== undefined ? "initialInfoStart" : "focusedNone"}">
                            <img src="../../images/clock.png" class="clock"></img>
                            <h4> ${e.start !== undefined ? formatDate(e.start) : e.start}</h4>
                        </div>
                        
                        </div>

                        <div class="initialInfoButtons selected">
                        
                            ${checkDate(e.start) <= dateGetTimeNow ? 
                                `
                                <div class="infoButtonPlay">
                                <button class="selectedCategoryCard" onKeyDown="showEvent()" onclick="showEvent()">
                                    <div class="btnWithIconFlex">
                                        <div class="iconBtn">
                                            <img src="../../images/tvplay.png" class="iconButton"></img>
                                        </div>

                                        <div class="btnTitle">
                                            <h4>Assistir Agora!</h4>
                                        </div>
                                    </div>
                                </button>
                                </div>
                                ` 
                            : e.type === "VOD"  ? 
                                `
                                <div class="infoButtonPlay">
                                <button class="selectedCategoryCard" onKeyDown="showEvent()" onclick="showEvent()">
                                    <div class="btnWithIconFlex">
                                        <div class="iconBtn">
                                            <img src="../../images/tvplay.png" class="iconButton"></img>
                                        </div>

                                        <div class="btnTitle">
                                            <h4>Assistir Agora!</h4>
                                        </div>
                                    </div>
                                </button>
                                </div>
                                `
                            : ""}


                            <div id="myListButton">
                            </div>

                            ${e.type !== "VOD" &&  e.type !== "Category"? 
                            `
                            <div id="myRecordingButton">
                            </div>
                            `
                             : ""}

                            
                        </div>

                        <div class="initialInfoDescription">
                            <div class="infoDescription">
                                <h3>${e.description}</h3>
                            </div>

                            <div class="${e.directors !== "" ? "infoDirectors" : "focusedNone"}">
                                <h4>Direção: ${e.directors}</h4>
                            </div>

                            <div class="shadow"></div>
                        </div>


                    </div>
                </div>
            </div>
        `)


        })}
    `
}




function showEventRecomendations(response) {
    document.getElementById("mySliderRecomendation").innerHTML =
        `
    ${response.map((e, idx) => {
            
            return(`
                <div class="eventRecomendationCards">

                    <div class="cardsInfoContainer">
                        <div class="cardsInfoTitle">
                            <h2>${e.title}</h2>
                        </div>
    
                        <div class="cardsInfoList selected">
                            ${e.data.map((card, idx) => {
    
                                return(`
                                    <div class="cardsInfo">
                                        <button
                                        class="selectedCategoryCard"
                                        onfocus="showFocusedCardInfo()"
                                        onKeyDown="showAnotherEvent()"
                                        onclick="showAnotherEvent()"
                                        data-id="${card.id}"
                                        data-duration="${card.duration}"
                                        data-type="${card.type}"
                                        data-channelId="${card.channels_id}"
                                        data-start="${card.start}"
                                        data-title="${card.title}"
                                        data-description="${card.description}"
                                        data-rating="${card.rating}"
                                        data-end="${card.end}"
                                        data-logo="${card.channels_logo}"
                                        data-episode="${card.episode}"
                                        data-subtitle="${card.subtitle}"
    
                                        style="
                                        background-image: url(${card.image}); 
                                        background-size: cover; 
                                        background-repeat: no-repeat;
                                        background-position: top center;
                                        object-fit: cover
                                        ">
                                        
                                        </button>
                                    </div>
                                
                                `)
                            })}

                            <div class="marginToScrolling"> </div>
                        </div>
    
    
                        <div id="focusedCard" class="cardsInfoDescription moreCardInfoContent">
    
                        </div>
                    </div>

                    
                </div>
            `)



        })}
    `
}



function showFocusedCardInfo() {
    console.log("o event", event.target.dataset)
    //const dataCriada = new Date(event.target.dataset.start);
    //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);
    var indexCard = parseInt(sessionStorage.getItem("indexCount"));
    document.querySelectorAll(".moreCardInfoContent")[indexCard].innerHTML =



        `
    <div class="focusedCardContent">
        <div class="focusedCardTitle">
            <h3>${event.target.dataset.title}</h3>
        </div>

        <div class="${event.target.dataset.episode !== "null" ? "focusedCardEpisode" : "focusedNone"}">
            <h3>${event.target.dataset.episode}</h3>
        </div>

        <div class="${event.target.dataset.rating != "null" ? "focusedCardRating" : "focusedNone"}
            ${event.target.dataset.rating < 10 ? "bannerRatingL" : ''} 
            ${event.target.dataset.rating == 10 ? "bannerRating10" : ''} 
            ${event.target.dataset.rating == 12 ? "bannerRating12" : ''} 
            ${event.target.dataset.rating == 13 ? "bannerRating12" : ''} 
            ${event.target.dataset.rating == 14 ? "bannerRating14" : ''} 
            ${event.target.dataset.rating == 16 ? "bannerRating16" : ''} 
            ${event.target.dataset.rating == 18 ? "bannerRating18" : ''}
        "><h3>${event.target.dataset.rating == 0 ? "L" : event.target.dataset.rating}</h3>
        </div>
    </div>

    <div class="${event.target.dataset.logo != "undefined" || event.target.dataset.duration != "undefined" ? "focusedCardContent2" : "focusedNone"}">
        <div 
        class="${event.target.dataset.logo != "undefined" ? "focusedCardLogo" : "focusedNone"}" 
        style="background-image: url(${event.target.dataset.logo}); height: 100%;"
        ></div>

        <div class="focusedCardDuration">
            <h4>Duração: ${formatDuration(event.target.dataset.duration)}m</h4>
        </div>

        <div class="${event.target.dataset.start != "undefined" ? "focusedCardStart" : "focusedNone"}">
            <h4>${event.target.dataset.start != "undefined" ? formatDate(event.target.dataset.start) : ""}</h4>
        </div>
    </div>

    <div class="focusedCardDescription">
        ${event.target.dataset.description != "" ? `<h4>${formatDescriptionLength(event.target.dataset.description)}</h4>` : `<h4>Descrição não informada.</h4>`}
    </div>
    `

}

function showEvent() {
    if(event.keyCode === 13) {
        window.location.href = '/pages/player/player.html'

    }
}

function showAnotherEvent() {
    console.log("o evento", event.target.dataset)

if(event.keyCode === 13) {
        switch (event.target.dataset.type) {

            case "TV":
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("selectedChannel", event.target.dataset.channelid)
                var timestmp = Date.parse(event.target.dataset.start) / 1000
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                localStorage.setItem("startAt", timestmp)
                window.location.href = '/pages/info-selected-content/selectedcontent.html'
                break;

            case "VOD":
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



//-- funções para category

function showCategoryEventInitial(category) {
    console.log("o que tem no category", category)
    document.getElementById("myInitialInfo").innerHTML =
        `
${category.map((e, idx) => {
            return (`
        <div class="initial" >
            <div class="initialImageBackground" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 90%), url(${e.categories_image_widescreen == null ? e.categories_image : e.categories_image_widescreen})"></div>
            <div class="initialInfoContent">
                <div class="initialInfo">
                    <div class="initialInfoTitle">
                        <div class="infoTitle">
                            <h1>${e.follow.title}</h1>
                        </div>

                        <div class="infoRating
                        ${e.follow.rating < 10 ? "bannerRatingL" : ''} 
                        ${e.follow.rating == 10 ? "bannerRating10" : ''} 
                        ${e.follow.rating == 12 ? "bannerRating12" : ''} 
                        ${e.follow.rating == 13 ? "bannerRating12" : ''} 
                        ${e.follow.rating == 14 ? "bannerRating14" : ''} 
                        ${e.follow.rating == 16 ? "bannerRating16" : ''} 
                        ${e.follow.rating == 18 ? "bannerRating18" : ''}
                        ">
                            <h2>${e.follow.rating == 0 ? "L" : e.follow.rating}</h2>

                        </div>
                    </div>


                    <div class="initialInfoDetails">
                        <div class="${e.follow.channels_logo !== undefined ? "initialInfoLogo" : "focusedNone"}">
                            <img src="${e.follow.channels_logo}" class="infoChannelLogo"></img>
                        </div>

                        <div class="initialInfoTime">
                            <h4>Duração: ${e.follow.duration / 60}m</h4>
                        </div>

                        <div class="initialInfoGenres">
                        <h4>Categoria: ${e.follow.genres}</h4>
                        </div>
                    </div>

                    <div class="initialInfoButtons selected">
                        <div class="infoButtonPlay">
                            <button class="selectedCategoryCard" onKeyDown="showEvent()" onclick="showEvent()">Assistir Agora!</button>
                        </div>

                        <div id="myListButton">
                        </div>
                    </div>

                    <div class="initialInfoDescription">
                        <div class="infoDescription">
                            <h3>${e.follow.description}</h3>
                        </div>

                        <div class="${e.follow.directors !== null ? "infoDirectors" : "focusedNone"}">
                            <h4>Direção: ${e.follow.directors}</h4>
                        </div>

                        <div class="shadow"></div>
                    </div>
                </div>
            </div>
        </div>
    `)
        })}
`
}





