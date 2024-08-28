document.addEventListener("DOMContentLoaded", function () {
  //sucede esto al cargar la pagina
  mostrarActividades();
});

const activityForm = document.getElementById("activity-form");
const activityContainer = document.getElementById("activity-container");

const titleInput = document.getElementById("nombreActividad");
const descriptionInput = document.getElementById("descripcionActividad");

const textoDefault = document.getElementsByClassName("onloadText");

class Activity {
  constructor(id, title, description, imgUrl) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
  }

  //metodos:

  getAllActivities() {
    return this.activities; //debe retornar un arreglo con todas las actividades
  }

  createActivity(id, title, description, imgUrl) {
    const newActivity = new Activity(id, title, description, imgUrl);
    this.activities.push(newActivity);
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity._id !== id);
  }
}

//const nuevaActividad = new repository() //ejemplo de como se podria usar

const actividad = new Repository();

function mostrarActividades() {
  const actividades = actividad.getAllActivities();

  activityContainer.innerHTML = "";

  if (actividades.length == 0) {
    activityContainer.innerHTML = "<p>No hay actividades</p>";
  } else {
    actividades.forEach((activity) => {
      const actividadesDiv = document.createElement("div");
      actividadesDiv.classList.add("activity");
      actividadesDiv.innerHTML = `
                <h3>${activity._title}</h3>
                <p>${activity._description}</p>
                <img src="${activity._imgUrl}" alt="${activity._title}">
                <button onclick="deleteActivity('${activity._id}')"><i class="fa-regular fa-trash-can"></i></button>
            `;
      activityContainer.appendChild(actividadesDiv);
    });
  }
}

function deleteActivity(id) {
  actividad.deleteActivity(id);
  mostrarActividades();
}

activityForm.addEventListener("submit", function (event) {
  event.preventDefault(); //No entendi mucha esta funcion pero gpt me la sugirio porque se recargaba la pagina cada vez que hacia el submit
  const title = document.getElementById("nombreActividad").value;
  const description = document.getElementById("descripcionActividad").value;
  const imgUrl = document.getElementById("linkImg").value;
  const id = Date.now().toString();
  const textoDefault = document.getElementsByClassName("onloadText");

  //Condicionales para campos vacios (no me convence)

  if (title.trim() === "" || description.trim() === "") {
    alert("Por favor, completa todos los campos!"); //No hay forma de darle estilos sin librerias
    return false; //si esa condicion se cumple returna false y el form no se envia :)
  }

  if (/[\d!@#$%^&*(),.?":{}|<>]/.test(title)) {
    alert("El nombre no puede contener números o símbolos.");
    titleInput.classList.add("error");
    return false; // Evita que se envíe el formulario
  } else {
    titleInput.classList.remove("error");
  }

  if (/[\d!@#$%^&*(),.?":{}|<>]/.test(description)) {
    alert("La descripción no puede contener números o símbolos.");
    descriptionInput.classList.add("error"); //clase error css
    return false; // Evita que se envíe el formulario
  } else {
    descriptionInput.classList.remove("error");
  }

  actividad.createActivity(id, title, description, imgUrl);
  mostrarActividades();
  activityForm.reset();

  return true;
});


