class Fetch {
  constructor() {
    this.url = "localhost:3000/variables";
  }

  async get() {
    const response = await fetch(this.url);
    return await response.json();
  }

  async post(variable) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variable),
    });
    return await response.json();
  }

  async put(variable) {
    const response = await fetch(this.url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variable),
    });
    return await response.json();
  }

  async delete(variable) {
    const response = await fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variable),
    });
    return await response.json();
  }
}

class Variable {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class List {
  constructor() {
    this.variables = [];
  }

  add(variable) {
    this.variables.push(variable);
  }

  getAll() {
    return this.variables;
  }

}

class ListView {
  constructor(list) {
    this.list = list;
    this.ulElement = document.createElement("ul");
    document.body.appendChild(this.ulElement);
  }

  renderAll() {

    this.list.innerHTML = "";
    this.ulElement.innerHTML = "";
    this.list.getAll().forEach((variable) => {
      this.renderOne(variable);
    })
  }

  renderOne(variable) {
    const li = document.createElement("li");
    li.textContent = variable.name;
    const value = document.createElement("span");
    value.textContent = variable.value;
    li.appendChild(value);


    this.ulElement.appendChild(li);
  }
}

class Form {
  constructor() {
    this.inputName = document.createElement("input");
    this.inputName.setAttribute("type", "text");
    this.inputName.setAttribute("placeholder", "Name");

    this.inputValue = document.createElement("input");
    this.inputValue.setAttribute("type", "number");
    this.inputValue.setAttribute("placeholder", "Value");

    this.button = document.createElement("button");
    this.button.textContent = "Add";
    this.button.addEventListener("click", this.handleClick.bind(this));

    this.form = document.createElement("form");
    this.form.appendChild(this.inputName);
    this.form.appendChild(this.inputValue);
    this.form.appendChild(this.button);

    document.body.appendChild(this.form);
  }

  handleClick(e) {
    e.preventDefault();
    app.add(this.inputName.value, this.inputValue.value);
    this.inputName.value = "";
    this.inputValue.value = "";
  }
}

class App {
  constructor() {
    this.variableList = new List();
    this.variableListView = new ListView(this.variableList);
    this.variableInput = new Form();


    this.setup();
    this.addEventListeners();
  }

  setup() {
    const initialVariables = [
      "時間",
      "速度",
      "加速度",
      "距離",
      "サイズ",
      "単位",
      "個数",
      "回数",
    ];
    initialVariables.forEach((variable) => {
      this.variableList.add(new Variable(variable, 0));
    });
    this.variableListView.renderAll();

  }

  renderEmpty() {
    const body = document.querySelector("body");
    body.innerHTML = "";

  }

  addEventListeners() {
    document.body.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        this.delete(e.target.textContent);
      }
    });
  }

  add(name, value) {
    const newVariable = new Variable(name, value);
    this.variableList.add(newVariable);
    this.variableListView.renderOne(newVariable);
  }

  delete(name) {
    const variable = this.variableList.variables.find((variable) => variable.name === name);
    this.variableList.variables = this.variableList.variables.filter((variable) => variable.name !== name);
    this.variableListView.renderAll();
  }
}

const app = new App();
