document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  if (validarFormulario()) {
    alert("Formulario enviado correctamente.");
  }
});

let aficiones = [];

document.getElementById("agregarAficion").addEventListener("click", function() {
  const input = document.getElementById("aficionInput");
  const valor = input.value.trim();
  if (valor !== "") {
    aficiones.push(valor);
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = valor;
    document.getElementById("listaAficiones").appendChild(li);
    input.value = "";
  }
});

function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
  document.getElementById(id).classList.add("text-danger");
};

function limpiarErrores() {
  const errores = document.querySelectorAll(".error");
  errores.forEach(e => {
    e.textContent = "";
    e.classList.remove("text-danger");
  });
};

function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
};

function isDigit(char) {
  return char >= '0' && char <= '9';
};

function validarUsuario(usuario) {
  if (usuario.length < 5 || usuario.length > 10) return false;
  if (!isLetter(usuario[0])) return false;

  let letras_digitos = true;
  let digitosDesde = -1;

  for (let i = 0; i < usuario.length; i++) {
    const c = usuario[i];
    if (!isLetter(c) && !isDigit(c)) {
      letras_digitos = false;
      break;
    }
    if (isDigit(c) && digitosDesde === -1) {
      digitosDesde = i;
    }
    if (isLetter(c) && digitosDesde !== -1) {
      return false;
    }
  }
  return letras_digitos;
};

function validarContraseña(pass, usuario) {
  if (pass.length < 3 || pass.length > 6) return false;
  if (pass.includes(usuario)) return false;
  let tieneLetra = false;
  let tieneDigito = false;
  for (let c of pass) {
    if (isLetter(c)) tieneLetra = true;
    if (isDigit(c)) tieneDigito = true;
  }
  return tieneLetra && tieneDigito;
};

function validarTelefono(telefono) {
  if (telefono.length < 8 || telefono.length > 15) return false;
  for (let c of telefono) {
    if (!isDigit(c)) return false;
  }
  return true;
};

function validarURL(url) {
  return url.startsWith("https://");
};

function validarFormulario() {
  limpiarErrores();
  const usuario = document.getElementById("usuario").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();
  const confirm = document.getElementById("confirm").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const comuna = document.getElementById("comuna").value;
  const telefono = document.getElementById("telefono").value.trim();
  const web = document.getElementById("web").value.trim();
  let esValido = true;

  if (!usuario) {
    mostrarError("errorusuario", "El nombre de usuario es obligatorio.");
    esValido = false;
  } else if (!validarUsuario(usuario)) {
    mostrarError("errorusuario", "El usuario debe comenzar con una letra, tener entre 5 y 10 caracteres, sin símbolos, y los dígitos solo al final.");
    esValido = false;
  }

  if (!contraseña) {
    mostrarError("errorcontraseña", "La contraseña es obligatoria.");
    esValido = false;
  } else if (!validarContraseña(contraseña, usuario)) {
    mostrarError("errorcontraseña", "Contraseña invalida: debe contener entre 3-6 caracteres, al menos una letra y un numero, tampoco puede ser el nombre de usuario.");
    esValido = false;
  }

  if (confirm !== contraseña) {
    mostrarError("errorconfirm", "Las contraseñas no coinciden.");
    esValido = false;
  }

  if (!direccion) {
    mostrarError("errordireccion", "La dirección es obligatoria.");
    esValido = false;
  }

  if (!comuna) {
    mostrarError("errorcomuna", "Debe seleccionar una comuna.");
    esValido = false;
  }

  if (!telefono) {
    mostrarError("errortelefono", "El teléfono es obligatorio.");
    esValido = false;
  } else if (!validarTelefono(telefono)) {
    mostrarError("errortelefono", "Teléfono inválido. Solo dígitos, entre 8 y 15 caracteres.");
    esValido = false;
  }

  if (web && !validarURL(web)) {
    mostrarError("errorweb", "La URL debe comenzar con https://");
    esValido = false;
  }

  if (aficiones.length < 2) {
    mostrarError("erroraficiones", "Debe ingresar al menos dos aficiones.");
    esValido = false;
  }
  return esValido;
};
