export default function seTisAuthenticated(data) {
    return {
      type:"IS_AUTHENTICATED",
      payload:data
    };

}