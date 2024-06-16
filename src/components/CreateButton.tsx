import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const Join: React.FC = () =>{
    const {ws} = useContext(RoomContext)
    const createRoom = () => {
        ws.emit("create-room")
    }
    return(
        <button onClick={createRoom} className='px-4 py-2 text-xl font-bold text-white bg-blue-400 rounded-md hover:bg-blue-600'>Start new meeting</button>
    )
}