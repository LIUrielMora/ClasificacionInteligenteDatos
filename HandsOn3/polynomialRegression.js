const dataSet = [
    { batchSize: 108, machineEfficiency: 95 },
    { batchSize: 115, machineEfficiency: 96 },
    { batchSize: 106, machineEfficiency: 95 },
    { batchSize: 97, machineEfficiency: 97 },
    { batchSize: 95, machineEfficiency: 93 },
    { batchSize: 91, machineEfficiency: 94 },
    { batchSize: 97, machineEfficiency: 95 },
    { batchSize: 83, machineEfficiency: 93 },
    { batchSize: 83, machineEfficiency: 92 },
    { batchSize: 78, machineEfficiency: 86 },
    { batchSize: 54, machineEfficiency: 73 },
    { batchSize: 67, machineEfficiency: 80 },
    { batchSize: 56, machineEfficiency: 65 },
    { batchSize: 53, machineEfficiency: 69 },
    { batchSize: 61, machineEfficiency: 77 },
    { batchSize: 115, machineEfficiency: 96 },
    { batchSize: 81, machineEfficiency: 87 },
    { batchSize: 78, machineEfficiency: 89 },
    { batchSize: 30, machineEfficiency: 60 },
    { batchSize: 45, machineEfficiency: 63 },
    { batchSize: 99, machineEfficiency: 95 },
    { batchSize: 32, machineEfficiency: 61 },
    { batchSize: 25, machineEfficiency: 55 },
    { batchSize: 28, machineEfficiency: 56 },
    { batchSize: 90, machineEfficiency: 94 },
    { batchSize: 89, machineEfficiency: 93 }
]

class RegresionPolinomial {
    constructor(dataSet) {
        this.dataSet = dataSet;
        this.beta = {}; // Objeto para almacenar los coeficientes
    }

    calcularCoeficientes() {
        const n = this.dataSet.length;

        // Cálculo de los coeficientes para la regresión lineal (grado 1)
        this.beta.lineal = this.calcularCoeficientesPolinomiales(1);

        // Cálculo de los coeficientes para la regresión cuadrática (grado 2)
        this.beta.cuadratica = this.calcularCoeficientesPolinomiales(2);

        // Cálculo de los coeficientes para la regresión cúbica (grado 3)
        this.beta.cubica = this.calcularCoeficientesPolinomiales(3);
    }

    calcularCoeficientesPolinomiales(grado) {
        const n = this.dataSet.length; // Agrega esta línea para definir 'n'

        const sumX = this.dataSet.reduce((sum, data) => sum + data.batchSize ** grado, 0);
        const sumY = this.dataSet.reduce((sum, data) => sum + data.machineEfficiency, 0);
        const sumXY = this.dataSet.reduce((sum, data) => sum + data.machineEfficiency ** grado * data.batchSize, 0);
        const sumX2 = this.dataSet.reduce((sum, data) => sum + data.batchSize ** (2 * grado), 0);

        const beta_1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
        const beta_0 = (sumY - beta_1 * sumX) / n;

        return { beta_0, beta_1 };
    }


    imprimirEcuacion(grado, nombreVariable) {
        const coeficientes = this.beta[grado];
        console.log(`Ecuación de Regresión ${grado} para ${nombreVariable}:`);
        console.log(`${nombreVariable} = ${coeficientes.beta_0.toFixed(2)} + ${coeficientes.beta_1.toFixed(2)} * ${nombreVariable}^${grado}`);
        console.log();
    }

    hacerPredicciones() {
        console.log("Predicciones:");
        for (const data of this.dataSet) {
            const predLineal = this.predecirValor(data.machineEfficiency, this.beta.lineal);
            const predCuadratica = this.predecirValor(data.machineEfficiency, this.beta.cuadratica);
            const predCubica = this.predecirValor(data.machineEfficiency, this.beta.cubica);

            console.log(`Para machineEfficiency=${data.machineEfficiency}:`);
            console.log(`  Lineal: ${predLineal.toFixed(2)}`);
            console.log(`  Cuadrática: ${predCuadratica.toFixed(2)}`);
            console.log(`  Cúbica: ${predCubica.toFixed(2)}`);
            console.log();
        }
    }

    predecirValor(x, coeficientes) {
        return coeficientes?.beta_0 + coeficientes?.beta_1 * x;
    }

    calcularCoeficientesCorrelacion() {
        console.log("Coeficientes de Correlación:");
        for (const grado in this.beta) {
            const r = this.calcularCoeficienteCorrelacion(grado);
            console.log(`Para la regresión ${grado}: ${r.toFixed(2)}`);
        }
    }

    calcularCoeficienteCorrelacion(grado) {
        const n = this.dataSet.length;
        const sumXY = this.dataSet.reduce((sum, data) => {
            const x = data.machineEfficiency ** grado;
            const y = data.batchSize;
            return isNaN(x) || isNaN(y) ? sum : sum + x * y;
        }, 0);
    
        const sumX = this.dataSet.reduce((sum, data) => {
            const x = data.batchSize ** grado;
            return isNaN(x) ? sum : sum + x;
        }, 0);
    
        const sumY = this.dataSet.reduce((sum, data) => {
            const y = data.machineEfficiency;
            return isNaN(y) ? sum : sum + y;
        }, 0);
    
        const sumX2 = this.dataSet.reduce((sum, data) => {
            const x = data.batchSize ** (2 * grado);
            return isNaN(x) ? sum : sum + x;
        }, 0);
    
        const sumY2 = this.dataSet.reduce((sum, data) => {
            const y = data.machineEfficiency ** 2;
            return isNaN(y) ? sum : sum + y;
        }, 0);
    
        // Verificar si la desviación estándar no es cero
        const stdX = Math.sqrt((n * sumX2 - sumX ** 2) / n);
        const stdY = Math.sqrt((n * sumY2 - sumY ** 2) / n);
    
        if (stdX === 0 || stdY === 0) {
            return 0; // o cualquier otro valor que consideres apropiado cuando la desviación estándar es cero
        }
    
        const numerador = n * sumXY - sumX * sumY;
        const denominador1 = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
    
        return numerador / denominador1;
    }

    calcularCoeficienteDeterminacion() {
        console.log("Coeficientes de Determinación:");
        for (const grado in this.beta) {
            const coeficientes = this.beta[grado];
            const r2 = this.calcularCoeficienteDeterminacion(coeficientes, grado);
            console.log(`Para la regresión ${grado}: ${r2.toFixed(2)}`);
        }
    }

    calcularCoeficienteDeterminacion(coeficientes, grado) {
        const n = this.dataSet.length;
        const sumY = this.dataSet.reduce((sum, data) => sum + data.batchSize, 0);
        const yPromedio = sumY / n;

        const sumResiduos = this.dataSet.reduce((sum, data) => {
            const predicciones = this.predecirValor(data.machineEfficiency, coeficientes);
            return sum + (data.batchSize - predicciones) ** 2;
        }, 0);

        const sumTotal = this.dataSet.reduce((sum, data) => sum + (data.batchSize - yPromedio) ** 2, 0);

        return 1 - sumResiduos / sumTotal;
    }
}

const regresionPolinomial = new RegresionPolinomial(dataSet);
regresionPolinomial.calcularCoeficientes();
regresionPolinomial.imprimirEcuacion('lineal', 'batchSize');
regresionPolinomial.imprimirEcuacion('cuadratica', 'batchSize');
regresionPolinomial.imprimirEcuacion('cubica', 'batchSize');
regresionPolinomial.hacerPredicciones();
regresionPolinomial.calcularCoeficientesCorrelacion();
regresionPolinomial.calcularCoeficienteDeterminacion();