import pandas as pd
from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest
from urllib import request
import django.http as http
import requests as req
import json
from django.http import JsonResponse
import django.http.response as response

# // var TransactionsAdress=[{
# //     "hash":"Somehash",
# //     "Time":"2020-11-11 17:03",
# //     "Inputs":[
# //         {"Adress":"Someadress","BTC":12312},
# //         {"Adress":"Someadress","BTC":123312312},
# //     ],
# //     "Outputs":[
# //         {"Adress":"Someadress","BTC":123312312},
        
        
# // ]
# // },{
# //     "hash":"Somehash",
# //     "Time":"2020-11-11 17:03",
# //     "Inputs":[
# //         {"Adress":"Someadress","BTC":12312},
# //         {"Adress":"Someadress","BTC":123312312},
# //         {"Adress":"Someadress","BTC":123312312},
# //         {"Adress":"Someadress","BTC":123312312},
# //     ],
# //     "Outputs":[
# //         {"Adress":"Someadress","BTC":123312312},
        
        
# // ]
# // },
# // ]

# // var AdressInfo=[{
# //     "Adress":"asdasd","Transaction":100,"AcceptBTC":100,"SendBTC":100,"Balance":0
# // }]
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import os

def unix_time_convert(timestamp):
    import datetime
    value = datetime.datetime.fromtimestamp(timestamp)
    return (value.strftime('%Y-%m-%d %H:%M:%S'))

def Transaction(request):
    def IOAddresses(tx):
        Input=[]
        Output=[]
        for i in tx['inputs']:
            if('prev_out' in i):
                if('addr' in i['prev_out']):
                    Input.append(
                        {'InputAddr':i['prev_out']['addr'],'InputBTC':i['prev_out']['value']/100000000}

                    )
        for i in tx['out']:
            if('addr' in i):
                Output.append(
                    {'OutputAddr':i['addr'],'OutputBTC':i['value']/100000000}
                )
        
        return Input,Output



    requestAddress=req.get("https://blockchain.info/rawtx/"+request.build_absolute_uri()[34:])
    if(requestAddress.status_code==500):
        return JsonResponse([{"Message":"Adress Not Found","Code":500,"Adress":[],"Transactions":[]}],safe=False)
    data=json.loads(requestAddress.text)
    I,O=IOAddresses(data)
    print(I,O)
    if('block_height' in data):
        TxInfo=[{
            'Hash':data['hash'],'Status':'Подтверждена','ContBlock':data['block_height'],
            'Time':unix_time_convert(data['time']),'Size':data['size'],'Weight':data['weight'],
            'Inputs':data['vin_sz'],'Out':data['vout_sz'],'Comission':'Вычислить',
        }]
    else:
        TxInfo=[{
            'Hash':data['hash'],'Status':'Не подтверждена','ContBlock':'Мемпул',
            'Time':unix_time_convert(data['time']),'Size':data['size'],'Weight':data['weight'],
            'Inputs':data['vin_sz'],'Out':data['vout_sz'],'Comission':'Вычислить',
        }]
    print("Here3")
    return JsonResponse([{'Code':200,'InputAddrList':I,'OutputAddrList':O,'TxInfo':TxInfo}],safe=False)

@csrf_exempt
def Address(request):
    def TransactionsIOList(txs):
        Rezult=[]
        for i in txs:
            Inputs=[]
            Outputs=[]
            
            for j in i['inputs']:
                if('prev_out' in j):
                    if('addr' in j['prev_out']):
                        Inputs.append({
                            "Address":j['prev_out']['addr'],
                            "BTC":j['prev_out']['value']/100000000
                        })
            for j in i['out']:
                if('addr' in j):
                    Outputs.append({
                        "Address":j['addr'],
                        "BTC":j['value']/100000000
                    })
            Rezult.append({
                'hash':i['hash'],
                'Time':unix_time_convert(i['time']),
                'Inputs':Inputs,
                'Outputs':Outputs,
            })
        return Rezult
        
    requestAddress=req.get("https://blockchain.info/rawaddr/"+request.build_absolute_uri()[30:])

    if(requestAddress.status_code==500):
        return JsonResponse([{"Message":"Adress Not Found","Code":500,"Adress":[],"Transactions":[]}],safe=False)
    data=json.loads(requestAddress.text)
    TxsAdress=TransactionsIOList(data['txs'])
    
    return JsonResponse([{"AdressInfo":[{"Adress":data['address'],"Transaction":data['n_tx'],"AcceptBTC":data['total_received']/100000000,"SendBTC":data['total_sent']/100000000,"Balance":data['final_balance']/100000000}] ,"Code":200,"Transactions":TxsAdress}],safe=False)
# Create your views here.
#
# def Adress(request):
#     return HttpResponse("<h1>it's lolo</h1>")

# def Transactions(){
#
# }

def Blocks(request):
    def TransactionsList(txs):
        Rezult = []
        for i in txs:
            Inputs = []
            Outputs = []

            for j in i['inputs']:
                if ('prev_out' in j):
                    if ('addr' in j['prev_out']):
                        Inputs.append({
                            "Address": j['prev_out']['addr'],

                        })
            for j in i['out']:
                if ('addr' in j):
                    Outputs.append({
                        "Address": j['addr'],

                    })
            Rezult.append({
                'hash': i['hash'],
                'Time': unix_time_convert(i['time']),
                'Inputs': Inputs,
                'Outputs': Outputs,
            })
        return Rezult

    print("https://blockchain.info/rawblock/" + request.build_absolute_uri()[29:])
    requestAddress = req.get("https://blockchain.info/rawblock/" + request.build_absolute_uri()[29:])

    if (requestAddress.status_code == 500):
        return JsonResponse([{"Message": "Block Not Found", "Code": 500, "Block": [], "Transactions": []}],
                            safe=False)
    data = json.loads(requestAddress.text)
    TxsAdress = TransactionsList(data['tx'])

    return JsonResponse([{"Block": [
        {"hash": data['hash'],'time':unix_time_convert(data['time']), "quantTx": data['n_tx'], "fee": data['fee'] / 100000000,
         "height": data['height'],"bits": data['bits'], "size": data['size']}], "Code": 200,
                          "TransactionsBlock": TxsAdress}], safe=False)


def Transactions(request):
    return 0

def unix_time_convert_list(list):
    for i in list['values']:
        i['x']=unix_time_convert(i['x'])[0:10]
    return list
def main(request):
    stats=json.loads(req.get("https://api.blockchain.info/stats").text)
    mempool=json.loads(req.get("https://api.blockchain.info/charts/mempool-size?timespan=90minutes&rollingAverage=1minutes&format=json").text)
    stats['mempool_size']=mempool['values'][len(mempool['values'])-1]['y']
    price_chart=unix_time_convert_list(json.loads(req.get("https://api.blockchain.info/charts/market-price?timespan=1years&rollingAverage=1minutes&format=json").text))
    avg_confirmed_tx=unix_time_convert_list(json.loads(req.get("https://api.blockchain.info/charts/mempool-count?timespan=1years&rollingAverage=1minutes&format=json").text))
    n_transactions=unix_time_convert_list(json.loads(req.get("https://api.blockchain.info/charts/n-transactions?timespan=1years&rollingAverage=1minutes&format=json").text))

    Output=[{
        'stats':stats,
        'avg_confirmed_tx':avg_confirmed_tx,
        'n_transactions':n_transactions,
        'price_chart':price_chart
    }]
    return JsonResponse(Output,safe=False)

def write_csv(data, name_file,startdate,enddate):#запись в файл
    if(os.path.exists('C:/Users/Айбулат/Desktop/Курсовой проект/BackEnd/VirtualEnv/FrontEnd/frontend/public/'+name_file+startdate+"_"+enddate+".csv")):
        os.remove()
    Data=pd.DataFrame.from_dict(data)
    Data.to_csv('C:/Users/Айбулат/Desktop/Курсовой проект/BackEnd/VirtualEnv/FrontEnd/frontend/public/'+name_file+startdate+"_"+enddate+".csv",index=False)
def write_csv_address(data,name_file):
    if(os.path.exists('C:/Users/Айбулат/Desktop/Курсовой проект/BackEnd/VirtualEnv/FrontEnd/frontend/public/' + name_file+".csv")):
        os.remove('C:/Users/Айбулат/Desktop/Курсовой проект/BackEnd/VirtualEnv/FrontEnd/frontend/public/' + name_file+".csv")
    Data = pd.DataFrame.from_dict(data)
    Data.to_csv('C:/Users/Айбулат/Desktop/Курсовой проект/BackEnd/VirtualEnv/FrontEnd/frontend/public/' + name_file+".csv",index=False)
def txparsing(startDate,endDate,txlist):
    out=[]
    for i in txlist['values']:
        value=i['x']
        if(unix_time_convert(i['x'])[0:10]>=startDate):
            i['x'] = unix_time_convert(i['x'])[0:10]
            out.append({'Date': i['x'], 'n_tx': i['y']})
        if(unix_time_convert(value)[0:10]>=endDate):
            break

    return out

def UnloadingTx(request):

    sendtofunc=request.build_absolute_uri().split('/')[4:6]
    print(sendtofunc)
    print("Here")
    nameoffile=request.build_absolute_uri().split('/')[6]
    data=json.loads(req.get("https://api.blockchain.info/charts/n-transactions?timespan=15years&rollingAverage=1days&format=json").text)
    out= txparsing(sendtofunc[0], sendtofunc[1], data)
    write_csv(out, nameoffile, sendtofunc[0], sendtofunc[1])
    return JsonResponse([{"CODE":200,"message":'Okay'}],safe=False)
def index(request):

    return HttpResponse("asd")
@csrf_exempt
def UnloadingTxAddress(request):
    sendtofunc=request.build_absolute_uri().split('/')[4]
    print(sendtofunc)
    data=json.loads(req.get("https://blockchain.info/rawaddr/"+sendtofunc).text)['txs']
    def parser(txlist):
        out=[]
        for i in txlist:
            i['time']=unix_time_convert(i['time'])
            i['result']=i['result']/100000000
            out.append({'hash':i['hash'],'time':i['time'],'result':i['result'],'size':i['size']})
        return out
    write_csv_address(parser(data),sendtofunc)
    return JsonResponse([{"CODE": 200, "message": 'Okay'}], safe=False)