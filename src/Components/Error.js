import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts() {
  return (
    <Stack sx={{ width: '100%', textAlign: 'center'}} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Cannot find articles</AlertTitle>
        <strong>Error fetching data! </strong> - try refreshing.
      </Alert>
    </Stack>
  );
}