function maskIt(component, event, mascara) {
	// Cancela se o evento for Backspace
	if (!e)
		var e = window.event;
	if (e.keyCode)
		code = e.keyCode;
	else if (e.which)
		code = e.which;

	// Variaveis da função
        var txt = component.value.replace(/[^\d]+/gi, '').reverse();
	var mask = mascara.reverse();
	var ret = "";
	txt = removeLastZeros(txt);
	// Loop na mascara para aplicar os caracteres
	for ( var x = 0, y = 0, z = mask.length; x < z && y < txt.length;) {
		if (mask.charAt(x) != '#' && mask.charAt(x) != '9') {
			ret += mask.charAt(x);
			x++;
		} else {
			ret += txt.charAt(y);
			y++;
			x++;
		}
	}
	component.value = ret.reverse();
	addZero(component);
}

function validaTeclado(component, evt, mascara) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    //se for backspace sempre permite a ação do botão
    if(charCode == 8) {
    	return true;
    }
    //Verifica se o valor do caractere nao corresponde a um numero
    //Caso nao corresponda retorna false
    if (charCode > 31 && (charCode < 48 || charCode > 57))
       return false;
    //verifica o tamanho do campo com a mascara
    //primeiro remove os caracteres especiais da mascara (fica apenas
    //o 9 e o #
    var maskClear = mascara.replace(/[^#9]+/gi, '');
    var txt = component.value.replace(/[^\d]+/gi, '');
    if(txt.length >= maskClear.length) {
	return false;
    }
    //caso não haja problema, aceita
    return true;
 }

function addZero(component) {
	var value = component.value;
	if(value.length > 2) {
		return;
	}

	switch (value.length) {
	case 0:
		component.value = '0.00';
		break;
	case 1:
		component.value = '0.0' + value;
		break;
	case 2:
		component.value = '0.' + value;
		break;
	}
}

function removeLastZeros(valueReverse) {
	var returnNotReverse = "";
	var encontrouDifZero = false;
	for(x = (valueReverse.length - 1) ; x >= 0; x--) {

		if(valueReverse.charAt(x) == "0" && !encontrouDifZero) {
			continue;
		}
		encontrouDifZero = true;
		returnNotReverse += valueReverse.charAt(x);
	}
	return returnNotReverse.reverse();
}

function setFieldPosition(field) {
	field.selectionStart = field.value.length;
	field.selectionEnd = field.value.length;
}

String.prototype.reverse = function() {
	return this.split('').reverse().join('');
};
