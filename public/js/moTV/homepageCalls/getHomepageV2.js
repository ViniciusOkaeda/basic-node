
async function getHomepageV2() {
    var contentLoaded = true;
    var loaded = document.getElementById("loadingContent");
    console.log("document", document)
    console.log("document read", document.readyState)
    //console.log("o navigation", navigationOptionsMenu)
    const auth = localStorage.getItem("authorization");
    const profile = localStorage.getItem("profileid");
    const language = 'pt';
    const devicesType = 'webos';

    //https://mw.yplay.com.br/public/vod/getStreamUrlV3
    showLoading();

    const getHomepageRequest = await axios.post('https://hospitality.youcast.tv.br/getHomepageV2', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType
    })
        .then(function (response) {
            console.log("o response", response)
            if (response.data.status == 1) {
                console.log("a home", response.data.response.map(e => e.data.map(e => e.image                    )));
                loaded.style.display = "none";
                showSliderInitial(response.data.response);
                showCategoriesCards(response.data.response);

                //showBannerInitial(response.data.response);
                //bloco para gerar imagem e informações do banner 

                //fim do bloco do banner


                //document.getElementById('myHomepageP').innerHTML = titleSelected.title;
            }
        }).catch(function (response) {
            console.log("o response de erro", response)

        })

}

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



function showSliderInitial(response) {
    const sliderScreen = response.map(e => e.data.filter(e => e.image_widescreen !== null && e.type === 'TV')).filter(e => e.length > 0);
    const numero = Math.floor(Math.random() * sliderScreen.length);
    const categorySelected = sliderScreen[numero];
    //console.log("o que tem no slider", sliderScreen);
    //console.log("o que tem no numero", numero);
    //console.log("o que tem no slider filtrado", sliderScreen[numero]);
    //console.log("o que tem no categoryselected ", categorySelected);
    document.getElementById('mySliderInitial').innerHTML =
        `
    <div data-slide="slide" class="slide">
        <div class="leftShadow"></div>
        <div class="slide-items">
    ${categorySelected.map((slide, idx) => {

            return (`
            <div style=" display: block;
            transform: translateY(-20px);
            transition: 800ms ease-out;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(29, 32, 33, 1) 85%), url(${slide.image_widescreen}); width: 100%; height: 100%; background-size: cover"
            >
                <div class="bannerInfo">
                    <div class="bannerInfoImgLogo">
                        <image src="${slide.channels_logo}" style="width: 160px; margin-left: 30px; background-color: rgba(30, 30, 30, 0.6); border-radius: 5px"></image>
                    </div>

                    <div class="bannerInfoTitle">
                        <div class="genresAndSeasonAndDuration">
                            <div class="genres">
                                <h6>Categoria: ${slide.genres}</h6>
                            </div>

                            <h6>${slide.episode !== null ? "|" : ""}</h6>
                            <div class="${slide.episode !== null ? "season" : ""}">                             
                            <h6>${slide.episode !== null ? slide.episode : ""}</h6>
                            </div>

                            <h6>${slide.duration !== null ? "|" : ""}</h6>
                            <div class="duration">                             
                            <h6>Duração: ${slide.duration / 60}m</h6>
                            </div> 
                        </div>

                        <div class="titleInfoAndRating">
                            <h1>${slide.title}</h1>
                            <div class="bannerRating
                            ${slide.rating < 10 ? "bannerRatingL" : ''} 
                            ${slide.rating == 10 ? "bannerRating10" : ''} 
                            ${slide.rating == 12 ? "bannerRating12" : ''} 
                            ${slide.rating == 14 ? "bannerRating14" : ''} 
                            ${slide.rating == 16 ? "bannerRating16" : ''} 
                            ${slide.rating == 18 ? "bannerRating18" : ''} 
                            ">
                                <h2>${slide.rating == 0 ? "L" : slide.rating}</h2>
                            </div>
                        </div>

                        <h4>${slide.subtitle !== null ? slide.subtitle + ': ' : ""}${slide.description}</h4>
                    </div>

                    <div class="bannerRatingButton">
                        <div class="bannerButton">
                        </div>


                    </div>



                </div>
            </div>
            `)
        })}
        </div>
        
        <nav class="slide-nav">
            <div class="slide-thumb"></div>
        </nav>
    </div>
    `

    class SlideStories {
        constructor(id) {
            this.slide = document.querySelector(`[data-slide="${id}"]`)
            this.active = 0;
            this.init()
        }

        activeSlide(index) {
            this.active = index;
            this.items.forEach((item) => item.classList.remove('active'));
            this.items[index].classList.add('active');
            this.thumbItems.forEach((item) => item.classList.remove('active'));
            this.thumbItems[index].classList.add('active');
            this.autoSlide();
        }

        prev() {
            if (this.active > 0) {
                this.activeSlide(this.active - 1);
            } else {
                this.activeSlide(this.items.length - 1);
            }
        }

        next() {
            if (this.active < this.items.length - 1) {
                this.activeSlide(this.active + 1);
            } else {
                this.activeSlide(0);
            }
        }

        addNavigation() {
            const nextBtn = this.slide.querySelector('.slide-next');
            const prevBtn = this.slide.querySelector('.slide-prev');
            //nextBtn.addEventListener('click', this.next);
            // prevBtn.addEventListener('click', this.prev);
        }

        addThumbItems() {
            this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
            this.thumbItems = Array.from(this.thumb.children);
        }

        autoSlide() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.next, 9000);
        }

        init() {
            this.next = this.next.bind(this);
            this.prev = this.prev.bind(this);
            this.items = this.slide.querySelectorAll('.slide-items > *');
            this.thumb = this.slide.querySelector('.slide-thumb');
            this.addThumbItems();
            this.activeSlide(0);
            this.addNavigation();
        }
    }


    new SlideStories('slide');
}

function showCategoriesCards(response) {

    document.getElementById('contentCategories').innerHTML =
        `
    ${response.filter(e => e.type == 'category selection').map((e, idx) => {
            //console.log("o e", e)
            return (`
            <div class="containerCategories">
                <div class="contentCategories ">
            
                    <div class="cardTitle">
                        <h2  class="">${e.title}</h2>
                    </div>


                        <div class="cardFlex selected">
                        ${e.data.map(e => {
                return (`
                                <div class="cardsInfo">
                                    <button
                                        data-id=" ${e.id}"
                                        data-duration="${e.duration}"
                                        data-type="${e.type}"
                                        data-channelId="${e.channels_id}"
                                        data-start="${e.start}"
                                        data-title="${e.title}"
                                        data-description="${e.description}"
                                        data-rating="${e.rating}"
                                        data-end="${e.end}"
                                        data-logo="${e.channels_logo}"
                                        data-episode="${e.episode}"
                                        data-subtitle="${e.subtitle}"

                                        onfocus="showEventInfo()"
                                        onKeyDown="storageContent()"
                                        onclick="storageContent()"
                                        class="selectedCategoryCard"
                                        style="
                                            background-image: url(${e.image}); 
                                            background-size: cover; 
                                            background-repeat: no-repeat;
                                            background-position: center;
                                            object-fit: contain
                                    "></button>
                                </div>
                                                            
                            `)
            })}

                            <div class="marginToScrolling"> </div>

                        </div>
                    
                        <div class="cardMore moreCardInfoContent" id="moreCardInfo">
                    


                </div>
            </div>
            `)
        })}
    <div class="marginToScrolling2"></div>
    `

}

function storageContent() {

    if(event.keyCode === 13) {
        switch (event.target.dataset.type) {
    
            case "TV":
                console.log("foi a tv");
                console.log("foi a tv", event.target.dataset);
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("selectedChannel", event.target.dataset.channelid)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
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
    //var result = Object.entries(objeto)
    //var str = idVod2;
    //localStorage.setItem("contentId", idVod2)
    console.log("o evento", event.target.dataset)
    //console.log("o idChannel", idChannel)
    //console.log("o type", type)
}

function showEventInfo() {
    console.log("o event", event.target.dataset)
    var indexCard = parseInt(sessionStorage.getItem("indexCount"));
    console.log("o document", document.querySelectorAll(".moreCardInfoContent"))
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




document.addEventListener('DOMContentLoaded', getHomepageV2());

