import styles from "src/components/SortingUsers/SortingUsers.module.scss";
import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SortingUsers({ value, onChange }) {
  return (
    <FormControl>
      <InputLabel required>Sortering</InputLabel>
      <Select value={value} label="Sortering" onChange={onChange}>
        <MenuItem value="default">Standard</MenuItem>
        <MenuItem value="accountType">Kontotyp</MenuItem>
        <MenuItem value="firstname">Förnamn</MenuItem>
        <MenuItem value="lastname">Efternamn</MenuItem>
      </Select>
    </FormControl>
  );
}
