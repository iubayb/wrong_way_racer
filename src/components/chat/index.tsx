import { useState } from "react";
import { Stack, Paper, Typography, TextField, Button } from "@mui/material";
import { socket } from "socket-io/socket";
import { Constants, PlayerModel } from "assets";

export const Chat = (props: any) => {
  const [message, setMessage] = useState<string>("");

  const handleMessage = (event: any) => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    socket.emit(Constants.NEW_CHAT, {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    return setMessage("");
  };
  return (
    <Stack direction={"column"} spacing={1.5}>
      <Paper
        sx={{
          flex: "1 1 100%",
          height: 200,
          borderRadius: "4px",
          boxShadow: "0px -1px 1px 2px #3D1B74, 0px 2px 1px 2px #E5D7FF",
        }}
      >
        <Stack
          spacing={0.5}
          overflow="auto"
          height={160}
          sx={{ display: "flex", flexDirection: "column-reverse" }}
        >
          {props.chatList.length > 0
            ? props.chatList.map((item: PlayerModel, index: number) =>
                item && item.name ? (
                  <Typography
                    variant="body2"
                    sx={{ color: "#FF3EEC" }}
                    key={index}
                  >{`${item.name} Has joined The Game`}</Typography>
                ) : (
                  <Typography
                    variant="body2"
                    key={index}
                  >{`${item}`}</Typography>
                )
              )
            : null}
        </Stack>
      </Paper>
      <Stack direction={"row"} spacing={2}>
        <TextField
          placeholder="Type..."
          sx={{
            width: "100%",
            borderRadius: "4px",
            boxShadow: "0px -1px 1px 2px #3D1B74, 0px 2px 1px 2px #E5D7FF",
          }}
          value={message}
          onChange={handleMessage}
        />
        <Button variant="contained" onClick={() => sendMessage()}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
};
