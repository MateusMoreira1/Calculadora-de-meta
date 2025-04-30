// Capturando todos os inputs e adicionando o event listener para Enter
var inputs = document.querySelectorAll('input');
inputs.forEach(function (input) {
    input.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Previne comportamento inesperado
            if (input.id === "casosFeitos" && input.value.trim() !== "") {
                calcularProgresso();
            } else {
                calcularMeta();
            }
        }
    });
});

var metaDiaDescontada = 0;
var metaDiaTotal = 0;

function calcularMeta() {
    var metaDiaria = parseFloat(document.getElementById('metaDiaria').value);
    var cargaHorariaInput = document.getElementById('cargaHoraria').value.split(":");
    var horasConsideradasInput = document.getElementById('horasConsideradas').value.split(":");
    var horasExtrasInput = document.getElementById('horasExtras').value.trim();
    var horasExtras = 0;

    if (horasExtrasInput) {
        var extras = horasExtrasInput.split(":");
        horasExtras = parseInt(extras[0]) + (parseInt(extras[1]) / 60);
    }

    var cargaHoraria = parseInt(cargaHorariaInput[0]) + (parseInt(cargaHorariaInput[1]) / 60);
    var horasConsideradas = parseInt(horasConsideradasInput[0]) + (parseInt(horasConsideradasInput[1]) / 60);

    if (isNaN(metaDiaria) || isNaN(cargaHoraria) || isNaN(horasConsideradas) || cargaHoraria <= 0 || horasConsideradas < 0 || cargaHoraria < horasConsideradas) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Cálculo com valores reais
    const metaDescontadaReal = metaDiaria * (cargaHoraria - horasConsideradas) / cargaHoraria;
    const metaExtraReal = metaDiaria * horasExtras / cargaHoraria;
    const metaTotalReal = metaDescontadaReal + metaExtraReal;

    // Arredondamento somente no final
    metaDiaDescontada = Math.ceil(metaDescontadaReal);
    metaDiaTotal = Math.ceil(metaTotalReal);
    const resultado120 = Math.ceil(metaDiaTotal * 1.2);

    const resultado = metaDiaDescontada === 0
        ? "Hoje você não tem nenhuma meta definida 🙂"
        : `
        <p><strong>Meta Nuvens: ${metaDiaTotal}</strong></p>
        <p><strong>Meta Estrelas: ${resultado120}</strong></p>
    `;

    document.getElementById('resultado').innerHTML = resultado;
    document.getElementById('resultado').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcularProgresso() {
    var casosFeitos = parseFloat(document.getElementById('casosFeitos').value);
    if (isNaN(casosFeitos) || casosFeitos === "") {
        return;
    }

    if (isNaN(metaDiaTotal) || metaDiaTotal <= 0) {
        alert("Por favor, insira valores válidos para a meta e os casos feitos.");
        return;
    }

    var porcentagem = (casosFeitos / metaDiaTotal) * 100;
    var resultado120 = Math.ceil(metaDiaTotal * 1.2);
    var mensagem = "";

    if (porcentagem < 50) {
        mensagem = Vamos, você consegue! <br>Porcentagem atual: ${porcentagem.toFixed(2)}%;
    } else if (porcentagem < 100) {
        mensagem = Bora que está quase! <br>Porcentagem atual: ${porcentagem.toFixed(2)}%;
    } else if (porcentagem === 100) {
        mensagem = Você atingiu a sua meta nuvens, parabéns! <br>Porcentagem atual: ${porcentagem.toFixed(2)}%;
    } else if (porcentagem < 120) {
        mensagem = Parabéns, você já bateu nuvens, agora bora chegar nas estrelas. <br>Porcentagem atual: ${porcentagem.toFixed(2)}%;
    } else {
        mensagem = Parabéns, você atingiu as estrelas! <br>Porcentagem atual: ${porcentagem.toFixed(2)}%;
    }

    var casosParaNuvens = Math.max(0, metaDiaTotal - casosFeitos);
    var casosParaEstrelas = Math.max(0, resultado120 - casosFeitos);

    var mensagemCasos = "";
    if (casosParaNuvens > 0) {
        mensagemCasos += <p><strong>Casos restantes para atingir Nuvens: ${casosParaNuvens}</strong></p>;
    }
    if (casosParaEstrelas > 0) {
        mensagemCasos += <p><strong>Casos restantes para atingir Estrelas: ${casosParaEstrelas}</strong></p>;
    }

    document.getElementById('progresso').innerHTML = ${mensagem}<br>${mensagemCasos};
    document.getElementById('progresso').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


