function after() {
  //--------------------------sec-time------------------

  let user = "user";
  let clientId = "xZbHMuSv_POnMNaSXDlIAAj67sziuQIwf_vht-pkwnU";
  let bg_q = JSON.parse(localStorage.getItem("_nt_backgrounds")) || "random";
  user = localStorage.getItem("_nt_username");

  const custom = document.getElementById("custom");
  const custom_bg = document.getElementById("l_custom").value;
  const custom_bg_local = localStorage.getItem("_nt_custom_bg_local");

  const bg = document.getElementById("background");
  console.log(custom.checked);
  console.log(__custom.value);

  const bg_url = "https://api.thecatapi.com/v1/images/search";
  let uns_url = `https://api.unsplash.com/photos/random?query=${bg_q.toString()}&client_id=${clientId}`;
  if (custom.checked && __custom.value === "unsplash") {
    uns_url = `https://api.unsplash.com/photos/random?query=${custom_bg}&client_id=${clientId}`;
  } else if (custom.checked && __custom.value === "local") {
    uns_url = `${custom_bg_local}`;
  }
  // bg.style.backgroundImage="url(./Image/5.jpg)"
  console.log(uns_url);
  if (custom.checked) {
    bg.style.backgroundImage = `url(${uns_url})`;
    document.getElementById("view_curr_image").href = uns_url;
  } else {
    fetch(uns_url, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        response.json();

      })
      .then((data) => {
        console.log(data);
        //data[0].url
        document.getElementById("view_curr_image").href = data.urls.regular;

        if (data) {
          bg.style.backgroundImage = `url(${data.urls.regular})`;
        } else {
          throw { "message": "no data found" };
        }
      })
      .catch((error) => {
        // console.dir(error);
        bg.style.backgroundImage = "url(./Image/5.jpg)";
      });

    function Time() {
      var date = new Date();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();

      // h=(h<10)? "0" + h : h;
      // m=(m<10)? "0" + m : m;
      // s=(s<10)? "0" + s : s;

      var time = h + ":" + m;
      // + ":" + s + ""
      document.getElementById("sec-time").innerText = time;
      // document.getElementById("cd").textContent= time;
      setTimeout(Time, 1000);
    }
    Time();
    $(document).ready(function () {
      var date = new Date();
      var hr = date.getHours();

      if (hr >= 0 && hr < 6) {
        $(".ass-hi").html(
          `<h1>Good Night <span id="showing_name">${user}</span><h1/> `
        );
        document.title = `Good Night ${user}`;
      } else if (hr >= 6 && hr < 12) {
        $(".ass-hi").html(
          `<h1>Good Morning <span id="showing_name">${user}</span><h1/>`
        );
        document.title = `Good Morning ${user}`;
      } else if (hr >= 12 && hr < 16) {
        $(".ass-hi").html(
          `<h1> Good Noon <span id="showing_name">${user}</span><h1/>`
        );
        document.title = `Good Noon ${user}`;
      } else if (hr >= 16 && hr < 18) {
        $(".ass-hi").html(
          `<h1> Good After Noon <span id="showing_name">${user}</span><h1/>`
        );
        $(".ass-hi").css({
          font: "75px Long Cang",
          width: "750px",
        });
        $(".ass-hi h1").css({
          font: "75px Long Cang",
          "font-weight": "bold",
          "letter-spacing": "2px",
          color: "#fff",
          margin: "0",
        });
        document.title = `Good After Noon ${user}`;
      } else if (hr >= 18 && hr < 23) {
        $(".ass-hi").html(
          `<h1>Good Evening <span id="showing_name">${user}</span></h1>`
        );
        document.title = `Good Evening ${user}`;
      } else if (hr == 23) {
        $(".ass-hi").html(
          `<h1>Good Evening <span id="showing_name">${user}</span></h1>`
        );
        document.title = `Good Evening ${user}`;
      }
    });
  }
}
