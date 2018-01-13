
//********************************************
// Definição de tempo por rota (em Minutos)
const Heidel_Calpheon = "12:00";
const Heidel_Glish = "05:35";
const Heidel_Keplan = "08:45";

const Calpheon_Glish = "13:20";
const Calpheon_Heidel = "12:45";
const Calpheon_Keplan = "07:05";

const Keplan_Heidel = "09:45";

const Glish_Calpheon = "13:30";
// End definição de tempo por rota (em Minutos)
//*********************************************


// Ao CAREGAR a pagina verifica a existencia de localStorage
$(document).ready(function() {

	var value = window.localStorage.getItem("servidor");

	if (value) {

		// Carrega o valor da session na tag span
		$("#servidor").html(value);
	}

});

var timer2 = "";

// interval definida fora da função para nao bugar o clearInterval()
var interval;

function convertRota(rota) {

	// Reseta Timer
	clearInterval(interval);

	switch (rota) {

		case "Heidel_Calpheon":
			timer2 = Heidel_Calpheon;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Heidel_Glish":
			timer2 = Heidel_Glish;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Heidel_Keplan":
			timer2 = Heidel_Keplan;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Calpheon_Glish":
			timer2 = Calpheon_Glish;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Calpheon_Heidel":
			timer2 = Calpheon_Heidel;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Calpheon_Keplan":
			timer2 = Calpheon_Keplan;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Keplan_Heidel":
			timer2 = Keplan_Heidel;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;

		case "Glish_Calpheon":
			timer2 = Glish_Calpheon;

			// Separa rota origem e destino
			var route = rota.split("_");
			var origem = route[0];
			var destino = route[1];
			break;
	}

	// Pega o valor em segundos do tempo total
	var tempoTotal = convertTempo(timer2);

	// Mostra na tela Origem, Destino
	$(".rota").html("Origem: " + origem + "<br>Destino: " + destino + "<br>");

	$('.countdown').html(timer2);

	  // Inicia Cronômetro
	  interval = setInterval(function() {

	  // Separa minuto e segundo
	  var timer = timer2.split(':');	

	  var minutes = parseInt(timer[0], 10);
	  var seconds = parseInt(timer[1], 10);	  

	  --seconds;

	  // Ajusta formatação dos minutos
	  minutes = (minutes < 10) ? '0' + minutes : minutes;

	  if (seconds < 0) {
	  	--minutes;
	  	minutes = '0' + minutes;
	  }
	  else {
	  	minutes;
	  }

	  // Verifica término de tempo do cronômetro caso minutes seja negativo
	  if ((minutes == '0-1')) {

	  	clearInterval(interval);

		// Executa o som ao término do cronômetro
		$(function () {
			var audio = new Audio('notification.mp3');
			audio.play();
		});

		// Verifica se o checkbox está marcado
		if ($('#m_alerta').is(':checked')) {

			alert("Tempo do cronômetro finalizado!");
		}

		// Exit;	
		return;
	  }

	  // Verifica rotação dos segundos
	  seconds = (seconds < 0) ? 59 : seconds;

	  // Ajusta formatação dos segundos
	  seconds = (seconds < 10) ? '0' + seconds : seconds;

	  // Imprime no span
	  $('.countdown').html(minutes + ':' + seconds);

	  timer2 = minutes + ':' + seconds;

	  var tempoParcial = convertTempo(timer2);

	  // Atualiza barra de progresso
	  var progresso = barraProgresso(tempoTotal, tempoParcial);

	}, 1000);

}

function getServidor() {

	var value = $("#serv").val();

	// Verifica se valor está preenchido
	if ((value != null) && (value !== "udefined") && (value != "")) {

		// Criando localStorage
		if (typeof(Storage) !== "udefined") {

			window.localStorage.setItem("servidor", value);
		}
		else {
			alert("Error 226 - Browser não suportado...");
		}

		var text = window.localStorage.getItem("servidor");

		// Mostra o servidor no tag span
		$('#servidor').html(text);	

		// Reseta valor do campo input
		$('#serv').val('');

	}
	else {

		return alert("Campo Vazio!");
	}	

}

function editServidor() {

	// Busca valor
	var value = window.localStorage.getItem("servidor");

	// Verifica se valor está preenchido
	if ((value != null) && (value !== "udefined") && (value != "")) {

		// Coloca valor no input id=serv
		$('#serv').val(value);
	}
}

/*
// Mensagem para os butões que não possuem rota pré-definida
$(function() {
	$(".semRota").hover(
		function() {$(this).css("color", "red")},
		function() {$(this).css("color", "")}		
	);
});
*/

// Converte tempo total da contagem de minutos para tempo em segundos
function convertTempo(tempo) {

	var segTotal = tempo.split(":");
	var minutes = parseInt(segTotal[0], 10);
	var seconds = parseInt(segTotal[1], 10);

	var total = (minutes*60)+seconds;

	return total;
}

// Atualiza Barra de Progresso
function barraProgresso(tempoT, tempoP) {

	// Valor em porcentagem reverso a passagem do tempo
	var calc = 100 - ((tempoP * 100) / tempoT);

	// Atualiza valor do width no css
	$(".myBar").css("width", calc.toFixed(0) + "%");

	if (calc.toFixed(0) >= 100) {

		$(".porcento").html("Concluído");
		$(".porcento").css("left", 35 + "%");

	}
	else {

		// Atualiza valor da porcetagem no html
		$(".porcento").html(calc.toFixed(0) + "%");
		$(".porcento").css("left", 46 + "%");

	}
}