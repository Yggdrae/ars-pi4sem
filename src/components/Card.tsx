import { tv } from "tailwind-variants";
import { VStack } from "./VStack";
import type React from "react";

const card = tv({
    slots: {
        base: "border border-default-200 dark:border-dark-600",
        header: "flex w-full items-center border-b border-default-200 px-6 py-2 font-heading dark:border-dark-500",
        content: "px-6 py-4",
        footer: "flex w-full items-center border-t border-default-200 px-6 py-2 dark:border-dark-500",
    },
    variants: {
        elevated: {
            true: { base: "shadow-lg dark:shadow-dark-900" },
        },
        animation: {
            true: { base: "duration-300 hover:translate-y-[-3px]" },
        },
        rounded: {
            xs: { base: "rounded-sm" },
            sm: { base: "rounded-md" },
            md: { base: "rounded-lg" },
            lg: { base: "rounded-xl" },
            xl: { base: "rounded-2xl" },
        },
        color: {
            primary: {
                base: "border-none bg-primary text-white shadow-raise-primary dark:bg-primary dark:shadow-raise-primary",
            },
            secondary: {
                base: "border-none bg-secondary text-white shadow-raise-secondary dark:bg-secondary dark:shadow-raise-secondary",
            },
            success: {
                base: "border-none bg-success-400 text-white shadow-raise-success dark:bg-success-400 dark:shadow-raise-success",
            },
            error: {
                base: "border-none bg-error-400 text-white shadow-raise-error dark:bg-error-400 dark:shadow-raise-error",
            },
            warning: {
                base: "border-none bg-warning-400 text-white shadow-raise-warning dark:bg-warning-400 dark:shadow-raise-warning",
            },
            info: {
                base: "border-none bg-info-500 text-white shadow-raise-info dark:bg-info-500 dark:shadow-raise-info",
            },
        },
    },
});

const { base, footer: f, header: h, content: c } = card();

export interface ICardProps extends React.ComponentProps<"div"> {
    rounded?: "xs" | "sm" | "md" | "lg" | "xl";
    elevated?: boolean;
    bg?: "background" | "surface";
    color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
    className?: string;
    animation?: boolean;
}

const Header = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return <div className={h({ class: className })}>{children}</div>;
};

const Footer = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return <div className={f({ class: className })}>{children}</div>;
};

const Content = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return <div className={c({ class: className })}>{children}</div>;
};

/**
 * O componente Card é uma representação visual de um contêiner retangular que agrupa informações relacionadas em uma aplicação React.
 *
 * ```tsx
 *  <Card {...props}>
 *    <Card.Header />
 *    <Card.Content />
 *    <Card.Footer />
 *  </Card>
 * ```
 */
const Card = ({
    children,
    bg = "surface",
    animation = false,
    className,
    rounded = "sm",
    elevated,
    color,
    ...props
}: ICardProps) => {
    return (
        <VStack
            {...props}
            className={base({
                class: className,
                color,
                animation,
                rounded,
                elevated,
            })}
        >
            {children}
        </VStack>
    );
};

Card.Header = Header;
Card.Footer = Footer;
Card.Content = Content;

export default Card;
