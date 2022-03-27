export default interface Vnnative3TaniAnalyticsInterface {
    appToken:string;
    setAppToken(appToken:string) : Vnnative3TaniAnalyticsInterface
    subscribe(page: string,success : Function,error : Function) : void
}