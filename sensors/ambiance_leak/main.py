import time, micropython, dht, urequests,ujson
from machine import Timer
from machine import Pin
micropython.alloc_emergency_exception_buf(100)

dht22 = dht.DHT22(Pin(4))
pir=Pin(5,Pin.IN)
ONE_MINUTE=60000

SERVER_URL="http://192.168.1.101:7788/"

#sends sensor data to server
def sendToServer(path,data):
    headers = {'Content-Type': 'application/json'} 
    url=SERVER_URL+path

    try:
        response = urequests.post(url,data=data, headers=headers)
        return response
    except Exception:
        print("Error occured while sending data to server")


# class for Ambiance measurements
class Ambiance:
    def __init__(self):
        self.measureRef=self.measure
        self.temp=0
        self.hum=0

        self.tim=Timer(-1)
        self.tim.init(period=ONE_MINUTE, mode=Timer.PERIODIC, callback=self.cb)
    
    def measure(self,_):
        path="api/devices/ambiance"
        data={}

        dht22.measure()
        self.temp=dht22.temperature()
        self.hum=dht22.humidity()
        data["temp"]=self.temp
        data["hum"]=self.hum
        data["pre"]=0
        data["air"]=0
        sendToServer(path,ujson.dumps(data))
        #print("sıcaklık: {} nem: {}".format(self.temp,self.hum))
        #print("kullanılan memory {}".format(gc.mem_alloc()))

    
    def cb(self,t):
        micropython.schedule(self.measureRef, 0)

#class for pir sensor



ambiance=Ambiance()
