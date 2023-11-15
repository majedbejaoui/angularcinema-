import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCinema {

  constructor( private http:HttpClient) { }

 host:string="http://localhost:8086"
 
getVille(){
 return this.http.get(this.host+"/villes")
    
}

getCinema(v:any){

  return this.http.get(v._links.cinemas.href)
}

getSalle(c:any){
  return this.http.get(c._links.salles.href)
}

getProjections(salle:any){

let url =salle._links.projection.href.replace("{?projection}","");
return this.http.get(url+"?projection=p1")
}

getTicketsPlaces(p:any){
  let url =p._links.tickets.href.replace("{?projection}","");
  return this.http.get(url+"?projection=ticketProj")
}

payerTickets(f:any){
  return this.http.post(this.host+"/payerTicket",f)
}
}