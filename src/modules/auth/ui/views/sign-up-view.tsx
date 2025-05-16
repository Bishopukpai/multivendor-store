"use client";

import z from 'zod'
import { Poppins } from "next/font/google";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../shemas';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import {toast} from 'sonner'
import { useRouter } from 'next/navigation';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const SignUpView = () => {
    const router = useRouter();


    const trpc = useTRPC()
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            router.push("/")
        }
    }))

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);
    }

    const username = form.watch("username")
    const usernameErrors = form.formState.errors.username

    const showPreview = username && !usernameErrors
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 p-4 lg:p-16'>
                        <div className='flex items-center justify-between mb-8 '>
                            <Link href="/">
                                <span className={cn("text-2xl font-semibold", poppins.className)}>
                                    FunBuy
                                </span>
                            </Link>
                            <Button asChild variant="elevated" size="sm" className='text-base border-none'>
                                <Link prefetch href="/sign-in">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                        <h1 className='text-4xl font-medium'>Start selling to millions of customers</h1>
                        <FormField name='username' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Username</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormDescription className={cn("hidden", showPreview && "block")}>
                                     Your store will be available at &nbsp;
                                     {/**Use proper method to generate preview url */}
                                     <strong>{username}</strong>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base'>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password"/>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button disabled={register.isPending} variant="signup" type='submit' size="lg" className=''>Create Account</Button>
                    </form>
                </Form>
            </div>
            <div 
                className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/images.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}/>
            
        </div>
    )
}