import { Routes } from '@angular/router';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { ClinicaInfoComponent } from './components/clinica-info/clinica-info.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
    {
        path: "",
        component: SearchHomeComponent
    },
    {
        path: "clinicas/:id",
        component: ClinicaInfoComponent,
    },
    {
        path: "cadastro",
        component: CadastroComponent,
    }

];