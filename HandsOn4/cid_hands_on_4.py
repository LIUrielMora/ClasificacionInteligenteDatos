# -*- coding: utf-8 -*-
"""CID Hands On 4.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1lBYYvgO-AlFb1vXA1DyH92Vu5WI537Jw
"""

# imports
import numpy as np

from Data import Data
from Operations import Operations
from KNN import KNN

# Datos de entrenamiento: [peso, textura] (0: suave, 1: rugosa)
X_train = np.array([[150, 1], [170, 1], [140, 0], [130, 0]])
# Etiquetas de entrenamiento: 0 para 'manzana', 1 para 'naranja'
y_train = np.array([0, 0, 1, 1])

# Punto a clasificar: [peso, textura]
X_test = np.array([[110, 1]])

# Crear y entrenar el clasificador
knn = KNN(k=3)
knn.fit(X_train, y_train)

# Realizar la predicción
prediction = knn.predict(X_test)

print(f"La predicción es: {prediction[0]}.")

!ls