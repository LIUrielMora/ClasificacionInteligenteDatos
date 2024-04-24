class Operations:
    def __init__(self, x_values, y_values):
        self.array_x = x_values
        self.array_y = y_values
        self.n = len(x_values)
    
    def sum_x(self):
        total = 0
        for value in self.array_x:
            total += value
        return total

    def sum_y(self):
        total = 0
        for value in self.array_y:
            total += value
        return total

    def sum_x_squared(self):
        total = 0
        for value in self.array_x:
            total += value * value
        return total
    
    def sum_y_squared(self):
        total = 0
        for value in self.array_y:
            total += value *  value
        return total
    
    def sum_x_cubed(self):
        total = 0
        for value in self.array_x:
            total += value * value * value
        return total  
    
    def sum_x_to_the_fourth(self):
        total = 0
        for value in self.array_x:
            total += value * value * value * value
        return total
    
    def sum_x_to_the_fifth(self):
        total = 0
        for value in self.array_x:
            total += value * value * value * value * value	
        return total
    
    def sum_x_to_the_sixth(self):
        total = 0
        for value in self.array_x:
            total += value * value * value * value * value * value	
        return total
    
    
    def sum_x_times_sum_x(self):
        return  self.sum_x() * self.sum_x()
    
    def sum_y_times_sum_y(self):
        return  self.sum_y() * self.sum_y()
    
    def sum_x_times_sum_y(self):
        total = 0
        for iterator in range(self.n):
            total += self.array_x[iterator] * self.array_y[iterator]
        return total
    
    def sum_x_squared_times_sum_y(self):
        total = 0
        for iterator in range(self.n):
            total += self.array_x[iterator] * self.array_x[iterator] * self.array_y[iterator]
        return total
    
    def sum_x_cubed_times_sum_y(self):
        total = 0
        for iterator in range(self.n):
            total += self.array_x[iterator] * self.array_x[iterator] * self.array_x[iterator] * self.array_y[iterator]
        return total
    
    def average_y(self):
        total = self.sum_y() / self.n
        return total

    def get_n(self):
        return self.n