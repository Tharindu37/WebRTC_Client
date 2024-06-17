import { useContext, useState } from "react"
import { RoomContext } from "../../context/RoomContext"

export const ChatInput: React.FC =()=>{
    const [message, setMessage] = useState("")
    const {sendMessage} =useContext(RoomContext)

    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                sendMessage(message)
                sendMessage("")
            }}>
                <div className="flex gap-1">
                <textarea className="border" onChange={e=> setMessage(e.target.value)} value={message}/>
                <button className="p-4 text-white bg-red-500 rounded-md" type="submit">Send</button>
                </div>
                
            </form>
        </div>
    )
}