"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { useEffect, useState } from "react"

/* ---------------------- shadcn drop down menu and switch import ---------------------- */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { LogOut } from "lucide-react";
/* -------------------------- end of shadcn import -------------------------- */
/* ---------------- import next theme for light and dark mode --------------- */
import { useTheme } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation";
/* ---------------------------- end of next theme --------------------------- */
/* -------------------------- import avatar shadcn -------------------------- */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { createContext } from "vm";

/* ------------------------------ end of avatar ----------------------------- */

export const UserButton = ({ user }: Session) => {
  //info user from session has user with include user name, user email and user image
  //info get theme and setTheme from next theme
  //info get theme and set as global state with contextzzz
  const {setTheme,theme} =useTheme();
  //info use checked to check if theme is dark or light
  const[checked,setChecked]=useState(false);//default is light
  //info  use router for go differnet page that in our menu
  const router = useRouter();

  //info switch theme calling function
  function setswitchState(){
    switch (theme){
      case 'dark' :
        return setChecked(true)
      case 'light':
        return setChecked(false)
      case 'system':
        return setChecked(false)
    }}
   
   
    useEffect(()=>{
      setswitchState();
    },[]);
  //info check if user exist
  if(user)  
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
    
        <Avatar className='w-7 h-7' >
          //info if user image exist show user image else show user name
          {user.image && user.name && (
          <Image src={user.image} alt={user.name} fill={true}  />
          ) }
          {!user.image && user.name &&(
            <div className="font-bold">
              //info if user dosent have image show first letter of username
              <AvatarFallback>{user.name[0].charAt(0).toUpperCase()}</AvatarFallback>
            </div>)}
        </Avatar>
        { /* --------------------------- End of Avatar Section --------------------------- */ }
      </DropdownMenuTrigger>
      {/* //info trigger the drop down menu */}
        <DropdownMenuContent className='w-64 p-6 ' align='end'>
            { /* ------------------------------- Top Section ------------------------------ */}
              <div className="flex flex-col items-center gap-1 rounded-lg bg-primary/25 p-2 mb-1">
                {user.image && user.name && (
                  <Image className='rounded-full mb-1' src={user.image} alt={user.name} width={36} height={36} />
                )}
                {!user.image && user.name &&(
                  <div className="font-bold">
                    <AvatarFallback>{user.name[0].charAt(0).toUpperCase()}</AvatarFallback>
                  </div>)}
               
                  <p className='text-xs font-medium '>
                    {user.name && (user.name)}
                    {!user.name && ('Guest')}
                  </p>
                  <span className='text-xs font-medium text-secondary-foreground'> 
                    {user.email && (user.email)}
                    {!user.email && ('')}
                    </span>
            

              </div>
         
          <DropdownMenuSeparator className='bg-primary/5 mt-2' />
            <DropdownMenuItem onClick={()=>router.push('/dashboard/orders')} className='group py-2 font-medium cursor-pointer'>
              <TruckIcon size={14} className='mr-2 group-hover:translate-x-1 transition-all duration-300 ease-in-out'/>
              My order
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push('/dashboard/settings')} className='group font-medium cursor-pointer'>
              <Settings size={14} className='mr-2 group-hover:rotate-180 transiton-all duration-300 ease-in-out'/>
              Settings
            </DropdownMenuItem>
           
             
            <DropdownMenuItem className='py-2 font-medium cursor-pointer ease-in-out'>
          <div onClick={(e)=>e.stopPropagation()} className='flex items-center  relative mr-3'>
                <Sun className='group-hover:text-yellow-500 absolute group-hover:rotate-180 dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out   ' size={14}/>
                <Moon className='group-hover:text-blue-400 scale-0 dark:text-blue-400 dark:scale-100 transition-all duration-300 ease-in-out' size={14}/>
                {theme &&(
                <p className='dark:text-blue-400  text-secondary-foreground/75 text-yellow-500  ml-2'>
               {theme[0].toUpperCase()+theme.slice(1)} Mode
                </p>)}
                <Switch 
                className='scale-75 ml-12'
                checked={checked}
                onCheckedChange={(e)=>{
                  setChecked((prev)=>!prev)
                  if (e) setTheme('dark')
                  if(!e) setTheme('light')
                }} />

              </div> 
            </DropdownMenuItem>
          
        <DropdownMenuItem onClick={()=>signOut()} className='py-2 group focus:bg-destructive/30 font-medium cursor-pointer'><LogOut size={14}  className='mr-3 group-hover:scale-75 transition-all duration-300 ease-in-out'/>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  return null
};
