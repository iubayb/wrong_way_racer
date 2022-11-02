import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import { PlayerModel } from "assets";

export const Players = (props: any) => {
  return (
    <Paper
      sx={{
        background: "rgba(16, 12, 74, 0.2)",
        boxShadow: "inset 0px 4px 63px rgba(255, 255, 255, 0.25)",
        p: 0,
         overflow:"auto", height:"249px"
      }}
    >
      <Box
        sx={{
          py: 0.5,
          px: 2,
          borderRadius: "12px 12px 0px 0px",
          background:
            "linear-gradient(0deg, rgba(19, 20, 68, 0.5), rgba(19, 20, 68, 0.5)), radial-gradient(101.35% 101.35% at 50% 22.11%, rgba(34, 21, 49, 0.5) 0%, rgba(22, 22, 48, 0.5) 71.87%)",
     
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={700}>
            Players
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            8/12
          </Typography>
        </Stack>
      </Box>
      <Stack spacing={1} sx={{ p: 1 }}>
        <Button variant="contained" startIcon={<SettingsIcon />}>
          Setting
        </Button>

        {props.playersList.length > 0
          ? props.playersList.map((item: PlayerModel, index: number) => (
        <Stack key={index} direction={"row"} alignItems="center" spacing={1}>
          <Avatar src={`${item.avatar}`} sx={{ width: 24, height: 24 }} />
          <Typography>{item.name} </Typography>
        </Stack>
            ))
          : null}
      </Stack>
    </Paper>
  );
};
