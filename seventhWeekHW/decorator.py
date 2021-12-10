def my_awesome_decorator(func):
    def wrapper(*args, **kwargs):
        #Gelen değerleri 1 arttırıp döndürdüğüğü boolean değerini tersine çeviriyoruz.
        return not func(*[i+1 for i in args])
    return wrapper

@my_awesome_decorator
def mod_batch(*numbers):
    result = all([True if n % 3 == 0 else False for n in numbers])
    return result


print(mod_batch(3, 5, 7))