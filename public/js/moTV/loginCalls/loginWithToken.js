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

function selectRandomColor() {
    var colors = [
        {
            primary: '#4E2440',
            secondary: '#71385A'
        },
        {
            primary: '#006B5E',
            secondary: '#63BAAB'
        },
        {
            primary: '#FFCD4C',
            secondary: '#ECE384'
        },
        {
            primary: '#4B4453',
            secondary: '#B0A8B9'
        },
        {
            primary: '#D08983',
            secondary: '#E6CCC9'
        },
        {
            primary: '#B43D06',
            secondary: '#FF854D'
        },
        {
            primary: '#2C3E50',
            secondary: '#136A8A'
        },
    ]
      
    var x = document.getElementsByClassName('randomBackground');
    var y = document.getElementsByClassName('randomBackgroundSecondary');
    var random_div = x[Math.floor(
        Math.random() * x.length)];
        for (i = 0; i < x.length; i++) {
            var random_color = colors[Math.floor(
                Math.random() * colors.length)];
            x[i].style.backgroundColor = random_color.primary;            
            y[i].style.backgroundColor = random_color.secondary;            
          }     
}

function selectProfile() {
    console.log("o event", event)
    console.log("o event keycode", event.keyCode)
    if(event.keyCode === 13) {
        localStorage.setItem("profileid", event.target.dataset.profilesId);
        localStorage.setItem("profileimage", event.target.dataset.profilesImage);
        localStorage.setItem("profilename", event.target.dataset.profilesName);
        localStorage.setItem("authorization", event.target.dataset.customersToken);
        window.location.href = '/pages/catalog/catalog.html'
    }

}

function loginMotvWithToken()
{
    var loaded = document.getElementById("loadingContent");
    var load1 = false;

    showLoading();
    const token = localStorage.getItem("authorization");
    const customers_token = token;

    console.log("o token é", token)
    const loginRequest = axios.post('https://hospitality.youcast.tv.br/loginMoTVWithToken', {token, customers_token})
    .then(function (response) {
        //console.log("o response", response.data.response)
        if(response.data.status == 1){
            load1 = true;
            if(load1 == true ) {
                loaded.style.display = "none";
            }

            let profiles = response.data.response.profiles;
            showProfiles(profiles);


            //localStorage.setItem("authorization", response.data.response.customers_token);
        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
}
const handleKeyDown = (event) => {
    console.log("aqui", event)
    selectProfile()

  };

function showProfiles(profiles) {



    document.getElementById('myProfiles').innerHTML =
    `
    <div class="myProfilesContainer selected">
        ${profiles.map((item, index) => {
            //console.log("os itens", item)
            return(`
                    <button 
                    data-profiles-image="${item.image}"
                    data-profiles-id="${item.profiles_id}"
                    data-profiles-name="${item.profiles_name}"
                    data-customers-token="${item.customers_token}"
                    onKeyDown="selectProfile()"
                    onclick="selectProfile()"
                    class=" selectedCategoryCard myProfilesButton randomBackgroundSecondary">
                        <div class="myProfilesShadow">
                            <div class="myProfilesButtonLock">
                                <img src="${item.profiles_pin_enabled === 1 ? "../../images/lock.png" : "../../images/unlock.png" }"></img>
                            </div>

                            <div class="myProfilesButtonImage">
                                <img src="${item.image}"></img>
                            </div>
                        
                        </div>

                        <div class="myProfilesButtonName randomBackground">
                            <h3>${item.profiles_name}</h3>
                        </div>
                    </button>
            `)
        })}
        
        <button class=" selectedCategoryCard myProfilesButton2 myProfilesMargin randomBackgroundSecondary">
        <div class="myProfilesShadow">
            <div class="myProfilesButtonLock">
                <img src="../../images/new-user.png"></img>
            </div>
            <div class="myProfilesButtonImage2">
                <img src="../../images/new-user.png" class="imgW"></img>
            </div>
        
        </div>

        <div class="myProfilesButtonName randomBackground">
            <h3>Novo Perfil</h3>
        </div>
    </button>
    </div>
    `
    selectRandomColor();
}

function clearCredentials() {
    document.getElementById('clearCredentials').innerHTML =
    `
    <div class="logoutContent selected">
        <button class="selectedCategoryCard" onClick="logout()"><h3>Sair</h3></button>
    </div>
    `
}

function logout() {
    localStorage.clear()
    window.location.href = "../../"
}

clearCredentials();
loginMotvWithToken();


