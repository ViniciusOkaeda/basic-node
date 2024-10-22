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

function checkHaveSelected() {
let vodId = parseInt(localStorage.getItem("catVodId"));
let vodName = localStorage.getItem("categoryName")

if(vodId && vodName) {
    console.log("tem sim")
    getVodHomepageRow(vodId)
} else{
    console.log("tem nao");
}
}
checkHaveSelected();



function formatDate(date) {
    const dataCriada = new Date(date.toString());
    const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);

    return formatedDate;
}

function showEvents() {

    if(event.keyCode === 13) {
        localStorage.setItem("idContent", event.target.dataset.id)
        localStorage.setItem("event", event.target.dataset.id)
        localStorage.setItem("type", event.target.dataset.type)
        window.location.href = '/pages/info-selected-content/selectedcontent.html'

    }
    
}


async function getVodHomepageRow(categoryId) {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;
    if(load1 == false ) {
        loaded.style.display = "block";
    }


    async function getVodHomepageRow() {
        await axios.post('https://hospitality.youcast.tv.br/getVodHomepageRow', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
        genresId: parseInt(categoryId)
    }).then(function (response) {
        if(response.data.status == 1){
            var allVods = response.data.response;
            console.log("o response", allVods)
            showVods(response.data.response)

            load1 = true;
            if(load1 == true ) {
                loaded.style.display = "none";
            }


        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    }
    getVodHomepageRow();



}


async function getAvailableVods() {

    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();
    if(localStorage.getItem("catVodId") == null) {
        localStorage.setItem("catVodId", "null")
    }



    async function getVodHomepageRows() {
        await axios.post('https://hospitality.youcast.tv.br/getVodHomepageRows', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
    }).then(function (response) {
        if(response.data.status == 1){
            var allVods = response.data.response;
            console.log("o response", allVods)
            showVodCategories(response.data.response)

            load1 = true;
            if(load1 == true ) {
                loaded.style.display = "none";
            }


        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    }
    getVodHomepageRows(); 


}

getAvailableVods();
showFocusedVod();

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


function showFocusedVod() {

    if(event == undefined) {
        document.getElementById("focusedVod").innerHTML = 
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
                        <h3>Assista seus filmes favoritos agora mesmo!</h3>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
        `

        document.getElementById("focusedVodImage").innerHTML =
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
        //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(eventDetails.channels_start).toISOString()
        //console.log("formatou", formatedDate)
        //console.log("formatou", eventDetails.channels_start.toLocaleDateString('pt-BR'))
        //console.log("tem epg2", event.target.dataset)
        //const dataCriada = new Date(eventDetails.channels_start);
        //console.log("a dataCriada", dataCriada)
        //const formatedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(dataCriada);
        //console.log("data formatada", formatedDate)
        //localStorage.setItem("selectedChannel", event.target.dataset.channels_id)
        //localStorage.setItem("channels_logo", event.target.dataset.channels_logo)
        //localStorage.setItem("channels_name", event.target.dataset.channels_name)


        document.getElementById("focusedVod").innerHTML = 
        `
        <div class="focusedContainer">
            <div class="focusedContent">
                <div class="focusedTextInfo">
                    <div class="focusedLogoContent">
                        <div class="focusedLogoImage">
                            <div class="focusedShowLogo">
                            <h2>${localStorage.getItem("categoryName")}</h2>
                            </div>
                        </div>

                    </div>

                    <div class="focusedDetailsContainer">

                        <div class="focusedShowDescription">
                            <h3>Assista Agora: ${eventDetails.title}</h3>
                            <h4>${formatDescriptionLength(eventDetails.description)}</h4>
                        </div>

                        <div class="focusedShowGenresAndDuration">
                        <h6>Duração: ${parseInt(formatDuration(eventDetails.duration))}m</h6>
                        </div>
                    </div>
                </div>
            
            </div>



            <div class="${eventDetails.image_widescreen == "null" ? "emphasisCard" : "focusedNone"}"

            style="
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.image_widescreen == "null" ? eventDetails.image : ""})
            "
            >
            
            </div>

        </div>
        ` 

        document.getElementById("focusedVodImage").innerHTML =
        `
        <div class="focusedChannelImageColor">
        
        </div>
        <div class="focusedChannelEventImage focusedImageInfo"
        style="
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 100%), url(${eventDetails.image_widescreen !== "null" ? eventDetails.image_widescreen : eventDetails.image});
        ${eventDetails.image_widescreen == "null" ? "filter: blur(200px)" : ""}
        "
        >
        
        </div>

        `

    }


}


function showVodCategories(channelCategories) {
    document.getElementById("vodCategories").innerHTML = 
    `
    <div class="vodCategoriesContent selected">
        ${channelCategories.map((e, idx) => {

            return(`
            <button data-category-id="${e.id}" 
                    data-category-name="${e.title}"
                    onKeyDown="selectCategory()"
                    onclick="selectCategory()"
                    class="
                    ${localStorage.getItem("categoryName") == e.title ? "selectedContent" : "channelButton"}
                    selectedCategoryCard">${e.title}</button>
            
            `);
        })}
    </div>
    
    `
}

function selectCategory() {
    if(event.keyCode === 13) {
        if(event.target.dataset.categoryId == null) {
            localStorage.setItem("catVodId", "null");
        }else if(event.target.dataset.categoryId != null) {
            localStorage.setItem("catVodId", event.target.dataset.categoryId)
            localStorage.setItem("categoryName", event.target.dataset.categoryName)
            getVodHomepageRow(event.target.dataset.categoryId);
        }
    }

}

//not used
function filterAllChannels(subscribedChannels, epgEvents, favoriteChannels) {
const category = localStorage.getItem("catVodId");
    if(category == "null"){
        //showChannels(subscribedChannels, epgEvents);

    }else if (category != "null" && category != "4294967294"){
        //console.log("o teste", subscribedChannels.filter(e => e.channels_categories.filter(e => e == 5) == 5 ) )
        //const filteredChannels = subscribedChannels.filter(e => e.channels_categories.filter(e => e == parseInt(category)) == parseInt(category) );
       // console.log("o resultado", filteredChannels);
        //showChannels(filteredChannels, epgEvents)

    }else if (category == "4294967294") {
        const filteredFavoriteChannels = subscribedChannels.filter(id => favoriteChannels.map(e => e).includes(id.channels_id))
        //console.log("os canais favoritos são", filteredFavoriteChannels)
        //showChannels(filteredFavoriteChannels, epgEvents);
    }
}


async function showVods(vods) {



document.getElementById("allVods").innerHTML = 
`
<div class="allVodsContainer">

    <div class="allVodsContent selected">
        ${vods.data.map((item, idx) => {

            return(`
            <div class="vodsContainer">
                <button class="vodButtonShow selectedCategoryCard"
                onKeyDown="showEvents()"
                onclick="showEvents()"
                onfocus="showFocusedVod()"
                data-id="${item.id}"
                data-image="${item.image}"
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
                    <div class="vodlImageShow" style="background-image: url(${item.image})"></div>
                </button>
            </div>
            `)
        })}

        <div class="marginToScrolling4"></div>

    </div>


</div>
`


}


