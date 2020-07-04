/**
 * This class is used to get the current Date.
 * The setNow function is overriden while testing
 */
export class AppTime {
    static setNow = (): Date => new Date();

    static now = () => AppTime.setNow();
}