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

    predictY(x) {
        const b0 = this.calculateB0();
        const b1 = this.calculateB1();
        const y = b0 + b1 * x;
        return parseFloat(y.toFixed(2));
    }

    main() {
        const x = 62;
        const prediction = this.predictY(x);
        console.log("Se hará la predicción para X =", x);
        console.log("Resultado: Y =", prediction);
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