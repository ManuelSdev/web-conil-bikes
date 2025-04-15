// @ts-nocheck
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function AlertDialogButton({
   triggerButtonText,
   title,
   description,
   actionText,
   cancelText,
   handleAction,
   variant,
   className,
}) {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               variant={variant ? variant : 'outline'}
               className={className}
            >
               {triggerButtonText}
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
               <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>{cancelText}</AlertDialogCancel>
               <AlertDialogAction onClick={handleAction}>
                  {actionText}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
