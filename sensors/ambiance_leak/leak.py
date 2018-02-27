from machine import Pin
from machine import Timer
import time, micropython
micropython.alloc_emergency_exception_buf(100)


def getDeltaMs(start=0):
    delta = time.ticks_diff(time.ticks_ms(), start)
    return delta

class Leak:
    def __init__(self):
        self.leakActionRef=self.leakAction
        self.pin=Pin(5,Pin.IN)#D01 on the boart
        self.timeOutTimer=Timer(-1)

        #self.startMs=0
        #self.RESPONSE_RANGE=5000
    
    def leakAction(self,_):
        #delta = getDeltaMs(self.startMs)
        #self.startMs=time.ticks_ms()
        if not self.pin.value():
            print("leak leak")
        
    def sense(self):
        #self.timeOutTimer.deinit()
        self.timeOutTimer.init(period=3000, mode=Timer.PERIODIC, callback=self.cb)


    def cb(self,t):
        micropython.schedule(self.leakActionRef, 0)



leak=Leak()
leak.sense()
