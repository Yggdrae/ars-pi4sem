import React from "react";

interface CheckboxCellProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

export const CheckboxCell = ({ checked, onChange }: CheckboxCellProps) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="form-checkbox h-5 w-5 text-accent rounded border border-content-primary cursor-pointer"
            disabled={!onChange}
        />
    );
};