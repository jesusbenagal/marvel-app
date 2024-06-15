import { StylesObject } from "@/interfaces/global";

interface GridContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const styles: StylesObject = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    columnGap: "16px",
    rowGap: "16px",
  },
};

export default function GridContainer({ children, style }: GridContainerProps) {
  return (
    <div
      style={{
        ...styles.gridContainer,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
