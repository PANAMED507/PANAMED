const btnEmergencia = document.getElementById("btnEmergencia");
const botonesSituacion = document.querySelectorAll(".boton-situacion");

const guia = document.getElementById("guia");
const tituloGuia = document.getElementById("tituloGuia");
const contenidoGuia = document.getElementById("contenidoGuia");
const volver = document.getElementById("volver");

btnEmergencia.addEventListener("click", () => {
    window.location.href = "tel:911";
});

const guias = {

    "no-responde": {
        titulo: "Persona que no responde",
        contenido: `
            <p><strong>Primero:</strong> llama al 911.</p>
            <ol>
                <li>Busca ayuda de un adulto si hay alguno cerca.</li>
                <li>Comprueba si la persona responde cuando le hablas.</li>
                <li>No la dejes sola.</li>
                <li>Sigue las instrucciones que te dé el operador de emergencias.</li>
            </ol>
        `
    },

    "respiracion": {
        titulo: "Problemas para respirar",
        contenido: `
            <p><strong>Llama al 911 inmediatamente.</strong></p>
            <ol>
                <li>Mantén la calma.</li>
                <li>Ayuda a la persona a permanecer en una posición cómoda.</li>
                <li>No le des comida ni bebida.</li>
                <li>Sigue las instrucciones del operador de emergencias.</li>
            </ol>
        `
    },

    "sangrado": {
        titulo: "Sangrado",
        contenido: `
            <p><strong>Llama al 911 si el sangrado es abundante o la persona está en peligro.</strong></p>
            <ol>
                <li>Mantén la calma y busca ayuda.</li>
                <li>Si puedes hacerlo de forma segura, coloca una tela limpia sobre la herida.</li>
                <li>No retires objetos que estén clavados en la herida.</li>
                <li>Sigue las instrucciones del operador de emergencias.</li>
            </ol>
        `
    },

    "golpe": {
        titulo: "Golpe o caída",
        contenido: `
            <p><strong>Si la persona está gravemente afectada, llama al 911.</strong></p>
            <ol>
                <li>No muevas a la persona innecesariamente.</li>
                <li>Busca ayuda de un adulto si está disponible.</li>
                <li>Observa si responde normalmente.</li>
                <li>Informa al operador de emergencias sobre lo ocurrido.</li>
            </ol>
        `
    }

};

botonesSituacion.forEach(boton => {

    boton.addEventListener("click", () => {

        const tipo = boton.dataset.tipo;
        const datos = guias[tipo];

        if (!datos) return;

        tituloGuia.textContent = datos.titulo;
        contenidoGuia.innerHTML = datos.contenido;

        guia.hidden = false;

        guia.scrollIntoView({
            behavior: "smooth"
        });

    });

});

volver.addEventListener("click", () => {

    guia.hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("PANAMED listo para instalar");
            })
            .catch(error => {
                console.error("Error:", error);
            });

    });

}
