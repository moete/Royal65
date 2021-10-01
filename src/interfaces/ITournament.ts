
export interface Itournament {
    title : String ;
    price  : number ;
    start_time : Date;
    end_time : Date ;
    entry_fee : number ;
    game : Object ;
    capacity : number ;
    description  : String ;
    status  : Number ; 
}
export interface ItournamentDto {
    title : String ;
    price  : number ;
    start_time : Date;
    game : Object ;
    end_time : Date ;
    entry_fee : number ;
    capacity : number ;
    description  : String ;
    status  : Number ; 
}