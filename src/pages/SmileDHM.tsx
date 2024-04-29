import { SmileDHMService } from "../services/SmileDHMService";


const SmileDHM = () => {
    return (
        <button onClick={() => SmileDHMService.getInstance().createNewWorkOrder()}>create new workorder</button>
    );
}

export default SmileDHM;
