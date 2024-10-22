function logout() {
    localStorage.clear()
    window.location.href = "../../"
}


function navigationOptionsMenu() {




    document.getElementById('navigationOptions').innerHTML =
        `
    <div class="navigationContainer ">
        <div id='navigationToRemove' class="navigationContent1 selectedMenu">
            <div class="navigationProfile">

                <div class="navigationProfileImage"
                style="background-image: url(${localStorage.getItem('profileimage')});"
                ></div>

            </div>

            <button  class="navigationButton "
                onKeyDown="navigation('/pages/search/search.html')"
            >
                <div class="navigationButtonIcon">
                    <image src="../../images/search3.png"></image>
                </div>
                <div class="navigationButtonText">
                </div>
            </button>

            <button class="navigationButton "
                onKeyDown="navigation('/pages/catalog/catalog.html')"
            >
                <div class="navigationButtonIcon">
                    <image src="../../images/home10.png"></image>
                </div>
            </button>

            <button class="navigationButton"
                onKeyDown="navigation('/pages/channels/channels.html')"
            >
                <div class="navigationButtonIcon">
                    <image src="../../images/tvx.png"></image>
                </div>
            </button>

            <button class="navigationButton "
                onKeyDown="navigation('/pages/guide/guide.html')"
            >
                <div class="navigationButtonIcon">
                    <image src="../../images/list0.png"></image>
                </div>
            </button>

            <button class="navigationButton "
                onKeyDown="navigation('/pages/movies/movies.html')"
            >
                <div class="navigationButtonIcon">
                    <image src="../../images/moviey.png"></image>
                </div>
            </button>

            <button class="navigationButton "
                onKeyDown="navigation('/pages/saved/saved.html')"
                >
                <div class="navigationButtonIcon">
                    <image src="../../images/saved.png"></image>
                </div>
            </button>

            <button class="navigationButton "
                onKeyDown="navigation('/pages/config/config.html')"
                >
                <div class="navigationButtonIcon">
                    <image src="../../images/settings.png"></image>
                </div>
            </button>
        </div>

        <div id='navigationToRemove2' class="displayFlex navigationNone">
            <div  class="navigationContent2 selectedMenu ">
                <div class="navigationProfile">

                    <button class=" selectedMenuItem flexButton"
                        onKeyDown="navigation('/pages/profile/profile.html')"
                    >
                            <div class="navigationProfileImage2"
                            style="background-image: url(${localStorage.getItem('profileimage')});"
                            ></div>

                            <div class="navigationProfileText">
                                <h3>${localStorage.getItem('profilename')}</h3>

                                <div class="navigationProfileDate">
                                <h4 id="horas">00</h4>
                                <h4>:</h4>
                                <h4 id="minutos">00</h4>
                                <h4>:</h4>
                                <h4 id="segundos">00</h4>
                                </div>
                                
                            </div>
                        </button>

                </div>

                <button  class="navigationButton selectedMenuItem"
                onKeyDown="navigation('/pages/search/search.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/search3.png"></image>
                    </div>
                    <div class="navigationButtonText">
                        <h3>Pesquisar</h3>
                    </div>
                </button>

                <button class="navigationButton  
                selectedMenuItem" 
                onKeyDown="navigation('/pages/catalog/catalog.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/home10.png"></image>
                    </div>
                    <div  class="navigationButtonText">
                        <h3>Home</h3>
                    </div>
                </button>

                <button class="navigationButton selectedMenuItem"
                onKeyDown="navigation('/pages/channels/channels.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/tvx.png"></image>
                    </div>
                    <div class="navigationButtonText">
                        <h3>TV</h3>
                    </div>
                </button>

                <button class="navigationButton selectedMenuItem"
                    onKeyDown="navigation('/pages/guide/guide.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/list0.png"></image>
                    </div>
                    <div class="navigationButtonText">
                        <h3>Programação</h3>

                    </div>
                </button>

                <button class="navigationButton selectedMenuItem"
                    onKeyDown="navigation('/pages/movies/movies.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/moviey.png"></image>
                    </div>
                    <div class="navigationButtonText">
                    <h3>Filmes e Séries</h3>
                    </div>
                </button>

                <button class="navigationButton selectedMenuItem"
                    onKeyDown="navigation('/pages/saved/saved.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/saved.png"></image>
                    </div>
                    <div class="navigationButtonText">
                    <h3>Salvos</h3>
                    </div>
                </button>

                <button class="navigationButton selectedMenuItem"
                    onKeyDown="navigation('/pages/config/config.html')"
                >
                    <div class="navigationButtonIcon">
                        <image src="../../images/settings.png"></image>
                    </div>
                    <div class="navigationButtonText">
                    <h3>Configurações</h3>
                    </div>
                </button>

                <button class="navigationButton selectedMenuItem marginTop" onclick="logout()" onKeyDown="logout()">
                    <div class="navigationButtonIcon">
                        <image src="../../images/logout.png"></image>
                    </div>
                    <div class="navigationButtonText">
                    <h3>Sair</h3>
                    </div>
                </button>


            </div>

            <div class="shadowMenu"></div>
        </div>
        
        
        </div>

    `

    const horas = document.getElementById('horas');
    const minutos = document.getElementById('minutos');
    const segundos = document.getElementById('segundos');

    const relogio = setInterval(function time() {
        let dateToday = new Date();
        let hr = dateToday.getHours();
        let min = dateToday.getMinutes();
        let s = dateToday.getSeconds();

        if (hr < 10) hr = '0' + hr;

        if (min < 10) min = '0' + min;

        if (s < 10) s = '0' + s;

        horas.textContent = hr;
        minutos.textContent = min;
        segundos.textContent = s;

        //console.log("o relogio", hr)
        //console.log("o relogio", min)
        //console.log("o relogio", s)
    })

}

navigationOptionsMenu();

function navigation(url) {

    if (event) {
        if (event.keyCode === 13) {
            window.location.href = url

        }

    }
}
