import numpy as np

from collections import Counter
from Operations import Operations
from Data import Data


class KNN:
    def __init__(self, k=3):
        self.k = k
        self.data = None

    def fit(self, X, y):
        self.data = Data((X, y))

    def predict(self, X):
        X_train, y_train = self.data.get_data()
        y_pred = [self._predict(x, X_train, y_train) for x in X]
        return y_pred

    def _predict(self, x, X_train, y_train):
        # Convertir las listas a arrays de NumPy
        x = np.array(x)
        X_train = np.array(X_train)
        
        # Calcular la distancia euclidiana
        distances = [Operations.euclidean_distance(x, x_train) for x_train in X_train]
        k_indices = np.argsort(distances)[:self.k]
        k_nearest_labels = [y_train[i] for i in k_indices]
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]