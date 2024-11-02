"use client";
import React, { useState, useEffect, useRef } from "react";
import { DownArrowIcon } from "./Icons";

interface OptionType {
  value: string;
  label: string;
  keywords?: string[];
  className?: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: OptionType[];
  customIcon?: React.ElementType;
  icon?: React.ElementType;
  readOnly?: boolean;
  hideSelectedOption?: boolean;
  disableOnClick?: boolean;
  closeDropdownToggle?: boolean;
  disableOptionWrapper?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  optionClassName?: string;
  optionsStyle?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
  optionsWrapperClassName?: string;
  dropdownPosition?: string; // "top" or "bottom"
  search?: boolean;
  optionsBoxMaxHeight?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options = [],
  customIcon,
  icon,
  readOnly = false,
  hideSelectedOption = false,
  disableOnClick = false,
  closeDropdownToggle = false,
  disableOptionWrapper = false,
  disabled = false,
  placeholder = "Select",
  className = "",
  optionClassName = "",
  optionsStyle,
  iconClassName = "",
  textClassName = "",
  optionsWrapperClassName = "",
  dropdownPosition = "",
  search = false,
  optionsBoxMaxHeight = "max-h-64",
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdown_position, set_dropdown_position] = useState<"bottom" | "top">(
    "bottom"
  );
  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dropdownDisplayFieldRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [optionsScrollbar, setOptionsScrollbar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (openMenu) {
      setTimeout(() => {
        setOptionsScrollbar(true);
      }, 300);
    } else {
      setOptionsScrollbar(false);
    }
  }, [openMenu]);

  useEffect(() => {
    setOpenMenu(false);
  }, [closeDropdownToggle]);

  useEffect(() => {
    const dropdownPositionChecker = setInterval(() => {
      if (
        containerRef.current &&
        window.innerHeight -
          (containerRef.current.getBoundingClientRect()?.top ?? 0) +
          256 >
          320
      ) {
        set_dropdown_position("bottom");
      } else {
        set_dropdown_position("top");
      }
    }, 1000);

    return () => clearInterval(dropdownPositionChecker);
  }, [containerRef, dropdownPosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const CustomIcon = customIcon;
  const Icon = icon;

  return (
    <div
      ref={containerRef}
      className={`w-full group relative flex ${
        (dropdownPosition === "" ? dropdown_position : dropdownPosition) ===
        "top"
          ? "flex-col-reverse "
          : "flex-col "
      } ${disabled ? "pointer-events-none" : ""}`}
    >
      <input disabled={disabled} className="overflow-hidden h-0 w-0" />
      <div
        onClick={() => {
          if (readOnly) return;
          inputFieldRef.current?.focus();
          setOpenMenu((openMenu) => !openMenu);
        }}
        className={
          "cursor-pointer relative break-all flex items-center gap-3 rounded focus:z-10 " +
          className
        }
        ref={dropdownDisplayFieldRef}
      >
        {Icon && <Icon />}
        {search ? (
          <input
            placeholder={placeholder}
            value={
              openMenu
                ? searchValue
                : options.find((option) => option.value === value)?.label ?? ""
            }
            ref={inputFieldRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") optionsRef.current[0]?.focus();
              else if (e.key === "Enter") setOpenMenu((openMenu) => !openMenu);
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className={
              "text-left flex flex-row items-center gap-2 flex-grow truncate w-full break-all focus:ring-none focus:outline-none " +
              (value ? "" : "text-[#7C8DB0]") +
              " " +
              textClassName
            }
          />
        ) : (
          <div
            tabIndex={0}
            ref={inputFieldRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") optionsRef.current[0]?.focus();
              else if (e.key === "Enter") setOpenMenu((openMenu) => !openMenu);
            }}
            className={
              "text-left flex flex-row items-center gap-2 flex-grow truncate w-full break-all focus:ring-none focus:outline-none " +
              (value ? "" : "text-[#27273F]") +
              " " +
              textClassName
            }
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
          </div>
        )}
        {!readOnly && (
          <button className={"p-2 rounded-md bg-bg-1 " + iconClassName}>
            {CustomIcon && typeof CustomIcon === "function" ? (
              <CustomIcon className={iconClassName} />
            ) : (
              <DownArrowIcon
                className={
                  "h-1 w-[10px] transform duration-300 " +
                  " " +
                  (openMenu ? "rotate-180" : "")
                }
              />
            )}
          </button>
        )}
      </div>

      <div
        style={{
          ...((dropdownPosition === ""
            ? dropdown_position
            : dropdownPosition) === "top"
            ? {
                marginBottom: dropdownDisplayFieldRef.current?.offsetHeight,
              }
            : {
                marginTop: dropdownDisplayFieldRef.current?.offsetHeight,
              }),
        }}
        className={"w-full flex flex-col absolute z-[100] dropdown"}
      >
        <div
          className={
            "-mt-3 rounded-2xl shadow-lg duration-300 w-full text-sm focus:bg-blue-600 focus:text-white text-gray-800 cursor-default flex flex-col gap-0 " +
            optionsWrapperClassName +
            " " +
            (optionsScrollbar ? "overflow-auto" : "overflow-hidden") +
            " " +
            (openMenu && !readOnly ? optionsBoxMaxHeight : "max-h-0")
          }
        >
          {options
            ?.filter((option) => {
              if (searchValue === "") return true;
              if (option.keywords) {
                return option.keywords.some(
                  (keyword) =>
                    keyword
                      .toLowerCase()
                      .slice(
                        0,
                        Math.min(keyword.length, searchValue.length)
                      ) === searchValue.toLowerCase()
                );
              }
              return false;
            })
            .filter((val) => !hideSelectedOption || val.value !== value)
            .map((option, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => {
                    optionsRef.current[index] = el;
                  }}
                  tabIndex={0}
                  className={
                    "bg-white cursor-pointer flex flex-row items-center text-left focus:bg-gray-100 " +
                    (disableOnClick ? "" : "hover:bg-gray-100") +
                    " " +
                    (disableOptionWrapper ? "" : "pl-3 p-2") +
                    " " +
                    optionClassName +
                    " " +
                    option.className
                  }
                  style={optionsStyle}
                  onClick={() => {
                    if (!disableOnClick) setOpenMenu(false);
                    onChange(option.value);
                    setSearchValue("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" && index === 0)
                      inputFieldRef.current?.focus();
                    else if (e.key === "ArrowUp")
                      optionsRef.current[index - 1]?.focus();
                    else if (e.key === "ArrowDown")
                      optionsRef.current[index + 1]?.focus();
                    else if (e.key === "Enter") {
                      if (!disableOnClick) setOpenMenu(false);
                      onChange(option.value);
                      setSearchValue("");
                    }
                  }}
                >
                  {option.label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
