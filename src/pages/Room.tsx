import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import { PeerState } from "../reducers/peerReducer"
import { ShareScreenButton } from "../components/ShareScreenButton"
import { VideoPlayer } from './../components/VideoPlayer';
import { ChatButton } from "../components/ChatButton"
import { Chat } from "../components/chat/Chat"

export const Room = () => {
    const {id} = useParams()
    const {ws, me, stream, peers, shareScreen, screenSharingId, setRoomId, toggleChat, chat} = useContext(RoomContext)
    useEffect(() =>{
        if(me) ws.emit("join-room", {roomId: id, peerId: me._id})
    },[id, me, ws])

    useEffect(()=>{
        setRoomId(id)
    },[id, setRoomId])

    console.log({screenSharingId})
    const {[screenSharingId]: sharing, ...peersToShow} = peers;
    const screenSharingVideo = screenSharingId === me?.id ? stream: peers[screenSharingId]?.stream;
    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-4 text-white bg-red-500">Room id {id}</div>
        <div className="flex grow">{screenSharingVideo &&
            <div className="w-4/5 pr-4">
                <VideoPlayer stream={screenSharingVideo}/>
            </div>
            }
            <div className={`grid gap-4 ${screenSharingVideo? "w-1/5 grid-cols-1": "grid-cols-4"}`}>
            {screenSharingId !== me?.id && (
                <VideoPlayer stream={stream}/>
            )}
            {/* {Object.values(peers as PeerState).map((peer)=>(
                <VideoPlayer stream={peer.stream} key={peer.stream.id}/>
            ))} */}
            {Object.values(peersToShow as PeerState).map((peer)=>(
                <VideoPlayer stream={peer.stream} key={peer.stream.id}/>
            ))}
        </div>
        {chat.isChatOpen && 
        <div className="border-l-2 pb-28">
        <Chat/>
    </div>
        }
        
    </div>
        
        <div className="fixed bottom-0 flex items-center justify-center w-full gap-1 p-6 bg-white border-t-2 h-28">
            <ShareScreenButton onClick={shareScreen}/>
            <ChatButton onClick={toggleChat}/>
        </div>
        </div>
    )
}