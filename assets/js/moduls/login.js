const formulario = document.querySelector("#formulario");
const correo = document.querySelector("#correo");
const clave = document.querySelector("#clave");
const errorClave = document.querySelector("#errorClave");
const errorCorreo = document.querySelector("#errorCorreo");
document.addEventListener("DOMContentLoaded", function () {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    errorClave.textContent = "";
    errorCorreo.textContent = "";
    if (correo.value == "") {
      errorCorreo.textContent = "EL CORREO ES REQUERIDO";
    } else if (clave.value == "") {
      errorClave.textContent = "LA CLAVE ES REQUERIDA";
    } else {
      const url = base_url + "home/validar";
      //crear formData
      const data = new FormData(this);
      //hacer una instancia del objeto xmlhttrequest
      const http = new XMLHttpRequest();
      //abrir una conexion, puede ser post o get
      http.open("POST", url, true);
      //envia datos
      http.send(data);
      //verificar estados
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const res = JSON.parse(this.responseText);
          Swal.fire("The Internet?", res.msg, res.type);
          if (res.type == "success") {
            setTimeout(() => {
              let timerInterval;
              Swal.fire({
                title: res.msg,
                html: "Será redireccionado en <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector("b");
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  window.location = base_url + "admin";
                }
              });
            }, 2000);
          }
        }
      };
    }
  });
});
