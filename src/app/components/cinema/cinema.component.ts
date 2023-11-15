
import { Component } from '@angular/core';
import { NEVER } from 'rxjs';
import { ServiceCinema } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {

 public villesFE:any
public cinemaFE:any
salleFE:any
salle:   any
currentVille:any
currentCinema:any
currentProjection:any
selectedTickets:any=[]

  constructor( public servicecinema:ServiceCinema){}

  ngOnInit( ){
   this.servicecinema.getVille().subscribe(data=>{
    this.villesFE=data
    console.log("ville",this.villesFE)

   
   })

   

  }
  onGetCinema(v:any){
 this.currentVille=v
 this.salleFE=undefined
    this.servicecinema.getCinema(v).subscribe(data=>{
      this.cinemaFE=data
    })
    console.log("v",v)
    console.log("c",this.cinemaFE)
  }

  onGetSalles(c:any){
    this.currentCinema=c

    this.servicecinema.getSalle(c)
    .subscribe(data1=>{
      this.salleFE=data1;
      this.salleFE._embedded.salles.forEach((salle:any)=> {
        this.servicecinema.getProjections(salle)
        .subscribe((data)=>{

          salle.projection=data
          console.log("sallesFE",data1)
          console.log("sallesProj",data)
       })
      });


    })
    /* console.log("c",c)
    console.log("salles",this.salleFE) */
  }


  getTest(){
    
    //servicecinema.host+'/imageFilm/'+s.projection._embedded.projections[0].film.id
  }
  onGetTicketsPlaces(p:any){
this.currentProjection=p;
this.servicecinema.getTicketsPlaces(p).subscribe((data:any)=>{

  this.currentProjection.tickets=data
  this.selectedTickets=[] /* creaction tableau vide pour mettre les ticket selectionné */
  console.log("ticketsnew",this.currentProjection.tickets)
  console.log("ticketsnewdata",data)
})

}
onSelectTicket(t:any){
 
 /* ajouet nv attribut selected */
  if(! t.selected){
    t.selected=true
    this.selectedTickets.push(t);

  }else{
    t.selected=false
    this.selectedTickets.splice( this.selectedTickets.indexOf(t),1);
  }
 
  


  console.log("selected",this.selectedTickets)
}


 getTicketClass(t: any){     /* class des boutton le couleur */
  let str="btn margin "
if(t.reserve==true){
str+="btn-danger"

} 
 else if(t.selected){
  str+="btn-warning"

} else{
  str+="btn-success"

} 
return str;

} 
onPayTickets(f:any){

  let tickets: any=[]
  this.selectedTickets.forEach((t: any)=>{
    tickets.push(t.id);
  })
  f.tickets=tickets //creezr autre attribue "list des tickets"
  this.servicecinema.payerTickets(f).subscribe(data=>{
    alert("tickets reservés")
    this.onGetTicketsPlaces(this.currentProjection)
  })
console.log(f)
}
}
