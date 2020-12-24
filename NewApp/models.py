from django.db import models

class Transaction(models.Model):
    hash=models.CharField('Хэш',max_length=64)
    Status=models.CharField('',max_length=15)
    time_accept=models.DateTimeField()
    inputs=[]
    outputs=[]
    comission=models.FloatField('Комиссия')
    block_number=models.IntegerField('Содержится в блоке')

class Adress(models.Model):
    adress=models.CharField('Адрес',max_length=64)
    transactions_number=models.IntegerField('Транзакции')
    accept=models.FloatField('Принято')
    send=models.FloatField('Отправлено')
    balance=models.FloatField('Баланс')





# Create your models here.
