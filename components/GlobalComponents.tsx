import React from "react";

// Tipado fiel a Flutter
interface FlexLayoutProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  mainAxisAlignment?:
    | "start"
    | "end"
    | "center"
    | "spaceBetween"
    | "spaceAround"
    | "spaceEvenly";
  crossAxisAlignment?: "start" | "end" | "center" | "stretch" | "baseline";
  mainAxisSize?: "max" | "min";
  spacing?: number; // Representa gap de Tailwind (ej: 4 -> gap-4)
  clipBehavior?: "none" | "hidden";
  verticalDirection?: "up" | "down";
  className?: string; // Para ajustes extra
}

const FlexLayout: React.FC<FlexLayoutProps> = ({
  children,
  direction = "column",
  mainAxisAlignment = "start",
  crossAxisAlignment = "center",
  mainAxisSize = "max",
  spacing = 0,
  clipBehavior = "none",
  verticalDirection = "down",
  className = "",
}) => {
  // Mapeo de MainAxisAlignment (Justify Content)
  const mainAxisMap = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    spaceBetween: "justify-between",
    spaceAround: "justify-around",
    spaceEvenly: "justify-evenly",
  };

  // Mapeo de CrossAxisAlignment (Align Items)
  const crossAxisMap = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  // Lógica de dirección y MainAxisSize
  const isRow = direction === "row";
  const sizeClass = isRow
    ? mainAxisSize === "max"
      ? "w-full"
      : "w-fit"
    : mainAxisSize === "max"
      ? "h-full"
      : "h-fit";

  // Lógica de VerticalDirection (solo aplica en Column)
  const directionClass = isRow
    ? "flex-row"
    : verticalDirection === "up"
      ? "flex-col-reverse"
      : "flex-col";

  const classes = [
    "flex",
    directionClass,
    sizeClass,
    mainAxisMap[mainAxisAlignment],
    crossAxisMap[crossAxisAlignment],
    clipBehavior === "hidden" ? "overflow-hidden" : "",
    `gap-${spacing}`,
    className,
  ].join(" ");

  return <div className={classes}>{children}</div>;
};

export default FlexLayout;
