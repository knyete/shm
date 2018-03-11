
const {spawn}=require("child_process");
const {sleep,promisedExec}=require("../../utils/utils");
const Path=require("path");


class Alarm{

    constructor(){
        this.active=false;
    }


    async fire(){

        // if alarm has already been acticated do nothing
        if(this.active){
            return;
        }

        this.active=true;

        await promisedExec("echo on 0 | cec-client -s -d 1");

        sleep(15000);

        let path=Path.join(process.env.HOME,"Music","alarm.mp3");


        let child = spawn(`omxplayer -o hdmi ${path}`, {
            shell: true
          });

        child.on("exit",(code,signal)=>{
            this.active=false;
            console.log(this.active);
            child=null;
        });

        return true;

    }
}


module.exports=new Alarm();