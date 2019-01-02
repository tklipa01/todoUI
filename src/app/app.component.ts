import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Profile } from './models/profile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  public profile: Profile;

  constructor(public auth: AuthService){    
    this.auth.handleAuthentication().then(() => {
      this.getProfile();
    });
  }

  async ngOnInit(){    
    if(localStorage.getItem('access_token')){
      await this.auth.renewTokens();      
    }    
    this.getProfile();
  }

  getProfile(){
    if(this.auth.userProfile){
      this.profile = this.auth.userProfile;            
    } else {
        this.auth.getProfile((err: any, profile: Profile) => {
            this.profile = profile;
        });
    } 
  }
}
