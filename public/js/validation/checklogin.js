function loginMotvWithToken()
{
    const token = localStorage.getItem("authorization")
    const customers_token = token;
    if(token !== null){
        const loginRequest = axios.post('https://hospitality.youcast.tv.br/loginMoTVWithToken', {token, customers_token})
        .then(function (response) {
            //console.log("o response", response.data.response)
            if(response.data.status == 1){
                console.log("window", window.location)
                if(window.location.pathname === "/media/developer/apps/usr/palm/applications/com.hospitality.yplay.app/index.html"){
                    window.location.href = '../../pages/profile/profile.html'
    
                }
                if(window.location.pathname === "/"){
                    window.location.href = '../../pages/profile/profile.html'
    
                }
    
    
                //localStorage.setItem("authorization", response.data.response.customers_token);
            } else {
                localStorage.clear();
                window.location.href = '../../index.html'
            }
        }).catch(function (response) {
            console.log("o response de erro", response)
        })
    }

}

loginMotvWithToken()