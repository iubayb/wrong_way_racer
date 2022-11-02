import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

export const RankingList = (props: any) => {
  return (
    <Paper
      sx={{
        background: "rgba(16, 12, 74, 0.2)",
        boxShadow: "inset 0px 4px 63px rgba(255, 255, 255, 0.25)",
        p: 0,
      }}
    >
      <Box
        component={Paper}
        sx={{
          background:
            "radial-gradient(101.35% 101.35% at 50% 22.11%, rgba(255, 255, 255, 0.19) 0%, rgba(24, 20, 53, 0.26) 71.87%), #9747FF;",
          width: "100%",
          p: 1.5,
          boxShadow: "inset 0px 4px 12px #FFFFFF",
        }}
      >
        <Stack direction={"row"} justifyContent="space-between">
          <Stack>
            <Typography variant="h4" fontWeight={900}>
              3:44
            </Typography>
            <Typography variant="caption">Your Last record</Typography>
          </Stack>
          <Stack
            sx={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              bgcolor: "background.paper",
            }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography fontWeight={700}>#144th</Typography>
            <Typography variant="caption">from 15k</Typography>
          </Stack>
        </Stack>
      </Box>

      <List sx={{ maxHeight: 160, overflowY: "scroll" }}>
        {props.playersList.map((item: any) => (
          <ListItem key={item.name} secondaryAction={<RankDetails rank={item.rank} record={item.record} />}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};


const RankDetails = (props: any) => {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          bgcolor: "rgba(38, 27, 80, 1)",
          px: 1,
          height: 42,
        }}
      >
        <Typography variant="caption">Record</Typography>
        <Typography fontWeight={800}>{props.record}</Typography>
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Typography variant="caption">Rank</Typography>
        <Typography fontWeight={800}>{props.rank}</Typography>
      </Stack>
    </Stack>
  );
};
