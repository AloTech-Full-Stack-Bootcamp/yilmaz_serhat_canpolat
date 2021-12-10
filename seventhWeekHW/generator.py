import random
import math

def random_number_generator(n, l=6):
    for i in range(n):
        #l basamaklı n adet uniq sayı üretiliyor.
        yield int(random.random() * int("1" + (l * "0")))

print(set(random_number_generator(5, 10)))
