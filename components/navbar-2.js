

function eyeGlass(){
    document.getElementById("computerglass").style.display="none"
    var eyeglasses= document.getElementById("glass1");
    eyeglasses.style.display="block";
    document.getElementById("eyeGlass").style.borderImage="linear-gradient(to right,rgb(218, 204, 8), red, blue, cyan) 10";
    window.onmouseover = function(event) {
    if (event.target == eyeglasses) {
        eyeglasses.style.display = "none";
    }
}
}
function compGlass(){
    document.getElementById("glass1").style.display="none"
    var computerglass= document.getElementById("computerglass");
    computerglass.style.display="block";
    document.getElementById("compglass").style.borderImage="linear-gradient(to right,rgb(218, 204, 8), red, blue, cyan) 10";
    
    window.onmouseover=function(){
        if(event.target==computerglass){
            computerglass.style.display="none";
        }
    }
}
function myAccount(){
    let user = JSON.parse(localStorage.getItem("user_status"));
    console.log(user)
    let logoutbtn = document.getElementById("logoutbtn");
    logoutbtn.addEventListener("click", function(){
      let logout = null;
      localStorage.setItem("user_status", JSON.stringify(logout));
      window.location.href="/index.html"
      alert("logout successfully");
    })
    let account = document.getElementById("main_account");
     account.style.display="block";
    if(user!=null){
         let acc = document.getElementById("nologin");
         acc.style.display="none";
         console.log(user.username)
         let acc2 = document.getElementById("logintrue");
         acc2.style.display="block";
         console.log(user.username)
            let username = document.getElementById("username");
            username.innerText=user.username;
        
    } else{
        let acc = document.getElementById("nologin");
        acc.style.display="block";
        let acc2 = document.getElementById("logintrue");
        acc2.style.display="none";
    }
     
     window.onclick=function(){
         if(event.target==account){
             account.style.display="none";
         }
     }
}
async function loginPage(){
    try{
        let data={
            email:document.getElementById("email").value,
            password:document.getElementById("password").value
       };
        let url = `https://specmakers.herokuapp.com/login`
        const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }
    let response = await fetch(url,config)
    let datas = await response.json();

    if(datas.token!==undefined){
       let obj ={
           user_id : datas.user._id,
           username : datas.user.full_name,
           email : datas.user.email,
           type : datas.user.type
       }
       alert("login successful");
       localStorage.setItem('user_status', JSON.stringify(obj));
       for(let i = 0; i<obj.type.length; i++)
        if(obj.type[i]=="admin") window.location.href="/admin/seller.html";

        for(let i = 0; i<obj.type.length; i++)
        if(obj.type[i]=="seller") window.location.href="/admin/seller.html";

        for(i = 0; i<obj.type.length; i++)
        if(obj.type[i]=="customer")  window.location.href='/index.html';
       
   }
  else{
          alert("! invalid email or password");
   } 
    }catch(error){
        alert("! invalid email or password");
    }
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // var user_cred=JSON.parse(localStorage.getItem("User"));
    // if(email=="" || password==""){
    //     alert("email and password should not empty!")
    // } else{
    //     if((email=="admin")&&(password=="admin")){
    //         let user_cred="admin";
    //         localStorage.setItem("user_status", JSON.stringify(user_cred));
    //         window.location.href="/admin/seller.html"
    //     }
    //   else{
    //     for (var i in user_cred){
    //         if((user_cred[i].email=email)&&(user_cred[i].password==password)){
    //             localStorage.setItem("user_status", JSON.stringify(user_cred[i]));
    //             window.location.href="/index.html";
    //             alert("Login Successful");
    //         }
    //     }
    //   }
    // }
}
function open_search(){
    let S = document.getElementById("dsearch");
    if(S.style.display==="flex"){
        S.style.display = "none";
    } else{
        S.style.display= "flex";
    }   
}
function revmenu(){
    let X = document.getElementById("resmenu");
    X.style.transform="translate(100%, 0)";
    let span = document.getElementById("span");
    span.onclick=function(){
        X.style.transform="translate(-100%, 0)"
    }
    function createlogin(){
        let user = JSON.parse(localStorage.getItem("user_status"));
let logouttrue = document.getElementById("logouttrue");
logouttrue.addEventListener("click", function(){
    let logout = null;
    localStorage.setItem("user_status", JSON.stringify(logout));
    window.location.href="/index.html"
    alert("logout successfully");
  })
if(user!=null){
    document.getElementById("nolog").style.display="none";
    document.getElementById("truelog").style.display="block";
    console.log(user.username);
        let usernam = document.getElementById("usernam");
    usernam.innerText=user.username;
    
} else{
    document.getElementById("nolog").style.display="block";
    document.getElementById("truelog").style.display="none";
}
    }
    createlogin();
}
function eye(){
    window.location.href="/collections/eyeglasses.html"
}
function com_glass(){
    window.location.href="/collections/computer_glasses.html"
} 
// let cartarr = JSON.parse(localStorage.getItem("cartpage"));
// let count = 0;
// for (let i = 0; i < cartarr.length; i++) {
//     count+=cartarr[i].count;
// }
// document.getElementById("cartchar").innerHTML=count;