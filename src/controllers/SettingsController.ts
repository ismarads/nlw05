import{Request, response, Response} from "express"
import { SettingSrvice } from "../services/SettingsService"

class SettingsController{
    async create (req: Request, res: Response){
        const { chat, username } = req.body
        
        const settingsService = new SettingSrvice();
        try{
            const settings = await settingsService.create({chat, username})
    
        return res.json(settings)
        }catch(err){
            return res.status(400).json({
                message: err.message
            })
        }
        
    }

}

export{SettingsController}