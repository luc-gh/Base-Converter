//CALCULADORA DE DECIMAIS E CONVERSÕES DE BASE

let botoes = document.querySelectorAll('span');  //botões
let tela = document.getElementById('valor');     //tela que mostra o resultado
let body = document.querySelector('body');
let condicao = 0;   //condição que define se o valor da tela deve ser apagado ou não

function toggle(){
	body.classList.toggle('dec');
}

for(let i = 0; i < botoes.length; i++){
	botoes[i].addEventListener("click", function(){
		if(this.innerHTML == "="){  //click no botão "=", o que indica que o usuário que ro resultado da expressão
			try{
				tela.innerHTML = calculo(tela.textContent);  //tenta atribuir o resultado da expressão na tela
				condicao = 0;
			}
			catch(e){  //caso ocorra um erro, atribui a letra "E", na tela
				tela.innerHTML = "E";
				condicao = 1;
			}
		}
		else{  //click não é no "="
			if(this.innerHTML == "C"){
				tela.innerHTML = "";  //apaga tudo na tela
        		condicao = 1;
			}
			else{  //click não no "=" e nem no "C"
				if(tela.innerHTML.length > 22){  //número grande demais
					tela.innerHTML = "E";
          			condicao = 1;
				}
				else{
					if(this.innerHTML == "1/x"){
						tela.innerHTML += " (1 ÷ ";
					}
					else{
						if(this.innerHTML == "±"){
							tela.innerHTML += " × (-1) ";
						}
						else{
							if(this.textContent == "ab"){
								if(tela.textContent == ""){
									tela.innerHTML = "";
								}
								else{
									tela.innerHTML += "^";
								}
							}
							else{  //o numero não é grande demais, e o click não foi nem no "=" e nem "C"
								if(condicao == 1 || tela.textContent == "E"){  //condição para apagar a tela
						            tela.innerHTML = "";
						        }
						        if(this.innerHTML == "×" || this.innerHTML == "+" || this.innerHTML == "-" || this.innerHTML =="÷"){
									tela.innerHTML = tela.innerHTML + " " + this.innerHTML + " ";						        	
						        }
						        else{
						        	tela.innerHTML += this.innerHTML;  //adição dos caracteres dos botões na tela
						        	condicao = 0;  //tela não deve ser apagada
						        }
						        
							}
						}
					}
					
				}
			}
		}
	});
}

function calculo(exp){
	let conta = "";
	let x = Array.from(exp);
	for(let i of x){
		if(i == "π"){
			conta += "Math.PI";
		}
		else if(i == "e"){
			conta += "Math.E";
		}
		else if(i == "^"){      ///////////////////////////////
			conta += "**";
		}
		else if(i == "±"){
			conta += " * (-1)  ";
		}
		else if(i == "×"){
			conta += "*";
		}
		else if(i == "÷"){
			conta += "/";
		}
		else if(i == "%"){
			conta += "*(1/100)";
		}
		else{
			conta += " " + i + " ";
		}
	}
	let r = eval(conta.replace(/\s/g,''));
	if(exp == ""){
		return "";
	}
	else{
		return r;
	}
}

var v = 3;
function maisOuMenos(i){
	let valor = document.getElementById("base");
	if(i == 1){
		if(v !== 26){
			v += 1;
		}
		valor.innerHTML = null;
		valor.innerHTML = v;
	}
	else if(i == -1){
		if(v !== 3){
			v -= 1;
		}
		valor.innerHTML = null;
		valor.innerHTML = v;
	}
}

function valorAtual(){  //detecta a base atual
	return document.querySelector("sup").textContent;
}

function outSup(novaBase, baseAtual){  //recebe a base de destino e a atual
	let valor = document.getElementById("valor").textContent;  //valor atual da tela

	if(novaBase == 2){  //conversão para base BINÁRIA
		document.querySelector("sup").innerHTML = "BIN";
		body.classList.replace(baseAtual.toLowerCase(), 'bin');  //alteração no CSS

		if(baseAtual == "OCT"){  //octal para binário
			//OCT -> DEC -> BIN
			let l = OctDec(valor);
			let s = DecBin(l);
			document.getElementById("valor").innerHTML = s;
		}

		else if(baseAtual == "DEC"){  //decimal para binário
			let l = DecBin(valor);
			document.getElementById("valor").innerHTML = l;
		}

		else if(baseAtual == "HEX"){  //hexadecimal para binário
			let l = HexBin(valor);
			document.getElementById("valor").innerHTML = l;
		}
	}
	else if(novaBase == 8){  //conversão para base OCTAL
		document.querySelector("sup").innerHTML = "OCT";
		body.classList.replace(baseAtual.toLowerCase(), 'oct');  //alteração no CSS

		if(baseAtual == "BIN"){  //binário para octal
			//BIN -> DEC -> OCT
			let l = BinDec(valor);
			let r = DecOct(l);
			document.getElementById("valor").innerHTML = r;
		}

		else if(baseAtual == "DEC"){  //decimal para octal
			let l = DecOct(valor);
			document.getElementById("valor").innerHTML = l;
		}

		else if(baseAtual == "HEX"){  //hexadecimal para octal 
			//HEX -> BIN -> DEC -> OCT
			let l = HexBin(valor);
			let r = BinDec(l);
			let s = DecOct(r);
			document.getElementById("valor").innerHTML = s;
		}
	}
	else if(novaBase == 10){  //conversão para base DECIMAL
		document.querySelector("sup").innerHTML = "DEC";
		body.classList.replace(baseAtual.toLowerCase(), 'dec');  //alteração no CSS

		if(baseAtual == "BIN"){  //binária para decimal
			//BIN -> OCT -> HEX -> DEC
			let l = BinDec(valor);
			document.getElementById("valor").innerHTML = l;
		}
		else if(baseAtual == "OCT"){  //octal para decimal
			//OCT -> DEC
			let l = OctDec(valor);
			document.getElementById("valor").innerHTML = l;
		}
		else if(baseAtual == "HEX"){  //hexadecimal para decimal
			//HEX -> BIN -> DEC
			let r = HexBin(valor);
			let l = BinDec(r);
			document.getElementById("valor").innerHTML = l;
		}
	}
	else if(novaBase == 16){  //conversão para base HEXADECIMAL
		document.querySelector("sup").innerHTML = "HEX";
		body.classList.replace(baseAtual.toLowerCase(), 'hex');  //alteração no CSS

		if(baseAtual == "BIN"){  //binária para hexadecimal
			//BIN -> DEC -> HEX
			let l = DecHex(BinDec(valor));
			document.getElementById("valor").innerHTML = l;
		}
		else if(baseAtual == "DEC"){  //decimal para hexadecimal
			let l = DecHex(valor);
			document.getElementById("valor").innerHTML = l;
		}
		if(baseAtual == "OCT"){  //octal para hexadecimal
			//OCT -> DEC -> HEX
			let l = OctDec(valor);
			let r = DecHex(l);
			document.getElementById("valor").innerHTML = r;
		}
	}
}


//DEC -> BIN  ok ^^
//HEX -> BIN  ok ^^
//DEC -> OCT  ok ^^
//DEC -> HEX  ok ^^
//BIN -> DEC  ok ^^
//OCT -> DEC  ok ^^
//BIN -> DEC -> HEX  ok ^^
//HEX -> BIN -> DEC  ok ^^
//OCT -> DEC -> BIN  ok ^^
//OCT -> DEC -> HEX  ok ^^

//BIN -> DEC -> OCT  ok ^^
//HEX -> BIN -> DEC -> OCT  ok ^^

function BinDec(valor){
	let i = 1;
	let tam = valor.length;
	let s = 0;
	let z;

	if(valor == ""){
		z = "";
	}
	else if(valor == "E" || valor.search(/[0-1]/) == -1){
		z = "E";
	}
	else{
		for(i = 1; i <= tam; i++){
			var c = valor[tam - i];
			s += c*(2**(i-1));
		}
		z = s;
	}
		
	return z + "";
}

function OctDec(valor){
	let i = 1;
	let s = 0;
	let z;

	if(valor == ""){
		z = "";
	}
	else if(valor == "E" || valor.search(/[0-7]/) == -1){
		z = "E";
	}
	else{
		for(i = 1; i <= valor.length; i++){
			let a = valor[valor.length - i];
			s += a*(8**(i-1));
		}
		z = s;
	}
	
	return z + "";
}

function DecBin(valor){
	let x;
	let s;

	if(valor == ""){
		s = "";
	}
	else if(valor == "E" || valor.search(/[0-9]/) == -1){
		s = "E";
	}
	else{
		x = parseInt(valor, 10);
		s = (x >>> 0).toString(2);
		if(s.length > 22){s = "E";}  //se o valor convertido tiver um tamanho que excede o limite de tela, ocorre um Erro
	}

	return s + "";
}

function HexBin(valor){
	let vet = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
	let s = "";

	if(valor == ""){
		s = "";
	}
	else if(valor == "E" || (valor.search(/[0-9]/) == -1 && valor.search(/[a-f]/) == -1)){
		s = "E";
	}
	else{
		for(let c of valor){  		 								  
			for(let v in vet){           //mesma lógica usada na conversão de octais para binários
				if(c == v && v < 10){              
					s += vet[v];  
				}
				else if(c == 'a' && v == 10){
					s += vet[v];
				}
				else if(c == 'b' && v == 11){
					s += vet[v];
				}
				else if(c == 'c' && v == 12){
					s += vet[v];
				}
				else if(c == 'd' && v == 13){
					s += vet[v];
				}
				else if(c == 'e' && v == 14){
					s += vet[v];
				}
				else if(c == 'f' && v == 15){
					s += vet[v];
				}
			}
		}
		s = parseInt(s);
	}

	return s + "";
}

/*function BinOct(valor){
	let vet = ["000","001","010","011","100","101","110","111"];
	let s;
	
	let valoresCorrespondentes = [];

	if(valor == ""){
		s = "";
	}
	else if(valor == "E" || valor.search(/[0-1]/) == -1){
		s = "E";
	}
	else{
		//adicionam-se os algarismos necessários para a conversão, caso seja preciso:
		if(valor.length % 3 == 2 || valor.length == 2){
			valor = valor.split('').reverse().join('') + "0";
			valor = valor.split('').reverse().join('');
		} 
		else if(valor.length % 3 == 1 || valor.length == 1){
			valor = valor.split('').reverse().join('') + "00";
			valor = valor.split('').reverse().join('');
		}

		for(let i = 0; i < valor.length; i = i + 3){  //separa o valor em strings de 3 algarismos
			valoresCorrespondentes.push(valor.slice(i, i + 3));  //OBS.: FORMA DE DIVIDIR ARRAY
		}

		for(let v of valoresCorrespondentes){
			for(let i in vet){
				if(vet[i] == v){
					s += i;
				}
			}
		}
	}

	return s;
}
*/
function DecOct(valor){
	let s;

	if(valor == ""){
		s = "";
	}
	else if(valor == "E" || valor.search(/[0-9]/) == -1){
		s = "E";
	}
	else{
		s = eval(valor).toString(8);
	}

	return s;
}

function DecHex(valor){
	let s;

	if(valor == ""){
		s = "";
	}
	else if(valor == "E" || valor.search(/[0-9]/) == -1){
		s = "E";
	}
	else{
		s = eval(valor).toString(16);
	}

	return s;
}

function HexDec(valor){
	let opHex = valor.split('').reverse();  //separar e inverter valor em HEX
	let s = 0;
	let l;
	let fator = 0;

	if(valor == ""){
		l = "";
	}
	else if(valor == "E" || (valor.search(/[0-9]/) == -1 && valor.search(/[a-f]/) == -1)) {
		l = "";
	}
	else{
		console.log(opHex);
		console.log(opHex.length);
		for(let i = opHex.length - 1; i >= 0; i--){
			console.log(i);
			console.log(opHex[i]);
			switch(opHex[i]){
				case "0": fator = 0; break;
				case "1": fator = 1; break;
				case "2": fator = 2; break;
				case "3": fator = 3; break;
				case "4": fator = 4; break;
				case "5": fator = 5; break;
				case "6": fator = 6; break;
				case "7": fator = 7; break;
				case "8": fator = 8; break;
				case "9": fator = 9; break;
				case "A": fator = 10; break;
				case "B": fator = 11; break;
				case "C": fator = 12; break;
				case "D": fator = 13; break;
				case "E": fator = 14; break;
				case "F": fator = 15; break;
			}
			s += fator * (16 ** i);
		}
		l = eval(s);
	}

	return l;
}
