"use strict";


// ============================================================
// PANAMED
// ============================================================


// ============================================================
// ELEMENTOS
// ============================================================

const guia = document.getElementById("guia");
const tituloGuia = document.getElementById("tituloGuia");
const contenidoGuia = document.getElementById("contenidoGuia");
const volver = document.getElementById("volver");


// ============================================================
// GUÍAS
// ============================================================

const guias = {

    "no-responde": {

        titulo: "Persona que no responde",

        pasos: [
            "Mantén la calma y busca ayuda de un adulto si hay alguno cerca.",
            "Comprueba si la persona responde cuando le hablas.",
            "Llama al 911 o pide a alguien que lo haga.",
            "No dejes sola a la persona.",
            "Sigue las instrucciones del operador de emergencias."
        ]

    },


    "respiracion": {

        titulo: "Problemas para respirar",

        pasos: [
            "Mantén la calma y llama al 911.",
            "Ayuda a la persona a permanecer en una posición cómoda.",
            "No le des comida ni bebida.",
            "No la dejes sola.",
            "Sigue las instrucciones del operador de emergencias."
        ]

    },


    "sangrado": {

        titulo: "Sangrado",

        pasos: [
            "Mantén la calma y busca ayuda.",
            "Si puedes hacerlo de forma segura, coloca una tela limpia sobre la herida.",
            "No retires objetos que estén clavados en la herida.",
            "Si el sangrado es abundante, llama al 911.",
            "Sigue las instrucciones del operador de emergencias."
        ]

    },


    "golpe": {

        titulo: "Golpe o caída",

        pasos: [
            "Mantén la calma y busca ayuda de un adulto.",
            "No muevas a la persona innecesariamente.",
            "Observa si responde normalmente.",
            "Llama al 911 si la persona está gravemente afectada.",
            "Informa al operador de emergencias sobre lo ocurrido."
        ]

    }

};


// ============================================================
// VARIABLES
// ============================================================

let guiaActual = null;
let pasoActual = 0;


// ============================================================
// BOTONES DE SITUACIONES
// ============================================================

const botonesSituacion =
    document.querySelectorAll(".boton-situacion");


botonesSituacion.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const tipo =
            boton.dataset.tipo;


        if (!guias[tipo]) {

            console.error(
                "Guía no encontrada:",
                tipo
            );

            return;

        }


        guiaActual =
            guias[tipo];

        pasoActual = 0;

        mostrarGuia();

    });

});


// ============================================================
// MOSTRAR GUÍA
// ============================================================

function mostrarGuia() {

    if (!guiaActual) {
        return;
    }


    guia.hidden = false;


    tituloGuia.textContent =
        guiaActual.titulo;


    mostrarPaso();


    setTimeout(function () {

        guia.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);

}


// ============================================================
// MOSTRAR PASO
// ============================================================

function mostrarPaso() {

    if (!guiaActual) {
        return;
    }


    contenidoGuia.innerHTML = "";


    const indicador =
        document.createElement("div");

    indicador.className =
        "indicador-paso";

    indicador.textContent =
        "Paso " +
        (pasoActual + 1) +
        " de " +
        guiaActual.pasos.length;


    contenidoGuia.appendChild(indicador);


    const paso =
        document.createElement("div");

    paso.className =
        "paso-guia";

    paso.textContent =
        guiaActual.pasos[pasoActual];


    contenidoGuia.appendChild(paso);


    const escuchar =
        document.createElement("button");

    escuchar.id =
        "escucharPaso";

    escuchar.className =
        "escuchar-paso";

    escuchar.type =
        "button";

    escuchar.textContent =
        "🔊 Escuchar instrucción";


    contenidoGuia.appendChild(escuchar);


    escuchar.addEventListener(
        "click",
        function () {

            hablar(
                guiaActual.pasos[pasoActual]
            );

        }
    );


    const controles =
        document.createElement("div");

    controles.className =
        "controles-guia";


    // ANTERIOR

    if (pasoActual > 0) {

        const anterior =
            document.createElement("button");

        anterior.type =
            "button";

        anterior.textContent =
            "← Anterior";


        controles.appendChild(anterior);


        anterior.addEventListener(
            "click",
            function () {

                pasoActual--;

                mostrarPaso();

            }
        );

    }


    // SIGUIENTE

    if (
        pasoActual <
        guiaActual.pasos.length - 1
    ) {

        const siguiente =
            document.createElement("button");

        siguiente.type =
            "button";

        siguiente.textContent =
            "Siguiente →";


        controles.appendChild(siguiente);


        siguiente.addEventListener(
            "click",
            function () {

                pasoActual++;

                mostrarPaso();

            }
        );

    }


    // TERMINAR

    if (
        pasoActual ===
        guiaActual.pasos.length - 1
    ) {

        const terminar =
            document.createElement("button");

        terminar.type =
            "button";

        terminar.textContent =
            "✓ Terminar";


        controles.appendChild(terminar);


        terminar.addEventListener(
            "click",
            function () {

                cerrarGuia();

            }
        );

    }


    contenidoGuia.appendChild(controles);

}


// ============================================================
// VOZ
// ============================================================

function hablar(texto) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "La función de voz no está disponible en este dispositivo."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const voz =
        new SpeechSynthesisUtterance(texto);


    voz.lang = "es-ES";

    voz.rate = 0.95;

    voz.pitch = 1;


    window.speechSynthesis.speak(voz);

}


// ============================================================
// CERRAR GUÍA
// ============================================================

function cerrarGuia() {

    guia.hidden = true;

    guiaActual = null;

    pasoActual = 0;


    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }

}


// ============================================================
// VOLVER
// ============================================================

if (volver) {

    volver.addEventListener(
        "click",
        cerrarGuia
    );

}


// ============================================================
// ACERCA
// ============================================================

const btnAcerca =
    document.getElementById("btnAcerca");

const acerca =
    document.getElementById("acerca");

const cerrarAcerca =
    document.getElementById("cerrarAcerca");

const volverPanamed =
    document.getElementById("volverPanamed");


if (btnAcerca) {

    btnAcerca.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "block";

        }
    );

}


if (cerrarAcerca) {

    cerrarAcerca.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "none";

        }
    );

}


if (volverPanamed) {

    volverPanamed.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "none";

        }
    );

}


// ============================================================
// EMERGENCIAS
// ============================================================

const btnEmergencia =
    document.getElementById("btnEmergencia");

const confirmacionEmergencia =
    document.getElementById(
        "confirmacionEmergencia"
    );

const confirmarEmergencia =
    document.getElementById(
        "confirmarEmergencia"
    );

const cancelarEmergencia =
    document.getElementById(
        "cancelarEmergencia"
    );

const emergenciaRapida =
    document.getElementById(
        "emergenciaRapida"
    );


// ============================================================
// ABRIR CONFIRMACIÓN
// ============================================================

function abrirEmergencia() {

    if (!confirmacionEmergencia) {
        return;
    }


    confirmacionEmergencia.style.display =
        "flex";


    confirmacionEmergencia.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ============================================================
// CERRAR CONFIRMACIÓN
// ============================================================

function cerrarEmergencia() {

    if (!confirmacionEmergencia) {
        return;
    }


    confirmacionEmergencia.style.display =
        "none";


    confirmacionEmergencia.setAttribute(
        "aria-hidden",
        "true"
    );

}


// ============================================================
// BOTÓN EMERGENCIA
// ============================================================

if (btnEmergencia) {

    btnEmergencia.addEventListener(
        "click",
        abrirEmergencia
    );

}


// ============================================================
// BOTÓN 911 RÁPIDO
// ============================================================

if (emergenciaRapida) {

    emergenciaRapida.addEventListener(
        "click",
        abrirEmergencia
    );

}


// ============================================================
// CANCELAR
// ============================================================

if (cancelarEmergencia) {

    cancelarEmergencia.addEventListener(
        "click",
        cerrarEmergencia
    );

}


// ============================================================
// LLAMAR
// ============================================================

if (confirmarEmergencia) {

    confirmarEmergencia.addEventListener(
        "click",
        function () {

            window.location.href =
                "tel:911";

        }
    );

}


// ============================================================
// TECLA ESC
// ============================================================

document.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key !== "Escape") {
            return;
        }


        if (
            confirmacionEmergencia &&
            confirmacionEmergencia.style.display === "flex"
        ) {

            cerrarEmergencia();

        }


        if (
            acerca &&
            acerca.style.display === "block"
        ) {

            acerca.style.display =
                "none";

        }


        if (
            guia &&
            !guia.hidden
        ) {

            cerrarGuia();

        }

    }
);


// ============================================================
// SERVICE WORKER
// ============================================================

// Usamos solamente sw.js.
// service.worker.js es el archivo viejo.

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register("./sw.js")
                .then(function (registro) {

                    console.log(
                        "PANAMED: Service Worker activo.",
                        registro.scope
                    );

                })
                .catch(function (error) {

                    console.error(
                        "PANAMED: error en Service Worker:",
                        error
                    );

                });

        }
    );

}


// ============================================================
// MENSAJES DE PRUEBA
// ============================================================

console.log(
    "PANAMED iniciado correctamente."
);

console.log(
    "Botones de situaciones:",
    botonesSituacion.length
);