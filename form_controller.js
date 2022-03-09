const settings = document.getElementById("setting_btn");
const setting_menus = document.getElementById("setting_menus");
const custom_bg_box = document.getElementById("custom");
const __custom = document.getElementById("__custom");
const custom_input = document.getElementById("custom_input");
//setting button css
custom_bg_box.addEventListener("change", custom_check_handler);

settings.addEventListener("click", () => {
  if (setting_menus.classList.contains("visible")) {
    setting_menus.classList.remove("visible");
    setting_menus.classList.add("invis");
  } else {
    setting_menus.classList.add("visible");
    setting_menus.classList.remove("invis");
  }
});
__custom.addEventListener("change", () => {
  console.log(__custom.value);
  let l_custom = document.getElementById("l_custom");
  let l_custom_local = document.getElementById("l_custom_local");
  if (__custom.value === "local") {
    l_custom.style.display = "none";
    l_custom_local.style.display = "block";
  } else if (__custom.value === "unsplash") {
    l_custom.style.display = "block";
    l_custom_local.style.display = "none";
  }
});

function custom_check_handler() {
  if (custom_bg_box.checked) {
    __custom.style.display = "block";
    custom_input.style.display = "block";
    let bg_type = document.getElementById("bg_type").querySelectorAll("input");
    for (const prop in bg_type) {
      if (bg_type.hasOwnProperty(prop)) {
        let element = bg_type[prop];
        if (element.checked && element.id !== "custom") {
          element.checked = false;
        }
      }
    }
  } else {
    __custom.style.display = "none";
    custom_input.style.display = "none";
  }
}
const setting_form = document.getElementById("setting_form");
setting_form.addEventListener("submit", form_handler);

getLocalData();

function form_handler(e) {
  if (e) {
    e.preventDefault();
  }

  const user_name = document.getElementById("user_name").value;
  const custom_bg = document.getElementById("l_custom").value;
  const custom_local = document.getElementById("l_custom_local").value;
  console.log(custom_local);
  const gender = document.getElementById("gender").value;
  const bg_type = document.getElementById("bg_type").querySelectorAll("input");
  const site_links = document
    .getElementById("site_links")
    .querySelectorAll("input");
  let backgrounds = [];
  let links = [];

  let link_text = [];
  const all_obj = {
    gender,
    user_name,
    backgrounds,
    links,
    link_text,
    custom_bg,
    custom_local,
    __custom: __custom.value,
  };

  for (const prop in bg_type) {
    if (bg_type.hasOwnProperty(prop)) {
      let element = bg_type[prop];
      if (element.checked) {
        backgrounds.push(element.id);
      }
    }
  }

  for (const prop in site_links) {
    if (site_links.hasOwnProperty(prop)) {
      let element = site_links[prop];
      if (element.value !== "on") {
        link_text.push(element.value);
      }
      if (element.checked) {
        links.push(element.id);
      }
    }
  }

  //   console.log(all_obj);
  save_user(all_obj);
  getLocalData();
}

function save_user(data) {
  localStorage.setItem("_nt_username", data.user_name);
  localStorage.setItem("_nt_gender", data.gender);
  localStorage.setItem("_nt_backgrounds", JSON.stringify(data.backgrounds));
  localStorage.setItem("_nt_links", JSON.stringify(data.links));
  localStorage.setItem("_nt_link_text", JSON.stringify(data.link_text));
  localStorage.setItem("_nt_custom_bg", data.custom_bg);
  localStorage.setItem("_nt_custom_bg_local", data.custom_local);
  localStorage.setItem("_nt_custom___custom", data.__custom);
}

function getLocalData() {
  const user_name = localStorage.getItem("_nt_username");
  const gender = localStorage.getItem("_nt_gender");
  const backgrounds = JSON.parse(localStorage.getItem("_nt_backgrounds"));
  const links = JSON.parse(localStorage.getItem("_nt_links"));
  const link_text = JSON.parse(localStorage.getItem("_nt_link_text"));
  const custom_bg = localStorage.getItem("_nt_custom_bg");
  const custom_bg_local = localStorage.getItem("_nt_custom_bg_local");
  const __custom = localStorage.getItem("_nt_custom___custom");

  if (!user_name) {
    return form_handler();
  }

  const dom_user_name = document.getElementById("user_name");
  const dom_gender = document.getElementById("gender");
  const showing_links = document.getElementById("showing_links");
  const user_call = document.getElementById("user_call");
  const showing_name = document.getElementById("showing_name");
  const dom_custom_bg = document.getElementById("l_custom");
  const dom__custom = document.getElementById("__custom");

  showing_links.innerHTML = "";

  //restoring setting inputs to database vlaues
  dom_user_name.value = user_name;
  dom_gender.value = gender;
  if (gender === "female") {
    user_call.innerText = "mam";
  } else {
    user_call.innerText = "sir";
  }

  dom_custom_bg.value = custom_bg;
  dom__custom.value = __custom;
  // dom_custom_bg_local.value = custom_bg_local;

  showing_name.innerText = user_name;
  backgrounds.map((bg) => {
    // console.log(bg);
    let element = document.getElementById(bg);
    element.checked = true;
  });

  //linkss
  links.map((bg) => {
    let element = document.getElementById(bg);
    element.checked = true;
    let inp_element = document.getElementById(`l_${bg}`);
    showing_links.innerHTML += sendLink(element, inp_element);
  });

  const site_links = document
    .getElementById("site_links")
    .querySelectorAll("input");

  let base_index = 0;
  for (const prop in site_links) {
    if (site_links.hasOwnProperty(prop)) {
      let element = site_links[prop];
      //   console.log(element.id)
      if (element.value !== "on") {
        //  console.log(element.value)
        // console.log(prop)

        element.value = link_text[base_index];
        base_index++;
      }
    }
  }
}

function sendLink(element, inp_element) {
  //   console.log(element.id);
  if (element.id === "gclassroom") {
    let u = `<div class="link-block"><a href=${inp_element.value}  class="class1"
        title="Classroom"><i class="fas fa-chalkboard-teacher"></i></a></div>`;

    return u;
  } else if (element.id == "gmail") {
    let u = `<div class="link-block"><a href=${inp_element.value}  class="server"
        title="Gmail"><i class="fa-solid fa-envelope"></i></a></div>`;
    return u;
  } else if (element.id == "youtube") {
    let u = ` <div class="link-block"><a href=${inp_element.value}  class="youtube"
        title="YouTube"><i class="fab fa-youtube"></i></a></div>`;
    return u;
  } else if (element.id == "facebook") {
    let u = `<div class="link-block"><a href=${inp_element.value} class="facebook"
        title="Facebook"><i class="fab fa-facebook-square"></i></a></div>`;
    return u;
  } else if (element.id == "github") {
    let u = ` <div class="link-block"><a href=${inp_element.value} class="github"
    title="GitHub"><i class="fa-brands fa-github"></i></a></div>`;
    return u;
  } else if (element.id == "whatsapp") {
    let u = `<div class="link-block"><a href=${inp_element.value} class="whatsapp"
        title="Whatsapp"><i class="fab fa-whatsapp-square"></i></a></div>`;
    return u;
  } else if (element.id == "discord") {
    let u = `<div class="link-block"><a href=${inp_element.value} class="discord"
        title="Discord"><i class="fab fa-discord"></i></a></div>`;
    return u;
  } else if (element.id == "spotify") {
    let u = `<div class="link-block"><a href=${inp_element.value} class="spotify"
        title="Spotify"><i class="fab fa-spotify"></i></a></div>`;
    return u;
  } else if (element.id == "instagram") {
    let u = `<div class="link-block"><a href=${inp_element.value} class="instagram"
        title="Spotify"><i class="fa-brands fa-instagram-square"></i></a></div>`;
    return u;
  }
}
custom_check_handler();
after();