// ============================================================
// PANAMED
// Sistema de orientación básica ante emergencias
// ============================================================

"use strict";


// ============================================================
// ELEMENTOS DEL DOM
// ============================================================

const guia = document.getElementById("guia");
const tituloGuia = document.getElementById("tituloGuia");
const contenidoGuia = document.getElementById("contenidoGuia");
const volver = document.getElementById("volver");


// ============================================================
// GUÍAS DE EMERGENCIA
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
// VARIABLES DE LA GUÍA
// ============================================================

let guiaActual = null;
let pasoActual = 0;


// ============================================================
// BOTONES DE SITUACIONES
// ============================================================

const botonesSituacion =
    document.querySelectorAll(".boton-situacion");


// ============================================================
// EVENTOS DE LOS BOTONES
// ============================================================

botonesSituacion.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const tipo =
            boton.getAttribute("data-tipo");

        console.log(
            "Situación seleccionada:",
            tipo
        );


        // Verificar que exista la guía

        if (!guias[tipo]) {

            console.error(
                "No existe una guía para:",
                tipo
            );

            return;
        }


        // Guardar guía actual

        guiaActual = guias[tipo];

        pasoActual = 0;


        // Mostrar guía

        mostrarGuia();

    });

});


// ============================================================
// MOSTRAR GUÍA
// ============================================================

function mostrarGuia() {

    if (!guia) {

        console.error(
            "No se encontró el elemento #guia"
        );

        return;
    }


    if (!tituloGuia) {

        console.error(
            "No se encontró #tituloGuia"
        );

        return;
    }


    if (!contenidoGuia) {

        console.error(
            "No se encontró #contenidoGuia"
        );

        return;
    }


    if (!guiaActual) {
        return;
    }


    // Título

    tituloGuia.textContent =
        guiaActual.titulo;


    // Mostrar sección

    guia.hidden = false;


    // Mostrar primer paso

    mostrarPaso();


    // Desplazarse hacia la guía

    setTimeout(function () {

        guia.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


// ============================================================
// MOSTRAR PASO
// ============================================================

function mostrarPaso() {

    if (!guiaActual) {
        return;
    }


    if (!contenidoGuia) {
        return;
    }


    const totalPasos =
        guiaActual.pasos.length;


    const textoPaso =
        guiaActual.pasos[pasoActual];


    // ========================================================
    // CONTENIDO DE LA GUÍA
    // ========================================================

    contenidoGuia.innerHTML = "";


    // Indicador

    const indicador =
        document.createElement("div");

    indicador.className =
        "indicador-paso";

    indicador.textContent =
        "Paso " +
        (pasoActual + 1) +
        " de " +
        totalPasos;


    contenidoGuia.appendChild(indicador);


    // Paso

    const paso =
        document.createElement("div");

    paso.className =
        "paso-guia";

    paso.textContent =
        textoPaso;


    contenidoGuia.appendChild(paso);


    // ========================================================
    // BOTÓN DE AUDIO
    // ========================================================

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


    escuchar.addEventListener("click", function () {

        reproducirTexto(textoPaso);

    });


    // ========================================================
    // CONTROLES
    // ========================================================

    const controles =
        document.createElement("div");

    controles.className =
        "controles-guia";


    // Botón anterior

    if (pasoActual > 0) {

        const anterior =
            document.createElement("button");

        anterior.id =
            "pasoAnterior";

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


    // Botón siguiente

    if (pasoActual < totalPasos - 1) {

        const siguiente =
            document.createElement("button");

        siguiente.id =
            "pasoSiguiente";

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


    // Botón terminar

    if (pasoActual === totalPasos - 1) {

        const terminar =
            document.createElement("button");

        terminar.id =
            "terminarGuia";

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
// REPRODUCIR AUDIO
// ============================================================

function reproducirTexto(texto) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Tu navegador no permite reproducir instrucciones por voz."
        );

        return;
    }


    window.speechSynthesis.cancel();


    const voz =
        new SpeechSynthesisUtterance(texto);


    voz.lang =
        "es-ES";


    voz.rate =
        0.95;


    voz.pitch =
        1;


    window.speechSynthesis.speak(voz);

}


// ============================================================
// BOTÓN VOLVER
// ============================================================

if (volver) {

    volver.addEventListener(
        "click",
        function () {

            cerrarGuia();

        }
    );

}


// ============================================================
// CERRAR GUÍA
// ============================================================

function cerrarGuia() {

    if (guia) {

        guia.hidden = true;

    }


    guiaActual = null;

    pasoActual = 0;


    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }

}


// ============================================================
// ACERCA DE PANAMED
// ============================================================

const btnAcerca =
    document.getElementById("btnAcerca");

const acerca =
    document.getElementById("acerca");

const cerrarAcerca =
    document.getElementById("cerrarAcerca");

const volverPanamed =
    document.getElementById("volverPanamed");


// ============================================================
// ABRIR ACERCA
// ============================================================

if (btnAcerca && acerca) {

    btnAcerca.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "block";

        }
    );

}


// ============================================================
// CERRAR ACERCA
// ============================================================

if (cerrarAcerca && acerca) {

    cerrarAcerca.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "none";

        }
    );

}


// ============================================================
// VOLVER A PANAMED
// ============================================================

if (volverPanamed && acerca) {

    volverPanamed.addEventListener(
        "click",
        function () {

            acerca.style.display =
                "none";

        }
    );

}


// ============================================================
// EMERGENCIA 911
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
// ABRIR CONFIRMACIÓN DE EMERGENCIA
// ============================================================

function abrirConfirmacionEmergencia() {

    if (!confirmacionEmergencia) {

        console.error(
            "No se encontró #confirmacionEmergencia"
        );

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

function cerrarConfirmacionEmergencia() {

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
// BOTÓN PRINCIPAL DE EMERGENCIA
// ============================================================

if (btnEmergencia) {

    btnEmergencia.addEventListener(
        "click",
        function () {

            abrirConfirmacionEmergencia();

        }
    );

}


// ============================================================
// BOTÓN 911 RÁPIDO
// ============================================================

if (emergenciaRapida) {

    emergenciaRapida.addEventListener(
        "click",
        function () {

            abrirConfirmacionEmergencia();

        }
    );

}


// ============================================================
// CANCELAR EMERGENCIA
// ============================================================

if (cancelarEmergencia) {

    cancelarEmergencia.addEventListener(
        "click",
        function () {

            cerrarConfirmacionEmergencia();

        }
    );

}


// ============================================================
// CONFIRMAR LLAMADA AL 911
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


        // Cerrar emergencia

        if (
            confirmacionEmergencia &&
            confirmacionEmergencia.style.display === "flex"
        ) {

            cerrarConfirmacionEmergencia();

        }


        // Cerrar acerca

        if (
            acerca &&
            acerca.style.display === "block"
        ) {

            acerca.style.display =
                "none";

        }


        // Cerrar guía

        if (
            guia &&
            guia.hidden === false
        ) {

            cerrarGuia();

        }

    }
);


// ============================================================
// MENSAJE DE COMPROBACIÓN
// ============================================================

console.log(
    "PANAMED: sistema iniciado correctamente."
);

console.log(
    "Botones de situaciones encontrados:",
    botonesSituacion.length
);