from Operations import Operations
class LinearRegression:
    def __init__(self, x, y):
        self.calc = Operations(x, y)
        self.b0 = round(((self.calc.sum_y() * self.calc.sum_x_squared()) - (self.calc.sum_x() * self.calc.sum_x_times_sum_y())) / ((self.calc.get_n() * self.calc.sum_x_squared()) - self.calc.sum_x_times_sum_x()), 2)

        self.b1 = round(((self.calc.get_n() * self.calc.sum_x_times_sum_y()) - (self.calc.sum_x() * self.calc.sum_y())) / ((self.calc.get_n() * self.calc.sum_x_squared() - self.calc.sum_x_times_sum_x())), 2)

        self.correlation_coefficient = round(((self.calc.get_n() * self.calc.sum_x_times_sum_y()) - (self.calc.sum_x() * self.calc.sum_y())) / (((self.calc.get_n() * self.calc.sum_x_squared() - self.calc.sum_x_times_sum_x()) * (self.calc.get_n() * self.calc.sum_y_squared() - self.calc.sum_y_times_sum_y())) ** 0.5), 2)

        self.determination_coefficient = round(self.correlation_coefficient * self.correlation_coefficient, 2)

    def print_equation(self):
        print("Y = ", self.b0, "+", self.b1, "X")
        
    def predict(self, x):
        return round(self.b0 + self.b1 * x, 2)

    def get_correlation_coefficient(self):
        return self.correlation_coefficient
    
    def get_determination_coefficient(self):
        return self.determination_coefficient
