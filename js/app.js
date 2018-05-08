var calculadora = {
	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	teclaIgual: false, // Para permitir ingreso consecutivo
	init: (function(){
		this.asignarEventoBotones(".tecla");
		this.asignarFuncionCalculadora();
	}),

//se asigna Eventos para los botones
	asignarEventoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.cambioReducirBoton;
			x[i].onmouseleave = this.cambioNormalBoton;
		};
	},
	cambioReducirBoton: function(event){
		calculadora.reduceBoton(event.target);
	},
	cambioNormalBoton: function(event){
		calculadora.normalBoton(event.target);
	},

//se le da el tamaño a los botones
	reduceBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
			elemento.style.width = "28.7%";
			elemento.style.height = "61px";
		}
    else if(x=="mas"){
			elemento.style.width = "89%";
			elemento.style.height = "98%";
		}
    else{
		elemento.style.width = "22%";
		elemento.style.height = "62px";
		}
	},
	normalBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		}
    else if(x=="mas"){
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		}
    else{
		elemento.style.width = "22.3%";
		elemento.style.height = "62.91px";
		}
	},

//Eventos para las funciónes de la calculadora
  asignarFuncionCalculadora: function(){
		document.getElementById("0").addEventListener("click", function(){
      calculadora.ingresoNumero("0");
    });
		document.getElementById("1").addEventListener("click", function(){
      calculadora.ingresoNumero("1");
    });
		document.getElementById("2").addEventListener("click", function(){
      calculadora.ingresoNumero("2");
    });
		document.getElementById("3").addEventListener("click", function(){
      calculadora.ingresoNumero("3");
    });
		document.getElementById("4").addEventListener("click", function(){
      calculadora.ingresoNumero("4");
    });
		document.getElementById("5").addEventListener("click", function(){
      calculadora.ingresoNumero("5");
    });
		document.getElementById("6").addEventListener("click", function(){
      calculadora.ingresoNumero("6");
    });
		document.getElementById("7").addEventListener("click", function(){
      calculadora.ingresoNumero("7");
    });
		document.getElementById("8").addEventListener("click", function(){
      calculadora.ingresoNumero("8");
    });
		document.getElementById("9").addEventListener("click", function(){
      calculadora.ingresoNumero("9");
    });
		document.getElementById("on").addEventListener("click", function(){
      calculadora.borrarPantalla();
    });
		document.getElementById("sign").addEventListener("click", function(){
      calculadora.cambioSigno();
    });
		document.getElementById("punto").addEventListener("click", function(){
      calculadora.ingresoDecimal();
    });
		document.getElementById("igual").addEventListener("click", function(){
      calculadora.visualizarResultado();
    });
		document.getElementById("raiz").addEventListener("click", function(){
      calculadora.ingresoOperacion("raiz");
    });
		document.getElementById("dividido").addEventListener("click", function(){
      calculadora.ingresoOperacion("/");
    });
		document.getElementById("por").addEventListener("click", function(){
      calculadora.ingresoOperacion("*");
    });
		document.getElementById("menos").addEventListener("click", function(){
      calculadora.ingresoOperacion("-");
    });
		document.getElementById("mas").addEventListener("click", function(){
      calculadora.ingresoOperacion("+");
    });
	},

	//Funciones de las teclas de la calculadora
	borrarPantalla: function(){
	  this.valorPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.carguePantalla();
	},
	cambioSigno: function(){
		if (this.valorPantalla !="0"){
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}
      else{
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.carguePantalla();
		}
	},
	ingresoDecimal: function(){
		if (this.valorPantalla.indexOf(".")== -1){
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.carguePantalla();
		}
	},
	ingresoNumero: function(valor){
		if (this.valorPantalla.length < 8){
			if (this.valorPantalla=="0"){
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			}
      else{
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.carguePantalla();
		}
	},
	ingresoOperacion: function(oper){
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.teclaIgual = false;
		this.carguePantalla();
	},
	visualizarResultado: function(){
		if(!this.teclaIgual){
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		}
    else{
		  this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
		this.primerValor = this.resultado;
		this.valorPantalla = "";
		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		}
    else{
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
		this.teclaIgual = true;
		this.carguePantalla();
	},
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	carguePantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	}
};
calculadora.init();
