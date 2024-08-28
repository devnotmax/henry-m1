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

describe("Clase Repository", () => {
  it("Verificar que sea una clase", () => {
    expect(typeof Repository.prototype.constructor).toBe("function");
  });

  //metodos

  it("verificar que el metodo getAllActivities() este implementado", () => {
    const actividad = new Repository();
    expect(actividad.getAllActivities()).toBeDefined;
  });

  it("verificar que el metodo createActivity() este implementado", () => {
    const actividad = new Repository();
    expect(actividad.createActivity()).toBeDefined;
  });

  it("verificar que el metodo deleteActivity() este implementado", () => {
    const actividad = new Repository();
    expect(actividad.deleteActivity()).toBeDefined;
  });
});

describe("Clase Activity", () => {
  it("Verificar que sea una clase", () => {
    expect(typeof Activity.prototype.constructor).toBe("function");
  });
});

describe("Verificar si los metodos funcionan", () => {
  it("El metodo deleteActivity() debe eliminar actividades seleccionadas", () => {
    const actividad = new Repository();
    actividad.createActivity("A");
    actividad.deleteActivity("A");

    expect(actividad.getAllActivities()).not.toContain("A");
  });

  it("El metodo createActivity() debe crear actividades", () => {
    const actividad = new Repository();
    const id = "1";
    const title = "test";
    const description = "test desc";
    const imgUrl = "test.jpg";

    actividad.createActivity(id, title, description, imgUrl);

    const activities = actividad.getAllActivities();
    const newActivity = activities.find((activity) => activity._id === id);

    expect(newActivity).toBeDefined();
    expect(newActivity._title).toEqual(title);
    expect(newActivity._description).toEqual(description);
    expect(newActivity._imgUrl).toEqual(imgUrl);
  });

  it("El metodo getAllActivities() debe retornar un array vacio", () => {
    const actividad = new Repository();
    expect(Array.isArray(actividad.getAllActivities())).toBeTrue();
  });
});
