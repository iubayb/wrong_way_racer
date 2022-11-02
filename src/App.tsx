import ThemeProvider from "theme";
import { Box, Grid } from "@mui/material";
import { Chat } from "components/chat";
import { GameView } from "components/game-view";
import { Players } from "components/players";
import { RankingList } from "components/ranking-list";
import { socket } from "./socket-io/socket";
import { useState, useEffect } from "react";
import { Constants, PlayerModel } from "./assets";


function App() {
  const [chatList, setChatList] = useState<any>([]);
  const [playersList, setPlayersList] = useState<PlayerModel[]>([]);

  useEffect(() => {  
    socket.onAny((eventName, ...args) => {
      switch (eventName) {
        case Constants.PLAYERS_LIST:
          return setPlayersList(args[0]);
        case Constants.NEW_CHAT:
          return setChatList((prev: any[]) => [...prev, args[0]]);
        case Constants.NEW_CHAT_JOIN:
          return setChatList((prev: any[]) => [...prev, args[0]]);

        default:
          break;
      }
    });   },[socket]);

  return (
    <ThemeProvider>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", minWidth: "100vw", padding: "24px" }}
      >
        <Box sx={{ maxWidth: 1250 }}>
          <GameView />
          <Grid container spacing={3} marginTop="0">
            <Grid item md={4} xs={12}>
              <RankingList playersList={playersList} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Chat  chatList={chatList} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Players playersList={playersList} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
