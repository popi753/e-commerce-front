import { cn } from '@/lib/utils';

export default function AuthC({ children, bgImageUrl }: { children: React.ReactNode, bgImageUrl: string }) {

    return (
        <div className="flex-1 w-full h-full flex flex-row">
            <div className={cn("flex-1 bg-no-repeat bg-cover p-10 m-10 rounded-2xl max-sm:hidden", bgImageUrl)}>

            </div>
            <div className="flex-1">
                <div className='flex flex-col px-2 '>
                    {children}
                </div>
            </div>
        </div>
    );
};