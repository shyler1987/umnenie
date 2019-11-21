export default function setNotificationAction(data) {
    console.log(data);
    return {
        type:"NOTIFY",
        payload:data
    };

}