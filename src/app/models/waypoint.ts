export class ObjectWaypoint {
    //field
    public Command : string;
    public longitude : number;
    public latitude: number;
    public altitude: number;
    public frame: string;
    public home: boolean;
    //constructor
    constructor(
        //QGC WPL <VERSION>
        //<INDEX> <CURRENT WP> <COORD FRAME> <COMMAND> <PARAM1> <PARAM2> <PARAM3> <PARAM4> <PARAM5/X/LONGITUDE> <PARAM6/Y/LATITUDE> <PARAM7/Z/ALTITUDE> <AUTOCONTINUE>
        /*
        <entry value="16" name="MAV_CMD_NAV_WAYPOINT">
        <description>Navigate to MISSION.</description>
        <param index="1">Hold time in decimal seconds. (ignored by fixed wing, time to stay at MISSION for rotary wing)</param>
        <param index="2">Acceptance radius in meters (if the sphere with this radius is hit, the MISSION counts as reached)</param>
        <param index="3">0 to pass through the WP, if > 0 radius in meters to pass by WP. Positive value for clockwise orbit, negative value for counter-clockwise orbit. Allows trajectory control.</param>
        <param index="4">Desired yaw angle at MISSION (rotary wing)</param>
        <param index="5">Latitude</param>
        <param index="6">Longitude</param>
        <param index="7">Altitude</param>
        */
        Command : string = 'Waypoint',
        longitude : number,
        latitude: number,
        altitude: number,
        frame: string = 'Relative',
        home: boolean = false) {
        this.Command = Command
        this.altitude = altitude
        this.longitude = longitude
        this.latitude = latitude
        this.frame = frame
        this.home = home
    }
    //function
    getCoordinate(){
        return [this.longitude, this.latitude]
    }
    getAltitude() {
        return this.altitude
    }
}
