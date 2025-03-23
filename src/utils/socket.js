import io from 'socket.io-client';
import { BASE_URL } from '../utils/constant'

// Production level it will create a error

export const createSocketConnection = () => {

    if(location.hostname === "localhost") {
        return io(BASE_URL)
    } else {
        return io("/",{ path: "/api/socket.io"})
    }

}