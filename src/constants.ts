export const SALESFORCE_URL_PREFIX =
    process.env.NODE_ENV !== "production" ? "test" : "webto";
export const SALESFORCE_ORG_ID =
    process.env.NODE_ENV !== "production" ? "00DEm000002Htjh" : "00Do0000000b6Io";
export const SALESFORCE_URL = `https://${SALESFORCE_URL_PREFIX}.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${SALESFORCE_ORG_ID}`;
