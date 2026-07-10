import app from "./app";
import config from "./config/config";


async function main(){
    try {
        app.listen(config.port,()=>{
            console.log(`🚀 GearUp Backend is listening on port ${config.port}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
    } 
    
}
main();