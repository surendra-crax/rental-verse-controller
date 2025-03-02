
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        muted: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        sm: "h-5 px-2 py-0",
        default: "h-6 px-3 py-0",
        lg: "h-7 px-4 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, size, ...props }: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant, size }), className)} {...props} />
  )
}

export { Chip, chipVariants }
