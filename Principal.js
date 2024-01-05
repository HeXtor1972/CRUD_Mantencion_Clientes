const form = document.getElementById("formRegister");
const nameinput = document.getElementById("nameinput");
const emailinput = document.getElementById("emailinput");
const celularinput = document.getElementById("celularinput");
const tablebody = document.getElementById("tablebody");

let data = JSON.parse(localStorage.getItem("formdata")) || [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameinput.value;
  const email = emailinput.value;
  const celular = celularinput.value;

  //  const name = nameinput.value;
  console.log(name);
  if (name == null || name.length == 0 || name.length > 27 || (/^\s+$/.test(name)) || (/^([0-9])*$/.test(name))
  ) {
    alert("Favor ingrese Nombre y apellido validos");
    return false;
  }

  // const email = emailinput.value;
  console.log(email);
  if(email.length == 0){
    alert("Favor ingrese email valido");
    return false;
  }

  // const celular = celularinput.value;
  console.log(celular);
  if((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(celular)) && 
  (celular.length > 0 && celular.length <= 12) && 
  celular != null){
  }else{
    alert("Ingrese numero de celular valido");
    return false;
  }
  

  // if (name && email && celular) {
  const newData = { name, email, celular };
  data.push(newData);
  savedatatolocalstorage();
  renderTable();
  form.reset();
  // } else alert("Debe ingresar información del Cliente");
  // }
});

function savedatatolocalstorage() {
  localStorage.setItem("formdata", JSON.stringify(data));
}

function renderTable() {
  tablebody.innerHTML = "";

  data.forEach(function (item, index) {
    const row = document.createElement("tr");
    const namecell = document.createElement("td");
    const emailcell = document.createElement("td");
    const celularcell = document.createElement("td");
    const actioncell = document.createElement("td");
    const editbutton = document.createElement("button");
    const deletebutton = document.createElement("button");

    namecell.textContent = item.name;
    emailcell.textContent = item.email;
    celularcell.textContent = item.celular;
    editbutton.textContent = "Modificar";
    deletebutton.textContent = "Eliminar";

    editbutton.classList.add("button", "button--secondary");
    deletebutton.classList.add("button", "button--tertiary");

    editbutton.addEventListener("click", function () {
      editData(index);
    });

    deletebutton.addEventListener("click", function () {
      var resultado = confirm("Esta seguro que desea continuar?");
      if (resultado == true) {
        deleteData(index);
      }
    });

    actioncell.appendChild(editbutton);
    actioncell.appendChild(deletebutton);

    row.appendChild(namecell);
    row.appendChild(emailcell);
    row.appendChild(celularcell);
    row.appendChild(actioncell);

    tablebody.appendChild(row);
  });
}

function editData(index) {
  const item = data[index];
  nameinput.value = item.name;
  emailinput.value = item.email;
  celularinput.value = item.celular;
  data.splice(index, 1);
  savedatatolocalstorage();
  renderTable();
}

function deleteData(index) {
  data.splice(index, 1);
  savedatatolocalstorage();
  renderTable();
}

renderTable();



