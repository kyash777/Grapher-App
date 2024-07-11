import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button, Container as MuiContainer, Typography } from "@mui/material";

const GraphPaperContainer = styled("div")(({ width, height, scale }) => ({
  position: "relative",
  width: `${width * scale}mm`,
  height: `${height * scale}mm`,
  border: "1px solid #000",
  boxSizing: "border-box",
  margin: "auto", // Center horizontally
}));

const Line = styled("div")(({ lineColor, lineType, position, scale }) => ({
  position: "absolute",
  backgroundColor: lineColor,
  ...(lineType === "vertical"
    ? { left: `${position * scale}mm`, top: 0, width: "1px", height: "100%" }
    : { top: `${position * scale}mm`, left: 0, height: "1px", width: "100%" }),
}));

const sizes = {
  A1: [594, 841],
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  "Letter Head": [216, 279],
};

const Container = styled(MuiContainer)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  textAlign: "center",
});

const calculateScale = (width, height) => {
  const maxSize = Math.max(width, height);
  if (maxSize > 800) return 0.25;
  if (maxSize > 600) return 0.35;
  if (maxSize > 400) return 0.45;
  return 0.5;
};

const GraphPaperDisplay = () => {
  const location = useLocation();
  const { size, linesPerInch, lineColor, customWidth, customHeight } =
    location.state;
  const mmPerInch = 25.4;

  const [width, height] =
    size === "Custom"
      ? [customWidth * mmPerInch, customHeight * mmPerInch]
      : sizes[size];

  const scale = calculateScale(width, height);

  const lines = [];
  const linesPerMM = linesPerInch / mmPerInch;

  for (let i = 0; i <= width * linesPerMM - 1; i++) {
    lines.push({ type: "vertical", position: i / linesPerMM });
  }
  for (let i = 0; i <= height * linesPerMM - 1; i++) {
    lines.push({ type: "horizontal", position: i / linesPerMM });
  }

  const downloadGraphPaper = () => {
    const graphPaperElement = document.getElementById("graph-paper");
    html2canvas(graphPaperElement, { scale: 1 / scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "mm",
        format: [width + 20, height + 20], // Add 10mm margin on each side
      });
      pdf.addImage(imgData, "PNG", 10, 10, width, height);
      pdf.save("graph-paper.pdf");
    });
  };

  return (
    <Container>
      <Typography
        sx={{ fontSize: "30px", fontWeight: 600}}
      >
        Graph Paper Preview
      </Typography>
      <GraphPaperContainer
        id="graph-paper"
        width={width}
        height={height}
        scale={scale}
      >
        {lines.map((line, index) => (
          <Line
            key={index}
            lineColor={lineColor}
            lineType={line.type}
            position={line.position}
            scale={scale}
          />
        ))}
      </GraphPaperContainer>
      <Button variant="contained" color="primary" onClick={downloadGraphPaper}>
        Download Graph Paper
      </Button>
    </Container>
  );
};

export default GraphPaperDisplay;
