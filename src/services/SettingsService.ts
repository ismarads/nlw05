import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { Setting } from '../entities/Setting';
import {SettingsRepository} from "../repositories/SettingsRepository"


interface ISettingsCreate{
    chat: boolean
    username:string

}





class SettingSrvice{
    private settingsRepository : Repository<Setting>

    constructor (){
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({chat, username} : ISettingsCreate){
       
        
        const userAlreadyExixts = await this.settingsRepository.findOne({
            username
        })

        const settings = this.settingsRepository.create({
            chat,
            username
        })
        if(userAlreadyExixts){
            throw new Error("This user already")
        }
    
        await this.settingsRepository.save(settings)

        return settings
    }

    async findByUsername(username: string){
        const settings = await this.settingsRepository.findOne({
            username
        })
        return settings
    }

    async update (username: string, chat: boolean){
    await this.settingsRepository
        .createQueryBuilder()
        .update(Setting)
        .set({chat})
        .where("username =  :username",{
            username
        })
        .execute()
    }
}

export {SettingSrvice}