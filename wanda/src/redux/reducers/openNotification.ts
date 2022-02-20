import { IOpenNotifyTypes, OPEN_NOTIFY } from "../types/alertTypes";

const openNotification = (state: boolean = false, action: IOpenNotifyTypes ): boolean => {
    switch (action.type) {
        case OPEN_NOTIFY:
            return action.payload
        default:
            return state;
    }
}

export default openNotification