export interface IElectronAPI
{

}

declare global
{
    interface Window
    {
        myAPI: IElectronAPI;
    }
}
