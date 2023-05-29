import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { SedesService } from './service/sedes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adjudicacion-cerums';
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective ;
  searchTerm: string = '';

  dataLoaded: boolean = false;
  data: any[] = [];

  opcionSeleccionada: string = 'opcion-1';

  constructor(
    private sedesService: SedesService
  ){}

  ngOnInit(): void {
    this.getSedes(0);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // Puedes configurar más opciones aquí según tus necesidades
    };
  }

  getSedes(estado: number){
    this.data = []
    this.dataLoaded=false
    if(estado == 1){
      this.sedesService.getAdjudicadas().subscribe(
        (resp: any) => {
          this.data = resp
          console.log(resp)
          this.dataLoaded=true
        }
      )
    }
    if(estado == 2){
      this.sedesService.getFavoritos().subscribe(
        (resp: any) => {
          this.data = resp
          console.log(resp)
          this.dataLoaded=true
        }
      )
    }
    if(estado == 0){
      this.sedesService.getNoAdjudicadas().subscribe(
        (resp: any) => {
          this.data = resp
          console.log(resp)
          this.dataLoaded=true
        }
      )
    }
  }

  cambiarEstado(estado: number, id: number){
    const newEstado = estado == 0 ? 1 : 0
    this.sedesService.cambiarEstado(newEstado,id).subscribe(
      (resp: any) => {
        this.getSedes(estado)
      }
      )
    }

  cambiarFav(estado: number, id: number){
    console.log("fsfs", this.opcionSeleccionada)
    const newEstado = estado == 0 ? 1 : 0
    this.sedesService.cambiarFavorito(newEstado,id).subscribe(
        (resp: any) => {
        if (this.opcionSeleccionada=='opcion-3'){
          this.getSedes(2)
        }
        if (this.opcionSeleccionada=='opcion-1'){
          this.getSedes(0)
        }
        if (this.opcionSeleccionada=='opcion-2'){
          this.getSedes(1)
        }
      }
    )
  }

  onSearchInput(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchTerm).draw();
    });
  }

  initializeDataTable(): void {
    // Aquí configuras y renderizas la tabla DataTable
    // Puedes utilizar this.data para pasar los datos obtenidos al DataTable
  }
}
