import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselsComponent } from './vessels/vessels.component';
import { EmissionsComponent } from './emissions/emissions.component';

const routes: Routes = [
  {path: "vessels", component: VesselsComponent},
  {path: "emissions", component: EmissionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
