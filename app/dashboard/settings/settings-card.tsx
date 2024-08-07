
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Session} from 'next-auth'
// import type {TSettings} from '@/app/types/types'
import type { TSettingsForm } from "@/app/types/types"
import {SettingSchema} from '@/app/types/settings-schema'
export type TSettings = {
	session: Session
}
    export default function SettingsCard(session:TSettings){
        const form = useForm<z.infer<typeof SettingSchema>>({
            resolver: zodResolver(SettingSchema),
            defaultValues: {
              password: undefined,
              newPassword: undefined,
              name: session.session.user?.name || undefined,
              email: session.session.user?.email || undefined,
              image: session.session.user.image || undefined,
              //isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
            },
          })
        
const onSubmit=(values:z.infer<typeof SettingSchema>)=>{
    execute(values)

}
return(
<Card>
    <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Card Description</CardDescription>
    </CardHeader>
<CardContent>
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
<FormField
control={form.control}
name="name"
render={({ field }) => (
<FormItem>
<FormLabel>Name</FormLabel>
<FormControl>
<Input placeholder="user image" disabled={status==='executing'} {...field} type='hidden' />
</FormControl>
<FormDescription>
This is your public display name.
</FormDescription>
<FormMessage />
</FormItem>

)}
/>
<FormField
control={form.control}
name="image"
render={({ field }) => (
<FormItem>
<FormLabel>Avatar</FormLabel>
<FormControl>
<Input placeholder="Your name ..." disabled={status==='executing'} {...field} />
</FormControl>
<FormDescription>
This is your public display name.
</FormDescription>
<FormMessage />
</FormItem>

)}
/>

</form>
</Form>
)

</CardContent>
<CardFooter>
<p>Card Footer</p>
</CardFooter>
</Card>

)
}