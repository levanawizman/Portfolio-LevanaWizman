import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white transform-gpu active:scale-[.98] btn-ripple',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-400',
        outline:
          'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900',
        ghost: 'hover:bg-gray-100 text-gray-900',
        secondary:
          'bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:ring-cyan-400',
        gradient:
          'bg-gradient-to-r from-[hsl(var(--accent-700))] via-[hsl(var(--accent-600))] to-[hsl(var(--accent-700))] text-white hover:from-[hsl(var(--accent-600))] hover:to-[hsl(var(--accent-500))] focus-visible:ring-cyan-400',
        glow:
          'bg-white text-gray-900 border border-indigo-200 shadow-md hover:shadow-lg hover:shadow-indigo-200 focus-visible:ring-indigo-300',
        dashed:
          'border-2 border-dashed border-gray-300 bg-white hover:border-indigo-300 text-gray-900',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const { onPointerDown, children: _children, ...rest } = props as any

    const handlePointerDown: React.PointerEventHandler<HTMLElement> = (e) => {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.left = `${x}px`
      span.style.top = `${y}px`
      el.appendChild(span)
      window.setTimeout(() => span.remove(), 700)
      if (typeof onPointerDown === 'function') onPointerDown(e as any)
    }

    if (asChild && React.isValidElement(_children)) {
      const child = _children as React.ReactElement
      const mergedClassName = cn(
        buttonVariants({ variant, size }),
        child.props?.className,
        className
      )
      const mergedPointerDown = (e: any) => {
        if (typeof child.props?.onPointerDown === 'function') child.props.onPointerDown(e)
        handlePointerDown(e)
      }
      return React.cloneElement(child, {
        className: mergedClassName,
        ref,
        onPointerDown: mergedPointerDown,
        ...rest,
      })
    }
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} onPointerDown={handlePointerDown as any} {...rest}>
        {_children}
      </button>
    )
  }
)
Button.displayName = 'Button'


