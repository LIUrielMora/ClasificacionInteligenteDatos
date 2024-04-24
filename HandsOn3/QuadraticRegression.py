from Operations import Operations
import numpy as np

class QuadraticRegression:
    def __init__(self, x, y):
        calc = Operations(x, y)
        self.matrix_A = np.array([[calc.sum_x_squared(), calc.sum_x(), calc.get_n()],
                                  [calc.sum_x_cubed(), calc.sum_x_squared(), calc.sum_x()],
                                  [calc.sum_x_to_the_fourth(), calc.sum_x_cubed(), calc.sum_x_squared()]]) # Two matrices must be generated for cross product

        self.matrix_B = np.array([calc.sum_y(), calc.sum_x_times_sum_y(), calc.sum_x_squared_times_sum_y()])
        self.result = np.dot(np.linalg.inv(self.matrix_A), self.matrix_B)
        
        self.a = round(self.result[0], 6)
        self.b = round(self.result[1], 6)
        self.c = round(self.result[2], 6)

        sum_of_predicted_y_minus_mean_squared = 0
        sum_of_y_minus_mean_squared = 0
        for iterator in range(calc.get_n()):
            sum_of_predicted_y_minus_mean_squared += (self.predict(x[iterator]) - calc.average_y()) * (self.predict(x[iterator]) - calc.average_y())
            sum_of_y_minus_mean_squared += (y[iterator] - calc.average_y()) * (y[iterator] - calc.average_y()) 
        
        self.determination_coefficient = round(sum_of_predicted_y_minus_mean_squared / sum_of_y_minus_mean_squared, 4)
        self.correlation_coefficient = round(((calc.get_n() * calc.sum_x_times_sum_y()) - (calc.sum_x() * calc.sum_y())) / (((calc.get_n() * calc.sum_x_squared() - calc.sum_x_times_sum_x()) * (calc.get_n() * calc.sum_y_squared() - calc.sum_y_times_sum_y())) ** 0.5), 2)

    def print_equation(self):
        print("Y = ", self.a, "X squared + ", self.b, "x + ", self.c)

    def predict(self, x):
        return round(self.a * x * x + self.b * x + self.c, 4)

    def get_correlation_coefficient(self):
        return self.correlation_coefficient

    def get_determination_coefficient(self):
        return self.determination_coefficient