import { cva, VariantProps } from "class-variance-authority";
import { MouseEventHandler } from "react";
import { ImSpinner2 } from "react-icons/im"

const buttonStyles = cva("rounded-lg font-bold flex gap-2 w-full disabled:opacity-50 justify-center items-center outline-none", {
    variants: {
      intent: {
        primary: "bg-[#0065C2] border-[#0065C2] border text-white hover:bg-white hover:text-[#393ECC] border-[#0065C2]",
        outline: "bg-transparent border border-[#0065C2] text-[#0065C2]",
      },
      size: {
        sm: "py-2 px-6 text-base",
        md: "py-[14px] px-6 text-sm",
        bg: "py-[14px] px-6 text-base",
      },
      defaultVariants: {
        intent: "primary",
        size: "md"
      },
    },
  });
  interface ButtonProps extends VariantProps<typeof buttonStyles> {
    text: string;
    isLoading: boolean;
    action?: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "button"
  }
  const Button: React.FC<ButtonProps> = ({intent,size, text,isLoading=true,action,type, ...props}) => {
    return (
      <button className={`${buttonStyles({ intent, size })}`} {...props} onClick={action} type={type} disabled={isLoading}>
        {
            isLoading && <ImSpinner2 className="animate-spin" />
        }
        {text}
      </button>
    );
  }
  export default Button