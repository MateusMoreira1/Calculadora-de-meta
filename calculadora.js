// Adicionando um event listener para o evento "keypress" em todos os campos de entrada
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
    input.addEventListener('keypress', function(event) {
        // Verifica se a tecla pressionada é "Enter" (código 13)
        if (event.key === "Enter") {
            // Chama a função calcularMeta() quando "Enter" é pressionado
            calcularMeta();
        }
    });
});
 // Função para abrir uma nova janela com o link fornecido
 function abrirNovaJanela() {
    window.open('https://magazineluiza.workplace.com/profile.php?id=100087314237293', '_blank');
}

function calcularMeta() {
    var metaDiaria = parseFloat(document.getElementById('metaDiaria').value);
    var cargaHorariaInput = document.getElementById('cargaHoraria').value.split(":");
    var horasConsideradasInput = document.getElementById('horasConsideradas').value.split(":");
    var horasExtrasInput = document.getElementById('horasExtras').value.trim(); // Remove espaços em branco extras e divide horas e minutos
    var horasExtras = 0;

    if (horasExtrasInput) {
        horasExtrasInput = horasExtrasInput.split(":");
        horasExtras = parseInt(horasExtrasInput[0]) + (parseInt(horasExtrasInput[1]) / 60);
    }

    var cargaHoraria = parseInt(cargaHorariaInput[0]) + (parseInt(cargaHorariaInput[1]) / 60);
    var horasConsideradas = parseInt(horasConsideradasInput[0]) + (parseInt(horasConsideradasInput[1]) / 60);

    if (isNaN(metaDiaria) || isNaN(cargaHoraria) || isNaN(horasConsideradas) || cargaHoraria <= 0 || horasConsideradas < 0 || cargaHoraria < horasConsideradas) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Calcula a meta diária descontando o tempo considerado
    var metaDiaDescontada = Math.ceil(metaDiaria * (cargaHoraria - horasConsideradas) / cargaHoraria);

    // Calcula a meta total considerando as horas extras
    var metaDiaTotal = metaDiaDescontada + Math.ceil(metaDiaria * horasExtras / cargaHoraria);

    var metaHora = Math.ceil(metaDiaTotal / cargaHoraria);

    // Calcula a meta de estrelas (120% da meta de nuvens)
    var resultado120 = Math.ceil(metaDiaTotal * 1.2);
    var metaPorHora120 = Math.ceil(metaHora * 1.2);

    var resultado = "";

    if (metaDiaDescontada === 0) {
        resultado = "Hoje você não tem nenhuma meta definida 🙂";
    } else {
        resultado = `
            <p><strong>Meta nuvens: ${metaDiaTotal}</p>
            <p><strong>Meta nuvens por hora: ${metaHora}</p>
            <p><strong>Meta estrelas: ${resultado120}</p>
            <p><strong>Meta estrelas por hora: ${metaPorHora120}</p>
        `;
    }

    document.getElementById('resultado').innerHTML = resultado;
}
