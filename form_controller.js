const settings = document.getElementById("setting_btn");
const setting_menus = document.getElementById("setting_menus");
const todo_open_off = document.getElementById("todo_open_off");
const todo_section = document.getElementById("todo_section");
//setting button css
settings.addEventListener("click", () => {
  settings.classList.toggle("rotate_180");

  if (setting_menus.classList.contains("visible")) {
    setting_menus.classList.remove("visible");
    setting_menus.classList.add("invis");
  } else {
    setting_menus.classList.add("visible");
    setting_menus.classList.remove("invis");
  }
});
todo_open_off.addEventListener("click", () => {
  todo_open_off.classList.toggle("rotate_180");
  
  if (todo_section.classList.contains("visibler")) {
    todo_section.classList.remove("visibler");
    todo_section.classList.add("invisr");
  } else if (todo_section.classList.contains("invisr")) {
    todo_section.classList.add("visibler");
    todo_section.classList.remove("invisr");
  } else if (todo_section.classList.contains("none")) {
    todo_section.classList.add("visibler");
    todo_section.classList.remove("none");
  }

});


const setting_form = document.getElementById("setting_form");
setting_form.addEventListener("submit", form_handler);

getLocalData();

function form_handler(e) {
  if (e) {
    e.preventDefault();
  }

  const user_name = document.getElementById("user_name").value;
  const gender = document.getElementById("gender").value;
  const api_id = document.getElementById("api_id").value;
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
    api_id,
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
  localStorage.setItem("_nt_api_id", data.api_id);
  localStorage.setItem("_nt_backgrounds", JSON.stringify(data.backgrounds));
  localStorage.setItem("_nt_links", JSON.stringify(data.links));
  localStorage.setItem("_nt_link_text", JSON.stringify(data.link_text));
}

function getLocalData() {
  const user_name = localStorage.getItem("_nt_username");
  const gender = localStorage.getItem("_nt_gender");
  const api_id = localStorage.getItem("_nt_api_id");
  const backgrounds = JSON.parse(localStorage.getItem("_nt_backgrounds"));
  const links = JSON.parse(localStorage.getItem("_nt_links"));
  const link_text = JSON.parse(localStorage.getItem("_nt_link_text"));

  if (!user_name) {
    return form_handler();
  }

  const dom_user_name = document.getElementById("user_name");
  const dom_gender = document.getElementById("gender");
  const dom_api_id = document.getElementById("api_id");
  const showing_links = document.getElementById("showing_links");
  const user_call = document.getElementById("user_call");
  const showing_name = document.getElementById("showing_name");

  showing_links.innerHTML = "";

  //restoring setting inputs to database vlaues
  dom_user_name.value = user_name;
  dom_gender.value = gender;
  dom_api_id.value = api_id;
  if (gender === "female") {
    user_call.innerText = "mam";
  } else {
    user_call.innerText = "sir";
  }
  setUser();
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
        title="Instagram"><i class="fa-brands fa-instagram-square"></i></a></div>`;
    return u;
  }
}
