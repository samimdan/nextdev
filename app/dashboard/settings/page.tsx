
import {auth} from '@/auth'
import { redirect } from 'next/navigation'
import SettingsCard from './settings-card'
export default async function Setting(){
    const session =await auth()
    if(!session){
        redirect('/')
    }
    if(session){
        return <SettingsCard session={session} />
        

    }
    return <div></div>
}