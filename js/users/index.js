function onClickHandler(user) {
    user = JSON.parse(user);
    alert(`${user.first_name} ${user.last_name}`);
  }
  
function onSubmitHandler(e) {
    console.log("e", e);
    e.preventDefault();
  }
  // let name=document.getElementById("name").value;
  // let email=document.getElementById("email").value;
  // let password=document.getElementById("password").value;
  
  function user(){
//     let name=document.getElementById("name").value;
//     let email=document.getElementById("email").value;
//     let password=document.getElementById("password").value;
//     console.log(name.length)
//     alert(name)
//     // if(name.length>15 && name.length <3) alert ("name should be greater than 3 and smaller than 15 character")
  }
  fetch("http://localhost:8252/register?contentType=json")
    .then((response) => response.json())
    .then((data) => console.log(data));