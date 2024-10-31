import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { ClinicaInfoComponent } from './components/clinica-info/clinica-info.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "search",
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