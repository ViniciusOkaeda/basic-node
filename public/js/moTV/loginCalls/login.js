function loginMotv()
{
    var login = "developer.youcast";
    //var login = document.getElementById("input-username").value;
    console.log("O username", login);
    var password = "12345";
    //var password = document.getElementById("input-password").value;
    var vendors_id = 2;
    const loginRequest = axios.post('https://hospitality.youcast.tv.br/loginMoTV', {login, password, vendors_id})
    .then(function (response) {
        console.log("o response", response)
        if(response.data.status == 1){
            localStorage.setItem("authorization", response.data.response.customers_token);
            window.location.href = './pages/profile/profile.html'
        }
    }).catch(function (response) {
        console.log("o response de erro", response)
    })
}
loginMotv();