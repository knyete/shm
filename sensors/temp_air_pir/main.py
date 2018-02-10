import time, micropython, dht
from machine import Timer
from machine import Pin


micropython.alloc_emergency_exception_buf(100)

dht22 = dht.DHT22(Pin(4))

class MeasureTemp():
    def __init__(self):
        self.measureRef=self.measure
        self.temp=0
        self.hum=0

        self.tim=Timer(-1)
        self.tim.init(period=6000, mode=Timer.PERIODIC, callback=self.cb)
    
    def measure(self,_):
        dht22.measure()
        self.temp=dht22.temperature()
        self.hum=dht22.humidity()
        print("sıcaklık: {} nem: {}".format(self.temp,self.hum))
        #print("kullanılan memory {}".format(gc.mem_alloc()))
    
    def cb(self,t):
        micropython.schedule(self.measureRef, 0)


measureTemp=MeasureTemp()
