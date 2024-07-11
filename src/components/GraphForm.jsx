import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const Container = styled("div")({
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  marginTop: "100px",
});

const sizes = {
  A1: [594, 841],
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  "Letter Head": [216, 279],
};

const GraphPaperForm = () => {
  const [formData, setFormData] = useState({
    size: "A4",
    linesPerInch: 1,
    lineColor: "#000000",
    customWidth: "",
    customHeight: "",
  });
  const [isCustomSize, setIsCustomSize] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomSizeClick = (e) => {
    setIsCustomSize(e.target.checked);
  };

  const handleSubmit = () => {
    if (isCustomSize) {
      formData.size = "Custom";
    }
    navigate("/graph-paper", { state: formData });
  };

  return (
    <Stack>
      <Container>
        <Stack sx={{ marginBottom: "40px",display:"flex",flexDirection:"row",alignItems:"center" }}>
          <Stack sx={{height:"100px",width:"100px"}}>
            <img src="https://play-lh.googleusercontent.com/l9aHhWBHL_G5xITIq5goJxDRWc7tEHCIexZnl7mM8hDQ3U2eS4cervTS0c1gg5ipXg" />
          </Stack>
          <Typography sx={{ fontSize: "30px", fontWeight: 600,marginLeft:"20px" }}>
            The Best Graph Paper App
          </Typography>
        </Stack>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            name="size"
            value={formData.size}
            onChange={handleChange}
            disabled={isCustomSize}
            label="size"
          >
            {Object.keys(sizes).map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>Custom Size</Typography>
          <Checkbox
            onChange={handleCustomSizeClick}
            name="customSize"
            color="secondary"
            label="Custom Size"
          />
        </Stack>
        {isCustomSize && (
          <>
            <TextField
              type="number"
              label="Width (in inches)"
              name="customWidth"
              value={formData.customWidth}
              onChange={handleChange}
              sx={{ width: "20%" }}
            />
            <TextField
              type="number"
              label="Height (in inches)"
              name="customHeight"
              value={formData.customHeight}
              onChange={handleChange}
              sx={{ width: "20%" }}
            />
          </>
        )}
        <TextField
          type="number"
          label="Lines per Inch"
          name="linesPerInch"
          value={formData.linesPerInch}
          onChange={handleChange}
          sx={{ width: "20%" }}
        />
        <TextField
          type="color"
          label="Line Color"
          name="lineColor"
          value={formData.lineColor}
          onChange={handleChange}
          sx={{ width: "20%" }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: "10%" }}
        >
          Create
        </Button>
      </Container>
    </Stack>
  );
};

export default GraphPaperForm;
