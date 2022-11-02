import { FC, useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { LoadAssets } from "./gameLogic";

export interface GameViewProps {}

export const GameView: FC<GameViewProps> = () => {
  const ref: any = useRef(null);
  const width = Math.min(1250, window.innerWidth - 64);
  const height = window.innerHeight - 360;

  useEffect(() => {
    const app = new Application({
      width: width,
      height: height,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    LoadAssets(app);

    ref?.current.appendChild(app.view);

    app.start();

    return () => {
      app.stop();
    };
  }, [height, width]);
  return (
    <div
      style={{
        filter: "drop-shadow(0px 4px 90px #542899)",
        borderRadius: "20px",
        width: width + "px",
        height: height + "px",
        boxShadow:"1px -1px 1px 2px #3D1B74,1px 1px 1px 2px #9A78D0",
        overflow: "hidden",
      }}
      ref={ref}
    />
  );
};
