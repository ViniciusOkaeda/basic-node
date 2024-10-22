
const auth = localStorage.getItem("authorization");
const profile = localStorage.getItem("profileid");
const language = 'pt';
const devicesType = 'webos';
const selectedChannelId = parseInt(localStorage.getItem("selectedChannel"))
const type = localStorage.getItem("type");
const events = localStorage.getItem("event");
const content = localStorage.getItem("idContent");
sessionStorage.setItem("indexCount", 0);


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
    const formatedDescription = description.length <= 80 ? description : description.substring(0, 80) + "...";

    return formatedDescription;
}

function formatTitleLength(description) {
    const formatedTitle = description.length <= 28 ? description : description.substring(0, 27) + "...";

    return formatedTitle;
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
console.log("as datas fullDateX", fullDateX)
console.log("as datas stringDateToFilterX", stringDateToFilterX)
const stringDateToFilter = fullDate5.toString();
const stringDateToFilter2 = fullDate6.toString();

const fullDate = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + getHourFormated + ":" + getMinutesFormated + ":" + getSecondsFormated
const fullDate2 = currentYear + "-" + getMonthFormated + "-" + getDayFormated + "T" + hours 
const fullDate3 = currentYear + "-" + getMonthFormated + "-" + getDayFormated
const fullDate4 = currentYear + "-" + getMonthFormated + "-" + finalAnotherDay + "T" + infoCompleteHour
const stringDate = fullDate.toString();
const stringDate2 = fullDate4.toString();

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



// CALL PARA O PLAYER
async function getInfoCardSelected() {


    switch(localStorage.getItem("type")) {

        case "TV":

        var loaded = document.getElementById("loadingContent");
        var load1 = false;
        showLoading();

            let startAt = localStorage.getItem("startAt");
            if(startAt == "undefined"){
                const channelStreamRequest = axios.post('https://hospitality.youcast.tv.br/getStreamChannelUrlV3', {
                    authorization: 'Bearer ' + auth,
                    includeData: true,
                    profileId: profile,
                    language: language,
                    devicesType: devicesType,
                    channelsId: parseInt(localStorage.getItem("idContent")),
                    timestamp: parseInt(new Date().getTime() / 1000),
                    live: true,
                    type: type
                }).then(function (response) {
                    shaka.polyfill.installAll();
    
                    var video = document.getElementById('video');
                    var player = new shaka.Player(video);
                
                    player.configure({
                        drm: {
                            servers: {
                                'com.widevine.alpha': 'https://mw.yplay.com.br/widevine_proxy',
                            }
                        }
                    });
                
                    var devices_type = 'webos';
                    var devices_identification = 'Windows 10 pro, chrome';
                    var devices_hash = '2545249073';
                    var customers_token = localStorage.getItem('authorization'); // CHANGE ME
                    var profiles_id = localStorage.getItem('profileid'); // CHANGE ME
                    var version = '1.0.12';
                    var timestamp = parseInt(new Date().getTime() / 1000);
                    var offset = response.data.response.offset;
                    var edges_id = response.data.response.edgesId;
                
                    player.getNetworkingEngine().registerRequestFilter(function(type, request) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            request.headers['Authorization'] = 'Bearer ' + customers_token;
                            request.headers['profilesId'] = btoa(profiles_id);
                            request.headers['devicesType'] = btoa(devices_type);
                            request.headers['version'] = btoa(version);
                            request.headers['browserType'] = btoa('chrome');
                            var wrapped = {};
                            wrapped.timestamp = timestamp;
                            wrapped.offset = offset;
                            wrapped.edges_id = edges_id;
                            wrapped.devices_identification = devices_identification;
                            wrapped.devices_hash = devices_hash;
                            wrapped.rawLicense =
                                Uint8ArrayUtils.toBase64(new Uint8Array(request.body), false);
                
                            var wrappedJson = JSON.stringify(wrapped);
                            request.body = StringUtils.toUTF8(wrappedJson);
                        }
                    });
                    player.getNetworkingEngine().registerResponseFilter(function(type, response) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            var wrappedString = StringUtils.fromUTF8(response.data);
                            var wrapped = JSON.parse(wrappedString);
                            var rawLicense = wrapped.rawLicense;
                            response.data = Uint8ArrayUtils.fromBase64(rawLicense);
                        }
                    });
                    console.log("o player", player)
                    player.load(response.data.response.url);
                    video.play();
                    function showPlayerNow() {
                        load1 = true;
                        if(load1 == true ) {
                            loaded.style.display = "none";
                        }
                        console.log('Função executada após 5 segundos');
                      }
                      setTimeout(showPlayerNow, 100);
            
                }).catch(function (response) {
            
                })
            }else {

                const TEST_VIDEO = "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd";


                const channelStreamRequest = axios.post('https://hospitality.youcast.tv.br/getStreamChannelUrlV3', {
                    authorization: 'Bearer ' + auth,
                    includeData: true,
                    profileId: profile,
                    language: language,
                    devicesType: devicesType,
                    channelsId: parseInt(localStorage.getItem("idContent")),
                    timestamp: parseInt(startAt),
                    live: false,
                    type: type
                }).then(function (response) {
                    shaka.polyfill.installAll();
                    var video = document.getElementById('video');
                    var player = new shaka.Player(video);
                    player.configure({
                        drm: {
                            servers: {
                                'com.widevine.alpha': 'https://mw.yplay.com.br/widevine_proxy',
                            }
                        }
                    });
                    var devices_type = 'webos';
                    var devices_identification = 'Windows 10 pro, chrome';
                    var devices_hash = '2545249073';
                    var customers_token = localStorage.getItem('authorization'); // CHANGE ME
                    var profiles_id = localStorage.getItem('profileid'); // CHANGE ME
                    var version = '1.0.12';
                    var timestamp = startAt;
                    var offset = response.data.response.offset;
                    var edges_id = response.data.response.edgesId;
                    player.getNetworkingEngine().registerRequestFilter(function(type, request) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            request.headers['Authorization'] = 'Bearer ' + customers_token;
                            request.headers['profilesId'] = btoa(profiles_id);
                            request.headers['devicesType'] = btoa(devices_type);
                            request.headers['version'] = btoa(version);
                            request.headers['browserType'] = btoa('chrome');
                            var wrapped = {};
                            wrapped.timestamp = timestamp;
                            wrapped.offset = offset;
                            wrapped.edges_id = edges_id;
                            wrapped.devices_identification = devices_identification;
                            wrapped.devices_hash = devices_hash;
                            wrapped.rawLicense =
                                Uint8ArrayUtils.toBase64(new Uint8Array(request.body), false);
                
                            var wrappedJson = JSON.stringify(wrapped);
                            request.body = StringUtils.toUTF8(wrappedJson);
                        }
                    });
                    player.getNetworkingEngine().registerResponseFilter(function(type, response) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            var wrappedString = StringUtils.fromUTF8(response.data);
                            var wrapped = JSON.parse(wrappedString);
                            var rawLicense = wrapped.rawLicense;
                            response.data = Uint8ArrayUtils.fromBase64(rawLicense);
                        }
                    });

                    try {
                        senza.init().then(function() {
                          initVideo(player);
                          loadVideo(response.data.response.url).then(function () {
                            playVideo();
                            senza.uiReady();
                          });
                        });
                      } catch (error) {
                        console.error(error);
                      }
                    
                    document.addEventListener("keydown", async function(event) {
                        switch (event.key) {
                        case "Enter": toggleBackground(); break;
                        case "Escape": playPause(); break;
                        case "ArrowLeft": skip(-30); break;
                        case "ArrowRight": skip(30); break;      
                            default: return;
                        }
                    })

                    function initVideo(player) {
                      
                      senza.remotePlayer.addEventListener("timeupdate", function() {
                        player.getMediaElement().currentTime = senza.remotePlayer.currentTime || 0;
                      });
                    
                      senza.remotePlayer.addEventListener("ended", function() {
                        senza.lifecycle.moveToForeground();
                      });
                    
                      senza.lifecycle.addEventListener("onstatechange", function(event) {
                        if (event.state === "background") {
                          pauseVideo();
                        } else if (event.state === "foreground") {
                          playVideo();
                        }
                      });
                    }
                    
                    function loadVideo(url) {
                      return player.load(url).then(function() {
                        return senza.remotePlayer.load(url);
                      });
                    }
                    
                    function playVideo() {
                      player.getMediaElement().play().catch(function (error) {
                        console.log("Unable to play video. Possibly the browser will not autoplay video with sound.");
                      });
                    }
                    
                    function pauseVideo() {
                      player.getMediaElement().pause();
                    }
                    
                    function playPause() {
                      if (player.getMediaElement().paused) {
                        playVideo();
                      } else {
                        pauseVideo();
                      }
                    }
                    
                    function skip(seconds) {
                      player.getMediaElement().currentTime = player.getMediaElement().currentTime + seconds;
                    }
                    
                    function moveToForeground() {
                      senza.lifecycle.moveToForeground();
                    }
                    
                    function moveToBackground() {
                      var currentTime = player.getMediaElement().currentTime;
                      senza.remotePlayer.currentTime = currentTime;
                      senza.remotePlayer.play();
                    }
                    
                    function toggleBackground() {
                      senza.lifecycle.getState().then(function(currentState) {
                        if (currentState == "background" || currentState == "inTransitionToBackground") {
                          senza.lifecycle.moveToForeground();
                        } else {
                          moveToBackground();
                        }
                      });
                    }

            
                }).catch(function (response) {
            
                })



                
                
                /*
                const channelStreamRequest = axios.post('https://hospitality.youcast.tv.br/getStreamChannelUrlV3', {
                    authorization: 'Bearer ' + auth,
                    includeData: true,
                    profileId: profile,
                    language: language,
                    devicesType: devicesType,
                    channelsId: parseInt(localStorage.getItem("idContent")),
                    timestamp: parseInt(startAt),
                    live: false,
                    type: type
                }).then(function (response) {
                    shaka.polyfill.installAll();
    
                    var video = document.getElementById('video');
                    var player = new shaka.Player(video);
                
                    player.configure({
                        drm: {
                            servers: {
                                'com.widevine.alpha': 'https://mw.yplay.com.br/widevine_proxy',
                            }
                        }
                    });
                
                    var devices_type = 'webos';
                    var devices_identification = 'Windows 10 pro, chrome';
                    var devices_hash = '2545249073';
                    var customers_token = localStorage.getItem('authorization'); // CHANGE ME
                    var profiles_id = localStorage.getItem('profileid'); // CHANGE ME
                    var version = '1.0.12';
                    var timestamp = startAt;
                    var offset = response.data.response.offset;
                    var edges_id = response.data.response.edgesId;
                
                    player.getNetworkingEngine().registerRequestFilter(function(type, request) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            request.headers['Authorization'] = 'Bearer ' + customers_token;
                            request.headers['profilesId'] = btoa(profiles_id);
                            request.headers['devicesType'] = btoa(devices_type);
                            request.headers['version'] = btoa(version);
                            request.headers['browserType'] = btoa('chrome');
                            var wrapped = {};
                            wrapped.timestamp = timestamp;
                            wrapped.offset = offset;
                            wrapped.edges_id = edges_id;
                            wrapped.devices_identification = devices_identification;
                            wrapped.devices_hash = devices_hash;
                            wrapped.rawLicense =
                                Uint8ArrayUtils.toBase64(new Uint8Array(request.body), false);
                
                            var wrappedJson = JSON.stringify(wrapped);
                            request.body = StringUtils.toUTF8(wrappedJson);
                        }
                    });
                    player.getNetworkingEngine().registerResponseFilter(function(type, response) {
                        var StringUtils = shaka.util.StringUtils;
                        var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
                
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            var wrappedString = StringUtils.fromUTF8(response.data);
                            var wrapped = JSON.parse(wrappedString);
                            var rawLicense = wrapped.rawLicense;
                            response.data = Uint8ArrayUtils.fromBase64(rawLicense);
                        }
                    });
                    console.log("o player", player)
                    video.volume = 1
                    player.load(response.data.response.url);
                    video.play();


                    function showPlayerNow() {
                        load1 = true;
                        if(load1 == true ) {
                            loaded.style.display = "none";
                        }
                        console.log('Função executada após 5 segundos');
                      }
                      setTimeout(showPlayerNow, 500);
            
                }).catch(function (response) {
            
                })

                */

            }

            break;
        case "VOD":
            var loaded = document.getElementById("loadingContent");
            var load1 = false;
            showLoading();
            const vodStreamRequest = axios.post('https://hospitality.youcast.tv.br/getStreamVodUrlV3', {
                authorization: 'Bearer ' + auth,
                includeData: true,
                profileId: profile,
                language: language,
                devicesType: devicesType,
                vodsId: parseInt(localStorage.getItem("idContent")),
                type: type
            }).then(function (response) {
                //console.log("O RESPONSE", response)
                shaka.polyfill.installAll();

                var video = document.getElementById('video');
                var player = new shaka.Player(video);
            
                player.configure({
                    drm: {
                        servers: {
                            'com.widevine.alpha': 'https://mw.yplay.com.br/widevine_proxy',
                        }
                    }
                });

            
                var devices_type = 'webos';
                var devices_identification = 'Windows 10 pro, chrome';
                var devices_hash = '2545249073';
                var customers_token = localStorage.getItem('authorization'); // CHANGE ME
                var profiles_id = localStorage.getItem('profileid'); // CHANGE ME
                var version = '1.0.12';
                var timestamp = parseInt(new Date().getTime() / 1000);
                var offset = response.data.response.offset;
                var edges_id = response.data.response.edgesId;
            
                console.log("o que tem no response", player.getNetworkingEngine())

                player.getNetworkingEngine().registerRequestFilter(function(type, request) {
                    console.log("o player22222", request)

                    var StringUtils = shaka.util.StringUtils;
                    var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
            
                    if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                        console.log("quais sao os requests", request.headers)
                        request.headers['Authorization'] = 'Bearer ' + customers_token;
                        request.headers['profilesId'] = btoa(profiles_id);
                        request.headers['devicesType'] = btoa(devices_type);
                        request.headers['version'] = btoa(version);
                        request.headers['browserType'] = btoa('chrome');
                        var wrapped = {};
                        wrapped.timestamp = timestamp;
                        wrapped.offset = offset;
                        wrapped.edges_id = edges_id;
                        wrapped.devices_identification = devices_identification;
                        wrapped.devices_hash = devices_hash;
                        wrapped.rawLicense =
                            Uint8ArrayUtils.toBase64(new Uint8Array(request.body), false);
            
                        var wrappedJson = JSON.stringify(wrapped);
                        request.body = StringUtils.toUTF8(wrappedJson);
                    }
                });
                player.getNetworkingEngine().registerResponseFilter(function(type, response) {
                    var StringUtils = shaka.util.StringUtils;
                    var Uint8ArrayUtils = shaka.util.Uint8ArrayUtils;
            
                    if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                        var wrappedString = StringUtils.fromUTF8(response.data);
                        console.log("o que tem no response.data", response.data)
                        var wrapped = JSON.parse(wrappedString);
                        var rawLicense = wrapped.rawLicense;
                        response.data = Uint8ArrayUtils.fromBase64(rawLicense);
                    }
                });
                console.log("o player", player)
                player.load(response.data.response.url);
                video.play();
                function showPlayerNow() {
                    load1 = true;
                    if(load1 == true ) {
                        loaded.style.display = "none";
                    }
                    console.log('Função executada após 5 segundos');
                  }
                  setTimeout(showPlayerNow, 500);



            }).catch(function (response) {
        
            })

            break;
    }

    //window.location='../player/player.html'

}


// CALL PARA OS MENUS AUXILIARES (lado esquerdo) 
async function getSubscribedChannels() {

    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();
    if(localStorage.getItem("catIdPlayer") == null) {
        localStorage.setItem("catIdPlayer", "null")
    }



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

}
getSubscribedChannels();

// CALL PARA OS MENUS AUXILIARES (lado direito) e (lado inferior)
async function getUpdateEpgEventsV2() {
    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();

    if(type === "TV") {
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
                            showChannelEventsToday(data1, data3, data2)
                        }
                    }
                }).catch(function (response) {
                    console.log("o response de erro", response)
                })
    }

}
getUpdateEpgEventsV2();

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
            }).then(async function (response) {
                //console.log("o response", response)
                if (response.data.status == 1) {
                    //console.log("o getUpdatedEventsV2", response.data.response);


                    let dataSpecificEvent = response.data.response
                    showVideoEmphasisInfo(response.data.response, "TV");
                    showVideoDetails(dataSpecificEvent, "TV")
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
                //console.log("o response", response)
                if (response.data.status == 1) {
                    //console.log("o EventRecomendations", response.data.response);
                    showRecomendedInfo(response.data.response);
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
                //console.log("o response getSpecificEventRequestVod", response)
                if (response.data.status == 1) {
                    //console.log("o getDataV2", response.data.response);
                    showVideoEmphasisInfo(response.data.response, "VOD");
                    showVideoDetails(response.data.response, "VOD")

                    //showEventInitial([response.data.response]);
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
                //console.log("o response getRecomendationEventRequestVod", response)
                if (response.data.status == 1) {
                    //console.log("o EventRecomendations", response.data.response);
                    showRecomendedInfo(response.data.response);
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
                    //showCategoryEventInitial([response.data.response.category]);
                    //showEventRecomendations(response.data.response.rows)
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
                    showRecomendedInfo(response.data.response);
                }
            }).catch(function (response) {
                console.log("o response de erro", response)
            })
            break;

    }





}
getSpecificEvent();

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
                    //console.log("o getDataV2", response.data.response);
                    var dataSpecificEvent = response.data.response
                    //showVideoDetails(response.data.response, "VOD")
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

                    //showEventInitial([response.data.response]);
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
        campoBottom = document.querySelectorAll('.selectedBottom')
        let containerBottomMenuCount = parseInt(event.view.window.containerBottomMenuCount)
        let arrayBottomMenuInfoCount = parseInt(event.view.window.arrayBottomMenuInfoCount)
        indice = campoBottom[containerBottomMenuCount];
        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
    
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
                let testing = true
                getMyListAndRecordings();
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })

    }
    

}
async function addToMyList() {

    if(event.keyCode === 13) {
        campoBottom = document.querySelectorAll('.selectedBottom')
        let containerBottomMenuCount = parseInt(event.view.window.containerBottomMenuCount)
        let arrayBottomMenuInfoCount = parseInt(event.view.window.arrayBottomMenuInfoCount)
        indice = campoBottom[containerBottomMenuCount];
        var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
    
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
                let testing = true
                getMyListAndRecordings();
    
    
    
    
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })
    }
    //console.log("o evento atual", event)



}
async function removeRecording() {
    console.log("event target", event.target.dataset)
    if(event.keyCode === 13) {
        const removeFromMyList = await axios.post('https://hospitality.youcast.tv.br/removeRecording', {
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
async function addRecordingV2() {
    if(event.keyCode === 13) {
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


//------ FUNÇÕES PARA CONTROLE DO PLAYER ---------------------
async function playAndPause() {
    if(event.keyCode === 13) {
        var videoOptions = document.getElementById('video');
    
        if(videoOptions.paused) {
            videoOptions.play();
        } else{
            videoOptions.pause()
        }

    }

}
async function incrementVolume() {
    if(event.keyCode === 13) {
        
        var videoOptions = document.getElementById('video');
        if(videoOptions.volume < 1) {
            videoOptions.volume +=0.1;
            
        }
    }

}
async function decrementVolume() {
    if(event.keyCode === 13) {
        var videoOptions = document.getElementById('video');
        if(videoOptions.volume > 0.1) {
            videoOptions.volume -=0.1;
        }
        
    }

}
async function decrementVolume() {
    if(event.keyCode === 13) {
        var videoOptions = document.getElementById('video');
        if(videoOptions.volume > 0.1) {
            videoOptions.volume -=0.1;
        }
        
    }

}
async function advanceVideo() {
    if(event.keyCode === 13) {
        var videoOptions = document.getElementById('video');
        videoOptions.seekToNextFrame()
        
    }

}
async function goBackVideo() {
    if(event.keyCode === 13) {
        var videoOptions = document.getElementById('video');
        
    }

}
function showVideoEmphasisInfo(eventToday, type) {
    //console.log("o eventToday eé", eventToday)

    if(type === "TV") {
        var watchingNow =  eventToday.slice(-1)[0]
        document.getElementById("videoEmphasisInfo").innerHTML =
        `
            <div class="flexContent">
                <h2>${watchingNow.title}</h2>
    
                ${watchingNow.episode !== null
                ?
                `<h2>${watchingNow.episode}</h2>`
    
                :
                ""
            }
    
                <div class="emphasisRate bannerRating
                ${watchingNow.rating < 10 ? "bannerRatingL" : ''} 
                ${watchingNow.rating == 10 ? "bannerRating10" : ''} 
                ${watchingNow.rating == 12 ? "bannerRating12" : ''} 
                ${watchingNow.rating == 14 ? "bannerRating14" : ''} 
                ${watchingNow.rating == 16 ? "bannerRating16" : ''} 
                ${watchingNow.rating == 18 ? "bannerRating18" : ''} 
                "><h3>${watchingNow.rating == 0 ? "L" : watchingNow.rating}</h3>
                </div>
            <div>
    
        `
        document.getElementById("videoEmphasisInfo2").innerHTML =
        `
            <div class="flexContent">
    
    
                
                ${watchingNow.channels_logo !== null
                    ?
                    ` <div class="emphasisLogo" style="background-image: url(${watchingNow.channels_logo})"></div>`
        
                    :
                    ""
                }
    
                ${watchingNow.genres !== null
                    ?
                    `<h4>${watchingNow.genres}</h4>`
        
                    :
                    ""
                }
    
                <h4>Duração: ${formatDuration(watchingNow.duration)}m</h4>
    
    
    
    
                ${watchingNow.start !== null
                    ?
                    `
                    <div class="emphasisDetailDate">
                    <img src="../../images/clock.png" class="clock"></img>
                    <h4>${getHour(watchingNow.start)}</h4>
                    </div>
                    `
        
                    :
                    ""
                }
    
            <div>
    
        `
    }

    if(type === "VOD") {
        document.getElementById("videoEmphasisInfo").innerHTML =
        `
        
        <div class="flexContent">

                <h2>${eventToday.title}</h2>
    
                ${eventToday.episode !== null
                ?
                `<h2>${eventToday.episode}</h2>`
    
                :
                ""
            }
    
                <div class="emphasisRate bannerRating
                ${eventToday.rating < 10 ? "bannerRatingL" : ''} 
                ${eventToday.rating == 10 ? "bannerRating10" : ''} 
                ${eventToday.rating == 12 ? "bannerRating12" : ''} 
                ${eventToday.rating == 14 ? "bannerRating14" : ''} 
                ${eventToday.rating == 16 ? "bannerRating16" : ''} 
                ${eventToday.rating == 18 ? "bannerRating18" : ''} 
                "><h3>${eventToday.rating == 0 ? "L" : eventToday.rating}</h3>
                </div>
                
        <div>
    
        `
        document.getElementById("videoEmphasisInfo2").innerHTML =
        `
            <div class="flexContent">
    
    
                
                ${eventToday.channels_logo !== null
                    ?
                    ` <div class="emphasisLogo" style="background-image: url(${eventToday.channels_logo})"></div>`
        
                    :
                    ""
                }
    
                ${eventToday.genres !== null
                    ?
                    `<h4>${eventToday.genres}</h4>`
        
                    :
                    ""
                }
    
                <h4>Duração: ${formatDuration(eventToday.duration)}m</h4>
    
    
    
    
            <div>
    
        `
    }

}

function testF() {
    console.log("o evento atual", event)
    campoBottom = document.querySelectorAll('.selectedBottom')
    let containerBottomMenuCount = event.view.window.containerBottomMenuCount
    let arrayBottomMenuInfoCount = event.view.window.arrayBottomMenuInfoCount
    indice = campoBottom[containerBottomMenuCount];

    console.log("variaveis1", campoBottom)
    console.log("variaveis2", indice)
    console.log("variaveis3", containerBottomMenuCount)
    console.log("variaveis4", arrayBottomMenuInfoCount)
    var toFocusMenu = indice.getElementsByClassName('selectedBottomCategoryCard')[arrayBottomMenuInfoCount];
    console.log("variaveis5", toFocusMenu)
    //toFocusMenu.focus();

}

function showVideoDetails(eventToday, type, myRecordings, myList) {

    if(type === "TV") {
        var watchingNow =  eventToday.slice(-1)[0]
        document.getElementById("videoDetailsContainer").innerHTML =
        `
            <div class="videoDetailsFlex">
                <div class="videoDetailsContent1">
                    <div class="videoDetailsHeader">
                        <h2>${watchingNow.title}</h2>
    
                        ${watchingNow.episode !== null
                        ?
                        `<h2>${watchingNow.episode}</h2>`
            
                        :
                        ""
                        }
            
                        <div class="emphasisRate bannerRating
                        ${watchingNow.rating < 10 ? "bannerRatingL" : ''} 
                        ${watchingNow.rating == 10 ? "bannerRating10" : ''} 
                        ${watchingNow.rating == 12 ? "bannerRating12" : ''} 
                        ${watchingNow.rating == 14 ? "bannerRating14" : ''} 
                        ${watchingNow.rating == 16 ? "bannerRating16" : ''} 
                        ${watchingNow.rating == 18 ? "bannerRating18" : ''} 
                        "><h3>${watchingNow.rating == 0 ? "L" : watchingNow.rating}</h3>
                        </div>
                    </div>
    
                    <div class="videoDetailsBody">
                        <div class="videoDetailsBodyContent1">
                            ${watchingNow.channels_logo !== null
                                ?
                                ` <div class="emphasisLogo" style="background-image: url(${watchingNow.channels_logo})"></div>`
                    
                                :
                                ""
                            }
                
                            ${watchingNow.genres !== null
                                ?
                                `<h4>${watchingNow.genres}</h4>`
                    
                                :
                                ""
                            }
                
                            <h4>Duração: ${formatDuration(watchingNow.duration)}m</h4>
                
                
                
                
                            ${watchingNow.start !== null
                                ?
                                `
                                <div class="emphasisDetailDate">
                                <img src="../../images/clock.png" class="clock"></img>
                                <h4>${getHour(watchingNow.start)}</h4>
                                </div>
                                `
                    
                                :
                                ""
                            }
                        </div>
    
                        <div class="videoDetailsBodyContent2 selectedBottom">
                            <button class="selectedBottomCategoryCard" onfocus="testF()">ASSISTIR DO INICIO</button>
                            
                            <div id="myListButton">
                            
                            </div>

                            <div id="myRecordingButton">
                            
                            </div>

                        </div>
    
                        <div class="videoDetailsBodyContent3">
                            <h4>${watchingNow.description}</h4>
                        </div>
    
    
                    </div>
    
    
                </div>
    
                <div class="videoDetailsContent2">
                    <div class="videoDetailsImage" style="background-image: url(${watchingNow.image})"></div>
                </div>
            </div>
        `
        
    
    }
    if(type === "VOD") {

        document.getElementById("videoDetailsContainer").innerHTML =
        `
            <div class="videoDetailsFlex">
                <div class="videoDetailsContent1">
                    <div class="videoDetailsHeader">
                        <h2>${eventToday.title}</h2>
    
                        ${eventToday.episode !== null
                        ?
                        `<h2>${eventToday.episode}</h2>`
            
                        :
                        ""
                        }
            
                        <div class="emphasisRate bannerRating
                        ${eventToday.rating < 10 ? "bannerRatingL" : ''} 
                        ${eventToday.rating == 10 ? "bannerRating10" : ''} 
                        ${eventToday.rating == 12 ? "bannerRating12" : ''} 
                        ${eventToday.rating == 14 ? "bannerRating14" : ''} 
                        ${eventToday.rating == 16 ? "bannerRating16" : ''} 
                        ${eventToday.rating == 18 ? "bannerRating18" : ''} 
                        "><h3>${eventToday.rating == 0 ? "L" : eventToday.rating}</h3>
                        </div>
                    </div>
    
                    <div class="videoDetailsBody">
                        <div class="videoDetailsBodyContent1">
                
                            ${eventToday.genres !== null
                                ?
                                `<h4>${eventToday.genres}</h4>`
                    
                                :
                                ""
                            }
                
                            <h4>Duração: ${formatDuration(eventToday.duration)}m</h4>
                
                
                
                        </div>
    
                        <div class="videoDetailsBodyContent2 selectedBottom">
                            <button class="selectedBottomCategoryCard">ASSISTIR DO INICIO</button>
                            <div>
                            <div id="myListButton">
                            
                            </div>
                            
                            </div>
                        </div>
    
                        <div class="videoDetailsBodyContent3">
                            <h4>${eventToday.description}</h4>
                        </div>
    
    
                    </div>
    
    
                </div>
    
                <div class="videoDetailsContent2">
                    <div class="videoDetailsImage" style="background-image: url(${eventToday.image})"></div>
                </div>
            </div>
        `
    }



}
function showMyListAndRecordingBtn(dataSpecificEvent, type ,myRecordings, myList) {

    if(type === "TV"){
        var watchingNow =  dataSpecificEvent.slice(-1)[0]
        var savedInMyList = watchingNow.id
        
        var haveInList = myList.response.map(e => e.id)
        var boolSavedOrNot = haveInList.includes(savedInMyList)
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
                <button 
                onKeyDown="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
                onclick="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
                data-type="${watchingNow.type}" 
                data-id="${watchingNow.id}" 
                class="selectedBottomCategoryCard">${boolSavedOrNot === true ? "REMOVER DA MINHA LISTA" : "ADICIONAR PARA MINHA LISTA"}</button>
    
            `
            document.getElementById("myRecordingButton").innerHTML = `
                <button 
                onKeyDown="${boolSavedOrNotRec === true ? "removeRecording()" : "addRecordingV2()"}"
                onclick="${boolSavedOrNotRec === true ? "removeRecording()" : "addRecordingV2()"}"
                data-id="${watchingNow.id}" 
                class="selectedBottomCategoryCard">${boolSavedOrNotRec === true ? "REMOVER DAS GRAVAÇÕES" : "GRAVAR"}</button>
    
            `


    }

    if(type === "VOD" || type === "Category"){
        
        var watchingNow =  dataSpecificEvent
        var savedInMyList = watchingNow.id
        
        var haveInList = myList.response.map(e => e.id)
        var boolSavedOrNot = haveInList.includes(savedInMyList)

        document.getElementById("myListButton").innerHTML = `
        <button 
        onKeyDown="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
        onclick="${boolSavedOrNot === true ? "removeFromMyList()" : "addToMyList()"}"
        data-type="${watchingNow.type}" 
        data-id="${watchingNow.id}" 
        class="selectedBottomCategoryCard">${boolSavedOrNot === true ? "REMOVER DA MINHA LISTA" : "ADICIONAR PARA MINHA LISTA"}</button>
        

    `
    }

}



function showRecomendedInfo(recomendedEvent) {

    document.getElementById("videoRecomendedContainer").innerHTML =
    `
    ${recomendedEvent.map((e, idx) => {
            
        return(`
            <div class="eventRecomendationCards">

                <div class="cardsInfoContainer">
                    <div class="cardsInfoTitle">
                        <h2>${e.title}</h2>
                    </div>

                    <div class="cardsInfoList selectedBottom">
                        ${e.data.map((card, idx) => {

                            return(`
                                <div class="cardsInfo">
                                    <button
                                    class="selectedBottomCategoryCard"
                                    onfocus="showFocusedCardInfo()"
                                    onKeyDown="showAnotherEvent()"
                                    onclick="showAnotherEvent()"
                                    data-id=" ${card.id}"
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
    //console.log("o event", event)
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

function showAnotherEvent() {
    if(event.keyCode === 13) {
        switch (event.target.dataset.type) {
            case "TV":
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                localStorage.setItem("selectedChannel", event.target.dataset.channelid)
                var timestmp = Date.parse(event.target.dataset.start) / 1000
                localStorage.setItem("startAt", timestmp)
                window.location.href = '/pages/player/player.html'
    
                break;
            case "VOD":
                localStorage.setItem("idContent", event.target.dataset.id)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                window.location.href = '/pages/player/player.html'
                break;
            case "Category":
                localStorage.setItem("idContent", event.target.dataset.channelid)
                localStorage.setItem("event", event.target.dataset.id)
                localStorage.setItem("type", event.target.dataset.type)
                window.location.href = '/pages/player/player.html'
                break;
        }

    }

}



function showVideoFunctionsAvailable() {



    document.getElementById("videoFunctionsContainer").innerHTML = 
    `
    <div class="videoFunctionsContent">
    
        <div class="controls selectedBottom">
            <button class="selectedBottomCategoryCard rwd playerButtons" data-icon="<" aria-label="rewind"></button>
            
            <button class="selectedBottomCategoryCard fwd playerButtons" data-icon=">" aria-label="fast forward"></button>

            
            <div class="timer">
            <div></div>
            <span aria-label="timer">00:00</span>
            </div>
        </div>

        <div class="selectedBottom secondAvailableButtons">
        <button class="selectedBottomCategoryCard aux play playerButtons" data-icon="PAUSE" aria-label="play pause toggle"></button>
        <button class="selectedBottomCategoryCard stop playerButtons" data-icon="ASSISTIR DO INICIO" aria-label="stop"></button>
        
        </div>

    </div>
    `

    const media = document.querySelector("video");
    const controls = document.querySelector(".controls");

    const play = document.querySelector(".play");
    const stop = document.querySelector(".stop");
    const rwd = document.querySelector(".rwd");
    const fwd = document.querySelector(".fwd");

    const timerWrapper = document.querySelector(".timer");
    const timer = document.querySelector(".timer span");
    const timerBar = document.querySelector(".timer div");

    media.removeAttribute("controls");
    controls.style.visibility = "visible";

    play.addEventListener("click", playPauseMedia);
    stop.addEventListener("click", stopMedia);
    media.addEventListener("ended", stopMedia);

    rwd.addEventListener("click", mediaBackward);
    fwd.addEventListener("click", mediaForward);

    media.addEventListener("timeupdate", setTime);


    let intervalFwd;
    let intervalRwd;


    function playPauseMedia() {
        rwd.classList.remove("active");
        fwd.classList.remove("active");
        clearInterval(intervalRwd);
        clearInterval(intervalFwd);

        if (media.paused) {
          play.setAttribute("data-icon", "PAUSE");
          media.play();
        } else {
          play.setAttribute("data-icon", "PLAY");
          media.pause();
        }
    }

    function stopMedia() {
        media.pause();
        media.currentTime = 0;
        play.setAttribute("data-icon", "P");

        rwd.classList.remove("active");
        fwd.classList.remove("active");
        clearInterval(intervalRwd);
        clearInterval(intervalFwd);
    }



    function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove("active");

    if (rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add("active");
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
    }

    function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove("active");

    if (fwd.classList.contains("active")) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add("active");
        media.pause();

        intervalFwd = setInterval(windForward, 200);
    }
    }

    function windBackward() {
        if (media.currentTime <= 2) {
          rwd.classList.remove("active");
          clearInterval(intervalRwd);
          stopMedia();
        } else {
          media.currentTime -= 2;
        }
      }
      
      function windForward() {
        if (media.currentTime >= media.duration - 2) {
          fwd.classList.remove("active");
          clearInterval(intervalFwd);
          stopMedia();
        } else {
          media.currentTime += 2;
        }
      }



      function setTime() {
        const minutes = Math.floor(media.currentTime / 60);
        const seconds = Math.floor(media.currentTime - minutes * 60);
      
        const minuteValue = minutes.toString().padStart(2, "0");
        const secondValue = seconds.toString().padStart(2, "0");
      
        const mediaTime = `${minuteValue}:${secondValue}`;
        timer.textContent = mediaTime;
      
        const barLength =
          timerWrapper.clientWidth * (media.currentTime / media.duration);
        timerBar.style.width = `${barLength}px`;
      }
    



    /* 
    document.getElementById("videoFunctionsContainer").innerHTML = 
    `
    <div class="videoFunctionsContent">
        <button onclick="playAndPause()">PLAY</button>
        <button onclick="playAndPause()">MENOS 10</button>
        <button onclick="advanceVideo()">MAIS 10</button>
        <button onclick="decrementVolume()">VOLUME -</button>
        <button onclick="incrementVolume()">VOLUME +</button>
    </div>
    `
    */



}


function showVideoResourcesAvailable() {
document.getElementById("videoResourcesAvailable").innerHTML = 
`
<div class="navigationNone" id="navigationToRemoveBottomMenu">
    <div class="availableContainer">
        <div class="shadowTop"></div>

        <div class="bottomMenuContainer">
            <div class="videoEmphasisContainer">
                <div class="videoEmphasisContent1" id="videoEmphasisInfo"></div>
            </div>
            
            <div class="videoEmphasisContainer">
                <div class="videoEmphasisContent2" id="videoEmphasisInfo2"></div>
            </div>



            <div class="videoFunctionsContainer" id="videoFunctionsContainer">
            </div>


            <div class="videoDetailsContainer" id="videoDetailsContainer">

            </div>


            <div class="videoRecomendedContainer" id="videoRecomendedContainer"></div>
        </div>
    </div>

</div>
`
}
showVideoResourcesAvailable();
showVideoFunctionsAvailable()




//------------------------------------------------------------


//-------------- Funções para visualização do menu lateral esquerdo
function showChannelCategories(channelCategories) {
    document.getElementById("channelCategories").innerHTML = 
    `
    <div class="channelCategoriesContent selectedLeft">
        <button 
        data-category-id="null"
        data-category-name="Todos" 
        onKeyDown="selectCategory()" 
        onclick="selectCategory()" 
        class=" buttonMenu selectedLeftCategoryCard"><h4>Todos</h4></button>

        <button 
        data-category-id="4294967294" 
        data-category-name="Favoritos"
        onKeyDown="selectCategory()" 
        onclick="selectCategory()" 
        class="buttonMenu selectedLeftCategoryCard"><h4>Favoritos</h4></button>
        ${channelCategories.filter(e => e.channels_categories_name != "Favoritos").map((e, idx) => {
            return(`
            <button 
            data-category-id="${e.channels_categories_id}" 
            data-category-name="${e.channels_categories_name}"
            onKeyDown="selectCategory()" 
            onclick="selectCategory()" 
            class="buttonMenu selectedLeftCategoryCard">
            <h4>${e.channels_categories_name}</h4></button>
            
            `);
        })}

        <div class="marginToScrolling5"></div>


    </div>
    
    `
}
function selectCategory() {

    if(event.keyCode === 13) {
        if(event.target.dataset.categoryId == null) {
            localStorage.setItem("catIdPlayer", "null");
        }else if(event.target.dataset.categoryId != null) {
            localStorage.setItem("catIdPlayer", event.target.dataset.categoryId)
            localStorage.setItem("categoryName", event.target.dataset.categoryName)
            getSubscribedChannels();
        }

    }

}
function filterAllChannels(subscribedChannels, epgEvents, favoriteChannels) {
    const category = localStorage.getItem("catIdPlayer");
        if(category == "null"){
            showChannels(subscribedChannels, epgEvents);
    
        }else if (category != "null" && category != "4294967294"){
            //console.log("o teste", subscribedChannels.filter(e => e.channels_categories.filter(e => e == 5) == 5 ) )
            const filteredChannels = subscribedChannels.filter(e => e.channels_categories.filter(e => e == parseInt(category)) == parseInt(category) );
           // console.log("o resultado", filteredChannels);
            showChannels(filteredChannels, epgEvents)
    
        }else if (category == "4294967294") {
            const filteredFavoriteChannels = subscribedChannels.filter(id => favoriteChannels.map(e => e).includes(id.channels_id))
            //console.log("os canais favoritos são", filteredFavoriteChannels)
            showChannels(filteredFavoriteChannels, epgEvents);
        }
}
async function showChannels(channels, epgEvents) {

    //console.log("os canais são", channels)
    const filteredChannels = channels;
    //console.log("o testes", testes.map(e => e))
    
    //console.log("o que tem no testes", filteredChannels)
    
    document.getElementById("allChannels").innerHTML = 
    `
    <div class="allChannelsContainer">
    
        <div class="allChannelsContent selectedLeft">
            ${filteredChannels.map((item, idx) => {
                const obj = epgEvents.filter(e => e.start.includes(fullDate2) ? e.start.includes(fullDate2) : e.start.includes(fullDate3));
    
                return(`
                <div class="channelContainer">
                    <button class="channelButtonShow selectedLeftCategoryCard"
                    onKeyDown="storageContent()"
                    onclick="storageContent()"
                    onfocus=""
                    data-live="${true}"
                    data-type="TV"
                    data-channelId="${item.channels_id}"
                    data-channels_name="${item.channels_name}"
                    data-channels_logo="${item.channels_logo}"
    
                    data-start="${obj.filter(e => e.channels_id == item.channels_id )[0].start}"
                    data-id="${obj.filter(e => e.channels_id == item.channels_id )[0].id}"
                    data-channels_end="${obj.filter(e => e.channels_id == item.channels_id )[0].end}"
                    data-channels_duration="${obj.filter(e => e.channels_id == item.channels_id )[0].duration}"
                    >   
                        <div class="channelButtonContent">
                            <div class="channelImageShow" style="background-image: url(${item.channels_logo})"></div>
                            <div class="channelInfoShow">
                                <div class="channelInfoTitle">
                                    <h3>${item.channels_name}</h3>
                                </div>
                                <div class="channelInfoDescription">
                                    <h4>${obj.filter(e => e.channels_id == item.channels_id )[0].title}</h4>
                                </div>
                            </div>
                        
                        </div>
                    </button>
                </div>
                `)
            })}
            <div class="marginToScrolling3"></div>
        </div>
    
    
    </div>
    `
    
    
}
function showLeftMenu(){

    document.getElementById("leftMenu").innerHTML = 
    `
    <div class="navigationNone" id="navigationToRemoveLeftMenu">
        <div class="leftMenuContainer">
        
                <div class="leftMenuContent">
                    <div class="optionsContainer">
                        <div class="optionsHeader">
                            <h2>Canais de TV</h2>
                        </div>
                
                        <div class="optionsCategory">
                            <div class="arrowContainer"><h4> < </h4></div>
                
                
                            <div class="categoryShow" id="channelCategories">
                            
                            </div>
                
                
                            <div class="arrowContainer"><h4> > </h4></div>
                        </div>
                
                
                        <div class="channelsContainer" id="allChannels"></div>
                    
                    </div>
                </div>
                
                
                <div class="shadowRight">
                </div>
            
            </div>
    
    </div>

    `
    
    
}
showLeftMenu();
//-------------------------------------------------------


//-------------- Funções para visualização do menu lateral direito
async function storageContent() {

    if(event.keyCode === 13) {
        localStorage.setItem("idContent", event.target.dataset.channelid)
        localStorage.setItem("selectedChannel", event.target.dataset.channelid)
        localStorage.setItem("type", event.target.dataset.type)
        localStorage.setItem("event", event.target.dataset.id)
        if(event.target.dataset.live === true) {
            localStorage.setItem("startAt", "undefined")
            
        } else {
            var timestmp = Date.parse(event.target.dataset.start) / 1000
            localStorage.setItem("startAt", timestmp)
    
        }
        //getInfoCardSelected()
        window.location.href = '/pages/player/player.html'

    }

}

if(type === "TV") {
    function showRightMenu(){
        document.getElementById("rightMenu").innerHTML = 
    `
    <div class="navigationNone" id="navigationToRemoveRightMenu">
        <div class="rightMenuContainer ">
            <div class="shadowLeft"></div>
    
            
            <div class="rightMenuContent" >
                <div class="optionsContainer">
                    <div class="optionsHeader">
                        <h2>Conteudos</h2>
                    </div>
    
                    <div class="optionsCategory">
                        <div class="arrowContainer"><h4> < </h4></div>
    
    
                        <div class="categoryShow" id="channelEvents">
                    
                        </div>
    
    
                        <div class="arrowContainer"><h4> > </h4></div>
                    </div>
    
                    <div class="channelsContainer" id="contentShow"></div>
    
    
                <div>
            </div>
        </div>
    
    </div>
    `
    }
    showRightMenu();
    function showChannelEventsToday(eventToday, eventYesterday, eventAnotherDay) {
        console.log("o array éawdaefaefa ", eventToday)
        document.getElementById("channelEvents").innerHTML =
        `
        <div class="channelCategoriesContent selectedRight">
            <button
                id="btn"
                data-type="Live"
                class="buttonMenu2 selectedRightCategoryCard"
                >
                    <h4>Ao Vivo</h4>
                                
            </button>
    
            <button
                id="btn1"
                data-type="Today"
                class="buttonMenu2 selectedRightCategoryCard"
                >
                    <h4>Hoje - ${getDayFormated + "/" + getMonthFormated}</h4>
                                
            </button>
    
            <button
                id="btn2"
                data-type="LastDay"
                class=" buttonMenu2 selectedRightCategoryCard"
                >
                    <h4>Ontem - ${getAnotherDay1 + "/" + getMonthFormated}</h4>
                                
            </button>
    
            <button
                id="btn3"
                data-type="AnotherDay"
                class="buttonMenu2 selectedRightCategoryCard"
                >
                    <h4>${getAnotherDay + "/" + getMonthFormated}</h4>
                                
            </button>
    
    
            <div class="marginToScrolling5"></div>
    
    
    
        </div>
        `
    
        /* 
        document.getElementById("channelEvents2").innerHTML =
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
    */
    
        const btn = document.getElementById('btn');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        btn.addEventListener('focus', event => {      
            if(event.target.dataset.type === "Live"){
    
              var watchingNow =  eventToday.slice(-1)[0]
              console.log("na live está", eventToday)
              //console.log("show my list", myList)
              document.getElementById("contentShow").innerHTML =
              `
              <div class="channelInfoList selectedRight">
              <div class="cardsChannelInfo">
              <button
              class="selectedRightCategoryCard"
              onfocus=""
              onKeyDown="storageContent()"
              onclick="storageContent()"
              data-id="${watchingNow.id}"
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
              >
    
              <div class="channelInfoListDetailsContainer">
                  <div class="channelImageBgd"                     
                  style="
                  background-image: url(${watchingNow.image}); 
                  background-size: cover; 
                  background-repeat: no-repeat;
                  background-position: top center;
                  object-fit: contain
                  ">
                  
                  </div>
    
                  <div class="channelEventInfo">
                      <div class="channelEventTitle">
                          <h3>${formatTitleLength(watchingNow.title)}</h3>
                      </div>
    
    
    
                      <div class="channelEventDateAndRateContainer">
                      
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
    
                  </div>
              
              </div>
              
              </button>
          </div>
    
                <div class="marginToScrolling3"></div>
            </div>              
              
            `
      
      
      
          }
      
        });
        btn1.addEventListener('focus', event => {      
            if(event.target.dataset.type === "Today"){
      
              //console.log("show my list", myList)
              document.getElementById("contentShow").innerHTML =
              `
              <div class="channelInfoList selectedRight">
              ${eventToday.map((card, idx) => {
                //console.log("o event", eventToday)
                return(`
                    <div class="cardsChannelInfo">
                        <button
                        class="selectedRightCategoryCard"
                        onfocus=""
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
                        >
    
                        <div class="channelInfoListDetailsContainer">
                            <div class="channelImageBgd"                     
                            style="
                            background-image: url(${card.image}); 
                            background-size: cover; 
                            background-repeat: no-repeat;
                            background-position: top center;
                            object-fit: contain
                            ">
                            
                            </div>
    
                            <div class="channelEventInfo">
                                <div class="channelEventTitle">
                                    <h3>${formatTitleLength(card.title)}</h3>
                                </div>
    
    
    
                                <div class="channelEventDateAndRateContainer">
                                
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
    
                            </div>
                        
                        </div>
                        
                        </button>
                    </div>
                
                `)
            })}
    
                <div class="marginToScrolling3"></div>
            </div>              
              
            `
      
      
      
          }
      
        });
        btn2.addEventListener('focus', event => {      
            if(event.target.dataset.type === "LastDay"){
      
              //console.log("show my list", myList)
              document.getElementById("contentShow").innerHTML =
              `
              <div class="channelInfoList selectedRight">
                ${eventYesterday.map((card, idx) => {
    
                    return(`
                    <div class="cardsChannelInfo">
                        <button
                        class="selectedRightCategoryCard"
                        onfocus=""
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
                        >
    
                        <div class="channelInfoListDetailsContainer">
                            <div class="channelImageBgd"                     
                            style="
                            background-image: url(${card.image}); 
                            background-size: cover; 
                            background-repeat: no-repeat;
                            background-position: top center;
                            object-fit: contain
                            ">
                            
                            </div>
    
                            <div class="channelEventInfo">
                                <div class="channelEventTitle">
                                    <h3>${formatTitleLength(card.title)}</h3>
                                </div>
    
    
    
                                <div class="channelEventDateAndRateContainer">
                                
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
    
                            </div>
                        
                        </div>
                        
                        </button>
                    </div>
                
                `)
                })}
    
                <div class="marginToScrolling3"></div>
            </div>              
              
            `
      
      
      
          }
      
        });
        btn3.addEventListener('focus', event => {      
            if(event.target.dataset.type === "AnotherDay"){
      
              //console.log("show my list", myList)
              document.getElementById("contentShow").innerHTML =
              `
              <div class="channelInfoList selectedRight">
                ${eventAnotherDay.map((card, idx) => {
    
                    return(`
                    <div class="cardsChannelInfo">
                        <button
                        class="selectedRightCategoryCard"
                        onfocus=""
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
                        >
    
                        <div class="channelInfoListDetailsContainer">
                            <div class="channelImageBgd"                     
                            style="
                            background-image: url(${card.image}); 
                            background-size: cover; 
                            background-repeat: no-repeat;
                            background-position: top center;
                            object-fit: contain
                            ">
                            
                            </div>
    
                            <div class="channelEventInfo">
                                <div class="channelEventTitle">
                                    <h3>${formatTitleLength(card.title)}</h3>
                                </div>
    
    
    
                                <div class="channelEventDateAndRateContainer">
                                
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
    
                            </div>
                        
                        </div>
                        
                        </button>
                    </div>
                
                `)
                })}
                <div class="marginToScrolling3"></div>
            </div>              
              
            `
      
      
      
          }
      
        });
    
    }

}
//-------------------------------------------------------



document.addEventListener('DOMContentLoaded', getInfoCardSelected());




