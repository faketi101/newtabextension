//--------------------------sec-time------------------

let user = "user"
let bg_q = JSON.parse(localStorage.getItem("_nt_backgrounds")) || "random";
function setUser(){
    user = localStorage.getItem("_nt_username")
}
const bg_url = "https://api.thecatapi.com/v1/images/search"
const uns_url = `https://api.unsplash.com/photos/random?query=${bg_q.toString()}&client_id=xZbHMuSv_POnMNaSXDlIAAj67sziuQIwf_vht-pkwnU`

const bg = document.getElementById("background")

// bg.style.backgroundImage="url(./Image/5.jpg)"


fetch(uns_url)
.then(response => response.json())
.then(data => {
    console.log(data)
    //data[0].url
    document.getElementById("view_curr_image").href = data.urls.regular

    bg.style.backgroundImage=`url(${data.urls.regular})`
  });

function Time(){
    var date=new Date();
    var h=date.getHours();
    var m=date.getMinutes();
    var s=date.getSeconds();
    
// h=(h<10)? "0" + h : h;
// m=(m<10)? "0" + m : m;
// s=(s<10)? "0" + s : s;

var time = h + ":" + m;
// + ":" + s + ""
document.getElementById("sec-time").innerText= time;
// document.getElementById("cd").textContent= time;
setTimeout(Time,1000);

};
Time();
$(document).ready(function(){
    var date=new Date();
    var hr = date.getHours();
    

    if(hr >= 0 && hr < 7){
        $(".ass-hi").html(`<span id="showing_name">${user}</span>`)
        document.title = `Good Night ${user}`
    }

    else if(hr >= 7 && hr < 12){
        $(".ass-hi").html(`<span id="showing_name">${user}</span>`)
        document.title = `Good Morning ${user}`

    }
    else if(hr >= 12 && hr < 16){
        $(".ass-hi").html(`<span id="showing_name">${user}</span>`)
        document.title = `Good Noon ${user}`

    }
    else if(hr >= 16 && hr < 18){
        $(".ass-hi").html(`<span id="showing_name">${user}</span>`)
        $(".ass-hi").css({
            "font":"75px Long Cang",
            "width":"750px"
        })
        $(".ass-hi h1").css({
            "font":"75px Long Cang",
            "font-weight": "bold",
            "letter-spacing": "2px",
            "color": "#fff",
            "margin": "0"
        })
        document.title = `Good After Noon ${user}`

    }
    else if(hr >= 18 && hr < 23){
        $(".ass-hi").html(`<h1>Good Evening <span id="showing_name">${user}</span></h1>`)
        document.title = `Good Evening ${user}`



    }
    else if(hr == 23){
        $(".ass-hi").html(`<h1>Good Evening <span id="showing_name">${user}</span></h1>`)
        document.title = `Good Evening ${user}`

    }


   

});