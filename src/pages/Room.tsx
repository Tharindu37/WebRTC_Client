import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import { PeerState } from "../context/peerReducer"
import { ShareScreenButton } from "../components/ShareScreenButton"
import { VideoPlayer } from './../components/VideoPlayer';

export const Room = () => {
    const {id} = useParams()
    const {ws, me, stream, peers, shareScreen, screenSharingId, setRoomId} = useContext(RoomContext)
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
        <>Room id {id}
        <div className="flex">{screenSharingVideo &&
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
    </div>
        
        <div className="fixed bottom-0 flex justify-center w-full p-6 bg-white border-t-2">
            <ShareScreenButton onClick={shareScreen}/>
        </div>
        </>
    )
}