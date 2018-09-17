import alt from "alt-instance";

type notification = {
    message: string,
    level?: string,
    autoDismiss?: number
}

const normalize = (notification: notification, level?) => {
    if (typeof notification == "string")
        notification = { message: notification };
    if (level)
        notification.level = level;
    // Adjust the css position for notices.. bottom messages can't be seen
    //if(notification.level === "success" && ! notification.position)
    //    notification.position = 'br' //bottom right
    return notification;
};

class NotificationActions {

    addNotification(notification) {
        notification = normalize(notification);
        return notification;
    }

    // Creating aliases: success, error, warning and info

    success(notification) {
        notification = normalize(notification, "success");
        return notification;
    }

    error(notification) {
        notification = normalize(notification, "error");
        return notification;
    }

    warning(notification) {
        notification = normalize(notification, "warning");
        return notification;
    }

    info(notification) {
        notification = normalize(notification, "info");
        return notification;
    }
}

let NotificationActionsWrapper: NotificationActions = alt.createActions(NotificationActions);
export { NotificationActionsWrapper as NotificationActions }
export default NotificationActionsWrapper

