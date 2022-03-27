import Vnnative3TaniAnalyticsInterface from "./Vnnative3TaniAnalytics.ts.interface";
import VnNativeOsindex from "vnnative-3-os/dist/index";
export default class Vnnative3TaniAnalytics implements Vnnative3TaniAnalyticsInterface {
    appToken:string = "";
    setAppToken(appToken:string): Vnnative3TaniAnalyticsInterface {
        this.appToken = appToken;
        return this;
    }
    private getOS(): string {
        let os : string = (new VnNativeOsindex).isOs();
        if(os === "browser") {
            os = "web";
        }
        let platforms : any = window;
        if(platforms.vnnativeos) {
            if(platforms.vnnativeos.getOsName()) {
                os = platforms.vnnativeos.getOsName();
            }
        }
        return os;
    }
    subscribe(page: string,success : Function,error : Function): void {
        fetch("http://13.212.176.239:8002/api/analytics",{
            method:"POST",
            headers:{
                "Authorization":"Bearer " + this.appToken,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                page: page,
                os:this.getOS() 
            })
        }).then((resp) => resp.json()).then((resp : {
            code : number,
            message:string
        }) => {
            if(resp.code && resp.code == 200) {
                return success(resp)
            } else {
                return error(resp);
            }
        })
    }
}