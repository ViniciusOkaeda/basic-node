const typeContent = localStorage.getItem("type");



const KEYCODE = {
    //principais
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38,
    ENTER: 13, //BOTÃO OK 
    RETURN: 27,

    //secundarios e opcionais
    INFO: 457, // BOTÃO INFO
    KEY1: 49, // BOTÃO 1
    KEY2: 50, // BOTÃO 2
    KEY3: 51, // BOTÃO 3
    KEY4: 52, // BOTÃO 4
    KEY5: 53, // BOTÃO 5
    KEY6: 54, // BOTÃO 6
    KEY7: 55, // BOTÃO 7
    KEY8: 56, // BOTÃO 8
    KEY9: 57, // BOTÃO 9
    KEY0: 48, // BOTÃO 0
    QVIEW: 1007, // BOTÃO Q.VIEW
    CHANNELMORE: 33, // BOTÃO CHANNEL  up
    CHANNELANYLESS: 34, //BOTÃO CHANNEL down
    ONECIRCLE: 403,
    TWOCIRCLE: 404,
    THREECIRCLE: 405,
    FOURCIRCLE: 406,
    STOP: 413, // BOTÃO STOP (QUE POSSUI UM ICONE DE UM QUADRADO)
    RESUME: 415, // BOTÃO RESUME (QUE POSSUI UM ICONE DE PLAY)
    PAUSE: 19, // BOTÃO PAUSE (QUE POSSUI UM ICONE DE PAUSE)
    FORWARD: 417, // BOTÃO ADIANTAR (QUE POSSUI DOIS ICONES DE PLAY RIGHT)
    BACKWARD: 412, // BOTÃO RETROCEDER (QUE POSSUI DOIS ICONES DE PLAY LEFT)
    CAPTION: 460 // BOTÃO CAPTION 
};

//novas variaveis para melhorar o código

//variável para auxiliar na navegação entre menu e outros
var navigationCount = 1 // antigo toAcessMenu

//variaveis para navegação fora do menu
var containerCount = -1 //este é o antigo oneMore
var arrayCount = 0 //este é o antigo oneMoreCard
var arrayCountNext = 1 // auxiliar na navegação

var arrayQrCount = 0 // utilizar para acessar o qrlogin e o botão


//variavel para auxiliar navegação nos canais, vods em channels e movies
var arrayCountCategory = 0 //auxiliar p manter a categoria
var arrayCountChannelOrVodVertical = 0// antigo oneMoreChannelVertical
var arrayCountChannelOrVodHorizontal = 0// antigo oneMoreChannelHorizontal

//variaveis para navegação no menu
var containerMenuCount = 0 //este é o antigo ?? não utilizado até o momento
var arrayMenuCount = 1 //este é o antigo oneMoreMenu


//variaveis para navegação nos eventos do guide
var arrayGuideChannelCount =-1 //auxiliar p navegar entre as linhas de canais
var arrayGuideEventCount = 0 //auxiliar p navegar entre eventos do canal a categoria

//----------------------- Auxiliares P/ Player ---------------------

var navigationCountAux = 0 // usado apenas no player para ajudar na nagevação entre os menus esquerdo e direito



//variaveis para navegação no left menu do player
var containerLeftMenuCount = -1 //este é o antigo ?? não utilizado até o momento
var arrayLeftMenuCategoryCount = 0 //este serve para navegar nos indices das categorias de canais (esportes, infantil, etc)
var arrayLeftMenuCount = -1 //este serve para navegar nos indices dos canais disponiveis (sbt, globo, etc)

//variaveis para navegação no right menu do player
var containerRightMenuCount = -1 //este é o antigo ?? não utilizado até o momento
var arrayRightMenuCategoryCount = 0 //este serve para navegar nos indices das datas (ao vivo, ontem, etc)
var arrayRightMenuCount = -1 //este serve para navegar nos indices dos eventos (canais ao vivo, canais de ontem, etc)


//variaveis para navegação no bottom menu do player
var containerBottomMenuCount = -2 //este é o antigo ?? não utilizado até o momento
var arrayBottomMenuButtonCount = 0 //este serve para navegar na primeira linha dos botões do player
var arrayBottomMenuButtonCount2 = 0 //este serve para navegar na segunda linha dos botões do player
var arrayBottomMenuInfoCount = 0 //este serve para navegar nos botões de lista, gravar e etc
var arrayBottomMenuSimilarCount = 0 //este serve para navegar nos eventos recomendados/similar

//--------------------------------------------



///------------------------ para a pagina search --------------------------
//variaveis para navegação no keyboard
var containerKeyboardCount = -1 // antigo oneMoreKeyboard
var arrayKeyCount = 0 // antigo oneMoreKey


//variaveis p navegacao em popular searches
var containerPopularSearchCount = 0 // serve para contar os índices (linhas de conteudo, no caso de popular search so existe 1)
var arrayPopularSearchCount = -1 // serve para contar os conteúdos individualmente na linha
var arrayAuxPopularSearchCount = -1 // serve para ir até 6 para a direita e limitar a contagem

var containerSearchedCount = 0 // serve para contar os índices (linhas de conteudo)
var arraySearchedCount = -1 // serve para contar os conteúdos individualmente na linha

//variável para navegação no search
var arraySearchCount = -1 // antigo oneMoreCardSearch nao usado ainda

//variavel auxiliar p navegação no teclado virtual
var oneMoreKeyboard = 0; 
var oneMoreKey = -1;
var oneMoreCardSearch = -1;

//----------------------------------------------------------------------------------



//variavel auxiliar p navegação normal
var oneMore = -1;
var auxDontCount = true;

//variaveis auxiliar p navegação da category cards
var oneMoreCard = 0;
var focusedCard = false;

//variavel auxiliar p navegação entre canais
var oneMoreChannelVertical = 0;
var oneMoreChannelHorizontal = 0;

//variaveis para acesso e navegação do menu lateral esquerdo
var firstDownKey = false;
var oneMoreMenu = 0;
var unlockLeftMenu = false;
var toUnlockMenu = 0

// toAcessMenu = 0, então ele acessa o menu
var toAcessMenu = 1;
document.addEventListener('keydown', onKeyDown, function(e) {
    
    //oneMore++;
    //console.log("contagem", oneMore)
});

console.log("o window", window.location);

async function onKeyDown(event) {


    menuKeyboard = document.querySelectorAll('.selectedMenuKeyboard')
    //campoMenuKeyboard = document.querySelectorAll('.selectedMenuKeyboardItem')
    
    menu = document.querySelectorAll('.selectedMenu')
    //campoMenu = document.querySelectorAll('.selectedMenuItem')
    
    campo = document.querySelectorAll('.selected')
    
    campoGuide = document.querySelectorAll('.selectedGuideChannel')
    
    //campoCategory = document.querySelectorAll('.selectedCategoryCard')
    
    campoQr = document.querySelectorAll('.selectedQR')
    
    //-------------- variaveis p/ search
    
    campoPopularSearches = document.querySelectorAll('.selectedPopularSearches')
    campoSearched = document.querySelectorAll('.selectedSearched')
    
    campoPopularSearchCard = document.querySelectorAll('.selectedPopularSearchCard')
    campoSearchedCard = document.querySelectorAll('.selectedSearchCard')

    //-------------- variaveis p/ player
    campoLeft = document.querySelectorAll('.selectedLeft')
    campoRight = document.querySelectorAll('.selectedRight')
    campoBottom = document.querySelectorAll('.selectedBottom')
    
    campoLeftCategory = document.querySelectorAll('.selectedLeftCategoryCard')
    campoRightCategory = document.querySelectorAll('.selectedRightCategoryCard')
    campoBottomCategory = document.querySelectorAll('.selectedBottomCategoryCard')

    //-------------- variaveis p/ guide


    switch (event.keyCode) {
        
        case KEYCODE.DOWN:
            switch(window.location.pathname) {

                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/guide/guide.html": 
                    console.log("keycode down");
                    await moveDownSelectedGuide();
                    break;
                
                case "/pages/guide/guide.html": 
                    console.log("keycode down");
                    await moveDownSelectedGuide();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/config/config.html": 
                    console.log("keycode down");
                    await moveDownSelectedConfig();
                    break;
                
                case "/pages/config/config.html": 
                    console.log("keycode down");
                    await moveDownSelectedConfig();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/player/player.html": 
                    console.log("keycode down");
                    await moveDownPlayer();
                    break;
                
                case "/pages/player/player.html": 
                    console.log("keycode down");
                    await moveDownPlayer();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/saved/saved.html": 
                    console.log("keycode down");
                    await moveDownSelectedSaved();
                    break;
                
                case "/pages/saved/saved.html": 
                    console.log("keycode down");
                    await moveDownSelectedSaved();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/search/search.html": 
                    console.log("keycode down");
                    await moveDownSelectedSearch();
                    break;
                
                case "/pages/search/search.html": 
                    console.log("keycode down");
                    await moveDownSelectedSearch();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/channels/channels.html": 
                    console.log("keycode down");
                    await moveDownSelectedChannels();
                    break;
                
                case "/pages/channels/channels.html": 
                    console.log("keycode down");
                    await moveDownSelectedChannels();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/profile/profile.html": 
                    console.log("keycode down");
                    await moveDownSelectedProfile();
                    break;
                
                case "/pages/profile/profile.html": 
                    console.log("keycode down");
                    await moveDownSelectedProfile();

                    break;
                

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/catalog/catalog.html": 
                    console.log("keycode down");
                    await moveDownHome();
                    break;
                
                case "/pages/catalog/catalog.html": 
                    console.log("keycode down");
                    await moveDownHome();
                    break;

                
                case "/": 
                    console.log("keycode down");
                    await moveDownLogin;

                    break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/index.html":
                    await moveDownLogin();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/info-selected-content/selectedcontent.html":
                    await moveDownSelectedContent();

                    break;

                case "/pages/info-selected-content/selectedcontent.html":
                    await moveDownSelectedContent();

                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/selected-channel/selectedchannel.html":
                    await moveDownSelectedEvent();
    
                        break;
    
                case "/pages/selected-channel/selectedchannel.html":
                    await moveDownSelectedEvent();
            
                        break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/movies/movies.html": 
                    console.log("keycode down");
                    await moveDownSelectedVods();

                    break;
                    
                case "/pages/movies/movies.html": 
                    console.log("keycode down");
                    await moveDownSelectedVods();
                    break;
            }

        event.preventDefault();
        break;
        case KEYCODE.UP:
            switch(window.location.pathname) {

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/guide/guide.html": 
                console.log("keycode down");
                await moveUpSelectedGuide();
                break;
            
            case "/pages/guide/guide.html": 
                console.log("keycode down");
                await moveUpSelectedGuide();

                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/config/config.html": 
                console.log("keycode down");
                await moveUpSelectedConfig();
                break;
            
            case "/pages/config/config.html": 
                console.log("keycode down");
                await moveUpSelectedConfig();

                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/player/player.html": 
                    console.log("keycode down");
                    await moveUpPlayer();
                    break;
                
                case "/pages/player/player.html": 
                    console.log("keycode up");
                    await moveUpPlayer();
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/saved/saved.html": 
                    console.log("keycode down");
                    await moveUpSelectedSaved();
                    break;
                
                case "/pages/saved/saved.html": 
                    console.log("keycode up");
                    await moveUpSelectedSaved();
                    break;
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/search/search.html": 
                    console.log("keycode down");
                    await moveUpSelectedSearch();
                    break;
                
                case "/pages/search/search.html": 
                    console.log("keycode up");
                    await moveUpSelectedSearch();
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/profile/profile.html": 
                    console.log("keycode down");
                    await moveUpSelectedProfile();
                    break;
                
                case "/pages/profile/profile.html": 
                    console.log("keycode up");
                    await moveUpSelectedProfile();
                    break;

                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/channels/channels.html": 
                    console.log("keycode down");
                    await moveUpSelectedChannels();
                    break;
                
                case "/pages/channels/channels.html": 
                    console.log("keycode up");
                    await moveUpSelectedChannels();
                    break;
                

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/catalog/catalog.html": 
                    await moveUpHome();
                    break;
                
                case "/pages/catalog/catalog.html": 
                    await moveUpHome();
                    break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/index.html":
                    await moveUpLogin();
                    break;

                case "/index.html":
                    await moveUpLogin();
                    break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/info-selected-content/selectedcontent.html":
                    await moveUpSelectedContent();
    
                    break;

                case "/pages/info-selected-content/selectedcontent.html":
                    await moveUpSelectedContent();
    
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/selected-channel/selectedchannel.html":
                    await   moveUpSelectedEvent();
    
                        break;
    
                case "/pages/selected-channel/selectedchannel.html":
                    await moveUpSelectedEvent();
            
                        break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/movies/movies.html": 
                    console.log("keycode up");
                    await moveUpSelectedVods();
    
                    break;
                        
                case "/pages/movies/movies.html": 
                    console.log("keycode up");
                    await moveUpSelectedVods();
        
                    break;
            

        
            }



        event.preventDefault();
        break;
        case KEYCODE.LEFT:
            switch(window.location.pathname) {

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/guide/guide.html": 
                console.log("keycode down");
                await moveLeftSelectedGuide();
                break;
            
            case "/pages/guide/guide.html": 
                console.log("keycode down");
                await moveLeftSelectedGuide();

                break;
                

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/config/config.html": 
                console.log("keycode down");
                await moveLeftSelectedConfig();
                break;
            
            case "/pages/config/config.html": 
                console.log("keycode down");
                await moveLeftSelectedConfig();

                break;
                
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/player/player.html": 
                console.log("keycode left");
                await moveLeftPlayer();

                break;
            
                case "/pages/player/player.html": 
                console.log("keycode left");
                await moveLeftPlayer();
                
                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/saved/saved.html": 
                console.log("keycode left");
                await moveLeftSelectedSaved();

                break;
            
                case "/pages/saved/saved.html": 
                console.log("keycode left");
                await moveLeftSelectedSaved();
                
                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/search/search.html": 
                console.log("keycode left");
                await moveLeftSelectedSearch();

                break;
            
                case "/pages/search/search.html": 
                console.log("keycode left");
                await moveLeftSelectedSearch();
                
                break;
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/channels/channels.html": 
                console.log("keycode left");
                await moveLeftSelectedChannels();

                break;
            
                case "/pages/channels/channels.html": 
                console.log("keycode left");
                await moveLeftSelectedChannels();
                
                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/profile/profile.html": 
                console.log("keycode left");
                await moveLeftSelectedProfile();

                break;
            
                case "/pages/profile/profile.html": 
                console.log("keycode left");
                await moveLeftSelectedProfile();

                
                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/catalog/catalog.html": 
                await moveLeftHome();

                break;
                
                case "/pages/catalog/catalog.html": 
                await   moveLeftHome();

                break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/info-selected-content/selectedcontent.html":
                    await  moveLeftSelectedContent();

                    break;

                case "/pages/info-selected-content/selectedcontent.html":
                    await  moveLeftSelectedContent();
        
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/selected-channel/selectedchannel.html":
                    await  moveLeftSelectedEvent();

                    break;

                case "/pages/selected-channel/selectedchannel.html":
                    await moveLeftSelectedEvent();
        
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/movies/movies.html": 
                    console.log("keycode left");
                    await moveLeftSelectedVods();
    
                    break;
                        
                case "/pages/movies/movies.html": 
                    console.log("keycode left");
                    moveLeftSelectedVods();
        
                    break;
            }


        event.preventDefault();
        break;
        case KEYCODE.RIGHT:
            switch(window.location.pathname) {

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/guide/guide.html": 
                console.log("keycode down");
                await moveRightSelectedGuide();
                break;
            
            case "/pages/guide/guide.html": 
                console.log("keycode down");
                await moveRightSelectedGuide();

                break;


                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/config/config.html": 
                console.log("keycode down");
                await moveRightSelectedConfig();
                break;
            
            case "/pages/config/config.html": 
                console.log("keycode down");
                await moveRightSelectedConfig();

                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/player/player.html": 
                    console.log("keycode right");
                    await moveRightPlayer();
                    break;
            
                case "/pages/player/player.html": 
                    console.log("keycode right");
                    await  moveRightPlayer();
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/channels/channels.html": 
                    console.log("keycode right");
                    await moveRightSelectedChannels();
                    break;
            
                case "/pages/channels/channels.html": 
                    console.log("keycode right");
                    await  moveRightSelectedChannels();
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/saved/saved.html": 
                console.log("keycode right");
                await moveRightSelectedSaved();

                break;
            
                case "/pages/saved/saved.html": 
                console.log("keycode right");
                await moveRightSelectedSaved();
                
                break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/search/search.html": 
                console.log("keycode right");
                await moveRightSelectedSearch();

                break;
            
                case "/pages/search/search.html": 
                console.log("keycode right");
                await moveRightSelectedSearch();
                
                break;
            
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/profile/profile.html": 
                console.log("keycode right");
                await moveRightSelectedProfile();

                break;
            
                case "/pages/profile/profile.html": 
                console.log("keycode right");
                await moveRightSelectedProfile();
                
                break;
            

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/catalog/catalog.html": 
                await moveRightHome();
                
                console.log("keycode right")
                    break;
                
                case "/pages/catalog/catalog.html": 
                console.log("keycode right")
                await   moveRightHome();

                    break;
                
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/info-selected-content/selectedcontent.html":
                    await  moveRightSelectedContent();
                    break; 

                case "/pages/info-selected-content/selectedcontent.html":
                    await  moveRightSelectedContent();
            
                    break;

                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/selected-channel/selectedchannel.html":
                    await moveRightSelectedEvent();

                    break;

                case "/pages/selected-channel/selectedchannel.html":
                    await moveRightSelectedEvent();
        
                    break;
            
                case "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/pages/movies/movies.html": 
                    console.log("keycode right");
                    await moveRightSelectedVods();
    
                    break;
                        
                case "/pages/movies/movies.html": 
                    console.log("keycode right");
                    await moveRightSelectedVods();
        
                    break;            
                }
        event.preventDefault();
        break;
        case KEYCODE.ENTER:
            event.preventDefault();
        case KEYCODE.RETURN:
            const paginaPrincipal = '/pages/profile/profile.html'; // Altere para o URL real da sua página principal

                if (event.keyCode === 27) { // Verifica se a tecla pressionada é Escape
                    if (document.referrer === '' || document.referrer.includes(paginaPrincipal)) {
                        // Se não houver referrer ou se o referrer for a página principal, não faz nada
                        console.log("Você já está na página principal. Nenhuma ação será realizada.");
                    } else {
                        // Caso contrário, retorna à página anterior
                        window.history.back();
                    }
                }
    }
  }

  //----------------------- navegação player

async function moveDownPlayer() {
    //Acessar menu lateral esquerdo
    if(navigationCount == 0) {
        if(containerLeftMenuCount < 1){
            containerLeftMenuCount +=1;
        }
        if(containerLeftMenuCount == 0) {
            indice = campoLeft[containerLeftMenuCount];
            console.log("campos", campoLeft)
            console.log("indice achado", indice)
            var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
            toFocusMenu.focus();
        }
        if(containerLeftMenuCount == 1) {
            indice = campoLeft[containerLeftMenuCount];
            if(arrayLeftMenuCount < indice.getElementsByClassName('selectedLeftCategoryCard').length -1){
                 arrayLeftMenuCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCount];
                
                toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                toFocusMenu.focus();

            }
        }

        //if(containerLeftMenuCount < indice.getElementsByClassName('selectedCategoryCard').length -1) {
        //    containerLeftMenuCount +=1
        //}

    }

    //Nenhum menu aberto
    if(navigationCount == 1) {
        navigationCount +=4
        console.log("Valor do navigation ao press down key no 1", navigationCount)
        var toDisplayBlock = document.getElementById('navigationToRemoveBottomMenu');
        toDisplayBlock.classList.remove("navigationNone");
    }

    //Menu lateral direito
    if(navigationCount == 2) {
        if(containerRightMenuCount < 1){
            containerRightMenuCount +=1;
        }
        if(containerRightMenuCount == 0) {
            indice = campoRight[containerRightMenuCount];
            //console.log("campos", campoRight)
            //console.log("indice achado", indice)
            var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
            toFocusMenu.focus();
        }
        if(containerRightMenuCount == 1) {
                indice = campoRight[containerRightMenuCount];
            if(arrayRightMenuCount < indice.getElementsByClassName('selectedRightCategoryCard').length -1){
                arrayRightMenuCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCount];
                toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                toFocusMenu.focus();

            }
        }
    }

    //Menu inferior + opções player
    if(navigationCount == 5) {
        if(containerBottomMenuCount < 3) {
            containerBottomMenuCount +=1;
            if(containerBottomMenuCount > -1) {
                indice = campoBottom[containerBottomMenuCount];
                
                if(containerBottomMenuCount == 0) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount];

                }
                if(containerBottomMenuCount == 1) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount2];

                }
                if(containerBottomMenuCount == 2) {
                    //toFocusMenu.scrollTo(0, 1000);
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

                }
                if(containerBottomMenuCount == 3) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuSimilarCount];

                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

                }
                
                toFocusMenu.focus();

            }
            console.log("valor do numero", containerBottomMenuCount)
        }
    }


    /* 
    //console.log("aqui esta")
    if(navigationCount == 0) {
        if(containerLeftMenuCount < 1){
            containerLeftMenuCount +=1;
        }
        if(containerLeftMenuCount == 0) {
            indice = campo[containerLeftMenuCount];
            var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCategoryCount];
            toFocusMenu.focus();
        }
        if(containerLeftMenuCount == 1) {
            indice = campo[containerLeftMenuCount];
            if(arrayLeftMenuCount < indice.getElementsByClassName('selectedCategoryCard').length -1){
                 arrayLeftMenuCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCount];
                
                toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                toFocusMenu.focus();

            }
        }

        //if(containerLeftMenuCount < indice.getElementsByClassName('selectedCategoryCard').length -1) {
        //    containerLeftMenuCount +=1
        //}



    }
    if(navigationCount == 1) {}
    if(navigationCount == 2) {}
*/
}
async function moveUpPlayer() {


    //Acessar menu lateral esquerdo
    if(navigationCount == 0) {
        if(containerLeftMenuCount == 0) {
            indice = campoLeft[containerLeftMenuCount];
            var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
            toFocusMenu.focus();
        }
        if(containerLeftMenuCount == 1) {
            if(arrayLeftMenuCount >= -1){
                arrayLeftMenuCount -=1;

                if(arrayLeftMenuCount > -1) {
                    indice = campoLeft[containerLeftMenuCount];
                    var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                    toFocusMenu.focus();
                }
                if(arrayLeftMenuCount == -1) {
                    containerLeftMenuCount-=1;
                    indice = campoLeft[containerLeftMenuCount];
                    var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                    toFocusMenu.focus();

                }
            }
        }


    }

    //Nenhum menu aberto
    if(navigationCount == 1) {
    }

    //Menu lateral direito
    if(navigationCount == 2) {
        if(containerRightMenuCount == 1){
            indice = campoRight[containerRightMenuCount];
            if(arrayRightMenuCount > -1){
                arrayRightMenuCount -=1;

                if(arrayRightMenuCount > -1) {
                    var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                    toFocusMenu.focus();
                }

                if(arrayRightMenuCount == -1) {
                    var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[0];
                    toFocusMenu.blur();

                    containerRightMenuCount -=1;
                    indice = campoRight[containerRightMenuCount];
                    var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
                    toFocusMenu.focus();

                }
            }

        }
    }
    //Menu inferior + opções player
    if(navigationCount == 5) {
        console.log("estou aqui")
        if(containerBottomMenuCount > -2) {
            containerBottomMenuCount -=1


            if(containerBottomMenuCount > -1) {
                indice = campoBottom[containerBottomMenuCount];

                if(containerBottomMenuCount == 0) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount];

                }
                if(containerBottomMenuCount == 1) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount2];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });

                }
                if(containerBottomMenuCount == 2) {
                    //toFocusMenu.scrollTo(0, 1000);
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

                }
                if(containerBottomMenuCount == 3) {
                    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuSimilarCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });

                }

                toFocusMenu.focus();
            }

            if(containerBottomMenuCount == -1) {
                indice = campoBottom[0];
                var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount];
                toFocusMenu.blur();


            }


            if(containerBottomMenuCount == -2) {
                navigationCount -=4
                var toDisplayNone = document.getElementById('navigationToRemoveBottomMenu');
                toDisplayNone.classList.add("navigationNone");
                console.log("Valor do navigation ao press up key no 5", navigationCount)
            }

        }



    }


    /* 
    if(navigationCount == 0) {
        

        if(containerLeftMenuCount == 0) {
            indice = campo[containerLeftMenuCount];
            var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCategoryCount];
            toFocusMenu.focus();
        }
        if(containerLeftMenuCount == 1) {
            if(arrayLeftMenuCount >= -1){
                arrayLeftMenuCount -=1;

                if(arrayLeftMenuCount > -1) {
                    indice = campo[containerLeftMenuCount];
                    var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
                    toFocusMenu.focus();
                }
                if(arrayLeftMenuCount == -1) {
                    containerLeftMenuCount-=1;
                    indice = campo[containerLeftMenuCount];
                    var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCategoryCount];
                    toFocusMenu.focus();

                }
            }
        }







    }

    if(navigationCount == 1) {}
    if(navigationCount == 2) {}
*/
    
}
async function moveLeftPlayer() {
    if(navigationCount >= 0) {
        if(navigationCount == 0) {
            //Acessar menu lateral esquerdo
            if(containerLeftMenuCount == 0) {
                indice = campoLeft[containerLeftMenuCount];

                if(arrayLeftMenuCategoryCount > 0){
                    arrayLeftMenuCategoryCount -=1;
                    var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                    toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
                    toFocusMenu.focus();
                }

                console.log("cheguei aqui")


            }





        }

        if(navigationCount > 0) {

            //Nenhum menu aberto
            if(navigationCount == 1) {
                if(navigationCountAux > -1) {
                    navigationCountAux -=1
                    if(navigationCountAux == 1) {
                        
                    }
                    console.log("valor do aux left", navigationCountAux)
    
                    if(navigationCountAux == -1) {
                        navigationCount -=1
                        var toDisplayBlock = document.getElementById('navigationToRemoveLeftMenu');
                        toDisplayBlock.classList.remove("navigationNone");
    
                        //aqui é pra voltar pro category item anteriormente focado no menu left
                        if(containerLeftMenuCount == 0) {
                            indice = campoLeft[containerLeftMenuCount];
                            arrayLeftMenuCategoryCount =0
                            var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                            toFocusMenu.focus();
                            //console.log("o que tem no indice", indice)
                    }
            
            
                    if(containerLeftMenuCount == 1) {
                        indice = campoLeft[containerLeftMenuCount];
                        var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCount];
                        toFocusMenu.focus();
                        console.log("valor do navigation", navigationCount)
            
                    }
    
                        console.log("Valor do navigation ao press left key", navigationCount)
                    }
                }
    
            }
    
            //Menu lateral direito
            if(navigationCount == 2) {


                if(containerRightMenuCount == 0) {
                    indice = campoRight[containerRightMenuCount];
                    if(arrayRightMenuCategoryCount >= -1){
                        arrayRightMenuCategoryCount-=1;

                        if(arrayRightMenuCategoryCount > -1) {

                            var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
                            toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });

                            toFocusMenu.focus();
                        }

                        if(arrayRightMenuCategoryCount == -1) {
                            var toDisplayNone = document.getElementById('navigationToRemoveRightMenu');
                            toDisplayNone.classList.add("navigationNone");
                            navigationCount -=1;   
                            navigationCountAux -=1
                        }
                        //console.log("o onemorecard apertando o right", arrayRightMenuCategoryCount)
                    }
                }

                if(containerRightMenuCount == 1 || containerRightMenuCount == -1) {
                    var toDisplayNone = document.getElementById('navigationToRemoveRightMenu');
                    toDisplayNone.classList.add("navigationNone");
                    navigationCount -=1;   
                    navigationCountAux -=1
                }


             
    
            }
    
            //Menu inferior + opções player
            if(navigationCount == 5) {
                indice = campoBottom[containerBottomMenuCount];


                //primeira linha de botões do player
                if(containerBottomMenuCount == 0) {
                    if(arrayBottomMenuButtonCount > 0){
                        arrayBottomMenuButtonCount -=1;
                        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount];
                        toFocusMenu.focus();
                    }
        
                }
        
                //segunda linha de botões do player
                if(containerBottomMenuCount == 1) {
                    if(arrayBottomMenuButtonCount2 > 0){
                        arrayBottomMenuButtonCount2 -=1;
                        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount2];
                        toFocusMenu.focus();
                    }
        
                }
        
                //gravar, add lista e etc
                if(containerBottomMenuCount == 2) {
                    if(arrayBottomMenuInfoCount > 0){
                        arrayBottomMenuInfoCount -=1;
                        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
                        toFocusMenu.focus();
                    }
        
                }
        
                //eventos similares/recomendados
                if(containerBottomMenuCount == 3) {
                    if(arrayBottomMenuSimilarCount > 0){
                        arrayBottomMenuSimilarCount -=1;
                        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuSimilarCount];
                        toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
        
                        toFocusMenu.focus();
                    }
        
                }
            }

        }

        /* 
        if(containerLeftMenuCount == -1) {
            navigationCount -=1;
        }
        if(containerLeftMenuCount == 0) {
            navigationCount -=1;
        }
        if(containerLeftMenuCount == 1) {
            navigationCount -=1;
        }

        if(navigationCount == 0) {
            //indiceMenu = menu[1];
            indice = campo[containerLeftMenuCount];

            //console.log("o que tem no indiceMenu", indice)
            //var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove');
            //console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            //toDisplayNone.classList.add("navigationNone");

            if(containerLeftMenuCount == 0) {
                indice = campo[containerLeftMenuCount];
                //console.log("o que tem no indice", indice)
        }


        if(containerLeftMenuCount == 1) {
            indice = campo[containerLeftMenuCount];
            var toFocusMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayLeftMenuCount];
            toFocusMenu.focus();
            console.log("valor do navigation", navigationCount)

        }


            //var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            //toFocusMenu.focus();

        }*/

    }

}
async function moveRightPlayer() {
    if(typeContent === "TV") {
        if(navigationCount <= 2) {
    
            if(navigationCount < 2){
                //Acessar menu lateral esquerdo
                if(navigationCount == 0) {
        
                    if(containerLeftMenuCount == -1){
                        //console.log("o que tem no indiceMenu", indice)
                        navigationCount +=1
                        //var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                        //console.log("o que tem no toDisplay", toDisplayNone)
                        toDisplayNone.classList.add("navigationNone");
                    }
        
        
                    //esta parte é quando está focado nas categorias do menu left
                    if(containerLeftMenuCount == 0) {
        
                        if(arrayLeftMenuCategoryCount <= indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                            arrayLeftMenuCategoryCount +=1;
                            indice = campoLeft[containerLeftMenuCount];
                            
                            if(arrayLeftMenuCategoryCount < indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                                var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                                toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
                                toFocusMenu.focus();
                            }
                            if(arrayLeftMenuCategoryCount == indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                                arrayLeftMenuCategoryCount -=1
                                navigationCount +=1
                                //var toDisplayNone = document.getElementById('navigationToRemove');
                                var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                                toDisplayNone.classList.add("navigationNone");
                                //toDisplayNone.classList.remove("navigationNone");
                                var toBlurMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                                toBlurMenu.blur();
                            }
        
        
                           
           
                       }
        
                    }
        
                    if(containerLeftMenuCount == 1) {
                        indice = campoLeft[containerLeftMenuCount];
                        navigationCount +=1
                        //var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                        toDisplayNone.classList.add("navigationNone");
                        //toDisplayNone.classList.remove("navigationNone");
                        var toBlurMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayMenuCount];
                        toBlurMenu.blur();
        
                    }
                    console.log("Valor do navigation ao press right key", navigationCount)
        
                }
        
                //Nenhum menu aberto
                if(navigationCount == 1) {
                    if(navigationCountAux < 1) {
                        navigationCountAux +=1;
                        console.log("o auxiliar é", navigationCountAux)
                        if(navigationCountAux == 1) {
                            navigationCount =2
                            var toDisplayNone = document.getElementById('navigationToRemoveRightMenu');
                            toDisplayNone.classList.remove("navigationNone");
                            console.log("Valor do navigation ao press right key no 1", navigationCountAux)
    
                            //aqui é pra voltar pro category item anteriormente focado no menu left
                            if(containerRightMenuCount == 0) {
                                indice = campoRight[containerRightMenuCount];
                                arrayRightMenuCategoryCount+=1;
    
                                var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
                                toFocusMenu.focus();
                                arrayRightMenuCategoryCount-=1;
    
                                //console.log("o que tem no indice", indice)
                            }
                
                
                            if(containerRightMenuCount == 1) {
                                indice = campoRight[containerRightMenuCount];
                                var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCount];
                                toFocusMenu.focus();
                                //console.log("valor do navigation", navigationCount)
                
                            }
        
                        }
                    }
                }
    
            }
    
            //Menu lateral direito
            if(navigationCount == 2) {
                if(containerRightMenuCount == 0) {
                    indice = campoRight[containerRightMenuCount];
                    if(arrayRightMenuCategoryCount < indice.getElementsByClassName('selectedRightCategoryCard').length -1){
                        arrayRightMenuCategoryCount+=1;
                        //console.log("o onemorecard apertando o right", arrayRightMenuCategoryCount)
                        var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
                        toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
                        toFocusMenu.focus();
                    }
                }
            }
    
    
            /* 
            if(navigationCount == 0) {
                console.log("algo aqui")
                if(containerLeftMenuCount == -1){
                    //console.log("o que tem no indiceMenu", indice)
                    navigationCount +=1
                    //var toDisplayNone = document.getElementById('navigationToRemove');
                    var toDisplayNone = document.getElementById('navigationToRemove');
                    //console.log("o que tem no toDisplay", toDisplayNone)
                    toDisplayNone.classList.add("navigationNone");
                }
    
                if(containerLeftMenuCount == 0) {
    
    
                }
    
                if(containerLeftMenuCount == 1) {
                    indice = campo[containerLeftMenuCount];
                    navigationCount +=1
                    //var toDisplayNone = document.getElementById('navigationToRemove');
                    var toDisplayNone = document.getElementById('navigationToRemove');
                    toDisplayNone.classList.add("navigationNone");
                    //toDisplayNone.classList.remove("navigationNone");
                    var toBlurMenu = indice.getElementsByClassName('selectedCategoryCard')[arrayMenuCount];
                    toBlurMenu.blur();
    
                }
                console.log("o navigationCount right é", navigationCount)
            }
            if(navigationCount == 1) {
                indice = campo[containerRightMenuCount];
                navigationCount +=1
    
                //indiceKey = menuKeyboard[oneMoreKeyboard]
                
                //var toDisplayNone = document.getElementById('navigationToRemove');
                //var toDisplayBlock = document.getElementById('navigationToRemove2');
                
                //toDisplayBlock.classList.add("navigationNone");
                //toDisplayNone.classList.remove("navigationNone");
                
                //var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                //toFocusMenu.blur();
                
                if(containerCount > -1) {
                    // dentro deste if só irá ser utilizado quando o usuário
                    // ja tiver navegado em outra parte da pagina
                    if(containerCount > -1) {
        
                    }
                }
    
            }*/
        }
    } else {
        if(navigationCount < 1){
            //Acessar menu lateral esquerdo
            if(navigationCount == 0) {
    
                if(containerLeftMenuCount == -1){
                    //console.log("o que tem no indiceMenu", indice)
                    navigationCount +=1
                    //var toDisplayNone = document.getElementById('navigationToRemove');
                    var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                    //console.log("o que tem no toDisplay", toDisplayNone)
                    toDisplayNone.classList.add("navigationNone");
                }
    
    
                //esta parte é quando está focado nas categorias do menu left
                if(containerLeftMenuCount == 0) {
    
                    if(arrayLeftMenuCategoryCount <= indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                        arrayLeftMenuCategoryCount +=1;
                        indice = campoLeft[containerLeftMenuCount];
                        
                        if(arrayLeftMenuCategoryCount < indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                            var toFocusMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                            toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
                            toFocusMenu.focus();
                        }
                        if(arrayLeftMenuCategoryCount == indice.getElementsByClassName('selectedLeftCategoryCard').length ){
                            arrayLeftMenuCategoryCount -=1
                            navigationCount +=1
                            //var toDisplayNone = document.getElementById('navigationToRemove');
                            var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                            toDisplayNone.classList.add("navigationNone");
                            //toDisplayNone.classList.remove("navigationNone");
                            var toBlurMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayLeftMenuCategoryCount];
                            toBlurMenu.blur();
                        }
    
    
                       
       
                   }
    
                }
    
                if(containerLeftMenuCount == 1) {
                    indice = campoLeft[containerLeftMenuCount];
                    navigationCount +=1
                    //var toDisplayNone = document.getElementById('navigationToRemove');
                    var toDisplayNone = document.getElementById('navigationToRemoveLeftMenu');
                    toDisplayNone.classList.add("navigationNone");
                    //toDisplayNone.classList.remove("navigationNone");
                    var toBlurMenu = indice.getElementsByClassName('selectedLeftCategoryCard')[arrayMenuCount];
                    toBlurMenu.blur();
    
                }
                console.log("Valor do navigation ao press right key", navigationCount)
    
            }
    
            //Nenhum menu aberto
            if(navigationCount == 1) {
                if(navigationCountAux < 1) {
                    navigationCountAux +=1;
                    console.log("o auxiliar é", navigationCountAux)
                    if(navigationCountAux == 1) {
                        navigationCount =2
                        var toDisplayNone = document.getElementById('navigationToRemoveRightMenu');
                        toDisplayNone.classList.remove("navigationNone");
                        console.log("Valor do navigation ao press right key no 1", navigationCountAux)

                        //aqui é pra voltar pro category item anteriormente focado no menu left
                        if(containerRightMenuCount == 0) {
                            indice = campoRight[containerRightMenuCount];
                            arrayRightMenuCategoryCount+=1;

                            var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCategoryCount];
                            toFocusMenu.focus();
                            arrayRightMenuCategoryCount-=1;

                            //console.log("o que tem no indice", indice)
                        }
            
            
                        if(containerRightMenuCount == 1) {
                            indice = campoRight[containerRightMenuCount];
                            var toFocusMenu = indice.getElementsByClassName('selectedRightCategoryCard')[arrayRightMenuCount];
                            toFocusMenu.focus();
                            //console.log("valor do navigation", navigationCount)
            
                        }
    
                    }
                }
            }

        }
    }

    //Menu inferior + opções player
    if(navigationCount == 5) {
        indice = campoBottom[containerBottomMenuCount];


        //primeira linha de botões do player
        if(containerBottomMenuCount == 0) {
            if(arrayBottomMenuButtonCount < indice.getElementsByClassName('selectedBottomCategoryCard').length -1){
                arrayBottomMenuButtonCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount];
                toFocusMenu.focus();
            }

        }

        //segunda linha de botões do player
        if(containerBottomMenuCount == 1) {
            if(arrayBottomMenuButtonCount2 < indice.getElementsByClassName('selectedBottomCategoryCard').length -1){
                arrayBottomMenuButtonCount2 +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuButtonCount2];
                toFocusMenu.focus();
            }

        }

        //gravar, add lista e etc
        if(containerBottomMenuCount == 2) {
            if(arrayBottomMenuInfoCount < indice.getElementsByClassName('selectedBottomCategoryCard').length -1){
                arrayBottomMenuInfoCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
                toFocusMenu.focus();
            }

        }

        //eventos similares/recomendados
        if(containerBottomMenuCount == 3) {
            if(arrayBottomMenuSimilarCount < indice.getElementsByClassName('selectedBottomCategoryCard').length -1){
                arrayBottomMenuSimilarCount +=1;
                var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuSimilarCount];
                toFocusMenu.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });

                toFocusMenu.focus();
            }

        }

    }




}




//------------------------- navegação login
  async function moveDownLogin() {
    if( containerCount < campo.length -1 ) {
        containerCount+=1;
        console.log("o campo", campo)
        campo[containerCount].focus();
    }

  }
  async function moveUpLogin() {
    if( containerCount > 0 ) {
        containerCount-=1;
        campo[containerCount].focus();
    }
  }

  //-------------------------- navegação select profile
async function moveRightSelectedProfile() {
    indice = campo[oneMore];
    if(indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != null || indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != undefined){
        console.log("o tamanho", campo[oneMore].getElementsByClassName('selectedCategoryCard').length)
        if(oneMoreCard < indice.getElementsByClassName('selectedCategoryCard').length -1){
            oneMoreCard+=1;
            console.log("o onemorecard apertando o right", oneMoreCard)
        }


        if(oneMoreCard >= 0) {

            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
            toFocus.focus();
            if(oneMore > 0) {

            }
        }
    }
}
async function moveLeftSelectedProfile() {
    indice = campo[oneMore];
    if(indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != null || indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != undefined){
        if(oneMoreCard > 0){
            oneMoreCard-=1;
            console.log("o onemorecard apertando o left", oneMoreCard)

        }
        if(oneMoreCard >= 0) {

            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
            toFocus.focus();
            if(oneMore > 0) {

            }
        }



    }
}
async function moveUpSelectedProfile() {
    if(oneMore > 0) {
        oneMore-=1;
        sessionStorage.setItem("indexCount", oneMore);
        oneMoreCard = 0;
    }

    indice = campo[oneMore];
    if(indice != null || indice != undefined) {
        anterior = campo[-1];
        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
        //console.log("o add style", toAddStyle)
        if(oneMore >= 0) {
            //toFocus.scrollIntoView({block: "start"})
            toFocus.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });


        }
        toFocus.focus();
    }
}
async function moveDownSelectedProfile() {
    console.log("o campo", campo)

    if(oneMore < campo.length -1) {
        oneMore+=1;
        sessionStorage.setItem("indexCount", oneMore -1);
        oneMoreCard = 0;

    }
    indice = campo[oneMore];

    if(indice != null || indice != undefined) {

        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
        if(oneMore >= 0 && oneMore < 2) {
            toFocus.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        }
        toFocus.focus();
    }
}


//------------------------- navegação homepage
  async function moveDownHome() {
    if(navigationCount == 0) {
        var indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }

    if(navigationCount == 1) {
        console.log("temos oq no campo", campo)
        if(containerCount < campo.length -1) {
            containerCount +=1;
            sessionStorage.setItem("indexCount", containerCount);
            var indice = campo[containerCount];
            console.log("o que temos no indice", indice)
            if(indice != null || indice != undefined) {
                console.log("o indice é ", indice)
                //indice.focus();
                arrayCount = 0
                //indice.getElementsByClassName('selectedCategoryCard')[0].focus();
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                console.log("o tofocus é", toFocus)
                if(containerCount == 0) {
                    toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                }
                toFocus.focus();


            }
        }
    }

  }
  async function moveUpHome() {
    if(navigationCount == 0) {
        var indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {
        if(containerCount > -1) {
            containerCount -=1;
            sessionStorage.setItem("indexCount", containerCount);
            indice = campo[containerCount]

            if(containerCount == -1) {
                console.log("deu -1")
                indiceBlur = campo[0]
                var toFocus = indiceBlur.getElementsByClassName('selectedCategoryCard')[arrayCount];
                //toFocus.scrollBy(0, 3000)
                toFocus.blur();
                document.getElementById('topScrolling').scrollTo(0,100);

                document.addEventListener("onBlur", myFunction);

                function myFunction() {//  w w  w.  ja  va2  s  . c o m
                    console.log("aconteceu algo")

                };

            }

            if(containerCount > -1) {
                if(arrayCount >= 0) {
                    arrayCount = 0;
                    oneMoreChannelVertical = 1;
                    if(indice != null || indice != undefined) {
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                        toFocus.focus();
                    }
                    
                }
            }
        }

    }



  }
  async function moveRightHome() {
    if(navigationCount < 2) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }



        if(navigationCount == 1) {

            var indiceKey = menuKeyboard[oneMoreKeyboard]
            var indiceMenu = menu[1];

            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.blur();
            
            if(containerCount > -1) {
                console.log("estou aqui")
                indice = campo[containerCount];

                if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1 ) {
                    arrayCount +=1
                    console.log("o que tem no indice right", indice)
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                    toFocus.focus();
                    toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;


                }
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina

            }
        }

    }

  }
  async  function moveLeftHome() {
    if(navigationCount > 0) {

        if(containerCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }
        if(navigationCount == 1) {

            if(arrayCount >= -1) {
                arrayCount -=1;
                indice = campo[containerCount];

                if(arrayCount > -1) {
                    console.log("to aq")
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                    toFocus.focus();
                    toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;

                }

                if(arrayCount == -1) {
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                    toFocus.blur();
                    console.log("cheguei no menos 1")

                    navigationCount -=1;
                    indiceMenu = menu[1];
                    var toDisplayNone = document.getElementById('navigationToRemove');
                    var toDisplayBlock = document.getElementById('navigationToRemove2');
                    console.log("o que tem no toDisplay", toDisplayNone)
                    toDisplayBlock.classList.remove("navigationNone");
                    toDisplayNone.classList.add("navigationNone");
        
                    var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                    toFocusMenu.focus();

                }
            }
        }


    }
  }

//------------------------- navegação página evento selecionado
async function moveDownSelectedContent() {
    console.log("o campo", campo)

    if(oneMore < campo.length -1) {
        oneMore+=1;
        if(oneMore > 0) {
            sessionStorage.setItem("indexCount", oneMore -1);
        }
        oneMoreCard = 0;

    }
    indice = campo[oneMore];
    if(indice != null || indice != undefined) {
        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];

        if(oneMore > 0) {
            toFocus.scrollIntoView()

        }
        toFocus.focus();

    }
}
async function moveUpSelectedContent() {
    if(oneMore > 0) {
        oneMore-=1;
        sessionStorage.setItem("indexCount", oneMore);
        oneMoreCard = 0;
    }

    indice = campo[oneMore];
    if(indice != null || indice != undefined) {
        anterior = campo[-1];
        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
        toFocus.focus();
    }
}
async function moveLeftSelectedContent() {

    indice = campo[oneMore];
    if(indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != null || indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != undefined){
        if(oneMoreCard > 0){
            oneMoreCard-=1;
            console.log("o onemorecard apertando o left", oneMoreCard)

        }
        if(oneMoreCard >= 0) {

            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
            toFocus.focus();
            if(oneMore > 0) {
                toFocus.scrollIntoView({behavior: "auto", block: "start", inline: "center" }) ;
            }
        }

    }
}
async function moveRightSelectedContent() {

    indice = campo[oneMore];
    if(indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != null || indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard] != undefined){
        //campo[oneMore].getElementsByClassName('selectedCategoryCard')[oneMoreCard].classList.remove("teste");
        console.log("o tamanho", campo[oneMore].getElementsByClassName('selectedCategoryCard').length)
        if(oneMoreCard < indice.getElementsByClassName('selectedCategoryCard').length -1){
            oneMoreCard+=1;
            console.log("o onemorecard apertando o right", oneMoreCard)
        }
        //campo[oneMore].getElementsByClassName('selectedCategoryCard')[oneMoreCard].classList.add("teste").scrollIntoView({
        //    inline: "left",
      //      behavior: "smooth"
    //    });

        if(oneMoreCard >= 0) {

            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[oneMoreCard];
            toFocus.focus();
            if(oneMore > 0) {
                toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
                toFocus.scrollIntoView();

            }
        }
    }
}

//--------------------------------------- navegação página canais
async function moveDownSelectedChannels() {
    console.log("o campo", campo)

    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            await toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {

        arrayCountChannelOrVodVertical +=1;

        if(containerCount < 1) {
            containerCount+=1;
            indice = campo[containerCount]
            if(indice != null || indice != undefined) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                await toFocus.focus();
            }
        }

        if(arrayCountChannelOrVodVertical >= 3) {
            indice = campo[containerCount];
            if(indice != null || indice != undefined) {
                var limitNavigate = indice.getElementsByClassName('selectedCategoryCard').length;
                console.log("atualmente o limite é", limitNavigate);

                if(limitNavigate - arrayCount >= 9) {
                    arrayCount +=8;
                    indice = campo[containerCount];

                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                    await toFocus.focus();
                    await toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                    console.log("o oneMoreCard é", arrayCount)
    
                }


            }

        }


    }
}
async function moveUpSelectedChannels() {
    console.log("o campo", campo)
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            await toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {
        if(containerCount > 0) {

            console.log("o onemorechannelsvertical é", arrayCountChannelOrVodVertical)
            arrayCount -=8;

            if(arrayCount >= 0) {
                console.log("o onemorecard é", arrayCount)
                indice = campo[containerCount]
                if(indice != null || indice != undefined) {
                    var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCount];

                    await toFocus.focus();
                    await toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                }
            }
            if(arrayCount < 0) {
                containerCount -=1;
                arrayCountChannelOrVodVertical = 1;
                indice = campo[containerCount]
                if(indice != null || indice != undefined) {
                    arrayCount +=8;
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                    await toFocus.focus();

                }
                
            }
    }


    }
}
async function moveLeftSelectedChannels() {


    if(navigationCount > 0) {

        if(containerCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            indice = campo[containerCount]

            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                await toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            await toFocusMenu.focus();

        }




        if(navigationCount == 1) {
            if(indice != null || indice != undefined) {

                if(containerCount == 0) {
                    if(arrayCountCategory > -1) {
                        indice = campo[containerCount];
                        arrayCountCategory -=1
                        if(arrayCountCategory >= 0) {
                            console.log("maior que -1", arrayCountCategory)
                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                            arrayCount = 0
                            arrayCountChannelOrVodHorizontal =0
                            await toFocus.focus();
                            //toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
        
                        }
        
                        if(arrayCountCategory == -1) {
                            indiceMenu = menu[1];
                            var toDisplayNone = document.getElementById('navigationToRemove');
                            var toDisplayBlock = document.getElementById('navigationToRemove2');
                            toDisplayBlock.classList.remove("navigationNone");
                            toDisplayNone.classList.add("navigationNone");
                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                            await toFocus.blur();
                            navigationCount -=1;
                            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                            await toFocusMenu.focus();
                        }
                    }
                }

                //parte dos canais
                if(containerCount == 1) {
                    if(arrayCountChannelOrVodHorizontal > -1) {
                        
                        arrayCountChannelOrVodHorizontal -=1
                        arrayCount -=1

                        if(arrayCountChannelOrVodHorizontal >= 0){
                            arrayCountNext +=1
                            var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                            await toFocus.focus();
                        }

                        if(arrayCountChannelOrVodHorizontal == -1){
                            var toDisplayNone = document.getElementById('navigationToRemove');
                            var toDisplayBlock = document.getElementById('navigationToRemove2');
                            toDisplayBlock.classList.remove("navigationNone");
                            toDisplayNone.classList.add("navigationNone");
                            //arrayCount +=1
                            if(arrayCount > -1) {
                                var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                                await toFocus.blur();

                            }else {
                                var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[0];
                                await toFocus.blur();
                            }
                            indiceMenu = menu[1];
                            navigationCount -=1;
                            var toFocusMenu = await indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                            await toFocusMenu.focus();
                        }
                    }
                }



            }

        }


    }


}
async function moveRightSelectedChannels() {
    if(navigationCount <= 1) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }
        
        
        
        if(navigationCount == 1) {
            
            //-------------------------- este bloco pode ficar no navigation ==0 antes do navigationCount +=1
            indiceMenu = menu[1];
            indice = campo[containerCount]
            
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            await toFocusMenu.blur();
            //----------------------------------

            
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina
                if(containerCount < 2) {
                    if(indice != null || indice != undefined) {
                        if(containerCount == 0){
                            if(arrayCountCategory < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 
                                arrayCountCategory +=1;
                                arrayCountChannelOrVodHorizontal =0
                                arrayCount = 0
                                arrayCountNext +=1
    
                                var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                                await toFocus.focus();
                            }                       

                        }


                        //parte dos canais
                        if(containerCount == 1){
                            if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 

                                if(arrayCountChannelOrVodHorizontal < 7 ) {
                                    arrayCountChannelOrVodHorizontal +=1
                                    arrayCount +=1;
                                    arrayCountNext +=1
                                    var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                                    await toFocus.focus();
                                    
                                }
                            }  
                        }


                    }


                }
        }



    }

}

//--------------------------------------- navegação página guide

async function moveDownSelectedGuide() {
    console.log("os campos", campo)

    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {

        if(containerCount < 1) {
            if(campo.length > 0) {
                containerCount+=1;
                indice = campo[containerCount]

            }
        }
        if(containerCount == 0) {
            console.log("o indice", campo)

            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
            //console.log("o indice", indice)
            toFocus.focus();


        }

        if(containerCount == 1) {
            
            console.log("opa")
            if(arrayGuideChannelCount < campoGuide.length -1) {
                arrayGuideChannelCount +=1;

                
                indiceGuide = campoGuide[arrayGuideChannelCount]
                
                var toFocus = indiceGuide.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                console.log("valor", indiceGuide.getElementsByClassName('selectedGuideCard'))
                if(arrayGuideEventCount < indiceGuide.getElementsByClassName('selectedGuideCard').length -1) {
                    await toFocus.focus()
                }else if(arrayGuideEventCount >= indiceGuide.getElementsByClassName('selectedGuideCard').length -1){
                    arrayGuideEventCount = indiceGuide.getElementsByClassName('selectedGuideCard').length -1
                    var toFocus = indiceGuide.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                    await toFocus.focus()
                }
                
                //toFocus.focus()
            }
            console.log("o indice", campo)

        }

    }
    if(navigationCount == 2) {}

}
async function moveUpSelectedGuide() {
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {

        if(containerCount == 1) {
            console.log("opa")
            if(arrayGuideChannelCount > -1) {
                arrayGuideChannelCount -=1;
                if(arrayGuideChannelCount == -1) {
                    containerCount-=1;
                    indice = campo[containerCount]
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                    await toFocus.focus();
                    //var channelFocused = indice.getElementsByClassName('selectedGuideChannel')[0];
                    //var toBlur = channelFocused.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                    //toBlur.blur()                    
                }
            
                
                if(arrayGuideChannelCount >= 0) {
                    var channelFocused = indice.getElementsByClassName('selectedGuideChannel')[arrayGuideChannelCount];
                    var toFocus = channelFocused.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                    if(arrayGuideEventCount < channelFocused.getElementsByClassName('selectedGuideCard').length -1) {
                        await toFocus.focus()
                    } else if(arrayGuideEventCount >= channelFocused.getElementsByClassName('selectedGuideCard').length -1){
                        arrayGuideEventCount = channelFocused.getElementsByClassName('selectedGuideCard').length -1
                        var toFocus = channelFocused.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                        await toFocus.focus()
                    }

                }

                //console.log("dentro do if", toFocus)
            }
            console.log("o indice", campo)
        }

    }
    if(navigationCount == 2) {}

}
async function moveLeftSelectedGuide() {

    if(navigationCount > 0) {

        if(navigationCount == 0) {
            indiceMenu = menu[1];
            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {



                if(containerCount == 0){
                }
                if(containerCount == 1){}
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }




        if(navigationCount == 1) {
            if(containerCount == 0){
                if(arrayCount > -1) {
                    arrayCount -=1
                    indice = campo[containerCount]
                    console.log("to aqui rapa 00")

                    if(arrayCount >= 0){
                        arrayGuideEventCount =0
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                        toFocus.focus();
                    }

                    if(arrayCount == -1){
                        var toBlur = indice.getElementsByClassName('selectedCategoryCard')[0];
                        toBlur.blur();
                        navigationCount -=1;
                        indiceMenu = menu[1];
                        var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayBlock = document.getElementById('navigationToRemove2');
                        console.log("o que tem no toDisplay", toDisplayNone)
                        toDisplayBlock.classList.remove("navigationNone");
                        toDisplayNone.classList.add("navigationNone");
            
                        var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                        toFocusMenu.focus();
                    }
                }
               // var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                //toFocus.blur();
            }

            if(containerCount == 1){
                if(arrayGuideEventCount >= -1) {
                    arrayGuideEventCount -=1
                    var channelFocused = indice.getElementsByClassName('selectedGuideChannel')[arrayGuideChannelCount];

                    if(arrayGuideEventCount > -1) {
                        var toFocus = channelFocused.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                        toFocus.focus()
                    }

                    if(arrayGuideEventCount == -1) {
                        var toBlur = channelFocused.getElementsByClassName('selectedGuideCard')[0]
                        toBlur.blur()
                        navigationCount -=1;
                        indiceMenu = menu[1];
                        var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayBlock = document.getElementById('navigationToRemove2');
                        console.log("o que tem no toDisplay", toDisplayNone)
                        toDisplayBlock.classList.remove("navigationNone");
                        toDisplayNone.classList.add("navigationNone");
            
                        var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                        toFocusMenu.focus();
                    }

                }
               // var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                //toFocus.blur();
                console.log("to aqui rapa 01")
            }

        }
        if(navigationCount == 2) {}


    }

}
async function moveRightSelectedGuide() {
    if(navigationCount < 2) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
            indiceKey = menuKeyboard[oneMoreKeyboard]
            
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.blur();
        }



        if(navigationCount == 1) {

            if(containerCount > -1) {
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina
                
                if(containerCount == 0){
                    if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1) {
                        indice = campo[containerCount];
                        arrayCount +=1
                        arrayGuideEventCount =0
                        var toFocus = await indice.getElementsByClassName('selectedCategoryCard')[arrayCount]
                        toFocus.focus()
    
                    }
                }

                if(containerCount == 1){
                    var channelFocused = indice.getElementsByClassName('selectedGuideChannel')[arrayGuideChannelCount];
                    if(arrayGuideEventCount < channelFocused.getElementsByClassName('selectedGuideCard').length -1) {
                        arrayGuideEventCount +=1
                        var toFocus = channelFocused.getElementsByClassName('selectedGuideCard')[arrayGuideEventCount]
                        toFocus.focus()
    
                    }

                }

            }
        }
        if(navigationCount == 2) {}

    }
}

//----------------------------- navegação página canal específico + catchup
async function moveRightSelectedEvent() {
    indice = campo[containerCount];

    if(containerCount == 0){
        if(arrayCountCategory < indice.getElementsByClassName('selectedCategoryCard').length -1) {
            arrayCountCategory +=1
            arrayCount = 0
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
            toFocus.focus();

        }
    }

    if(containerCount == 1){
        if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1) {
            arrayCount +=1
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
            toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
            toFocus.focus();

        }
    }




}
async function moveLeftSelectedEvent() {
    indice = campo[containerCount];
    if(containerCount == 0){
        if(arrayCountCategory > 0) {
            arrayCountCategory -=1
            arrayCount = 0
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
            toFocus.focus();

        }
        
    }
    if(containerCount == 1){
        if(arrayCount > 0) {
            arrayCount -=1
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
            toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
            toFocus.focus();

        }
    }


}
async function moveUpSelectedEvent() {
    if(containerCount > 0) {
        containerCount-=1;
        indice = campo[containerCount];

        if(containerCount == 0){
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
            toFocus.focus();

        }
        if(containerCount == 1){
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
            toFocus.focus();

        }
    }

}
async function moveDownSelectedEvent() {

    if(containerCount < 1) {
        containerCount+=1;
        indice = campo[containerCount];

        if(containerCount == 0){
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
            toFocus.focus();

        }
        if(containerCount == 1){
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
            toFocus.focus();

        }
    }
}


//--------------------------------------- navegação página vods
async function moveDownSelectedVods() {
    console.log("o campo", campo)

    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {

        arrayCountChannelOrVodVertical +=1;

        if(containerCount < 1) {
            containerCount+=1;
            indice = campo[containerCount]
            if(indice != null || indice != undefined) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                toFocus.focus();
            }
        }

        if(arrayCountChannelOrVodVertical >= 3) {
            indice = campo[containerCount];
            if(indice != null || indice != undefined) {
                var limitNavigate = indice.getElementsByClassName('selectedCategoryCard').length;
                console.log("atualmente o limite é", limitNavigate);

                if(limitNavigate - arrayCount >= 9) {
                    arrayCount +=8;
                    indice = campo[containerCount];

                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                    toFocus.focus();
                    toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                    console.log("o oneMoreCard é", arrayCount)
    
                }


            }

        }


    }


}
async function moveUpSelectedVods() {
    console.log("o campo", campo)
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {
        if(containerCount > 0) {

            console.log("o onemorechannelsvertical é", arrayCountChannelOrVodVertical)
            arrayCount -=8;

            if(arrayCount >= 0) {
                console.log("o onemorecard é", arrayCount)
                indice = campo[containerCount]
                if(indice != null || indice != undefined) {
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];

                    toFocus.focus();
                    toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                }
            }
            if(arrayCount < 0) {
                containerCount -=1;
                arrayCountChannelOrVodVertical = 1;
                indice = campo[containerCount]
                if(indice != null || indice != undefined) {
                    arrayCount +=8;
                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                    toFocus.focus();

                }
                
            }
    }

    }


}
async function moveLeftSelectedVods() {

    if(navigationCount > 0) {

        if(containerCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            indice = campo[containerCount]

            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }




        if(navigationCount == 1) {
            if(indice != null || indice != undefined) {

                if(containerCount == 0) {
                    if(arrayCountCategory > -1) {
                        indice = campo[containerCount];
                        arrayCountCategory -=1
                        if(arrayCountCategory >= 0) {
                            console.log("maior que -1", arrayCountCategory)
                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                            arrayCount = 0
                            arrayCountChannelOrVodHorizontal =0
                            toFocus.focus();
                            toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;
        
                        }
        
                        if(arrayCountCategory == -1) {
                            indiceMenu = menu[1];
                            var toDisplayNone = document.getElementById('navigationToRemove');
                            var toDisplayBlock = document.getElementById('navigationToRemove2');
                            toDisplayBlock.classList.remove("navigationNone");
                            toDisplayNone.classList.add("navigationNone");
                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                            toFocus.blur();
                            navigationCount -=1;
                            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                            toFocusMenu.focus();
                        }
                    }
                }

                //parte dos canais
                if(containerCount == 1) {
                    if(arrayCountChannelOrVodHorizontal > -1) {
                        
                        arrayCountChannelOrVodHorizontal -=1
                        arrayCount -=1

                        if(arrayCountChannelOrVodHorizontal >= 0){
                            arrayCountNext +=1
                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                            toFocus.focus();
                        }

                        if(arrayCountChannelOrVodHorizontal == -1){
                            var toDisplayNone = document.getElementById('navigationToRemove');
                            var toDisplayBlock = document.getElementById('navigationToRemove2');
                            toDisplayBlock.classList.remove("navigationNone");
                            toDisplayNone.classList.add("navigationNone");
                            if(arrayCount > -1) {
                                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                                toFocus.blur();

                            }else {
                                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                                toFocus.blur();
                            }
                            indiceMenu = menu[1];
                            navigationCount -=1;
                            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                            toFocusMenu.focus();
                        }
                    }
                }



            }

        }


    }
}
async function moveRightSelectedVods() {
    if(navigationCount <= 1) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }
        
        
        
        if(navigationCount == 1) {
            
            //-------------------------- este bloco pode ficar no navigation ==0 antes do navigationCount +=1
            indiceMenu = menu[1];
            indice = campo[containerCount]
            
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.blur();
            //----------------------------------

            
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina
                if(containerCount < 2) {
                    if(indice != null || indice != undefined) {
                        if(containerCount == 0){
                            if(arrayCountCategory < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 
                                arrayCountCategory +=1;
                                arrayCountChannelOrVodHorizontal =0
                                arrayCount = 0
                                arrayCountNext +=1
    
                                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                                toFocus.focus();
                                toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;
                            }                       

                        }


                        //parte dos canais
                        if(containerCount == 1){
                            if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 

                                if(arrayCountChannelOrVodHorizontal < 7 ) {
                                    arrayCountChannelOrVodHorizontal +=1
                                    arrayCount +=1;
                                    arrayCountNext +=1
                                    var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                                    toFocus.focus();
                                    
                                }
                            }  
                        }


                    }


                }
        }



    }
}



//--------------------------------------- navegação página search

const haveSearch = localStorage.getItem("lastSearch")
if(haveSearch === null){
    localStorage.setItem("lastSearch", "")
}

async function moveDownSelectedSearch() {


    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {
        console.log("o lenght do keyboard", menuKeyboard)
        if(containerKeyboardCount < menuKeyboard.length -1) {
            containerKeyboardCount +=1;
            indiceKey = menuKeyboard[containerKeyboardCount]

            if(containerKeyboardCount > 5) {
                arrayKeyCount = 0;
            }

            if(containerKeyboardCount > -1) {
                var toFocus = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
                toFocus.focus();

            }
        }
    }


    if(navigationCount == 2) {
        if(haveSearch === "") {
            indice = campoPopularSearches[containerPopularSearchCount];
            if(arrayPopularSearchCount + 6 <= indice.getElementsByClassName('selectedPopularSearchCard').length -1) {
                arrayPopularSearchCount +=6
                var toFocus = indice.getElementsByClassName('selectedPopularSearchCard')[arrayPopularSearchCount];
                toFocus.focus();

            }
        }
        if(haveSearch !== "") {
            if(containerSearchedCount < campoSearched.length -1) {
                containerSearchedCount +=1
                indice = campoSearched[containerSearchedCount];
                arraySearchedCount = 0;
                var toFocus = indice.getElementsByClassName('selectedSearchCard')[arraySearchedCount];
                toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;

                toFocus.focus();
            }
        }
    }

}
async function moveUpSelectedSearch() {
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }


    if(navigationCount == 1) {
        console.log("o lenght do keyboard", menuKeyboard)
        if(containerKeyboardCount > 0) {
            containerKeyboardCount -=1;
            indiceKey = menuKeyboard[containerKeyboardCount];

            var toFocus = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
            toFocus.focus();
            console.log("mpodaepofakepofaoek", indiceKey)

        }

    }
    if(navigationCount == 2) {
        if(haveSearch === "") {
            indice = campoPopularSearches[containerPopularSearchCount];
            if(arrayPopularSearchCount >= 6) {
                arrayPopularSearchCount -=6
                var toFocus = indice.getElementsByClassName('selectedPopularSearchCard')[arrayPopularSearchCount];
                toFocus.focus();

            }
        }
        if(haveSearch !== "") {
            if(containerSearchedCount > 0) {
                containerSearchedCount -=1
                indice = campoSearched[containerSearchedCount];
                arraySearchedCount = 0;
                var toFocus = indice.getElementsByClassName('selectedSearchCard')[arraySearchedCount];
                toFocus.scrollIntoView({behavior: "auto", block: "center", inline: "nearest" }) ;
                toFocus.focus();
            }
        }
    }



}
async function moveLeftSelectedSearch() {

    if(navigationCount > 0) {

        if(containerCount == -1 && containerKeyboardCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }




        if(navigationCount == 1) {
            indiceKey = menuKeyboard[containerKeyboardCount]

            if(arrayKeyCount > -1) {
                arrayKeyCount -=1;
                var toFocusKeyboard = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
                var toBlurKeyboard = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[0]
    
                if(arrayKeyCount >= 0 ) {
                    toFocusKeyboard.focus();
                }
    
                if(arrayKeyCount == -1) {
                    toBlurKeyboard.blur()
                    indiceMenu = menu[1];

                    var toDisplay = document.getElementById('navigationToRemove');
                    var toDisplay2 = document.getElementById('navigationToRemove2');
    
                    toDisplay2.classList.remove("navigationNone");
                    toDisplay.classList.add("navigationNone");
                    navigationCount -=1;
    
                    var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                    toFocusMenu.focus();
    
                }
            }
        }


        if(navigationCount == 2) {
            if(haveSearch === "") {
                if(arrayAuxPopularSearchCount > -1) {
                    indice = campoPopularSearches[containerPopularSearchCount];
                    arrayAuxPopularSearchCount -=1
                    arrayPopularSearchCount -=1

                    if(arrayAuxPopularSearchCount > -1) {
                        
                        var toFocus = indice.getElementsByClassName('selectedPopularSearchCard')[arrayPopularSearchCount];
                        toFocus.focus();

                    }

                    if(arrayAuxPopularSearchCount == -1) {
                        indiceKey = menuKeyboard[containerKeyboardCount]
                        arrayKeyCount -=1
                        var toFocusKeyboard = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
                        var toBlur = indice.getElementsByClassName('selectedPopularSearchCard')[0];
                        toBlur.blur();
                        navigationCount -=1;
                        containerCount -= 2;
                        
                        toFocusKeyboard.focus()
                        console.log("o que tem aqui", indiceKey.getElementsByClassName('selectedMenuKeyboardItem'))
                        console.log("o que tem aqui", arrayKeyCount)
                        //toFocusKeyboard.focus();

                    }
                }


            } else if(haveSearch !== "") {
                indice = campoSearched[containerSearchedCount];
                if(arraySearchedCount >= -1)
                arraySearchedCount -=1
                console.log("valores", indice)

                if(arraySearchedCount > -1) {
                    var toFocus = indice.getElementsByClassName('selectedSearchCard')[arraySearchedCount];
                    toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;
                    toFocus.focus();
                }

                if(arraySearchedCount == -1) {
                    indiceKey = menuKeyboard[containerKeyboardCount]
                    arrayKeyCount -=1
                    var toFocusKeyboard = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
                    var toBlur = indice.getElementsByClassName('selectedSearchCard')[0];
                    toBlur.blur();
                    navigationCount -=1;
                    containerCount -= 2;
                    toFocusKeyboard.focus()

                    
                }



            }
        }


    }

}
async function moveRightSelectedSearch() {
    if(navigationCount <= 2) {

        if(navigationCount < 2) {
            if(navigationCount == 0) {
                navigationCount +=1
                console.log("o navigationCount right é", navigationCount)
            }
    
    
    
            if(navigationCount == 1) {
                indiceMenu = menu[1];
                indiceKey = menuKeyboard[containerKeyboardCount]
                
                var toDisplayNone = document.getElementById('navigationToRemove');
                var toDisplayBlock = document.getElementById('navigationToRemove2');
                
                toDisplayBlock.classList.add("navigationNone");
                toDisplayNone.classList.remove("navigationNone");
                
                var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                toFocusMenu.blur();
                
                // daqui em diante só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina, ou seja, provavelmente apertou o DOWN button
                if(containerKeyboardCount > -1) {
                        indiceKey = menuKeyboard[containerKeyboardCount]
        
                        if(arrayKeyCount <= indiceKey.getElementsByClassName('selectedMenuKeyboardItem').length  ){
                            arrayKeyCount += 1;
            
                            if(arrayKeyCount <= indiceKey.getElementsByClassName('selectedMenuKeyboardItem').length -1 ){
                                var toFocusKeyboard = indiceKey.getElementsByClassName('selectedMenuKeyboardItem')[arrayKeyCount]
                                toFocusKeyboard.focus();
            
                            }
            
                            if(arrayKeyCount == indiceKey.getElementsByClassName('selectedMenuKeyboardItem').length  ){
                                navigationCount +=1;
                                containerCount += 2;

                                if(haveSearch == "") {
                                    indice = campoPopularSearches[containerPopularSearchCount];
                                    console.log(" esta vazio")
                                    arrayPopularSearchCount +=1
                                    var toFocus = indice.getElementsByClassName('selectedPopularSearchCard')[arrayPopularSearchCount];
                                    arrayPopularSearchCount -=1
                                    toFocus.focus();

                    
                                } else if(haveSearch !== "") {
                                    indice = campoSearched[containerSearchedCount];
                                    console.log("nao esta vazio")
                                    arraySearchedCount +=1
                                    var toFocus = indice.getElementsByClassName('selectedSearchCard')[arraySearchedCount];
                                    arraySearchedCount -=1
                                    toFocus.focus();
                    
                                } 
                            }
                        }
                }
                
            }

        }

        if(navigationCount == 2) {
            console.log("opa")
            if(haveSearch === "") {
                if(arrayAuxPopularSearchCount < 5) {
                    indice = campoPopularSearches[containerPopularSearchCount];
                    arrayAuxPopularSearchCount +=1
                    arrayPopularSearchCount +=1
                    var toFocus = indice.getElementsByClassName('selectedPopularSearchCard')[arrayPopularSearchCount];
                    toFocus.focus();
                }


            } else if(haveSearch !== "") {
                indice = campoSearched[containerSearchedCount];
                console.log("valores", indice)
                if(arraySearchedCount < indice.getElementsByClassName('selectedSearchCard').length -1)
                arraySearchedCount +=1
                var toFocus = indice.getElementsByClassName('selectedSearchCard')[arraySearchedCount];
                toFocus.scrollIntoView({behavior: "auto", block: "nearest", inline: "center" }) ;
                toFocus.focus();


            }
        }

    }
}



//--------------------------------------- navegação página saved

async function moveDownSelectedSaved() {


    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {
        console.log("o campor é ", campo)
        if(containerCount < 1) {
            containerCount+=1;
            indice = campo[containerCount]
            if(containerCount == 0){
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                console.log("o que tem no toFocus", toFocus)
                toFocus.focus();
            }
            if(containerCount == 1){
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                console.log("o que tem no toFocus", toFocus)
                toFocus.focus();
            }
        }
    }
}
async function moveUpSelectedSaved() {
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {

        if(containerCount > 0) {
            containerCount-=1;
            indice = campo[containerCount]

            if(containerCount == 0) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                console.log("o que tem no toFocus", toFocus)
                toFocus.focus();
            }
            if(containerCount == 1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                console.log("o que tem no toFocus", toFocus)
                toFocus.focus();
            }
        }
    }
}

async function moveLeftSelectedSaved() {

    if(navigationCount > 0) {

        if(containerCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            indice = campo[containerCount]

            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }




        if(navigationCount == 1) {

            if(containerCount == 0) {
                if(indice != null || indice != undefined) {
                    if(arrayCount > -1) {
                    indice = campo[containerCount];
                    arrayCountCategory -=1
                    arrayCount = 0
                    if(arrayCountCategory >= 0) {
                        console.log("maior que -1", arrayCountCategory)
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                        toFocus.focus();
                        toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
    
                    }
    
                    if(arrayCountCategory == -1) {
                        indiceMenu = menu[1];
                        var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayBlock = document.getElementById('navigationToRemove2');
                        toDisplayBlock.classList.remove("navigationNone");
                        toDisplayNone.classList.add("navigationNone");
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                        toFocus.blur();
                        navigationCount -=1;
                        var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                        toFocusMenu.focus();
                    }
                }
                }
            }
            if(containerCount == 1) {
                if(indice != null || indice != undefined) {
                    if(arrayCount > -1) {
                    indice = campo[containerCount];
                    arrayCount -=1
                    if(arrayCount >= 0) {
                        console.log("maior que -1", arrayCount)
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                        toFocus.focus();
                        toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
    
                    }
    
                    if(arrayCount == -1) {
                        indiceMenu = menu[1];
                        var toDisplayNone = document.getElementById('navigationToRemove');
                        var toDisplayBlock = document.getElementById('navigationToRemove2');
                        toDisplayBlock.classList.remove("navigationNone");
                        toDisplayNone.classList.add("navigationNone");
                        var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                        toFocus.blur();
                        navigationCount -=1;
                        var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
                        toFocusMenu.focus();
                    }
                }
                }
            }
            


        }


    }

}
async function moveRightSelectedSaved() {
    if(navigationCount <= 1) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }
        
        
        
        if(navigationCount == 1) {
            
            //-------------------------- este bloco pode ficar no navigation ==0 antes do navigationCount +=1
            indiceMenu = menu[1];
            indice = campo[containerCount]
            
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.blur();
            //----------------------------------

            
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina
                if(containerCount < 2) {

                    if(containerCount == 0) {
                        if(arrayCountCategory < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 
                            arrayCountCategory +=1;
                            arrayCountNext +=1
                            arrayCount = 0

                            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCountCategory];
                            toFocus.focus();
                            toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
                        }    
                    }
                    if(containerCount == 1) {
                        if(indice != null || indice != undefined) {
                            if(arrayCount < indice.getElementsByClassName('selectedCategoryCard').length -1 ){ 
                                arrayCount +=1;
                                arrayCountNext +=1
    
                                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[arrayCount];
                                toFocus.focus();
                                toFocus.scrollIntoView({behavior: "auto", block: "end", inline: "center" }) ;
                            }                       
    
                        }

                    }


                }
        }



    }
}



//--------------------------------------- navegação página config

async function moveDownSelectedConfig() {

    if(navigationCount == 1) {
        indice = campo[0]        
        
        if(containerCount < indice.getElementsByClassName('selectedCategoryCard').length -1) {
            containerCount +=1
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[containerCount];
            toFocus.focus();
            
        }
    }
    if(navigationCount == 2) {
        if(arrayQrCount < campoQr.length -1) {
            arrayQrCount+=1
            indiceQR = campoQr[arrayQrCount]
            indiceQR.focus();
        }
        
    }

}
async function moveUpSelectedConfig() {

    if(navigationCount == 1) {
        indice = campo[0]        
        
        if(containerCount > 0) {
            containerCount -=1
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[containerCount];
            toFocus.focus();
            
        }
    }
    if(navigationCount == 2) {
        if(arrayQrCount > 0) {
            arrayQrCount-=1
            indiceQR = campoQr[arrayQrCount]
            indiceQR.focus();
        }
    }

}
async function moveLeftSelectedConfig() {

        if(navigationCount == 1) {}
        if(navigationCount == 2) {
            indiceQR = campoQr[arrayQrCount]
            indiceQR.blur();
            navigationCount -=1
            var toFocus = indice.getElementsByClassName('selectedCategoryCard')[containerCount];
            toFocus.focus();
            
        }



}
async function moveRightSelectedConfig() {
    if(navigationCount < 2) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }



        if(navigationCount == 1) {

            indiceQR = campoQr[arrayQrCount]
            navigationCount +=1
            
            indiceQR.focus();
            

        }
        if(navigationCount == 2) {}

    }
}













//--------------------------------------- navegação página base (menu funcionando)

async function moveDownSelectedX() {


    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount < indiceMenu.getElementsByClassName('selectedMenuItem').length -1) {
            arrayMenuCount +=1
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {}
    if(navigationCount == 2) {}

}
async function moveUpSelectedX() {
    if(navigationCount == 0) {
        indiceMenu = menu[1];

        if(arrayMenuCount > 0) {
            arrayMenuCount-=1;
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();
        }
    }
    if(navigationCount == 1) {}
    if(navigationCount == 2) {}

}
async function moveLeftSelectedX() {

    if(navigationCount > 0) {

        if(containerCount == -1) {
            navigationCount -=1;
            console.log("valor do navigation", navigationCount)

        }


        if(navigationCount == 0) {
            indiceMenu = menu[1];
            console.log("o que tem no indiceMenu", indiceMenu)
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            console.log("o que tem no toDisplay", toDisplayNone)
            toDisplayBlock.classList.remove("navigationNone");
            toDisplayNone.classList.add("navigationNone");

            if(containerCount > -1) {
                var toFocus = indice.getElementsByClassName('selectedCategoryCard')[0];
                toFocus.blur();
            }

            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.focus();

        }




        if(navigationCount == 1) {}
        if(navigationCount == 2) {}


    }

}
async function moveRightSelectedX() {
    if(navigationCount < 2) {

        if(navigationCount == 0) {
            navigationCount +=1
            console.log("o navigationCount right é", navigationCount)
        }



        if(navigationCount == 1) {

            indiceKey = menuKeyboard[oneMoreKeyboard]
            
            var toDisplayNone = document.getElementById('navigationToRemove');
            var toDisplayBlock = document.getElementById('navigationToRemove2');
            
            toDisplayBlock.classList.add("navigationNone");
            toDisplayNone.classList.remove("navigationNone");
            
            var toFocusMenu = indiceMenu.getElementsByClassName('selectedMenuItem')[arrayMenuCount];
            toFocusMenu.blur();
            
            if(containerCount > -1) {
                // dentro deste if só irá ser utilizado quando o usuário
                // ja tiver navegado em outra parte da pagina
                if(containerCount > -1) {
    
                }
            }
        }
        if(navigationCount == 2) {}

    }
}

//document.getElementById('scrolling').addEventListener("keydown", myFunction);



// variaveis, funções que podem auxiliar na navegação do scroll
 /*
//var toDisplas = document.getElementById('focustest' + arrayCount);
//document.getElementById('scrolling').addEventListener("keydown", myFunction);
//document.getElementById('scrolling').addEventListener("keydown", myFunction);

function myFunction() {//  w w  w.  ja  va2  s  . c o m
console.log("aconteceu algo")
document.getElementById('scrolling').scrollBy(300, 0)
document.getElementById('scrolling').scrollBy(300, 0)
};

                            for(arrayCountNext; arrayCountNext <= indice.getElementsByClassName('selectedCategoryCard').length -1; arrayCountNext++) {
                                //console.log("os valores são", aux)
                                //var auxi = aux + arrayCount;
                                //var text = 'focustest'+ aux.toString()
                                //console.log("no texto tem", text)
                                //var toDisplas2 = document.getElementById('focustest' + arrayCountNext);
                                //console.log("os valores de auxi é", auxi)
                                //console.log("o to displas2 é", toDisplas2)           
                                //toDisplas2.classList.add("removeMarg")
                                //break;
                            }
 
 
 */
