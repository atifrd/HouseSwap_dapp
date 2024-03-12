import { Component } from '@angular/core';
import { WalletServiceService } from './services/wallet-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'house-swap-dapp';
  walletConnected = false;

  constructor(private walletService: WalletServiceService) {

  }

  async connectWallet() {
    await this.walletService.loadSigner();
  }
}
