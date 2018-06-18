import micropython
import time
import urequests
import ujson
import bme680
from i2c import I2CAdapter
from machine import Pin
from machine import Timer
import gc

micropython.alloc_emergency_exception_buf(100)
ONE_MINUTE_IN_MS = 60000
SERVER_URL="http://192.168.1.101:7788"
#SERVER_URL = "http://192.168.1.22:7788"

sensorData={"temp":0,"hum":0,"gas":0,"hpa":0}

i2c_dev = I2CAdapter(scl=Pin(19), sda=Pin(18), freq=100000)
sensor = bme680.BME680(i2c_device=i2c_dev, i2c_addr=bme680.I2C_ADDR_SECONDARY)
sensor.set_gas_heater_profile(320, 150)


def getDeltaMs(start=0):
    delta = time.ticks_diff(time.ticks_ms(), start)
    return delta


# sends sensor data to server
def sendToServer(path,data):
    headers = {'Content-Type': 'application/json'}
    url = SERVER_URL+path

    try:
        jdata = ujson.dumps(data)
        response = urequests.post(url, data=jdata, headers=headers)
        return response
    except Exception:
        print("Error occured while sending data to server")
    
    gc.collect()


# reads sensor data
def getSensorData():

    while True:
        if sensor.get_sensor_data() and sensor.data.heat_stable:
            sensorData["temp"] = round(sensor.data.temperature)
            sensorData["hum"] = round(sensor.data.humidity)
            # turn the VOC value into KOhms
            sensorData["gas"] = round(sensor.data.gas_resistance/1000)
            sensorData["hpa"] = round(sensor.data.pressure)
            break


# at the begining this work time is needed to stabilize sensor readings
print("Sensor stabilizing period is starting")
counter = 0
# runs around 20 minute
while counter < 1200:
    print(counter)
    getSensorData()
    counter += 1
    time.sleep(1)
print("Sensor stabilizing period has ended")


# Class to send Ambiance values to server
class Ambiance:
    def __init__(self):
        self.lastTime = 0
        self.response_time = ONE_MINUTE_IN_MS*30

    def measureTimePassed(self):
        delta = getDeltaMs(self.lastTime)
        result = delta >= self.response_time
        return result

    def send(self):
        path = "/api/devices/ambiance"
        sendToServer(path,sensorData)

    def run(self):
        if self.measureTimePassed():
            getSensorData()
            self.send()
            self.lastTime = time.ticks_ms()


class Gas:
    def __init__(self):
        self.data=[] # will hold last 80 readings
        self.avg=0 # avarage of first 40 readings in the array
        self.DATA_ARRAY_SIZE=80
    
    def checkLastReading(self):
        if len(self.data)!=self.DATA_ARRAY_SIZE:
            print("Array size {}".format(len(self.data)))
            return True
        
        pass
        
    def addLastReading(self):
        if len(self.data)!=self.DATA_ARRAY_SIZE:
            self.data.insert(0,int(sensorData["gas"]))
        else:
            self.data.pop()#delete last element
            self.data.insert(0,int(sensorData["gas"]))#add new element to first position
            self.avg=round(sum(self.data[-40:])/40)
            print("Avg {}".format(self.avg))
    
    def trigerAlarm(self):
        pass 
    def run(self):
        if self.checkLastReading():
            self.addLastReading()




amp = Ambiance()
#Run
while True:
    getSensorData()
    amp.run()
    time.sleep(2)
