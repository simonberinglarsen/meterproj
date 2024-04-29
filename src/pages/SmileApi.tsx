import { SmileApiService } from "../services/SmileApiService";

const SmileApi = () => {


    return (
        <>
            <h3>api calls:</h3>
            <pre>
                {SmileApiService.getInstance().getCalls()}
            </pre>
        </>
    );
}

export default SmileApi;
