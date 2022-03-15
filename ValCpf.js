class ValidaCPF{
	constructor(cpfEnviado){
		Object.defineProperty(this, "cpfLimpo",{
			writable:false,
			enumerable:true,
			configurable:false,
			value: cpfEnviado.replace(/\D+/g,"")
		});
	}
	sequencia() {
		return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
	}

	geraNovoCpf() {
		const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
		const digitoUm = ValidaCPF.geraDigito(cpfSemDigitos);
		const digitoDois= ValidaCPF.geraDigito(cpfSemDigitos + digitoUm);
		this.novoCpf = cpfSemDigitos + digitoUm + digitoDois;
	}

	static geraDigito(cpfSemDigitos){
		let total = 0;
		let reverso = cpfSemDigitos.length + 1;
		for(let stringNumero of cpfSemDigitos){
			total += reverso * Number(stringNumero)
			reverso--;
		}

		const digito = 11 - (total % 11)
		return digito <= 9 ? String(digito) : "0";
	}

	valida() {
		if(!this.cpfLimpo) return false;
		if(typeof this.cpfLimpo !== "string") return false;
		if(this.cpfLimpo.length !== 11) return false;
		if(this.sequencia()) return false;
		this.geraNovoCpf()

				return this.novoCpf === this.cpfLimpo;
	}
}

const cpf1 = new ValidaCPF("070.987.720-03")

if (cpf1.valida()) {
	console.log("CPF Válido")
} else {
	console.log("CPF Inválido")
}