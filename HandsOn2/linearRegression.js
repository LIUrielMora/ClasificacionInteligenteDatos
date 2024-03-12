class LinearRegression {
    constructor(data) {
        this.data = data;
        this.n = data.length;
        this.sumX = data.reduce((total, item) => total + item.advertising, 0);
        this.sumY = data.reduce((total, item) => total + item.sales, 0);
        this.sumXSumY = this.sumX * this.sumY;
        this.sumXSumX = this.sumX * this.sumX;
        this.sumXSquared = data.reduce((total, item) => total + Math.pow(item.advertising, 2), 0);
        this.sumXY = data.reduce((total, item) => total + (item.sales * item.advertising), 0);
        this.nSumXY = this.n * this.sumXY;
        this.nSumXYRestSumXSumY = this.nSumXY - this.sumXSumY;
        this.nSumXSquaredRestSumXSumX = this.n * this.sumXSquared - this.sumXSumX;
    }

    calculateB0() {
        const b1 = this.calculateB1();
        const b0 = (this.sumY - (b1 * this.sumX)) / this.n;
        return parseFloat(b0.toFixed(2));
    }

    calculateB1() {
        const b1 = this.nSumXYRestSumXSumY / this.nSumXSquaredRestSumXSumX;
        return parseFloat(b1.toFixed(2));
    }

    calculateCorrelationCoefficient() {
        const r = this.nSumXYRestSumXSumY / Math.sqrt(this.n * this.sumXSquared * this.nSumXSquaredRestSumXSumX);
        return parseFloat(r.toFixed(2));
    }

    calculateCoefficientOfDetermination() {
        const rSquared = Math.pow(this.calculateCorrelationCoefficient(), 2);
        return parseFloat(rSquared.toFixed(2));
    }

    predictY(x) {
        const b0 = this.calculateB0();
        const b1 = this.calculateB1();
        const y = b0 + b1 * x;
        console.log("Y = " + b0 + " + (" + b1 + ")" + x)
        return parseFloat(y.toFixed(2));
    }

    main() {
        console.log(" ---- Coeficiente de correlación -------");
        const correlationCoefficient =  this.calculateCorrelationCoefficient()
        console.log(correlationCoefficient);

        console.log(" ---- Coeficiente de determinación -------");
        const coefficientOfDetermination =  this.calculateCoefficientOfDetermination()
        console.log(coefficientOfDetermination);

        console.log("1) ---- Predicción -------");
        const x1 = 62;
        const prediction1 = this.predictY(x1);
        console.log("Se hará la predicción para X =", x1);
        console.log("Resultado: Y =", prediction1);

        console.log("2) ---- Predicción -------");
        const x2 = 70;
        const prediction2 = this.predictY(x2);
        console.log("Se hará la predicción para X =", x2);
        console.log("Resultado: Y =", prediction2);

        console.log("3) ---- Predicción -------");
        const x3 = 82;
        const prediction3 = this.predictY(x3);
        console.log("Se hará la predicción para X =", x3);
        console.log("Resultado: Y =", prediction3);

        console.log("4) ---- Predicción -------");
        const x4 = 95;
        const prediction4 = this.predictY(x4);
        console.log("Se hará la predicción para X =", x4);
        console.log("Resultado: Y =", prediction4);

        console.log("5) ---- Predicción -------");
        const x5 = 115;
        const prediction5 = this.predictY(x5);
        console.log("Se hará la predicción para X =", x5);
        console.log("Resultado: Y =", prediction5);
    }
}

const regression = new LinearRegression([
    { sales: 651.00, advertising: 23.00 },
    { sales: 762.00, advertising: 26.00 },
    { sales: 856.00, advertising: 30.00 },
    { sales: 1063.00, advertising: 34.00 },
    { sales: 1190.00, advertising: 43.00 },
    { sales: 1298.00, advertising: 48.00 },
    { sales: 1421.00, advertising: 52.00 },
    { sales: 1440.00, advertising: 57.00 },
    { sales: 1518.00, advertising: 58.00 }
]);

regression.main();