import numpy as np

class Operations:
    @staticmethod
    def euclidean_distance(x1, x2):
        # Convertir las listas a arrays de NumPy antes de realizar la resta
        x1 = np.array(x1)
        x2 = np.array(x2)
        return np.sqrt(np.sum((x1 - x2) ** 2))

