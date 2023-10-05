import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwPaginationModule } from 'jw-angular-pagination';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MatchesComponent } from "./components/matches/matches.component";
import { PlayersComponent } from "./components/players/players.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { CupEventComponent } from "./components/cup-event/cup-event.component";
import { ResultComponent } from "./components/result/result.component";
import { NewsComponent } from "./components/news/news.component";
import { StandingComponent } from "./components/standing/standing.component";
import { BlogComponent } from "./components/blog/blog.component";
import { InfoComponent } from "./components/info/info.component";
import { ArticleComponent } from "./components/article/article.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { MatchFormComponent } from "./components/match-form/match-form.component";
import { PlayerFormComponent } from "./components/player-form/player-form.component";
import { AddTeamComponent } from "./components/add-team/add-team.component";
import { EditTeamComponent } from "./components/edit-team/edit-team.component";
import { AdminComponent } from "./components/admin/admin.component";
import { MatchesTableComponent } from "./components/matches-table/matches-table.component";
import { PlayerTableComponent } from "./components/player-table/player-table.component";
import { TeamsTableComponent } from "./components/teams-table/teams-table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BannerComponent } from "./components/banner/banner.component";
import { MatchInfoComponent } from "./components/match-info/match-info.component";
import { ReversePipe } from "./pipes/reverse.pipe";
import { AsterixPipe } from "./pipes/asterix.pipe";
import { MyFilterPipe } from "./pipes/my-filter.pipe";
import { HttpClientModule } from "@angular/common/http";
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { WeatherComponent } from './components/weather/weather.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MatchesComponent,
    PlayersComponent,
    TeamsComponent,
    CupEventComponent,
    ResultComponent,
    NewsComponent,
    StandingComponent,
    BlogComponent,
    InfoComponent,
    ArticleComponent,
    LoginComponent,
    SignUpComponent,
    MatchFormComponent,
    PlayerFormComponent,
    AddTeamComponent,
    EditTeamComponent,
    AdminComponent,
    MatchesTableComponent,
    PlayerTableComponent,
    TeamsTableComponent,
    BannerComponent,
    MatchInfoComponent,
    ReversePipe,
    AsterixPipe,
    MyFilterPipe,
    AddStadiumComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule ,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
