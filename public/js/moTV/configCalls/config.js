const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const language = 'pt';
const devicesType = 'webos';

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
async function getSubscribedChannels() {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;


    showLoading();
    
    await axios.post('https://hospitality.youcast.tv.br/getSubscribedAndLockedChannels', {
    authorization: 'Bearer ' + auth,
    includeData: true,
    profileId: profile,
    language: language,
    devicesType: devicesType,
}).then(function (response) {
    if(response.data.status == 1){
        var allChannels = response.data.response;

        load1 = true;
        if(load1 == true ) {
            loaded.style.display = "none";
            showConfigOptions(allChannels)
        
        }
        //getFavoriteChannels();
        //console.log("o getSubscribedAndLockedChannels", allChannels)

    }
}).catch(function (response) {
    console.log("o response de erro", response)
})   

}
getSubscribedChannels();



//------ FUNÇÕES DE EXIBIÇÃO DE CONTEUDO
function showConfigOptions(allChannels) {


    document.getElementById('showConfigOptions').innerHTML =
    `
    <div class="configOptionsContainer">

        <div class="configHeader">
        <h1>Configurações</h1>
        </div>

        <div class="configContent">
            <div class="configOptionsContent">
                <div class="optionsButtonColumn selected">
                    <button onclick="" onfocus="showMyAccount()" class="optionsButton selectedCategoryCard">Minha Conta</button>
                    <button onclick="" onfocus="showQrLogin()" class="optionsButton selectedCategoryCard">QR Login</button>
                    <button id="btn" onclick="" class="optionsButton selectedCategoryCard">Canais Favoritos</button>
                    <button onclick="" onfocus="showPreferences()" class="optionsButton selectedCategoryCard">Preferências do APP</button>
                    <button onclick="goBack()" onKeyDown="goBack()" onfocus="" class="optionsButton selectedCategoryCard">Voltar para Home</button>
                    <button onclick="logout()" onKeyDown="logout()" onfocus="" class="optionsButton selectedCategoryCard">Sair</button>
                </div>
            </div>
        </div>


    </div>
    `
    const btn = document.getElementById('btn');
    btn.addEventListener('focus', event => {   
        showFavoriteChannels(allChannels)

  
    });

    
}
function showMyAccount() {
    document.getElementById('showConfigFocused').innerHTML =
    `
    <div class="configShowOptionsContent">
        <div class="focusedOptionsHeader">
            <h2>MY ACCOUNT</h2>
        </div>
    </div>
    `

}
function showQrLogin() {
    document.getElementById('showConfigFocused').innerHTML =
    `
    <div class="configShowOptionsContent">
        <div class="focusedOptionsHeader">
            <h2>QR LOGIN</h2>
        </div>

        <div class="focusedQrLoginContainer">
            <div class="focusedQrLoginDescription">
                <h4>1. Entre no App que você deseja se conectar e clique em QR Code.</h4>
                <h4>2. Ao clicar no QR Code, irá aparecer um código.</h4>
                <h4>3. Escreva o mesmo código no campo ao lado e clique em Enviar</h4>
                <h4>4. Feito isso você irá conseguir logar no APP.</h4>
                <h4>5. OBS: Consulte a disponibilidade máxima de dispositivos com a administração.</h4>
            </div>

            <div class="focusedQrLoginForm">
                <input id="input-code" class="form-field selectedQR" type="text" placeholder="Codigo QR">
                <button class="selectedQR" onclick="loginQrCode()">Enviar</button>
                <div id="responseLogin" class="qrResponseContainer">
                
                </div>

            </div>
        </div>
    
    </div>
    `
}
function showFavoriteChannels(allChannels) {

    document.getElementById('showConfigFocused').innerHTML =
    `
    <div class="configShowOptionsContent">
        <div class="focusedOptionsHeader">
            <h2>Favorite Channels</h2>

        </div>
        
            <div id="myChannels"></div>
    </div>
    `
    
    async function getFavoriteChannels() {
        var loaded = document.getElementById("loadingContent");
        var load1 = false;
        showLoading();

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
                showChannels(response.data.response)
                //showConfigOptions(response.data.response);
                //filterAllChannels(allChannels, updateEpgEvents, response.data.response);
            }
            //console.log("o getFavoriteChannels", response.data.response);
    
        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    } getFavoriteChannels();


    function showChannels(favoriteChannels) {
        console.log("o event", favoriteChannels)
        console.log("o event2", allChannels)


        document.getElementById('myChannels').innerHTML =
        `
        <div class="channelInfoList selected">
        ${allChannels.map((card, idx) => {
            return(`
            <div class="cardsChannelInfo">
            ${favoriteChannels.length > 0 
                ? 
                    favoriteChannels.includes(card.channels_id) == true 
                    ? 
                    `
                    <button
                    class="selectedCategoryCard"
                    onfocus=""
                    onKeyDown="removeFavoriteChannel()"
                    onclick="removeFavoriteChannel()"
                    data-id="${card.channels_id}"
                  >
                    <div class="cardChannelLogo" 
                    style="
                    background-image: url(${card.channels_logo
                    }); 
                    background-size: 70%; 
                    background-repeat: no-repeat;
                    background-position: center;
                    object-fit: contain
                    "
                    ></div>
    
                    <div class="cardChannelFavorite">
                        <img src="../../images/heartFavorite.png" class="cardChannelIcon"></img>
                    </div>
                    
                    </button>
                    `
                    : 
                    `
                    <button
                    class="selectedCategoryCard"
                    onfocus=""
                    onKeyDown="addToFavoriteChannel()"
                    onclick="addToFavoriteChannel()"
                    data-id="${card.channels_id}"
                  >
                    <div class="cardChannelLogo" 
                    style="
                    background-image: url(${card.channels_logo
                    }); 
                    background-size: 70%; 
                    background-repeat: no-repeat;
                    background-position: center;
                    object-fit: contain
                    "
                    ></div>
    
                    <div class="cardChannelFavorite">
                    <img src="../../images/heart.png" class="cardChannelIcon"></img>
                    </div>
                    
                    </button>
                    `
                
                
                
                
                : 
                `
                <button
                class="selectedCategoryCard"
                onfocus=""
                onKeyDown="removeFavoriteChannel()"
                onclick="removeFavoriteChannel()"
                data-id="${card.channels_id}"

              >

                <div class="cardChannelLogo" 
                style="
                background-image: url(${card.channels_logo
                }); 
                background-size: 70%; 
                background-repeat: no-repeat;
                background-position: center;
                object-fit: contain
                "
                ></div>

                <div class="cardChannelFavorite">
                <img src="../../images/heart.png" class="cardChannelIcon"></img>
                </div>
                
                </button>
                `
                
            }

            </div>
          
          `)
      })}

          <div class="marginToScrolling"></div>
      </div>
        `
    
    }





}
function showPreferences() {

    document.getElementById('showConfigFocused').innerHTML =
    `
    <div class="configShowOptionsContent">
        <div class="focusedOptionsHeader">
            <h2>PREFERENCES</h2>
        </div>


    </div>
    `
}
showConfigOptions()




async function addToFavoriteChannel() {

    const addFavoriteChannel =
        await axios.post('https://hospitality.youcast.tv.br/addFavoriteChannel', {
        authorization: 'Bearer ' + auth,
        profileId: profile,
        language: language,
        devicesType: devicesType,
        channelsId: parseInt(event.target.dataset.id)
    }).then(function (response) {
        if(response.data.status == 1){
            self.location.reload()
            getSubscribedChannels()
            getFavoriteChannels()

        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
}
async function removeFavoriteChannel() {

    const removeFromFavoriteChannel =
        await axios.post('https://hospitality.youcast.tv.br/removeFavoriteChannel', {
        authorization: 'Bearer ' + auth,
        profileId: profile,
        language: language,
        devicesType: devicesType,
        channelsId: parseInt(event.target.dataset.id)
    }).then(function (response) {
        if(response.data.status == 1){
            self.location.reload()
            getSubscribedChannels()
            getFavoriteChannels()

        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
}






function goBack() {
    if(event.keyCode === 13) {
        window.location.href = "../catalog/catalog.html";
    }
}
function logout() {
    if(event.keyCode === 13) {
        localStorage.clear();
        window.location.href = "../../";
    }
}

async function loginQrCode() {
    var login = document.getElementById("input-code").value;
    var loginWaiting = document.getElementById("responseLogin").innerHTML = `<h4>Aguarde...</h4>`
    var loginValue = parseInt(login);
    console.log("O code", loginValue);

    const loginQrCode = await axios.post('https://hospitality.youcast.tv.br/loginWithQrCodeExternal', {
        authorization: 'Bearer ' + auth,
        includeData: true,
        profileId: profile,
        language: language,
        devicesType: devicesType,
        code: loginValue
    }).then(function (response) {
        if(response.data.status == 1){
            console.log("deu login", response)
            var loginWaiting = document.getElementById("responseLogin").innerHTML = `<h4>Login efetuado com sucesso! Você já pode utilizar o App em seu dispositivo.</h4>`


        }
    }).catch(function (response) {
        var loginWaiting = document.getElementById("responseLogin").innerHTML = `<h4>Alguma coisa deu errado. Entre em contato com a administração!</h4>`

        console.log("o response de erro", response)
    })

}







function showButtonAddFavorite(favoriteChannels) {
    console.log("meus canais favoritos", favoriteChannels)
    console.log("evento aqui", event.target.dataset)
    var channelId = watchingNow.channels_id;

    var toCheckFavorite;
    if(favoriteChannels.length > 0) {
        toCheckFavorite = favoriteChannels.includes(channelId)

        console.log("o resultado", toCheckFavorite)
    } else {
        toCheckFavorite = false
    }

    document.getElementById("possibleFavoriteChannel").innerHTML = `
        <button 
        class="selectedCategoryCard"
        data-channelId="${channelId}"
        onKeyDown="${toCheckFavorite === true ? "rvk()" : "addToFavoriteChannel()"}" 
        onclick="${toCheckFavorite === true ? "rvk()" : "addToFavoriteChannel()"}" 
        >
            <h3>${toCheckFavorite === true ? "Remover canal dos favoritos" : "Adicionar canal aos favoritos"}</h3>
        </button>
    `

}

/* 
async function checkFavoriteChannels() {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;
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
            showButtonAddFavorite(response.data.response)

        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
    } 
    getFavoriteChannels();
}

checkFavoriteChannels();
*/