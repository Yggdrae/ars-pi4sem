const variantColorClasses = {};
const typeClasses = {
    password: "password",
}

export function TextArea ({ children, ...props }: any) {
    return <textarea className="text-center align-text-center" {...props}>{children}</textarea>;
}