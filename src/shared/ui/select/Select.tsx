import {useState, useRef, useEffect} from "react";
import {classNames} from "shared/lib/classNames";
import {ArrowSelectIcon} from "./ArrowSelectIcon";
import "./Select.css";

export interface Option<T> {
    value: T;
    label: string;
}

interface SelectProps<T> {
    options: Option<T>[];
    className?: string;
    defaultValue?: Option<T>;
    onSelect?: (value: Option<T>) => void;
}

export const Select = <T, >(
    {
        options,
        onSelect,
        className,
        defaultValue,
    }: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option<T> | null>(
        defaultValue ? defaultValue : null
    );
    const selectRef = useRef<HTMLDivElement>(null);

    const selectOption = (option: Option<T>) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect?.(option);
    };

    const toggleOpenDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                event.target instanceof Node &&
                !selectRef.current?.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`select-container ${className}`} ref={selectRef}>
            <div
                className={`select-input ${isOpen ? "select-input-open" : ""}`}
                onClick={toggleOpenDropdown}
            >
                <div className="search-input">
                    {selectedOption?.label}
                </div>
                <ArrowSelectIcon/>
            </div>
            {isOpen && <div className="select-dropdown">
                <div className="options-list">
                    {options.map((option) => {
                        const isSelected = selectedOption?.value === option.value;

                        return (
                            <div
                                key={`${option.value}`}
                                className={classNames('option', {'selected': isSelected})}
                                role="option"
                                aria-label={option.label}
                                aria-selected={isSelected}
                                onClick={() => selectOption(option)}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            </div>}
        </div>
    );
};
